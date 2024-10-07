import type { Locator, Page } from "@playwright/test";

export class CTimerModal {
  readonly page: Page;

  readonly timerModal: Locator;
  readonly timerModalContent: Locator;
  readonly timerModalTimerContainer: Locator;
  readonly timerModalHeading: Locator;
  readonly timerModalTimerMessage: Locator;
  readonly timerModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

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

  async closeTimerModal(): Promise<void> {
    await this.timerModalCloseButton.click();
  }

  async waitForTimerModal(): Promise<void> {
    await this.timerModal.waitFor({ state: "hidden", timeout: 91 * 1_000 });
  }
}
