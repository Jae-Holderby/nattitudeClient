var CACHE_NAME = 'nattitude-site-cache-v1'
var urlsToCache = [
  './',
  './styles.css',
  './app.js',
  './index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntill(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log("opened cache");
      return cache.addAll(urlsToCache)
    })
  )
  console.log("[serviceWorker] Installed");
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();

        caches.open(CACHE_NAME)
      .then (function(cache) {
        cache.put(event.request, responseToCache);
        });

        return response;
        }
      );
    })
  )
  console.log("[serviceWorker] Fetching", event.request);
})

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log("[serviceWorker] Activated");
});
