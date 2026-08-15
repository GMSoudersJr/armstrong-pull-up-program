import { ProgramPage } from "./pom/program-page";
import { test, expect } from "@playwright/test";
import { stubWebShareAvailable, stubWebShareFailure } from "./pom/mockShare";

test("expect correct elements", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.homeLink).toBeVisible();
  await expect(programPage.dashboard).toBeVisible();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.pastWorkoutsHeader).not.toBeVisible();
  await expect(programPage.pastWorkoutsSection).not.toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.todaysWorkoutHeader).toBeVisible();
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
});

test("expect past workouts visible", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.homeLink).toBeVisible();
  await expect(programPage.dashboard).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.getStartedHeader).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.pastWorkoutsSection).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.todaysWorkoutHeader).toBeVisible();
});

test("skip advances day counter to DAY 2", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 2");
});

test("skipping day 5 wraps to DAY 1", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  for (let i = 0; i < 5; i++) {
    await expect(programPage.skipButton).toBeEnabled();
    await programPage.pressSkipButton();
  }
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
});

test("reset button not visible before any data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.resetButton).not.toBeVisible();
});

test("reset button visible after skipping a day", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await expect(programPage.resetButton).toBeVisible();
});

test("reset modal opens and cancel preserves data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressResetButton();
  await expect(programPage.resetModal).toBeVisible();
  await programPage.cancelReset();
  await expect(programPage.resetModal).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
});

test("confirming reset clears all data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await programPage.pressResetButton();
  await programPage.confirmReset();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.pastWorkoutsHeader).not.toBeVisible();
  await expect(programPage.resetButton).not.toBeVisible();
});

test("download button not visible before any data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.downloadButton).not.toBeVisible();
});

test("download button visible after skipping a day", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await expect(programPage.downloadButton).toBeVisible();
});

test("download modal opens on button click", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressDownloadButton();
  await expect(programPage.downloadModal).toBeVisible();
});

test("download modal cancel closes without downloading", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressDownloadButton();
  await expect(programPage.downloadModal).toBeVisible();
  await programPage.cancelDownload();
  await expect(programPage.downloadModal).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
});

test("download succeeds via Web Share API when available", async ({ page }) => {
  // Never let a test touch the real navigator.share — stub it so this
  // deterministically exercises the share branch without ever risking a
  // hang on a native OS share surface in headless/automated Chromium.
  await stubWebShareAvailable(page, { resolve: true });
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressDownloadButton();
  await expect(programPage.downloadModal).toBeVisible();
  await programPage.confirmDownload();
  await expect(programPage.downloadModal).not.toBeVisible();
  await expect(programPage.downloadModalErrorMessage).not.toBeVisible();
});

test("download modal closes silently when share is cancelled", async ({
  page,
}) => {
  await stubWebShareAvailable(page, { resolve: false });
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressDownloadButton();
  await expect(programPage.downloadModal).toBeVisible();
  await programPage.confirmDownload();
  await expect(programPage.downloadModal).not.toBeVisible();
  await expect(programPage.downloadModalErrorMessage).not.toBeVisible();
});

test("download falls back to a direct download when Web Share fails", async ({
  page,
}) => {
  // Some browsers (e.g. Chrome, which enforces stricter transient-activation
  // rules than WebKit) can report canShare() as true but still reject the
  // actual share() call. That should silently fall back to the classic
  // <a download> path rather than leaving the user with an error.
  await stubWebShareFailure(page);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressDownloadButton();
  await expect(programPage.downloadModal).toBeVisible();
  await programPage.confirmDownload();
  await expect(programPage.downloadModal).not.toBeVisible();
  await expect(programPage.downloadModalErrorMessage).not.toBeVisible();
});
