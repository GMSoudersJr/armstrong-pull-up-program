import { expect, type Locator, type Page } from "@playwright/test";

export class ProgramPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly getStartedLink: Locator;
  readonly getStartedHeader: Locator;
  readonly dayLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "PULLUP PROGRAM" });
    this.getStartedHeader = page.getByRole("heading", { name: "GET STARTED" });
    this.dayLink = page.getByRole("link", { name: /DAY [1-5]/ });
    // This is the get started link from the landing page
    this.getStartedLink = page.getByRole("link", { name: "GET STARTED" });
  }

  async goto() {
    await this.page.goto("/");
    await this.getStartedLink.click();
  }
}
