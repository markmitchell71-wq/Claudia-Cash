const CACHE='cash-tracker-v15';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];

// Install the new build into a fresh cache, then WAIT.
// We no longer call skipWaiting() here — the app shows an update banner and
// takes over only when you tap "Reload now", so a new deploy can't yank the
// page out from under you mid-import.
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

// The app posts this when you tap "Reload now".
self.addEventListener('message',e=>{
  if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate',e=>e.waitUntil(
  caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;

  // Only handle our own files. Supabase and the CDN go straight to the
  // network, untouched — caching those risked serving you a stale copy of
  // your own synced budget, or handing back index.html when an API call
  // failed offline.
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin) return;

  e.respondWith(
    fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return resp;
    }).catch(()=>caches.match(e.request).then(r=>{
      if(r) return r;
      // Only fall back to the app shell for page loads, not for missing assets.
      if(e.request.mode==='navigate') return caches.match('./index.html');
      return Response.error();
    }))
  );
});
