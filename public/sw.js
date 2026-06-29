const CACHE_NAME = 'bedtime-emergency-v2';
const ASSETS = [
  '/',
  '/favicon.svg',
  '/setup'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching UI Assets for Offline Emergency Mode');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        // Delete all old caches aggressively to fix the caching bug
        if (key !== CACHE_NAME) {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // NETWORK-FIRST STRATEGY: 
  // Always try network first to ensure fresh HTML and assets.
  // Fallback to cache ONLY if offline.
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) return response;
        
        // Fallback for API requests if offline
        if (event.request.url.includes('/api/story')) {
          return new Response(
            JSON.stringify({
              status: "ok",
              story: "The internet went to sleep, but you can still rest your eyes. Close them tight, and imagine a gentle river flowing down a quiet mountain.",
              lullaby: "Sleep now little one, the stars are bright, everything is quiet in the night."
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
      });
    })
  );
});

// Phase 5: Morning Wake-Up Companion
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: "Wake Up!", body: "Good morning! Ready for a new day?" };
  
  const options = {
    body: data.body,
    icon: '/favicon.svg',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: '/' }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Play a cached morning greeting (Mocked audio playback for alarm)
      console.log("[Morning Companion] Alarm triggered, playing high-energy greeting...");
      
      for (let client of windowClients) {
        if (client.url === '/' && 'focus' in client) {
          client.postMessage({ type: 'PLAY_MORNING_ALARM' });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/?alarm=true');
      }
    })
  );
});
