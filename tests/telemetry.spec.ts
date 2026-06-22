import { test, expect } from "@playwright/test";
import { DayOneWorkoutPage, DayFiveWorkoutPage } from "./pom";
import { ProgramPage } from "./pom/program-page";
import { installGcSpy, getEventCount } from "./helpers/goatcounter";

// ---------------------------------------------------------------------------
// app-open
// ---------------------------------------------------------------------------

test("app-open fires exactly once on program page load", async ({ page }) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toBeVisible();
  // Exactly 1, not >=1 — catches Strict Mode or remount double-fires
  await expect.poll(() => getEventCount(page, "app-open")).toBe(1);
});

test("app-open does not fire on the landing page", async ({ page }) => {
  await installGcSpy(page);
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Get Started!" })).toBeVisible();
  // ProgramPage is not mounted on /, so no app-open should ever fire
  expect(await getEventCount(page, "app-open")).toBe(0);
});

// ---------------------------------------------------------------------------
// home-screen variant
// ---------------------------------------------------------------------------

test("app-open and app-open-homescreen both fire when utm_source=homescreen is in the URL", async ({
  page,
}) => {
  await installGcSpy(page);
  await page.goto("/program?utm_source=homescreen");
  // Wait for the program page to fully hydrate
  await expect(
    page.getByRole("heading", { name: "TODAY'S WORKOUT" }),
  ).toBeVisible();
  await expect.poll(() => getEventCount(page, "app-open")).toBe(1);
  await expect.poll(() => getEventCount(page, "app-open-homescreen")).toBe(1);
});

test("app-open-homescreen does NOT fire when utm_source param is absent", async ({
  page,
}) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  // Wait for hydration + useEffect to settle
  await expect.poll(() => getEventCount(page, "app-open")).toBe(1);
  expect(await getEventCount(page, "app-open-homescreen")).toBe(0);
});

// ---------------------------------------------------------------------------
// workout-start
// ---------------------------------------------------------------------------

test("workout-start fires when user clicks the day link", async ({ page }) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toBeVisible();
  // workout-start is fired in the onClick before navigation begins;
  // sessionStorage preserves it across the same-origin page transition
  await programPage.pressDayLink();
  await expect.poll(() => getEventCount(page, "workout-start")).toBe(1);
});

test("workout-start fires exactly once per click, no duplicates", async ({
  page,
}) => {
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressDayLink();
  await expect.poll(() => getEventCount(page, "workout-start")).toBe(1);

  // Hard-navigate back to /program (full reload resets appOpenFired flag)
  // and start again — each new click should add exactly one more event
  await page.goto("/program");
  await expect(programPage.dayLink).toBeVisible();
  await programPage.pressDayLink();
  await expect.poll(() => getEventCount(page, "workout-start")).toBe(2);
});

// ---------------------------------------------------------------------------
// workout-complete
// ---------------------------------------------------------------------------

test("workout-complete fires after saving a workout", async ({ page }) => {
  await installGcSpy(page);
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await dayOnePage.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await dayOnePage.pressCompleteSetButton();
    await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
    await dayOnePage.closeTimerModal();
  }
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.dayCompleteArea).toBeVisible();
  await dayOnePage.saveTheWorkout();
  await expect(dayOnePage.dayCompleteMessage).toBeVisible();
  await expect.poll(() => getEventCount(page, "workout-complete")).toBe(1);
});

test("week-complete does NOT fire when completing day 1", async ({ page }) => {
  await installGcSpy(page);
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await dayOnePage.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await dayOnePage.pressCompleteSetButton();
    await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
    await dayOnePage.closeTimerModal();
  }
  await dayOnePage.pressCompleteSetButton();
  await dayOnePage.saveTheWorkout();
  // Wait for the save to confirm before asserting the absence
  await expect(dayOnePage.dayCompleteMessage).toBeVisible();
  expect(await getEventCount(page, "week-complete")).toBe(0);
});

// ---------------------------------------------------------------------------
// week-complete
// ---------------------------------------------------------------------------

test("week-complete fires when the day 5 workout is saved", async ({
  page,
}) => {
  test.setTimeout(90 * 1_000);
  await installGcSpy(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();

  // Advance to day 5 by skipping days 1–4
  for (let i = 0; i < 4; i++) {
    await expect(programPage.skipButton).toBeEnabled();
    await programPage.pressSkipButton();
  }
  await expect(programPage.dayLink).toHaveText("DAY 5");

  // Navigate into day 5 (fires workout-start)
  await programPage.pressDayLink();

  // Choose Day 1 as the repeat day — FiveMaxEffortSets is the simplest workflow
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.pressDay1Button();

  // The FiveMaxEffortSets UI is identical regardless of which page hosts it;
  // DayOneWorkoutPage locators resolve correctly on the day-five page.
  const workout = new DayOneWorkoutPage(page, 1);
  await workout.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await workout.pressCompleteSetButton();
    await workout.timerModalCloseButton.waitFor({ state: "visible" });
    await workout.closeTimerModal();
  }
  await workout.pressCompleteSetButton();
  await expect(workout.dayCompleteArea).toBeVisible();
  await workout.saveTheWorkout();
  await expect(workout.dayCompleteMessage).toBeVisible();

  await expect.poll(() => getEventCount(page, "workout-complete")).toBe(1);
  await expect.poll(() => getEventCount(page, "week-complete")).toBe(1);
});

// ---------------------------------------------------------------------------
// resilience — tracking errors must never surface to the user
// ---------------------------------------------------------------------------

test("a throwing goatcounter.count does not break the workout save flow", async ({
  page,
}) => {
  // Install a broken spy: count() throws every time
  await page.addInitScript(() => {
    window.goatcounter = {
      count: () => {
        throw new Error("GoatCounter intentionally broken for resilience test");
      },
    };
  });
  await page.route("**/gc.zgo.at/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );

  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await dayOnePage.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await dayOnePage.pressCompleteSetButton();
    await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
    await dayOnePage.closeTimerModal();
  }
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.dayCompleteArea).toBeVisible();
  await dayOnePage.saveTheWorkout();

  // Core UX must reach the success state — tracking errors are swallowed by track()
  await expect(dayOnePage.dayCompleteMessage).toBeVisible();
  await expect(dayOnePage.dayCompleteSaveButton).not.toBeVisible();
});
