import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";

const DAY_TWO = DAYS.filter((day) => day.number === 2)[0];

export class DayTwoPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly exerciseHeading: Locator;
  readonly recoveryHeading: Locator;
  readonly hintButton: Locator;
  readonly repsHeading: Locator;
  readonly missSetbutton: Locator;
  readonly repsCompleteButton: Locator;
  readonly pyramid: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator("a", { hasText: `PULLUP PROGRAM` });
    this.dayHeading = page.locator("h1", { hasText: `${DAY_TWO.label}` });
    this.exerciseHeading = page.locator("h2", {
      hasText: `${DAY_TWO.heading2}`,
    });
    this.recoveryHeading = page.locator("h3", {
      hasText: `${DAY_TWO.heading3}`,
    });
    this.hintButton = page.locator("button#hint-button");
    this.pyramid = page.getByRole("list");
    this.repsHeading = page.locator("h2#reps-heading");
    this.missSetbutton = page.locator("button#miss-set-button");
    this.repsCompleteButton = page.locator("button#reps-complete-button");
  }

  async goto() {
    await this.page.goto(`${DAY_TWO.path}`);
  }
}
