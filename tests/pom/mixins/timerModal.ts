import type { Page } from "@playwright/test";
import { Constructor } from "./definitions";

export function MixinTimerModal<
  T extends Constructor<{
    page: Page;
  }>,
>(Base: T) {
  return class TimerModal extends Base {
    timerModal = this.page.locator("div#timer-modal");
    timerModalContent = this.page.locator("div#timer-modal-content");
    timerModalTimerContainer = this.page.locator(
      "div#timer-modal-heading-container",
    );
    timerModalHeading = this.page.getByRole("heading", {
      name: "Recovery",
      exact: true,
    });
    timerModalTimerMessage = this.page.getByRole("heading", {
      name: /Next set in [1-9][0-9]? second!?s?/,
    });
    timerModalCloseButton = this.page.getByRole("button", {
      name: "close timer",
    });

    async closeTimerModal(): Promise<void> {
      await this.timerModalCloseButton.click();
    }

    async waitForTimerModal(): Promise<void> {
      await this.timerModal.waitFor({ state: "hidden", timeout: 91 * 1_000 });
    }
  };
}
