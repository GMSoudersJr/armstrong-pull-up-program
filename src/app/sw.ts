import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const urlsToPrecache = [
  "/program",
  "/program/day-one",
  "/program/day-two",
  "/program/day-three",
  "/program/day-four",
  "/program/day-five",
] as const;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

self.addEventListener("install", (event) => {
  try {
    const requestPromises = Promise.all(
      urlsToPrecache.map((entry) => {
        return serwist.handleRequest({ request: new Request(entry), event });
      }),
    );

    event.waitUntil(requestPromises);
  } catch (error) {
    console.log("error caching pages", error);
  }
});

serwist.addEventListeners();
