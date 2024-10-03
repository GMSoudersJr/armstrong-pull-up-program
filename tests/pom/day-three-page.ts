import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";

const DAY_THREE = DAYS.filter((day) => day.number === 3)[0];

export class DayThreePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly exerciseHeading: Locator;
  readonly recoveryHeading: Locator;
  readonly hintButton: Locator;
  readonly decrementRepButton: Locator;
  readonly incrementRepButton: Locator;
  readonly repInput: Locator;
  readonly submitButton: Locator;
  readonly repsRemoveButton: Locator;
  readonly repsCompleteButton: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: `PULLUP PROGRAM` });
    this.dayHeading = page.getByRole("heading", { name: `${DAY_THREE.label}` });
    this.exerciseHeading = page.getByRole("heading", {
      name: `${DAY_THREE.heading2}`,
    });
    this.recoveryHeading = page.getByRole("heading", {
      name: `${DAY_THREE.heading3}`,
    });
    this.repInput = page.getByLabel("TRAINING SET REPS");
    this.hintButton = page.locator("button#hint-button");
    this.decrementRepButton = page.locator("button#decrement-button");
    this.incrementRepButton = page.locator("button#increment-button");
    this.repsRemoveButton = page.locator("button#reps-remove-button");
    this.repsCompleteButton = page.locator("button#reps-complete-button");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.progressBar = page.getByRole("progressbar");
  }

  async goto() {
    await this.page.goto(`${DAY_THREE.path}`);
  }
}
