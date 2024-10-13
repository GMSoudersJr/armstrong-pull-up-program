import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";
import {
  DAY_COMPLETE_MESSAGES,
  CIRCLE_CHECK_BIG_ICON_MESSAGE,
} from "@/lib/strings/dayComplete";

export function MixinBaseWorkoutPage() {
  return class BaseWorkoutPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly dayLink: Locator;
    readonly homeLink: Locator;
    readonly dayHeading: Locator;
    readonly exerciseHeading: Locator;
    readonly recoveryHeading: Locator;
    readonly dailyHintButton: Locator;

    readonly dayCompleteArea: Locator;
    readonly thumbsUpIconWrapper: Locator;
    readonly dayCompleteTotalReps: Locator;
    readonly dayCompleteMessage: Locator;
    readonly dayCompleteSaveProgressMessage: Locator;
    readonly dayCompleteSaveButton: Locator;
    readonly dayCompleteGoBackLink: Locator;
    indexForDays: number;

    constructor(page: Page, dayNumber: number) {
      this.page = page;
      this.indexForDays = dayNumber - 1;
      this.getStartedLink = page.getByRole("link", { name: "Get Started!" });
      this.dayLink = page.getByRole("link", {
        name: `${DAYS[this.indexForDays].label}`,
      });
      this.homeLink = page.getByRole("link", { name: `PULLUP PROGRAM` });
      this.dayHeading = page.getByRole("heading", {
        name: `${DAYS[this.indexForDays].label}`,
      });
      this.exerciseHeading = page.getByRole("heading", {
        name: `${DAYS[this.indexForDays].heading2}`,
      });
      this.recoveryHeading = page.getByRole("heading", {
        name: `${DAYS[this.indexForDays].heading3}`,
      });
      this.dailyHintButton = page.locator("button#hint-button");

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
      await this.page.goto(`${DAYS[this.indexForDays].path}`);
    }

    async pressDailyHintButton(): Promise<void> {
      await this.dailyHintButton.click();
    }

    async pressGoBackLink(): Promise<void> {
      await this.dayCompleteGoBackLink.click({ force: true });
    }

    async saveTheWorkout(): Promise<void> {
      await this.dayCompleteSaveButton.click({ force: true });
    }
  };
}
