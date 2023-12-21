(()=>{"use strict";var e,t={39:(e,t,o)=>{var n=o(732),i=(o(229),o(358)),a=(o(9),o(201)),r=o(648),l=o(755);(0,r.ScrollMagicPluginGsap)(a,i.p8),new a.Controller({loglevel:0}),new a.Controller({globalSceneOptions:{triggerHook:"onEnter"}}),new a.Controller({globalSceneOptions:{triggerHook:"onLeave"}});var c,s,d,u=new a.Controller({globalSceneOptions:{}}),f={mobileMaxResolution:function(){return 991},isRtl:function(){return l("body").hasClass("rtl")},isMobile:function(){return l(window).width()<=f.mobileMaxResolution()},forcePageReload:function(){l(window).width()<=f.mobileMaxResolution()&&window.location.reload(),l(window).width(),f.mobileMaxResolution()}},v={init:function(){var e=l(".video-scroll-play");e.length>0&&l.each(e,(function(e){var t=l(this);v.setupAnimationScrollMagic(t,e)}))},setupAnimationScrollMagic:function(e){var t,o,n,i="";function r(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.pause()}))}}function c(e){var t=!f.isMobile();i=t?"desktop":"mobile";var o=e,n=l(e),a={poster:n.data("poster-path"),video:n.data("video-path"),posterT:n.data("t-poster-path"),videoT:n.data("t-video-path")};n.attr("poster",t?a.poster:a.posterT),n.find(".mp4").attr("src",t?a.video:a.videoT);var r=o.load();void 0!==r&&r.then((function(e){o.pause()})).catch((function(e){}))}t=!1,o=!1,n=function(){return f.isMobile(),1*e.innerHeight()+.7*l(window).innerHeight()+1e3},new a.Scene({triggerElement:e[0],triggerHook:1,duration:n,offset:"-1000"}).on("enter",(function(){!1===t&&(t=!0,e.find("video").each((function(e,t){c(t)})))})).on("leave",(function(){o=!1,e.find("video").each((function(e,t){r(t)}))})).on("progress",(function(t){var i=Math.floor(1e5/n()),a=Math.floor(100*l(window).innerHeight()/n()/10),c=Math.floor(100*t.progress);c>=i+2.5*a&&!1===o?(o=!0,e.find("video").each((function(e,t){!function(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.play()}))}}(t)}))):c<i+2.5*a&&!0===o&&(o=!1,e.find("video").each((function(e,t){r(t)})))})).addTo(u),l(window).on("resize",(function(){f.isMobile()||"mobile"!==i?f.isMobile()&&"desktop"===i&&e.find("video").each((function(e,t){c(t)})):e.find("video").each((function(e,t){c(t)}))}))}},p={init:function(){var e=l(".scroll-fade-in");e.length>0&&l.each(e,(function(e){var t=l(this);p.setupAnimationScrollMagic(t,e)}))},setupAnimationScrollMagic:function(e){console.log;var t=i.p8.timeline();t.from(e.find(".scroll-fade-in--1"),{opacity:0,translateY:100,duration:.8,ease:"power4.out"}).from(e.find(".scroll-fade-in--2"),{opacity:0,translateY:100,duration:.8,ease:"power4.out"},"-=0.5").from(e.find(".scroll-fade-in--3"),{opacity:0,translateY:100,duration:.8,ease:"power4.out"},"-=0.5"),new a.Scene({triggerElement:e[0],triggerHook:.75,reverse:!1}).setTween(t).addTo(u)}},h=c={init:function(){var e=l(".product-size-content");e.length>0&&l.each(e,(function(e,t){var o=l(t);c.setupCaruosel(o)}))},setupCaruosel:function(e){var t=e.find(".owl-carousel"),o=e.find(".carousel-list .carousel-item").map((function(e,t){return l(t).html()})).get();function n(e,t){e&&t&&(t.style.width="".concat(e.offsetWidth+80,"px"))}t.html(o[0]),t.owlCarousel({loop:!1,nav:!0,dots:!0,responsive:{0:{items:1,autoWidth:!0},992:{items:1}},onInitialized:function(e){n(e.currentTarget.querySelector(".owl-dots"),e.currentTarget.querySelector(".owl-nav"))},onResized:function(e){n(e.currentTarget.querySelector(".owl-dots"),e.currentTarget.querySelector(".owl-nav"))}}),e.find(".size-item").on("click",(function(i){if(i.preventDefault(),!l(i.currentTarget).hasClass("active")){var a=l(i.currentTarget),r=parseInt(a.attr("data-index"));t.trigger("replace.owl.carousel",o[r]).trigger("refresh.owl.carousel"),e.find(".size-item.active").removeClass("active"),a.addClass("active"),e.find(".color-item.active").removeClass("active"),e.find(".color-item").eq(0).addClass("active"),n(t.find(".owl-dots")[0],t.find(".owl-nav")[0])}})),e.find(".color-item").on("click",(function(o){if(o.preventDefault(),!l(o.currentTarget).hasClass("active")){var n=l(o.currentTarget),i=parseInt(n.attr("data-index"));t.find(".product-size-item").each((function(t,o){var a=l(o).find("[data-d-url]").eq(i).attr("data-d-url"),r=l(o).find("[data-m-url]").eq(i).attr("data-d-url");l(o).find(".s1920").attr("srcset",a),l(o).find(".s360").attr("srcset",r),e.find(".color-item.active").removeClass("active"),n.addClass("active")}))}}))}},m=s={init:function(){var e=l(".section-feature-carousel");e.length>0&&l.each(e,(function(e,t){var o=l(t);s.setupCaruosel(o)}))},setupCaruosel:function(e){var t=e.find(".owl-carousel");t.owlCarousel({loop:!1,nav:!0,dots:!1,responsive:{0:{items:1},992:{items:1}},onInitialized:function(e){},onTranslate:function(t){var o=t.item.index;e.find(".feature-carousel-item.active").removeClass("active"),e.find(".feature-carousel-item[data-index=".concat(o,"]")).addClass("active")}}),e.find(".feature-carousel-item").on("click",(function(o){if(o.preventDefault(),!l(o.currentTarget).hasClass("active")){e.find(".feature-carousel-item.active").removeClass("active");var n=parseInt(l(o.currentTarget).attr("data-index"));t.trigger("to.owl.carousel",n),l(o.currentTarget).addClass("active")}}))}},g=d={init:function(){console.log("test");var e=l(".section-application");e.length>0&&l.each(e,(function(e,t){var o=l(t);d.setupCaruosel(o)}))},setupCaruosel:function(e){e.find(".owl-carousel").owlCarousel({loop:!0,nav:!0,dots:!0,responsive:{0:{items:1,autoWidth:!0},992:{items:1,autoWidth:!0}},onInitialized:function(e){},onTranslate:function(e){}})}},w={init:function(){var e=document.querySelectorAll(".box-video");e&&e.forEach((function(e){var t=e.querySelector(".play-modal-video-btn"),o=t.getAttribute("data-vtype"),n=t.getAttribute("data-vid");t.addEventListener("click",(function(e){e.preventDefault(),"youtube"===o?b.init(n):(y.init(n),w.showModal(),w.setupCloseModalBtn())}))}))},setupCloseModalBtn:function(){var e=document.querySelector(".modal-overlap-container .btn-close"),t=document.querySelector(".modal-overlap-container .modal-overlap-bg");e.addEventListener("click",(function(e){e.preventDefault(),w.hideModal()})),t.addEventListener("click",(function(e){e.preventDefault(),w.hideModal()}))},showModal:function(){var e=document.querySelector(".modal-overlap-container"),t=document.getElementsByTagName("html")[0],o=document.body;e.classList.add("show"),t.classList.add("fixed"),o.classList.add("fixed")},hideModal:function(){var e=document.querySelector(".modal-overlap-container"),t=document.getElementsByTagName("html")[0],o=document.body;e.classList.remove("show"),t.classList.remove("fixed"),o.classList.remove("fixed"),document.querySelector(".modal-overlap-container .align-center").innerHTML="<div id='player'></div>"}},y={init:function(e){new YKU.Player("player",{styleid:"0",client_id:"2a8fda48fc709b73",vid:e,newPlayer:!1,autoplay:!0,show_related:!1,events:{onPlayEnd:function(){w.hideModal()},onPlayStart:function(){w.showModal(),w.setupCloseModalBtn()}}})}},b={init:function(e){new YT.Player("player",{height:"390",width:"640",videoId:e,events:{onReady:function(e){e.target.playVideo(),w.showModal(),w.setupCloseModalBtn()},onStateChange:function(e){0===e.data&&w.hideModal()}}})}};l((function(){new n({elements_selector:".lazy-img",threshold:1500}),h.init(),m.init(),g.init(),w.init(),v.init(),p.init(),document.getElementById("toTopBtn").addEventListener("click",(function(e){e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})}))}))}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var a=o[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,o,i,a)=>{if(!o){var r=1/0;for(d=0;d<e.length;d++){for(var[o,i,a]=e[d],l=!0,c=0;c<o.length;c++)(!1&a||r>=a)&&Object.keys(n.O).every((e=>n.O[e](o[c])))?o.splice(c--,1):(l=!1,a<r&&(r=a));if(l){e.splice(d--,1);var s=i();void 0!==s&&(t=s)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[o,i,a]},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={913:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var i,a,[r,l,c]=o,s=0;if(r.some((t=>0!==e[t]))){for(i in l)n.o(l,i)&&(n.m[i]=l[i]);if(c)var d=c(n)}for(t&&t(o);s<r.length;s++)a=r[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(d)},o=self.webpackChunkwp5=self.webpackChunkwp5||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var i=n.O(void 0,[736],(()=>n(39)));i=n.O(i)})();