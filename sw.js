importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');



// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting()
workbox.core.clientsClaim()


workbox.precaching.precacheAndRoute([],{

ignoreURLParametersMatching: [/.*/]

});


const cacheFirst = ({url,event}) => {
  let cdnSet = new Set();
  cdnSet.add('/media/icons/manifest/app-icon-144x144.png');
  cdnSet.add('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css');
  cdnSet.add('https://cdn.jsdelivr.net/npm/browser-image-compression@latest/dist/browser-image-compression.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js');
  cdnSet.add('//mozilla.github.io/pdf.js/build/pdf.js');
  
  return (cdnSet.has(url.href));
};


const cacheOnly = ({url,event}) => {

};


const staleWhileRevalidate = ({url,event}) => {
  
};

workbox.routing.registerRoute(cacheFirst,
  new workbox.strategies.CacheFirst());
