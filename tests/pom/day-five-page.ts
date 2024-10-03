import type { Locator, Page } from "@playwright/test";
import { DAYS } from "@/const";

const dayOneId = DAYS.filter((day) => day.number === 1)[0].id;
const dayTwoId = DAYS.filter((day) => day.number === 2)[0].id;
const dayThreeId = DAYS.filter((day) => day.number === 3)[0].id;
const dayFourId = DAYS.filter((day) => day.number === 4)[0].id;
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
    this.homeLink = page.locator("a", { hasText: `PULLUP PROGRAM` });
    this.dayHeading = page.locator("h1", { hasText: `${DAY_FIVE.label}` });
    this.heading2 = page.locator("h2", {
      hasText: `${DAY_FIVE.heading2}`,
    });
    this.heading3 = page.locator("h3", {
      hasText: `${DAY_FIVE.heading3}`,
    });
    this.hintButton = page.locator("button#hint-button");
    this.dayOneButton = page.locator(`button#${dayOneId}`);
    this.dayTwoButton = page.locator(`button#${dayTwoId}`);
    this.dayThreeButton = page.locator(`button#${dayThreeId}`);
    this.dayFourButton = page.locator(`button#${dayFourId}`);
  }

  async goto() {
    await this.page.goto(`${DAY_FIVE.path}`);
  }
}
