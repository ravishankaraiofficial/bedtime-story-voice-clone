const CACHE_NAME = 'bedtime-emergency-v1';
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
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached asset if offline, else fetch
      return response || fetch(event.request).catch(() => {
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
