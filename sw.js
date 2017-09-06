var CHACHE_NAME = 'nattitude-site-cache-v1'
var urlsToCache = [
  '/',
  '/styles.css',
  '/app.js',
  '/index.html'
]

self.addEventListener('install', (event) => {
  event.waitUntill(
    chaches.open(CHACHE_NAME)
    .then(function (chache) {
      console.log("opened chache");
      return chache.addAll(urlsToCache)
    })
  )
  console.log("[serviceWorker] Installed");
})

self.addEventListener('activate', (event) => {
  console.log("[serviceWorker] Activated");
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    chaches.match(event.request)
    .then(function(response) {
      if (response) {
        return response
      }
      return fetch(event.request);
    })
  )
  console.log("[serviceWorker] Afetching", event.request);
})
