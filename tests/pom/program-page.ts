import { expect, type Locator, type Page } from "@playwright/test";

export class ProgramPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly getStartedLink: Locator;
  readonly getStartedHeader: Locator;
  readonly dashboard: Locator;
  readonly pastWorkoutsHeader: Locator;
  readonly pastWorkoutsSection: Locator;
  readonly dayLink: Locator;
  readonly todaysWorkoutHeader: Locator;
  readonly skipButton: Locator;
  readonly resetButton: Locator;
  readonly resetModal: Locator;
  readonly resetModalCancelButton: Locator;
  readonly resetModalConfirmButton: Locator;
  readonly downloadButton: Locator;
  readonly downloadModal: Locator;
  readonly downloadModalCancelButton: Locator;
  readonly downloadModalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "PULLUP PROGRAM" });
    this.getStartedHeader = page.getByRole("heading", { name: "GET STARTED" });
    this.dashboard = page.locator("#dashboard");
    this.pastWorkoutsHeader = page.getByRole("heading", {
      name: "PAST WORKOUTS",
    });
    this.pastWorkoutsSection = page.locator("#past-workouts-section");
    this.todaysWorkoutHeader = page.getByRole("heading", {
      name: "TODAY'S WORKOUT",
    });
    this.dayLink = page.getByRole("link", { name: /DAY [1-5]/ });
    // This is the get started link from the landing page
    this.getStartedLink = page.getByRole("link", { name: "GET STARTED" });
    this.skipButton = page.getByRole("button", { name: "SKIP" });
    this.resetButton = page.locator("#reset-program-button");
    this.resetModal = page.locator("#reset-program-modal");
    this.resetModalCancelButton = page.locator("#reset-modal-cancel-button");
    this.resetModalConfirmButton = page.locator("#reset-modal-confirm-button");
    this.downloadButton = page.locator("#migrate-data-button");
    this.downloadModal = page.locator("#download-data-modal");
    this.downloadModalCancelButton = page.locator("#download-modal-cancel-button");
    this.downloadModalConfirmButton = page.locator("#download-modal-confirm-button");
  }

  async goto() {
    await this.page.goto("/");
    await this.getStartedLink.click();
    await expect(this.getStartedHeader).toBeVisible();
  }

  async pressDayLink() {
    await this.dayLink.click();
  }

  async pressSkipButton() {
    await this.skipButton.click();
  }

  async pressResetButton() {
    await this.resetButton.click();
  }

  async cancelReset() {
    await this.resetModalCancelButton.click();
    await this.resetModal.waitFor({ state: "hidden" });
  }

  async confirmReset() {
    await this.resetModalConfirmButton.click();
    await this.getStartedHeader.waitFor({ state: "visible" });
  }

  async pressDownloadButton() {
    await this.downloadButton.click();
  }

  async cancelDownload() {
    await this.downloadModalCancelButton.click();
    await this.downloadModal.waitFor({ state: "hidden" });
  }
}
