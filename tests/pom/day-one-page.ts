import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";
import {
  DAY_COMPLETE_MESSAGES,
  CIRCLE_CHECK_BIG_ICON_MESSAGE,
} from "@/lib/strings/dayComplete";
import { CDailyHintModal } from "./daily-hint-modal";

const DAY_ONE = DAYS.filter((day) => day.number === 1)[0];

export class DayOnePage extends CDailyHintModal {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly dayOneLink: Locator;

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

  readonly timerModal: Locator;
  readonly timerModalContent: Locator;
  readonly timerModalTimerContainer: Locator;
  readonly timerModalHeading: Locator;
  readonly timerModalTimerMessage: Locator;
  readonly timerModalCloseButton: Locator;

  readonly dayCompleteArea: Locator;
  readonly thumbsUpIconWrapper: Locator;
  readonly dayCompleteTotalReps: Locator;
  readonly dayCompleteMessage: Locator;
  readonly dayCompleteSaveProgressMessage: Locator;
  readonly dayCompleteSaveButton: Locator;
  readonly dayCompleteGoBackLink: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get Started!" });
    this.dayOneLink = page.getByRole("link", { name: "DAY 1" });

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

    this.dayCompleteArea = page.locator("div#day-complete-container");
    this.dayCompleteTotalReps = page.getByRole("heading", {
      name: /[1-9][0-9]?[0-9]? TOTAL PULL-UPS/,
    });
    this.dayCompleteMessage = page.getByRole("heading", {
      name: DAY_COMPLETE_MESSAGES[0],
    });
    this.dayCompleteSaveProgressMessage = page.getByRole("heading", {
      name: DAY_COMPLETE_MESSAGES[1],
    });
    this.dayCompleteSaveButton = page.locator("button#save-icon-button");
    this.thumbsUpIconWrapper = page.locator("div#thumbs-up-icon-wrapper");
    this.dayCompleteGoBackLink = page.getByRole("link", {
      name: CIRCLE_CHECK_BIG_ICON_MESSAGE,
    });
  }

  async goto() {
    await this.page.goto(`${DAY_ONE.path}`);
  }

  async startUserFlow() {
    await this.page.goto(`/`);
    await this.getStartedLink.click();
    await this.dayOneLink.click();
  }

  async pressPlusIcon(numberOfTimes?: number): Promise<void> {
    await this.incrementRepButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressMinusIcon(numberOfTimes?: number): Promise<void> {
    await this.decrementRepButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressEraseSet(numberOfTimes?: number): Promise<void> {
    await this.repsRemoveButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressCompleteSetButton(numberOfTimes?: number): Promise<void> {
    await this.repsCompleteButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressDailyHintButton(): Promise<void> {
    await this.dailyHintButton.click();
  }

  async pressGoBackLink(): Promise<void> {
    await this.dayCompleteGoBackLink.click({ force: true });
  }

  async closeTimerModal(): Promise<void> {
    await this.timerModalCloseButton.click();
  }

  async waitForTimerModal(): Promise<void> {
    await this.timerModal.waitFor({ state: "hidden", timeout: 91 * 1_000 });
  }

  async saveTheWorkout(): Promise<void> {
    await this.dayCompleteSaveButton.click({ force: true });
  }
}
