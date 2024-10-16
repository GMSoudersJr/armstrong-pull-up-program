import type { Page } from "@playwright/test";
import type { Constructor } from "../mixins/definitions";
import { DAYS } from "@/const";

const dayOne = DAYS.filter((day) => day.number === 1)[0];
const dayTwo = DAYS.filter((day) => day.number === 2)[0];
const dayThree = DAYS.filter((day) => day.number === 3)[0];
const dayFour = DAYS.filter((day) => day.number === 4)[0];

export function CreateDayFivePOM<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class DayFivePOM extends Base {
    dayOneButton = this.page.getByRole("button", { name: dayOne.label });
    repeatDayOneExerciseHeading = this.page.getByRole("heading", {
      name: dayOne.heading2,
    });
    repeatDayOneRecoveryHeading = this.page.getByRole("heading", {
      name: dayOne.heading3,
    });
    dayTwoButton = this.page.getByRole("button", { name: dayTwo.label });
    repeatDayTwoExerciseHeading = this.page.getByRole("heading", {
      name: dayTwo.heading2,
    });
    repeatDayTwoRecoveryHeading = this.page.getByRole("heading", {
      name: dayTwo.heading3,
    });
    dayThreeButton = this.page.getByRole("button", { name: dayThree.label });
    repeatDayThreeExerciseHeading = this.page.getByRole("heading", {
      name: dayThree.heading2,
    });
    repeatDayThreeRecoveryHeading = this.page.getByRole("heading", {
      name: dayThree.heading3,
    });
    dayFourButton = this.page.getByRole("button", { name: dayFour.label });
    repeatDayFourExerciseHeading = this.page.getByRole("heading", {
      name: dayFour.heading2,
    });
    repeatDayFourRecoveryHeading = this.page.getByRole("heading", {
      name: dayFour.heading3,
    });

    async pressDay1Button() {
      await this.dayOneButton.click();
    }

    async pressDay2Button() {
      await this.dayTwoButton.click();
    }

    async pressDay3Button() {
      await this.dayThreeButton.click();
    }

    async pressDay4Button() {
      await this.dayFourButton.click();
    }
  };
}
