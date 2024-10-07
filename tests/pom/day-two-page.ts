import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";
import { HINT_MODAL_HEADING } from "@/lib/hints";

const DAY_TWO = DAYS.filter((day) => day.number === 2)[0];

export class DayTwoPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly dayTwoLink: Locator;

  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly exerciseHeading: Locator;
  readonly recoveryHeading: Locator;
  readonly dailyHintButton: Locator;
  readonly repsHeading: Locator;
  readonly missSetbutton: Locator;
  readonly repsCompleteButton: Locator;
  readonly pyramid: Locator;
  readonly missedSetNumberContainer: Locator;
  readonly missRepNumberedButtons: Locator;
  readonly maxoutRepNumberContainer: Locator;
  readonly maxoutNumberedButtons: Locator;

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
    this.getStartedLink = page.getByRole("link", { name: "Get Started!" });
    this.dayTwoLink = page.getByRole("link", { name: "DAY 2" });

    this.homeLink = page.getByRole("link", { name: `PULLUP PROGRAM` });
    this.dayHeading = page.getByRole("heading", { name: `${DAY_TWO.label}` });
    this.exerciseHeading = page.getByRole("heading", {
      name: `${DAY_TWO.heading2}`,
    });
    this.recoveryHeading = page.getByRole("heading", {
      name: `${DAY_TWO.heading3}`,
    });
    this.dailyHintButton = page.locator("button#hint-button");
    this.pyramid = page.getByRole("list");
    this.repsHeading = page.getByRole("heading", {
      name: /DO [1-9][0-9]? REPS?/,
    });
    this.missSetbutton = page.locator("button#miss-set-button");
    this.repsCompleteButton = page.locator("button#reps-complete-button");
    this.missedSetNumberContainer = page.locator(
      "div#pyramid-missed-set-number-container",
    );
    this.missRepNumberedButtons = page.getByRole("button", { name: /\d+/ });
    this.maxoutRepNumberContainer = page.locator(
      "div#pyramid-maxout-number-container",
    );
    this.maxoutNumberedButtons = page.getByRole("button", { name: /\d+/ });

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

  async goto(): Promise<void> {
    await this.page.goto(`${DAY_TWO.path}`);
  }

  async startUserFlow(): Promise<void> {
    await this.page.goto(`/`);
    await this.getStartedLink.click();
    await this.dayTwoLink.click();
  }

  async pressMissSetButton(): Promise<void> {
    await this.missSetbutton.click();
  }

  async pressCompleteSetButton(numberOfTimes?: number): Promise<void> {
    await this.repsCompleteButton.click({ clickCount: numberOfTimes || 1 });
  }

  async pressDailyHintButton(): Promise<void> {
    await this.dailyHintButton.click();
  }

  async closeHintModal(): Promise<void> {
    await this.dailyHintModalCloseButton.click();
  }

  async closeTimerModal(): Promise<void> {
    await this.timerModalCloseButton.click();
  }

  async pressNumberForMissedSet(repCount: number): Promise<void> {
    await this.page.locator(`button#miss-${repCount}`).click();
  }

  async pressNumberForMaxoutSet(repCount: number): Promise<void> {
    await this.page.locator(`button#maxout-${repCount}`).click();
  }
}
