'use strict'
const appCName='scootermaster_1.0.000'
const appCache=[
  // CONTACTS
  'assets/images/whatsapp.gif',
  'assets/images/mappin.gif',
  // TOUR
  // Golf Saudi
  'assets/tours/splash/scootermaster.jpg',
  // Hotel lobby
  'assets/tours/scootermaster/VR 000.jpg',
  'assets/tours/scootermaster/VR 001.jpg',
  // GIF
  'assets/images/node dot bouncing.gif',
  'assets/images/node fire.gif',
  'assets/images/node indicator down.gif',
  'assets/images/node sphere.gif',
  'assets/images/node target.gif',
  'assets/images/node.gif',
  // JPG
  'assets/images/background.jpg',
  'assets/images/node.jpg',
  'assets/images/og.jpg',
  'assets/images/white.jpg',
  // PNG
  'assets/images/cancel.png',
  'assets/images/closeDialog.png',
  'assets/images/closeDialog_pressed.png',
  'assets/images/favicon.png',
  'assets/images/welcome.png',
  // HTML
  'index.html',
  'offline.html',
  // CSS
  'assets/css/style.css',
  // JS
  'codes/fquery.js',
  'assets/js/CopyShader.js',
  'assets/js/EffectComposer.js',
  'assets/js/firebase.js',
  'assets/js/firebase-analytics.js',
  'assets/js/firebase-auth.js',
  'assets/js/firebase-database.js',
  'assets/js/GroundProjectedEnv.js',
  'assets/js/jquery-3.6.0.min.js',
  'assets/js/libgif.js',
  'assets/js/MaskPass.js',
  'assets/js/OrbitControls.js',
  'assets/js/Pass.js',
  'assets/js/RenderPass.js',
  'assets/js/RGBELoader.js',
  'assets/js/sha256.min.js',
  'assets/js/ShaderPass.js',
  'assets/js/three.module.js',
  'assets/js/tours.js',
  'assets/js/vplayer.js',
  'assets/js/vtmethods.js',
  'assets/js/vtquery.js',
]
this.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(appCName).then(function(cache){
      return cache.addAll(appCache)
    })
  )
})
this.addEventListener('activated',event=>{
  event.waitUntil(cleanupCache())
})
async function cleanupCache(){
  const keys=await caches.keys()
  const keysToDelete=keys.map(key=>{
    if(key!==appCName){
      return caches.delete(key)
    }
  })
  return Promise.all(keysToDelete)
}
this.addEventListener('fetch',event=>{
  if(event.request.mode==='navigate'||(event.request.method==='GET'&&event.request.headers.get('accept').includes('text/html'))){
      event.respondWith(
      fetch(event.request.url).catch(error=>{
        return caches.match('offline.html')
      })
    )
  }else{
    event.respondWith(caches.match(event.request).then(function(response){
      return response||fetch(event.request)
    }))
  }
})
