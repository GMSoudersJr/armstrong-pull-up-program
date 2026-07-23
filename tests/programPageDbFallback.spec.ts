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
  await expect(programPage.dayLink).not.toBeVisible();
  await expect(programPage.skipButton).not.toBeVisible();

  await page.clock.fastForward(3000);

  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
});
