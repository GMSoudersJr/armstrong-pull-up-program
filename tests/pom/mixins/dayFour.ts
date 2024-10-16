import type { Page } from "@playwright/test";
import { Constructor } from "./definitions";

export function CreateDayFourPOM<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayFourPage extends Base {
    repInputLabel = this.page.getByRole("heading", {
      name: "TRAINING SET REPS",
    });
    repInput = this.page.getByLabel("TRAINING SET REPS");
    decrementRepButton = this.page.locator("button#decrement-button");
    incrementRepButton = this.page.locator("button#increment-button");
    repsCompleteButton = this.page.locator("button#reps-complete-button");
    submitButton = this.page.getByRole("button", { name: "Submit" });
    progressBar = this.page.getByRole("progressbar");
    remainingSetsHeading = this.page.getByRole("heading", {
      name: /\d+ MORE SETS? OF \d+/,
    });
    completedSetsHeading = this.page.getByRole("heading", {
      name: /COMPLETED \d+ SETS?/,
    });
    missSetButton = this.page.locator("button#miss-set-button");
    completeSetButton = this.page.locator("button#complete-set-button");
    missSetHeading1 = this.page.getByRole("heading", {
      name: "How many did you do?",
    });
    missSetHeading2 = this.page.getByRole("heading", { name: "Rep Count" });
    numberedMissRepButtons = this.page.getByRole("button", { name: /\d+/ });
    zeroMissedRepButton = this.page.getByRole("button", { name: "0" });

    getStartedLink = this.page.getByRole("link", { name: "Get Started!" });
    dayFourLink = this.page.getByRole("link", { name: "DAY 4" });

    async pressPlusIcon(numberOfTimes?: number): Promise<void> {
      await this.incrementRepButton.click({ clickCount: numberOfTimes || 1 });
    }

    async pressMinusIcon(numberOfTimes?: number): Promise<void> {
      await this.decrementRepButton.click({ clickCount: numberOfTimes || 1 });
    }

    async pressSubmitButton(): Promise<void> {
      await this.submitButton.click();
    }

    async pressCompleteSetButton(): Promise<void> {
      await this.completeSetButton.click();
    }

    async pressMissSetButton(): Promise<void> {
      await this.missSetButton.click();
    }

    async pressZeroRepsButton(): Promise<void> {
      await this.zeroMissedRepButton.click();
    }
  };
}
