import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";
import { HINT_MODAL_HEADING } from "@/lib/hints";

const DAY_ONE = DAYS.filter((day) => day.number === 1)[0];

export class DayOnePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly exerciseHeading: Locator;
  readonly recoveryHeading: Locator;
  readonly dailyHintButton: Locator;
  readonly decrementRepButton: Locator;
  readonly incrementRepButton: Locator;
  readonly repInput: Locator;
  readonly repInputLabel: Locator;
  readonly repsRemoveButton: Locator;
  readonly repsCompleteButton: Locator;
  readonly setsTable: Locator;
  readonly progressBar: Locator;

  readonly dailyHintModal: Locator;
  readonly dailyHintModalContent: Locator;
  readonly dailyHintModalSVG: Locator;
  readonly dailyHintModalCloseButton: Locator;
  readonly dailyHintModalHeading: Locator;
  readonly dailyHintModalHintList: Locator;

  readonly timerModal: Locator;
  readonly timerModalContent: Locator;
  readonly timerModalTimerContainer: Locator;
  readonly timerModalHeading: Locator;
  readonly timerModalTimerMessage: Locator;
  readonly timerModalCloseButton: Locator;

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
    this.dailyHintButton = page.locator("button#hint-button");
    this.decrementRepButton = page.locator("button#decrement-button");
    this.incrementRepButton = page.locator("button#increment-button");
    this.repsRemoveButton = page.locator("button#reps-remove-button");
    this.repsCompleteButton = page.locator("button#reps-complete-button");
    this.setsTable = page.getByRole("table");
    this.progressBar = page.getByRole("progressbar");

    this.dailyHintModal = page.locator("div#daily-hint-modal");
    this.dailyHintModalContent = page.locator("div#daily-hint-modal-content");
    this.dailyHintModalSVG = page.locator("div#daily-hint-modal-svg-container");
    this.dailyHintModalHeading = page.getByRole("heading", {
      name: HINT_MODAL_HEADING,
    });
    this.dailyHintModalCloseButton = page.locator(
      "button#daily-hint-modal-close-button",
    );
    this.dailyHintModalHintList = page.locator("ol#daily-hint-modal-list");

    this.timerModal = page.locator("div#timer-modal");
    this.timerModalContent = page.locator("div#timer-modal-content");
    this.timerModalTimerContainer = page.locator(
      "div#timer-modal-heading-container",
    );
    this.timerModalHeading = page.getByRole("heading", {
      name: "Recovery",
      exact: true,
    });
    this.timerModalTimerMessage = page.getByRole("heading", {
      name: /Next set in [1-9][0-9]? second!?s?/,
    });
    this.timerModalCloseButton = page.getByRole("button", {
      name: "close timer",
    });
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

  async pressCompleteSetButton(numberOfTimes?: number) {
    await this.repsCompleteButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressDailyHintButton() {
    await this.dailyHintButton.click();
  }

  async closeHintModal() {
    await this.dailyHintModalCloseButton.click();
  }

  async closeTimerModal() {
    await this.timerModalCloseButton.click();
  }
}
