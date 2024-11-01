import { type Locator, type Page } from "@playwright/test";

export class ProgramPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly getStartedLink: Locator;
  readonly getStartedHeader: Locator;
  readonly dashboardHeader: Locator;
  readonly dayLink: Locator;
  readonly yourWorkoutHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "PULLUP PROGRAM" });
    this.getStartedHeader = page.getByRole("heading", { name: "GET STARTED" });
    this.dashboardHeader = page.getByRole("heading", { name: "PAST WORKOUTS" });
    this.yourWorkoutHeader = page.getByRole("heading", {
      name: "YOUR WORKOUT",
    });
    this.dayLink = page.getByRole("link", { name: /DAY [1-5]/ });
    // This is the get started link from the landing page
    this.getStartedLink = page.getByRole("link", { name: "GET STARTED" });
  }

  async goto() {
    await this.page.goto("/");
    await this.getStartedLink.click();
    await this.getStartedHeader.isVisible();
  }

  async pressDayLink() {
    await this.dayLink.click();
  }
}
