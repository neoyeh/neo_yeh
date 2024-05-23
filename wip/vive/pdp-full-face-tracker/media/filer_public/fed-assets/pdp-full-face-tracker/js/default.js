(()=>{"use strict";var e,t={311:e=>{e.exports=jQuery},39:(e,t,i)=>{var n=i(407),o=i(732),a=(i(229),i(358)),r=(i(9),i(201)),l=i(648);const c=JSON.parse('{"ih":"pdp-full-face-tracker-page"}');var d=i(311);(0,l.ScrollMagicPluginGsap)(r,a.p8),new r.Controller({loglevel:0}),new r.Controller({globalSceneOptions:{triggerHook:"onEnter"}}),new r.Controller({globalSceneOptions:{triggerHook:"onLeave"}});var s,v=new r.Controller({globalSceneOptions:{}}),u={mobileMaxResolution:function(){return 991},isRtl:function(){return d("body").hasClass("rtl")},isMobile:function(){return d(window).width()<=u.mobileMaxResolution()},forcePageReload:function(){d(window).width()<=u.mobileMaxResolution()&&window.location.reload(),d(window).width(),u.mobileMaxResolution()}},f={init:function(){var e=d(".video-scroll-play");e.length>0&&d.each(e,(function(e){var t=d(this);f.setupAnimationScrollMagic(t,e)}))},setupAnimationScrollMagic:function(e){var t,i,n,o="",a=""!==document.createElement("video").canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/,"");function l(e){var t=e;if(t){var i=t.play();void 0!==i&&i.then((function(e){t.pause()}))}}function c(e){var t=!u.isMobile();o=t?"desktop":"mobile";var i=e,n=d(e),r={poster:n.data("poster-path"),video:n.data("video-path"),webm:n.data("video-webm-path"),posterT:n.data("t-poster-path"),videoT:n.data("t-video-path"),webmT:n.data("t-video-webm-path")},l=n.find('source[type="video/webm"]'),c=n.find('source[type="video/mp4"]');l.length>0&&c.length>0&&(a?c.remove():l.remove()),n.attr("poster",t?r.poster:r.posterT),n.find(".webm").attr("src",t?r.webm:r.webmT),n.find(".mp4").attr("src",t?r.video:r.videoT);var s=i.load();void 0!==s&&s.then((function(e){i.pause()})).catch((function(e){}))}t=!1,i=!1,n=function(){return u.isMobile(),1*e.innerHeight()+.7*d(window).innerHeight()+1e3},new r.Scene({triggerElement:e[0],triggerHook:1,duration:n,offset:"-1000"}).on("enter",(function(){!1===t&&(t=!0,e.find("video").each((function(e,t){c(t)})))})).on("leave",(function(){i=!1,e.find("video").each((function(e,t){l(t)}))})).on("progress",(function(t){var o=Math.floor(1e5/n()),a=Math.floor(100*d(window).innerHeight()/n()/10),r=Math.floor(100*t.progress);r>=o+2.5*a&&!1===i?(i=!0,e.find("video").each((function(e,t){!function(e){var t=e;if(t){var i=t.play();void 0!==i&&i.then((function(e){t.play()}))}}(t)}))):r<o+2.5*a&&!0===i&&(i=!1,e.find("video").each((function(e,t){l(t)})))})).addTo(v),d(window).on("resize",(function(){u.isMobile()||"mobile"!==o?u.isMobile()&&"desktop"===o&&e.find("video").each((function(e,t){c(t)})):e.find("video").each((function(e,t){c(t)}))}))}},p={init:function(){var e=d(".click-toggle-active");e.length>0&&d.each(e,(function(e){var t=d(this);p.setupToggleActive(t,e)}))},setupToggleActive:function(e){var t=e.find(".btn-toggle"),i=e.find(".target-toggle-active");t.on("click",(function(){i.toggleClass("active"),t.toggleClass("active")}))}},g={init:function(){var e=d(".accessories-owl-content");e.length>0&&d.each(e,(function(e,t){var i=!u.isMobile(),n=d(t);g.setupCaruosel(n,i)}))},setupCaruosel:function(e,t){var i=t,n=e.siblings(".carousel-slide").find(".topics-slider"),o=n.length>0,a=0;function r(){u.isMobile()?i||(i=!0,n.attr("max",a),n.val(1),e.trigger("to.owl.carousel",0)):i&&(i=!1,n.attr("max",a))}var l=!1;"rtl"===d("html").attr("dir")&&(l=!0),e.owlCarousel({rtl:l,loop:!0,nav:!0,dots:!1,lazyLoad:!0,lazyLoadEager:1,navText:["<div data-event-category='accessory' data-event-action='click-arrow' data-event-label='arrow-prev-accessory-carousel' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>","<div data-event-category='accessory' data-event-action='click-arrow' data-event-label='arrow-next-accessory-carousel' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>"],responsive:{0:{items:1,autoWidth:!0},992:{items:2}},onInitialized:function(t){a=t.item.count,o&&(r(),n[0].oninput=function(){e.trigger("to.owl.carousel",this.value-1)});var i=e.find(".owl-item:not(.cloned) .js-slug-product");Array.from(i).forEach((function(i){var n=i.getAttribute("data-slug");if(n){var o=e.find(".owl-item.cloned .js-slug-product[data-slug=".concat(n,"]"));o.length>0&&new MutationObserver((function(){var e=i.innerHTML,n=i.querySelectorAll(".vive20-btn")[0];o.each((function(i,o){var a=o;a.innerHTML=e,a.querySelectorAll(".vive20-btn")[0].addEventListener("click",(function(){t.preventDefault(),n.click()}))}))})).observe(i,{childList:!0,subtree:!0,attributes:!0,characterData:!0})}}))},onTranslate:function(e){if(o){var t=e.item.index+1-e.relatedTarget._clones.length/2;t>e.item.count&&(t=1),0===t&&(t=e.item.count),n.val(t)}}}),o&&d(window).on("resize",(function(){o&&r()}))}},h=(s=new r.Controller({loglevel:0}),{playActive:[],init:function(){var e=d(".section-usecase");e.length>0&&d.each(e,(function(e){var t=d(this);h.setupfunction(t,e)}))},setupfunction:function(e,t){h.initVideo(e);var i=e.find(".video-list .video-item").eq(0),n=e.find(".video-area");h[t]={},h[t].playActive=0,h[t].playStop=u.isMobile(),h[t].forceStop=!1,d(window).on("resize",(function(){h[t].forceStop||(h[t].playStop=u.isMobile())})),i.addClass("active");var o=new r.Scene({triggerElement:n[0],duration:function(){return u.isMobile()?1.2*d(window).innerHeight():.8*d(window).innerHeight()}}).addTo(s).on("leave enter",(function(i){"enter"===i.type?h.autoPlay(e,"play",t):"leave"===i.type&&h.autoPlay(e,"pause",t)}));e.find(".video-list .video-item").each((function(i){var n=d(this).find("video")[0],a=d(this).find(".video-bg");null==n||n.addEventListener("ended",(function(){!1===h[t].playStop?setTimeout((function(){h.autoPlay(e,"finish",t)}),500):a.addClass("played")}),!1),d(this).find(".text-title").on("click",(function(n){h[t].playStop=!0,h[t].forceStop=!0,h.autoPlay(e,"click",t,i),null!==o&&(o.destroy(!0),o=null)})),a.find(".video-replay").on("click",(function(n){h.autoPlay(e,"click",t,i)}))}))},autoPlay:function(e,t,i,n){var o=h[i].playActive,a=e.find(".video-list .video-item").eq(o).find("video");switch(t){case"play":if(e.find(".video-bg").removeClass("played"),void 0!==a[0]){var r=a[0].play();void 0!==r&&r.then((function(e){a[0].play()}))}break;case"pause":void 0!==a[0]&&a[0].pause();break;case"finish":var l=o+2>e.find(".video-list .video-item").length?0:o+1;h[i].playActive=l,h.changeVideo(e,o,l,i);break;case"click":void 0!==a[0]&&(a[0].pause(),a[0]&&(a[0].currentTime=0)),h[i].playActive=n,h.changeVideo(e,o,n,i)}},changeVideo:function(e,t,i,n){var o=e.find(".video-list .video-item").eq(t),a=e.find(".video-list .video-item").eq(i);t!==i&&(o.removeClass("active"),a.addClass("active")),h.autoPlay(e,"play",n)},initVideo:function(e){var t=!1;new r.Scene({triggerElement:e[0],duration:function(){return u.isMobile()?2.8*d(window).innerHeight():2.4*d(window).innerHeight()},offset:-1*d(window).innerHeight()}).addTo(s).on("enter",(function(){!1===t&&(t=!0,e.find(".video-bg video").each((function(e,t){var i=t.play();void 0!==i&&i.then((function(e){t.pause()})).catch((function(e){}))})))}))}});d((function(){(function(){var e=d(document.querySelector("body")).attr("data-site");if(["us","uk","sg","nz","my-en","mea-en","in","hk","eu","ca","au"].indexOf(e)>=0){var t=document.querySelectorAll(".".concat(c.ih))[0];new n(t,{selector:".text-fix-widow"}).apply()}})(),new o({elements_selector:".lazy-img",threshold:1500}),f.init(),p.init(),g.init(),h.init()}))}},i={};function n(e){var o=i[e];if(void 0!==o)return o.exports;var a=i[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,i,o,a)=>{if(!i){var r=1/0;for(s=0;s<e.length;s++){for(var[i,o,a]=e[s],l=!0,c=0;c<i.length;c++)(!1&a||r>=a)&&Object.keys(n.O).every((e=>n.O[e](i[c])))?i.splice(c--,1):(l=!1,a<r&&(r=a));if(l){e.splice(s--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[i,o,a]},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={913:0};n.O.j=t=>0===e[t];var t=(t,i)=>{var o,a,[r,l,c]=i,d=0;if(r.some((t=>0!==e[t]))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(c)var s=c(n)}for(t&&t(i);d<r.length;d++)a=r[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},i=self.webpackChunkwp5=self.webpackChunkwp5||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var o=n.O(void 0,[736],(()=>n(39)));o=n.O(o)})();