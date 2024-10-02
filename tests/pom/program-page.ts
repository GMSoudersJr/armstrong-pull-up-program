import { expect, type Locator, type Page } from "@playwright/test";

export class ProgramPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly getStartedLink: Locator;
  readonly getStartedHeader: Locator;
  readonly dayLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator("a", { hasText: "PULLUP PROGRAM" });
    this.getStartedHeader = page.locator("h1", { hasText: "GET STARTED" });
    this.dayLink = page.locator("a", { hasText: "DAY" });
    // This is the get started link from the landing page
    this.getStartedLink = page.locator("a", { hasText: "GET STARTED" });
  }

  async goto() {
    await this.page.goto("/");
    await this.getStartedLink.click();
  }
}
