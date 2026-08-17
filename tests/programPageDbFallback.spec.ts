import { test, expect } from "@playwright/test";
import { ProgramPage } from "./pom/program-page";

/**
 * Regression test for the iOS PWA cold-launch bug: when indexedDB.open()
 * never calls onsuccess/onerror/onupgradeneeded (a documented WKWebView
 * quirk on a fresh home-screen launch), Program.tsx used to leave
 * programDayNumber stuck at 0 forever, so the SKIP/DAY link never rendered
 * and the user had nothing to tap. We simulate the hang by stubbing
 * indexedDB.open to return a request whose callbacks are never invoked,
 * then use a fake clock to jump past the 3s fallback timer without
 * slowing down the test suite with a real wait.
 */
test("SKIP and DAY 1 buttons still render when IndexedDB never responds", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.indexedDB.open = () => {
      return {} as unknown as IDBOpenDBRequest;
    };
  });

  await page.clock.install();

  const programPage = new ProgramPage(page);
  await programPage.goto();

  // GET STARTED heading renders unconditionally, unlike the day buttons.
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.loadingIndicator).toBeVisible();
  await expect(programPage.dayLink).not.toBeVisible();
  await expect(programPage.skipButton).not.toBeVisible();

  await page.clock.fastForward(3000);

  await expect(programPage.loadingIndicator).not.toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
});

/**
 * Regression test for a distinct failure mode from the hang above: on some
 * Chrome-for-iOS / WebKit configurations, window.indexedDB.open() can throw
 * SYNCHRONOUSLY (e.g. window.indexedDB is null) instead of hanging. Because
 * src/app/lib/data/indexedDB/index.ts used to call indexedDB.open() at
 * module-load time with no try/catch, this failed the dynamic import of
 * Program.tsx before it ever mounted -- so the 3s fallback timer inside the
 * component (tested above) never ran, and the dashboard rendered nothing.
 * Unlike the hang case, no fake clock is needed here: the fix rejects
 * dbInitialized immediately rather than waiting out a timer.
 */
test("SKIP and DAY 1 buttons still render when indexedDB.open throws synchronously", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.indexedDB.open = () => {
      throw new TypeError("indexedDB.open is not a function");
    };
  });

  const programPage = new ProgramPage(page);
  await programPage.goto();

  await expect(programPage.todaysWorkoutHeader).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
});

/**
 * Regression test for PastWorkouts.tsx reading from IndexedDB before schema
 * creation finishes. index.ts opens the DB WITH a version arg and only
 * resolves dbInitialized in onsuccess (which fires after onupgradeneeded);
 * actions.ts's safeOpenDb() opens WITHOUT a version arg and has no
 * onupgradeneeded handler at all. Program.tsx already awaits dbInitialized
 * before reading, so it's safe. PastWorkouts.tsx used to call
 * getWeeklyProgress() directly on mount -- on a real first-ever cold launch,
 * if that unversioned open resolved before the versioned one finished
 * creating the schema, it would silently create a schema-less v1 database,
 * and the subsequent transaction() call would throw NotFoundError (swallowed
 * by a bare console.warn), leaving PastWorkouts stuck on the empty state.
 *
 * We simulate this by hanging only the versioned (index.ts) open call, same
 * technique as the hang test above, while letting the unversioned
 * (actions.ts) call through to the real, fresh (and therefore schema-less)
 * IndexedDB. Under the fix, PastWorkouts awaits the (never-resolving)
 * dbInitialized before reading, so it never attempts the read at all -- no
 * NotFoundError should ever be logged.
 */
test("PastWorkouts does not read from IndexedDB before dbInitialized resolves", async ({
  page,
}) => {
  const consoleWarnings: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "warning") {
      consoleWarnings.push(msg.text());
    }
  });

  await page.addInitScript(() => {
    const realOpen = window.indexedDB.open.bind(window.indexedDB);
    window.indexedDB.open = ((...args: unknown[]) => {
      // index.ts opens with a version arg; actions.ts's safeOpenDb() does
      // not -- hang only the versioned call so dbInitialized never resolves.
      if (args.length >= 2) {
        return {} as unknown as IDBOpenDBRequest;
      }
      return (realOpen as (...a: unknown[]) => IDBOpenDBRequest)(...args);
    }) as typeof window.indexedDB.open;
  });

  const programPage = new ProgramPage(page);
  await programPage.goto();

  await page.waitForTimeout(500);

  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.pastWorkoutsHeader).not.toBeVisible();
  expect(
    consoleWarnings.some((text) => /NotFoundError|object store/i.test(text)),
  ).toBe(false);
});
