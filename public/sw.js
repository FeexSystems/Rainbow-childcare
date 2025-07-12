const CACHE_NAME = "hillcrest-rs-v1";
const OFFLINE_PAGE = "/offline.html";

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  "/",
  "/dashboard",
  "/forum",
  "/messageboard",
  "/qr-pickup",
  "/offline.html",
  "/manifest.json",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install event");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Caching app shell");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate event");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[ServiceWorker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        // Claim all clients
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }

      return fetch(event.request).catch(() => {
        // If network fails and no cache, show offline page
        if (event.request.destination === "document") {
          return caches.match(OFFLINE_PAGE);
        }
      });
    }),
  );
});

// Push notification event
self.addEventListener("push", (event) => {
  console.log("[ServiceWorker] Push Received.");

  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body || "You have a new update from Hillcrest Rising Stars",
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      tag: data.tag || "notification",
      data: {
        url: data.url || "/",
        ...data.data,
      },
      actions: data.actions || [
        {
          action: "view",
          title: "View",
          icon: "/pwa-192x192.png",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || "Hillcrest Rising Stars",
        options,
      ),
    );
  }
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("[ServiceWorker] Notification click Received.");

  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === "close") {
    return;
  }

  // Open the app or navigate to specific page
  const urlToOpen = data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Check if the app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus().then(() => {
              return client.navigate(urlToOpen);
            });
          }
        }

        // If not open, open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});

// Background sync event (for future use)
self.addEventListener("sync", (event) => {
  console.log("[ServiceWorker] Background sync:", event.tag);

  if (event.tag === "background-sync") {
    // Handle background sync for offline actions
    event.waitUntil(
      // Implement background sync logic here
      Promise.resolve(),
    );
  }
});

// Periodic background sync (for future use)
self.addEventListener("periodicsync", (event) => {
  console.log("[ServiceWorker] Periodic background sync:", event.tag);

  if (event.tag === "daily-updates") {
    // Sync daily updates when device comes online
    event.waitUntil(
      // Implement periodic sync logic here
      Promise.resolve(),
    );
  }
});
