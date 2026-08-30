// NEXORA DR TEST — Offline Service Worker (V1.1)
const CACHE_NAME = 'nexora-dr-test-v1.1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/nexora-tokens.css',
  './css/base.css',
  './css/components.css',
  './css/exam.css',
  './css/results.css',
  './css/responsive.css',
  './js/app.js',
  './js/config.js',
  './js/exam-engine.js',
  './js/question-engine.js',
  './js/timer.js',
  './js/progress.js',
  './js/speech.js',
  './js/localization.js',
  './data/questions-en.js',
  './data/questions-ar.js',
  './data/top30-study-pack.js',
  './assets/brand/logo-primary.png',
  './assets/brand/logo.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First with Cache Fallback for instant update propagation
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (e.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
