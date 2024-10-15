import type { Page } from "@playwright/test";
import { Constructor } from "./definitions";

export function CreateDayThreePOM<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayThreePOM extends Base {
    repInputLabel = this.page.getByRole("heading", {
      name: "TRAINING SET REPS",
    });
    repInput = this.page.getByLabel("TRAINING SET REPS");
    decrementRepButton = this.page.locator("button#decrement-button");
    incrementRepButton = this.page.locator("button#increment-button");
    repsCompleteButton = this.page.locator("button#reps-complete-button");
    submitButton = this.page.getByRole("button", { name: "Submit" });
    progressBar = this.page.getByRole("progressbar");
    selectGripHeading = this.page.getByRole("heading", { name: "SELECT GRIP" });
    listOfGripButtons = this.page.getByRole("list");
    wideGripButton = this.page.getByRole("button", { name: "WIDE" });
    pronatedGripButton = this.page.getByRole("button", { name: "PRONATED" });
    neutralGripButton = this.page.getByRole("button", { name: "NEUTRAL" });
    supinatedGripButton = this.page.getByRole("button", { name: "SUPINATED" });
    closeGripButton = this.page.getByRole("button", { name: "CLOSE" });
    currentPullupHeading = this.page.getByRole("heading", {
      name: /\d{1,3} \w+ PULL-UPS/,
    });
    chooseNextGripHeading = this.page.getByRole("heading", {
      name: "CHOOSE NEXT GRIP",
    });
    currentGripSetCount = this.page.getByRole("heading", {
      name: /\w+ SETS: [0-3]/,
    });
    missSetButton = this.page.locator("button#miss-set-button");
    completeSetButton = this.page.locator("button#complete-set-button");
    nextGripButton = this.page.locator("button#next-grip-button");

    getStartedLink = this.page.getByRole("link", { name: "Get Started!" });
    dayThreeLink = this.page.getByRole("link", { name: "DAY 3" });

    async startUserFlow(): Promise<void> {
      await this.page.goto(`/`);
      await this.getStartedLink.click();
      await this.dayThreeLink.click();
    }

    async pressPlusIcon(numberOfTimes?: number): Promise<void> {
      await this.incrementRepButton.click({ clickCount: numberOfTimes || 1 });
    }

    async pressMinusIcon(numberOfTimes?: number): Promise<void> {
      await this.decrementRepButton.click({ clickCount: numberOfTimes || 1 });
    }

    async pressSubmitButton(): Promise<void> {
      await this.submitButton.click();
    }

    async pressWideGripButton(): Promise<void> {
      await this.wideGripButton.click();
    }

    async pressPronatedGripButton(): Promise<void> {
      await this.pronatedGripButton.click();
    }

    async pressNeutralGripButton(): Promise<void> {
      await this.neutralGripButton.click();
    }

    async pressSupinatedGripButton(): Promise<void> {
      await this.supinatedGripButton.click();
    }

    async pressCloseGripButton(): Promise<void> {
      await this.closeGripButton.click();
    }

    async pressCompleteSetButton(): Promise<void> {
      await this.completeSetButton.click();
    }

    async pressMissSetButton(): Promise<void> {
      await this.missSetButton.click();
    }

    async pressNextGripButton(): Promise<void> {
      await this.nextGripButton.click();
    }
  };
}
