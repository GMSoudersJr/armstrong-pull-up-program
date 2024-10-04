import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";

const dayOneLabel = DAYS.filter((day) => day.number === 1)[0].label;
const dayTwoLabel = DAYS.filter((day) => day.number === 2)[0].label;
const dayThreeLabel = DAYS.filter((day) => day.number === 3)[0].label;
const dayFourLabel = DAYS.filter((day) => day.number === 4)[0].label;
const DAY_FIVE = DAYS.filter((day) => day.number === 5)[0];

export class DayFivePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dayHeading: Locator;
  readonly heading2: Locator;
  readonly heading3: Locator;
  readonly hintButton: Locator;
  readonly dayOneButton: Locator;
  readonly dayTwoButton: Locator;
  readonly dayThreeButton: Locator;
  readonly dayFourButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: `PULLUP PROGRAM` });
    this.dayHeading = page.getByRole("heading", { name: `${DAY_FIVE.label}` });
    this.heading2 = page.getByRole("heading", {
      name: `${DAY_FIVE.heading2}`,
    });
    this.heading3 = page.getByRole("heading", {
      name: `${DAY_FIVE.heading3}`,
    });
    this.hintButton = page.locator("button#hint-button");
    this.dayOneButton = page.getByRole("button", { name: dayOneLabel });
    this.dayTwoButton = page.getByRole("button", { name: dayTwoLabel });
    this.dayThreeButton = page.getByRole("button", { name: dayThreeLabel });
    this.dayFourButton = page.getByRole("button", { name: dayFourLabel });
  }

  async goto() {
    await this.page.goto(`${DAY_FIVE.path}`);
  }
}
