import type { Page } from "@playwright/test";
import { HINT_MODAL_HEADING } from "@/lib/hints";
import { Constructor } from "./definitions";

export function MixinHintModal<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class HintModal extends Base {
    dailyHintModal = this.page.locator("div#daily-hint-modal");
    dailyHintModalContent = this.page.locator("div#daily-hint-modal-content");
    dailyHintModalSVG = this.page.locator("div#daily-hint-modal-svg-container");
    dailyHintModalHeading = this.page.getByRole("heading", {
      name: HINT_MODAL_HEADING,
    });
    dailyHintModalCloseButton = this.page.locator(
      "button#daily-hint-modal-close-button",
    );
    dailyHintModalHintList = this.page.locator("ol#daily-hint-modal-list");

    async closeHintModal(): Promise<void> {
      await this.dailyHintModalCloseButton.click();
    }
  };
}
