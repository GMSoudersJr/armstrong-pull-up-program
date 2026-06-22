import type { Page } from "@playwright/test";

export type GcEvent = { path: string; title?: string; event?: boolean };

/**
 * Installs a GoatCounter spy before every page load and blocks the real count.js.
 *
 * Approach choice: GoatCounter's count.js sends events via an Image beacon
 * (new Image().src = endpoint + params) — not fetch/XHR — so network-level request
 * interception is fragile and browser-specific. Instead we:
 *   1. addInitScript: install window.goatcounter = { count: spy } before any app JS
 *      runs on every navigation.
 *   2. Route-intercept gc.zgo.at so the real count.js never loads and can't overwrite
 *      the stub.
 * Events are written to sessionStorage (not window.__gcEvents) so they survive the
 * same-origin client-side navigation that follows a link click: onClick fires before
 * the URL changes, the push to sessionStorage is synchronous, and sessionStorage
 * persists across all same-origin pages in the same browser context.
 *
 * Must be called before the first page.goto().
 */
export async function installGcSpy(page: Page): Promise<void> {
  // The function body must be self-contained (no closure references) because
  // Playwright serialises it with .toString() before injecting into the page.
  await page.addInitScript(() => {
    window.goatcounter = {
      count: (vars) => {
        const existing = JSON.parse(
          sessionStorage.getItem("__gcEvents") ?? "[]",
        ) as unknown[];
        existing.push(vars);
        sessionStorage.setItem("__gcEvents", JSON.stringify(existing));
      },
    };
  });

  await page.route("**/gc.zgo.at/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
}

/** Returns all GoatCounter events recorded so far in this browser context. */
export async function getEvents(page: Page): Promise<GcEvent[]> {
  const raw = await page.evaluate(
    () => sessionStorage.getItem("__gcEvents") ?? "[]",
  );
  return JSON.parse(raw) as GcEvent[];
}

/**
 * Returns how many times the named event path was recorded.
 * Pass as the callback to expect.poll() for events that fire after async effects.
 */
export async function getEventCount(page: Page, name: string): Promise<number> {
  const events = await getEvents(page);
  return events.filter((e) => e.path === name).length;
}
