const version = 1;
const CACHE  = `cache-${version}`;
const urlsToCache = [
  "/program",
];

self.addEventListener("install", (event) => {
  console.log("Service worker installed", event);
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    return cache.addAll(urlsToCache);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated", event);
  async function deleteOldCaches() {
    for(const key of await caches.keys()) {
      if(key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') return;
  async function respond () {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    try {
      const response = await fetch(event.request);
      const isNotExtension = url.protocol === 'http:';
      const isSuccess = response.status === 200;

      if(!(response instanceof Response)) {
        throw new Error('Invalid response from fetch');
      }

      if (isNotExtension && isSuccess) {
        await cache.put(event.request, response.clone());
      }

      return response;
    } catch (err) {
      const cachedResponse = await caches.match(url.pathname);
      if (cachedResponse) {
        console.log("There's a cached response");
        return cachedResponse
      }
      console.log(err);
    }
  }

  event.respondWith(respond());
})

self.addEventListener("message", (event) => {
  console.log("there's a message");
  if(event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
