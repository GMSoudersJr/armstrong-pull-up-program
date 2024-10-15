import type { Page } from "@playwright/test";
import { Constructor } from "./definitions";

export function CreateDayTwoPOM<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayTwoPOM extends Base {
    getStartedLink = this.page.getByRole("link", { name: "Get Started!" });
    dayTwoLink = this.page.getByRole("link", { name: "DAY 2" });

    pyramid = this.page.getByRole("list");
    repsHeading = this.page.getByRole("heading", {
      name: /DO [1-9][0-9]? REPS?/,
    });
    missSetbutton = this.page.locator("button#miss-set-button");
    repsCompleteButton = this.page.locator("button#reps-complete-button");
    missedSetNumberContainer = this.page.locator(
      "div#pyramid-missed-set-number-container",
    );
    missRepNumberedButtons = this.page.getByRole("button", { name: /\d+/ });
    maxoutRepNumberContainer = this.page.locator(
      "div#pyramid-maxout-number-container",
    );
    maxoutNumberedButtons = this.page.getByRole("button", { name: /\d+/ });

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

    async pressNumberForMissedSet(repCount: number): Promise<void> {
      await this.page.locator(`button#miss-${repCount}`).click();
    }

    async pressNumberForMaxoutSet(repCount: number): Promise<void> {
      await this.page.locator(`button#maxout-${repCount}`).click();
    }
  };
}
