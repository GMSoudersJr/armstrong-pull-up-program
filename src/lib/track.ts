declare global {
  interface Window {
    goatcounter?: {
      count: (vars: { path: string; title?: string; event?: boolean }) => void;
    };
  }
}

// TIER 2 UPGRADE POINT: to capture offline events, replace the direct count() call here
// with an enqueue-to-IndexedDB + Background Sync flush. All call sites stay the same.
export function track(name: string, extra?: { title?: string }): void {
  if (typeof window === "undefined") return;
  if (!window.goatcounter || typeof window.goatcounter.count !== "function")
    return;
  try {
    window.goatcounter.count({
      path: name,
      title: extra?.title ?? name,
      event: true,
    });
  } catch {
    // tracking failures are silently swallowed
  }
}
