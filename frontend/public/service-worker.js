/*
  service-worker.js
  Minimaler Service Worker fuer die "installierbare" PWA-Nutzung (Offline-Faehigkeit).
  Strategie:
    - Navigationsanfragen (HTML): network-first mit Fallback auf den Cache / index.html
      -> immer moeglichst aktuelle App, aber offline weiterhin ladbar.
    - Statische Assets (JS/CSS/Bilder, gehashte Dateinamen): cache-first mit Netzwerk-Fallback
      -> schnelles, offline-faehiges Laden. Neue Builds haben neue Dateinamen -> kein veralteter Code.
  skipWaiting + clients.claim sorgen dafuer, dass Updates sofort aktiv werden.
*/
const CACHE = "anamnesis-cache-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // nur eigene Assets behandeln

  // HTML / Navigation -> network-first
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Statische Assets -> cache-first
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached)
    )
  );
});
