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
  readonly repInputLabel: Locator;
  readonly repsRemoveButton: Locator;
  readonly repsCompleteButton: Locator;
  readonly setsTable: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: `PULLUP PROGRAM` });
    this.dayHeading = page.getByRole("heading", { name: `${DAY_ONE.label}` });
    this.exerciseHeading = page.getByRole("heading", {
      name: `${DAY_ONE.heading2}`,
    });
    this.recoveryHeading = page.getByRole("heading", {
      name: `${DAY_ONE.heading3}`,
    });
    this.repInputLabel = page.getByRole("heading", { name: /SET [1-5] REPS/ });
    this.repInput = page.getByLabel(/SET [1-5] REPS/);
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

  async pressPlusIcon(numberOfTimes?: number): Promise<void> {
    await this.incrementRepButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressMinusIcon(numberOfTimes?: number): Promise<void> {
    await this.decrementRepButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressEraseSet(numberOfTimes?: number) {
    await this.repsRemoveButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressCompleteSet(numberOfTimes?: number) {
    await this.repsCompleteButton.click({ clickCount: numberOfTimes || 1 });
  }
}
