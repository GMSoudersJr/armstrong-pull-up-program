import { test, expect } from "@playwright/test";
import { ProgramPage } from "./pom/program-page";

const DB_NAME = "armstrong_pullup_program_db";
const DB_VERSION = 4;

const WEEK_COUNT = 10;

// Weeks 3, 6, 9 are skipped — non-consecutive.
const SKIPPED_WEEKS = new Set([3, 6, 9]);

const DAY_ONE_RECORDS = Array.from({ length: WEEK_COUNT }, (_, i) => {
  const weekNumber = i + 1;
  const skipped = SKIPPED_WEEKS.has(weekNumber);
  return {
    id: `${weekNumber}-1`,
    dayNumber: 1,
    dayAbbreviation: skipped ? "SKPD" : "5MES",
    date: new Date(2025, 0, 1 + i * 7).toLocaleDateString("en-US"),
    weekNumber,
    sets: skipped ? [0] : [3 + i, 3 + i, 3 + i, 3 + i, 3 + i],
  };
});

const COMPLETED_COUNT = DAY_ONE_RECORDS.filter(
  (r) => r.dayAbbreviation !== "SKPD",
).length;

// Each week has only Day 1 completed — no other-day records needed.
const WEEK_RECORDS = Array.from({ length: WEEK_COUNT }, (_, i) => ({
  number: i + 1,
  lastCompletedDay: 1,
  completedDays: [1],
}));

async function seedDatabase(page: Parameters<Parameters<typeof test>[1]>[0]["page"]) {
  await page.evaluate(
    ({ dbName, dbVersion, workouts, weeks }) => {
      return new Promise<void>((resolve, reject) => {
        const open = indexedDB.open(dbName, dbVersion);
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction(["workoutsStore", "weeksStore"], "readwrite");
          const workoutsStore = tx.objectStore("workoutsStore");
          const weeksStore = tx.objectStore("weeksStore");

          workouts.forEach((record) => workoutsStore.put(record));
          weeks.forEach((record) => weeksStore.put(record));

          tx.oncomplete = () => { db.close(); resolve(); };
          tx.onerror = () => reject(tx.error);
        };
        open.onerror = () => reject(open.error);
      });
    },
    { dbName: DB_NAME, dbVersion: DB_VERSION, workouts: DAY_ONE_RECORDS, weeks: WEEK_RECORDS },
  );
}

test("D1 review full page shows all Day 1 workouts in DOM", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.getStartedHeader).toBeVisible();

  await seedDatabase(page);

  await page.goto("/program/review/day/1");

  const charts = page.locator("#d3-section li");
  await expect(charts).toHaveCount(DAY_ONE_RECORDS.length);
});

test("D1 review full page — last chart is reachable by scrolling", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.getStartedHeader).toBeVisible();

  await seedDatabase(page);

  await page.goto("/program/review/day/1");

  const charts = page.locator("#d3-section li");
  const lastChart = charts.last();
  await lastChart.scrollIntoViewIfNeeded();
  await expect(lastChart).toBeInViewport();
});

test("D1 modal review shows all Day 1 workouts in DOM", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.getStartedHeader).toBeVisible();

  await seedDatabase(page);

  await page.reload();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();

  await page.getByRole("link", { name: "D1" }).click();

  const charts = page.locator("#d3-section li");
  await expect(charts).toHaveCount(DAY_ONE_RECORDS.length);
});

test("D1 modal review — last chart is reachable by scrolling", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.getStartedHeader).toBeVisible();

  await seedDatabase(page);

  await page.reload();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();

  await page.getByRole("link", { name: "D1" }).click();

  const charts = page.locator("#d3-section li");
  const lastChart = charts.last();
  await lastChart.scrollIntoViewIfNeeded();
  await expect(lastChart).toBeInViewport();
});
