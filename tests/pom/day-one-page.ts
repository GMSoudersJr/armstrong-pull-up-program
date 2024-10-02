import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";

const DAY_ONE = DAYS.filter((day) => day.number === 1)[0];

export class DayOnePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly exerciseHeading: Locator;
  readonly recoveryHeading: Locator;
  readonly hintButton: Locator;
  readonly decrementRepButton: Locator;
  readonly incrementRepButton: Locator;
  readonly repInput: Locator;
  readonly repsRemoveButton: Locator;
  readonly repsCompleteButton: Locator;
  readonly setsTable: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator("a", { hasText: `PULLUP PROGRAM` });
    this.dayHeading = page.locator("h1", { hasText: `${DAY_ONE.label}` });
    this.exerciseHeading = page.locator("h2", {
      hasText: `${DAY_ONE.heading2}`,
    });
    this.recoveryHeading = page.locator("h3", {
      hasText: `${DAY_ONE.heading3}`,
    });
    this.repInput = page.locator("input");
    this.hintButton = page.locator("button#hint-button");
    this.decrementRepButton = page.locator("button#decrement-button");
    this.incrementRepButton = page.locator("button#increment-button");
    this.repsRemoveButton = page.locator("button#reps-remove-button");
    this.repsCompleteButton = page.locator("button#reps-complete-button");
    this.setsTable = page.getByRole("table");
    this.progressBar = page.getByRole("progressbar");
  }

  async goto() {
    await this.page.goto(`${DAY_ONE.path}`);
  }
}
