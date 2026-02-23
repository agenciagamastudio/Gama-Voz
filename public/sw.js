// Service Worker para GAMA Calculadora
// Estratégia: Cache-first para assets estáticos, network-first para dados dinâmicos

const CACHE_VERSION = 'gama-v1';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/manifest.json'
];

// Install: Pré-cache assets estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      console.log('Service Worker: Cacheando assets estáticos');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Alguns assets não puderam ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('gama-') && !name.includes(CACHE_VERSION))
          .map(name => {
            console.log('Service Worker: Removendo cache antigo:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first para dados, cache-first para assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições de origem externa e algumas tipos
  if (url.origin !== self.location.origin) {
    return;
  }

  // API requests: network-first
  if (url.pathname.includes('/api') || url.pathname.includes('supabase')) {
    return event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            const cache = caches.open(CACHE_DYNAMIC);
            cache.then(c => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // Fallback para cache se offline
          return caches.match(request).then(response => {
            return response || new Response('Offline - dados não disponíveis', { status: 503 });
          });
        })
    );
  }

  // Assets estáticos (JS, CSS, imagens): cache-first
  if (
    request.method === 'GET' &&
    (request.destination === 'style' ||
     request.destination === 'script' ||
     request.destination === 'image' ||
     request.destination === 'font')
  ) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        return fetch(request)
          .then(response => {
            if (response.status === 200 && response.type !== 'basic') {
              const cache = caches.open(CACHE_STATIC);
              cache.then(c => c.put(request, response.clone()));
            }
            return response;
          })
          .catch(() => new Response('Asset não encontrado offline', { status: 404 }));
      })
    );
  }

  // Resto das requisições: network-first
  event.respondWith(
    fetch(request)
      .then(response => response)
      .catch(() => caches.match(request) || new Response('Offline', { status: 503 }))
  );
});

// Atualizar SW quando há mudanças
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
