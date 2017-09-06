var CACHE_NAME = 'v1'
var urlsToCache = [
  './',
  './style.css',
  './app.js',
  './index.html',
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css",
  'https://gentle-ridge-36425.herokuapp.com/'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log("opened cache");
      return cache.addAll(urlsToCache)
    })
  )
  console.log("[serviceWorker] Installed");
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log("[serviceWorker] Found in cache", event.request);
        return response
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();
          console.log(responseToCache);

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
