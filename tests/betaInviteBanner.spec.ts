import { test, expect, type Page } from "@playwright/test";
import { ProgramPage } from "./pom/program-page";
import { installGcSpy, getEventCount } from "./helpers/goatcounter";

const DB_NAME = "armstrong_pullup_program_db";
const DB_VERSION = 5;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Mirrors dayReviewPage.spec.ts's seedDatabase pattern: open the already-
// created DB at the current version (no upgrade triggered) and write
// directly into a single store.
async function seedStore(
  page: Page,
  storeName: "weeksStore" | "betaInviteStore",
  record: Record<string, unknown>,
) {
  await page.evaluate(
    ({ dbName, dbVersion, storeName, record }) => {
      return new Promise<void>((resolve, reject) => {
        const open = indexedDB.open(dbName, dbVersion);
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction(storeName, "readwrite");
          tx.objectStore(storeName).put(record);
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
        open.onerror = () => reject(open.error);
      });
    },
    { dbName: DB_NAME, dbVersion: DB_VERSION, storeName, record },
  );
}

function seedCompletedDay(page: Page, lastCompletedDay = 1) {
  return seedStore(page, "weeksStore", {
    number: 1,
    lastCompletedDay,
    completedDays: [lastCompletedDay],
  });
}

function seedBetaInviteState(
  page: Page,
  state: {
    timesShown: number;
    lastShownAt: number | null;
    dismissedPermanently: boolean;
  },
) {
  return seedStore(page, "betaInviteStore", { id: "beta-invite", ...state });
}

async function getBetaInviteState(page: Page) {
  return page.evaluate(
    ({ dbName, dbVersion }) => {
      return new Promise((resolve, reject) => {
        const open = indexedDB.open(dbName, dbVersion);
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction("betaInviteStore", "readonly");
          const req = tx.objectStore("betaInviteStore").get("beta-invite");
          req.onsuccess = () => {
            db.close();
            resolve(req.result);
          };
          req.onerror = () => reject(req.error);
        };
        open.onerror = () => reject(open.error);
      });
    },
    { dbName: DB_NAME, dbVersion: DB_VERSION },
  ) as Promise<
    | {
        timesShown: number;
        lastShownAt: number | null;
        dismissedPermanently: boolean;
      }
    | undefined
  >;
}

test("does not show before completing a day", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.betaBanner).not.toBeVisible();
});

test("shows after completing a day, on a fresh beta-invite state", async ({
  page,
}) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await page.reload();

  await expect(programPage.pastWorkoutsHeader).toBeVisible(); // sanity: gate passed
  await expect(programPage.betaBanner).toBeVisible();
  await expect(programPage.betaBannerIosLink).toBeVisible();
  await expect(programPage.betaBannerAndroidLink).toBeVisible();
  await expect.poll(() => getEventCount(page, "beta-banner-shown")).toBe(1);

  const state = await getBetaInviteState(page);
  expect(state?.timesShown).toBe(1);
  expect(state?.dismissedPermanently).toBe(false);
  expect(typeof state?.lastShownAt).toBe("number");
});

test("dismissing hides it permanently", async ({ page }) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await page.reload();

  await expect(programPage.betaBanner).toBeVisible();
  await programPage.dismissBetaBanner();
  await expect(programPage.betaBanner).not.toBeVisible();
  await expect.poll(() => getEventCount(page, "beta-banner-dismissed")).toBe(1);

  await page.reload();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.betaBanner).not.toBeVisible();

  const state = await getBetaInviteState(page);
  expect(state?.dismissedPermanently).toBe(true);
});

test("clicking the iOS CTA hides it permanently and fires tracking", async ({
  page,
}) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await page.reload();

  await expect(programPage.betaBanner).toBeVisible();
  await programPage.betaBannerIosLink.click();
  await expect(programPage.betaBanner).not.toBeVisible();
  await expect.poll(() => getEventCount(page, "beta-cta-click")).toBe(1);

  await page.reload();
  await expect(programPage.betaBanner).not.toBeVisible();

  const state = await getBetaInviteState(page);
  expect(state?.dismissedPermanently).toBe(true);
});

test("clicking the Android CTA hides it permanently and fires tracking", async ({
  page,
}) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await page.reload();

  await expect(programPage.betaBanner).toBeVisible();
  await programPage.betaBannerAndroidLink.click();
  await expect(programPage.betaBanner).not.toBeVisible();
  await expect.poll(() => getEventCount(page, "beta-cta-click")).toBe(1);

  await page.reload();
  await expect(programPage.betaBanner).not.toBeVisible();

  const state = await getBetaInviteState(page);
  expect(state?.dismissedPermanently).toBe(true);
});

test("does not reappear within the 4-day spacing window", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await seedBetaInviteState(page, {
    timesShown: 1,
    lastShownAt: Date.now() - 2 * MS_PER_DAY,
    dismissedPermanently: false,
  });
  await page.reload();

  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.betaBanner).not.toBeVisible();
});

test("reappears once the 4-day spacing window has passed", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await seedBetaInviteState(page, {
    timesShown: 1,
    lastShownAt: Date.now() - 5 * MS_PER_DAY,
    dismissedPermanently: false,
  });
  await page.reload();

  await expect(programPage.betaBanner).toBeVisible();

  const state = await getBetaInviteState(page);
  expect(state?.timesShown).toBe(2);
});

test("stops showing once the 3-show cap is reached, even outside the spacing window", async ({
  page,
}) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await seedCompletedDay(page, 1);
  await seedBetaInviteState(page, {
    timesShown: 3,
    lastShownAt: Date.now() - 30 * MS_PER_DAY,
    dismissedPermanently: false,
  });
  await page.reload();

  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.betaBanner).not.toBeVisible();
});
