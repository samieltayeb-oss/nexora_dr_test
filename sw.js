// NEXORA DR TEST — Offline Service Worker Cache
const CACHE_NAME = 'nexora-dr-test-v1';
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
  './assets/brand/logo-primary.png',
  './assets/brand/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
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

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
