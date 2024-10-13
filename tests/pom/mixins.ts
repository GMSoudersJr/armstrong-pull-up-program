import type { Page } from "@playwright/test";
import type { Constructor } from "./mixins/definitions";
import { MixinBaseWorkoutPage } from "./mixins/baseWorkoutPage";
import { MixinHintModal } from "./mixins/hintModal";
import { MixinTimerModal } from "./mixins/timerModal";

function CreateDayOnePage<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayOnePagePOM extends Base {
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

    async startUserFlow() {
      await this.page.goto(`/`);
      await this.getStartedLink.click();
      await this.dayOneLink.click();
    }
  };
}

export const DayOneWorkoutPage = CreateDayOnePage(
  MixinTimerModal(MixinHintModal(MixinBaseWorkoutPage())),
);
