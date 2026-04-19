import type { Page } from "@playwright/test";
import type { Constructor } from "../mixins/definitions";

export function CreateDayOnePOM<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayOnePOM extends Base {
    repInputLabel = this.page.getByRole("heading", { name: /SET [1-5] REPS/ });
    repInput = this.page.getByLabel(/SET [1-5] REPS/);
    dailyHintButton = this.page.locator("button#hint-button");
    decrementRepButton = this.page.locator("button#decrement-button");
    incrementRepButton = this.page.locator("button#increment-button");
    repsRemoveButton = this.page.locator("button#reps-remove-button");
    repsCompleteButton = this.page.locator("button#reps-complete-button");
    setsTable = this.page.getByRole("table");
    progressBar = this.page.getByRole("progressbar");

    getStartedLink = this.page.getByRole("link", { name: "Get Started!" });
    dayOneLink = this.page.getByRole("link", { name: "DAY 1" });

    async pressPlusIcon(numberOfTimes?: number): Promise<void> {
      for (let i = 0; i < (numberOfTimes || 1); i++) {
        await this.incrementRepButton.click();
      }
    }

    async pressMinusIcon(numberOfTimes?: number): Promise<void> {
      for (let i = 0; i < (numberOfTimes || 1); i++) {
        await this.decrementRepButton.click();
      }
    }

    async pressEraseSet(numberOfTimes?: number): Promise<void> {
      await this.repsRemoveButton.click({ clickCount: numberOfTimes || 1 });
    }

    async pressCompleteSetButton(numberOfTimes?: number): Promise<void> {
      await this.repsCompleteButton.click({ clickCount: numberOfTimes || 1 });
    }

    async startUserFlow() {
      await this.page.goto(`/`);
      await this.getStartedLink.click();
      await this.dayOneLink.click();
    }
  };
}
