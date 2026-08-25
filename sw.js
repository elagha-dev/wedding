// Minimal service worker for /dash.html — exists only to satisfy PWA
// installability requirements (Android/Chrome checks for a registered
// service worker before offering "Add to Home Screen" / Install).
//
// It intentionally does NOT cache anything or intercept fetches yet —
// no offline support. All requests pass straight through to the network
// as if this file didn't exist.

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  self.clients.claim();
});
