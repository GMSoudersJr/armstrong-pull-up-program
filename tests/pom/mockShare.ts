import type { Page } from "@playwright/test";

/**
 * Forces the <a download> fallback path by making the Web Share API
 * unavailable, regardless of what the underlying browser engine actually
 * supports. Never let a test rely on the real navigator.share/canShare —
 * calling those for real in headless/automated Chromium risks hanging on
 * a native OS share surface that never resolves.
 */
export async function stubWebShareUnavailable(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(window.navigator, "canShare", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(window.navigator, "share", {
      value: undefined,
      configurable: true,
    });
  });
}

/**
 * Forces the Web Share branch, with navigator.share either resolving
 * ("share succeeded") or rejecting with a synthetic AbortError (user
 * cancelled the native share sheet) — the real API is never invoked.
 */
export async function stubWebShareAvailable(
  page: Page,
  options: { resolve: boolean },
) {
  await page.addInitScript((shouldResolve) => {
    Object.defineProperty(window.navigator, "canShare", {
      value: () => true,
      configurable: true,
    });
    Object.defineProperty(window.navigator, "share", {
      value: () =>
        shouldResolve
          ? Promise.resolve()
          : Promise.reject(
              Object.assign(new Error("cancelled"), { name: "AbortError" }),
            ),
      configurable: true,
    });
  }, options.resolve);
}

/**
 * Forces the Web Share branch, with navigator.share rejecting with a
 * genuine (non-Abort) error, to exercise the failure/error-message path.
 */
export async function stubWebShareFailure(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(window.navigator, "canShare", {
      value: () => true,
      configurable: true,
    });
    Object.defineProperty(window.navigator, "share", {
      value: () => Promise.reject(new Error("boom")),
      configurable: true,
    });
  });
}
