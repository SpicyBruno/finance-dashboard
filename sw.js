// Service worker per la PWA "Finanze"
const CACHE = 'finanze-v3';

// Percorsi relativi alla posizione del service worker: cosi' il sito funziona
// sia servito dalla radice sia da una sottocartella.
const ROOT = new URL('./', self.location).pathname;
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './download (42).jpg',
  // Librerie: precaricate in locale, altrimenti offline l'app non parte
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './vendor/prop-types.min.js',
  './vendor/Recharts.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  // Le navigazioni: prova la rete, in offline ripiega sull'index in cache
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match(ROOT + 'index.html')));
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== location.origin) return;

  // Il codice dell'app cambia a ogni build: rete per prima, cache come rete di sicurezza.
  // Senza questo una nuova build resta invisibile finche' non si svuota la cache a mano.
  if (url.pathname === ROOT + 'app.js' || url.pathname === ROOT + 'index.html') {
    e.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return resp;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Tutto il resto (librerie con versione fissata, icone, font): cache-first
  e.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
        return resp;
      }).catch(() => cached)
    )
  );
});
