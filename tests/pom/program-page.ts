import { type Locator, type Page } from "@playwright/test";

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
  }

  async goto() {
    await this.page.goto("/");
    await this.getStartedLink.click();
    await this.getStartedHeader.isVisible();
  }

  async pressDayLink() {
    await this.dayLink.click();
  }

  async pressSkipButton() {
    await this.skipButton.click();
  }
}
