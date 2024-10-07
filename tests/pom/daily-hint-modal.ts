import type { Locator, Page } from "@playwright/test";
import { HINT_MODAL_HEADING } from "@/lib/hints";

export class CDailyHintModal {
  readonly page: Page;
  readonly dailyHintModal: Locator;
  readonly dailyHintModalContent: Locator;
  readonly dailyHintModalSVG: Locator;
  readonly dailyHintModalCloseButton: Locator;
  readonly dailyHintModalHeading: Locator;
  readonly dailyHintModalHintList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dailyHintModal = page.locator("div#daily-hint-modal");
    this.dailyHintModalContent = page.locator("div#daily-hint-modal-content");
    this.dailyHintModalSVG = page.locator("div#daily-hint-modal-svg-container");
    this.dailyHintModalHeading = page.getByRole("heading", {
      name: HINT_MODAL_HEADING,
    });
    this.dailyHintModalCloseButton = page.locator(
      "button#daily-hint-modal-close-button",
    );
    this.dailyHintModalHintList = page.locator("ol#daily-hint-modal-list");
  }

  async closeHintModal(): Promise<void> {
    await this.dailyHintModalCloseButton.click();
  }
}
