(()=>{"use strict";var e,t={48:(e,t,o)=>{o(229);var n=o(732),i=(o(9),o(358)),a=o(201);(0,o(648).ScrollMagicPluginGsap)(a,i.p8);var r=new a.Controller({loglevel:0}),l=(new a.Controller({globalSceneOptions:{triggerHook:"onEnter"}}),new a.Controller({globalSceneOptions:{triggerHook:"onLeave"}}),new a.Controller({globalSceneOptions:{}})),c=function(){var e=null,t={canPlayWebM:function(){if(null===e){var t=document.createElement("video");e=""!==t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/,"")}return e},mobileMaxReserlution:function(){return 767.98},tabletMaxReserlution:function(){return 767.98},isRtl:function(){return!!$("body").hasClass("rtl")},isMobile:function(){return $(window).width()<=t.mobileMaxReserlution()},isTablet:function(){return $(window).width()<=t.tabletMaxReserlution()&&$(window).width()>t.mobileMaxReserlution()},isDesktop:function(){return $(window).width()>t.tabletMaxReserlution()},updateScrollPosition:function(e,o){var n=t.getScrollDurationPosition(e),i=n[0];n[1],o.offset(i)},updateScrollDurationPosition:function(e,o){var n=t.getScrollDurationPosition(e),i=n[0],a=n[1];o.offset(i),o.duration(a)},updateMobileScrollDurationPosition:function(e,o){var n=t.getMobileScrollDurationPosition(e),i=n[0],a=n[1];o.offset(i),o.duration(a)},getScrollDurationPosition:function(e){var t=0,o=0,n=5,i=5,a=e.outerHeight();return void 0!==e.data("top-trigger-percentage")&&(n=e.data("top-trigger-percentage"),t=parseInt(a*(n/100),10)),void 0!==e.data("bottom-trigger-percentage")&&(i=e.data("bottom-trigger-percentage"),o=a-parseInt(a*(i/100),10)-t),[t,o]},getMobileScrollDurationPosition:function(e){var t=0,o=0,n=5,i=5,a=e.outerHeight();return void 0!==e.data("m-top-trigger-percentage")&&(n=e.data("m-top-trigger-percentage"),t=parseInt(a*(n/100),10)),void 0!==e.data("m-bottom-trigger-percentage")&&(i=e.data("m-bottom-trigger-percentage"),o=a-parseInt(a*(i/100),10)-t),[t,o]}};return t}(),s=function(){var e={init:function(){$(".info-bar").length>0&&(e.setupSticky(),e.setupToggleMenu(),setTimeout((function(){e.setupScrollToTab()}),100))},switchSpecSelected:function(){setTimeout((function(){new a.Scene({triggerElement:".section-spec-wrapper",duration:$(".section-spec-wrapper").height()-1}).setClassToggle(".scroll-btn_spec","selected").addTo(l)}),1e3)},switchItemSelected:function(){setTimeout((function(){$(".scroll-btn").each((function(e,t){var o=$(this).data("scroll-to");new a.Scene({triggerElement:".tab-group_".concat(o),duration:$(".tab-group_".concat(o)).height()-1}).setClassToggle(".scroll-btn_".concat(o),"selected").addTo(l)}))}),1e3)},setupSticky:function(){new a.Scene({triggerElement:".info-bar",triggerHook:"onLeave"}).setPin(".info-bar",{spacerClass:"custome-id-pin-info-bar"}).addTo(r);var e=$(".info-bar"),t=$(window);$("body").hasClass("rtl")?t.scroll((function(o){"fixed"===e.css("position")?e.css({left:"auto",right:"".concat(t.scrollLeft(),"px")}):e.css({left:"auto",right:"0px"})})):t.scroll((function(o){"fixed"===e.css("position")?e.css({left:"".concat(-t.scrollLeft(),"px")}):e.css({left:"0px"})}))},setupScrollToTab:function(){$(".scroll-btn").on("click",(function(t){t.preventDefault();var o=$(this).data("scroll-to"),n=0;$(this).hasClass("trigger-animation"),void 0!==o&&(n=$("#".concat(o)).offset().top-$(".info-bar").height(),$("html, body").animate({scrollTop:n},500,(function(){})),$(".info-bar").find(".m-toggle-menu").text($(this).text()),e.toggleMenu())}))},setupToggleMenu:function(){$(".m-toggle-menu").on("click",(function(t){t.preventDefault(),e.toggleMenu()}))},toggleMenu:function(){$(".m-toggle-menu").toggleClass("active"),$(".scroll-btn-group").toggleClass("show")}};return e}(),u=function(){var e={init:function(){var t=$(".watch-video .modal-video");t.length>0&&$.each(t,(function(t,o){$(this);var n=$(this).find(".play-modal-video-btn"),i=n.data("vtype"),a=n.data("vid");n.on("click",(function(t){t.preventDefault(),"youtube"===i?b.init(a):(h.init(a),e.showModal(),e.setupCloseModalBtn())}))}))},setupCloseModalBtn:function(){$(".modal-overlap-container .btn-close").off("click").on("click",(function(t){t.preventDefault(),e.hideModal()}))},showModal:function(){$(".modal-overlap-container").addClass("show"),$("html, body").addClass("fixed")},hideModal:function(){$(".modal-overlap-container").removeClass("show"),$("html, body").removeClass("fixed"),$(".modal-overlap-container .align-center").html('<div id="player"></div>')}};return e}(),d=function(){var e=$(".vive-btn-dropdown");e.length>0&&(window.addEventListener("click",(function(t){e.each((function(){$(this)[0].contains(t.target)||$(this).find(".dropdown-menu.show").removeClass("show")}))})),$.each(e,(function(e,t){$(this);var o=$(this).find(".cta-button"),n=$(this).find(".dropdown-menu");o.on("click",(function(e){e.preventDefault(),n.toggleClass("show")}))})))},f={init:function(){var e=$(".section-full-wide .video-scroll-play");e.length>0&&$.each(e,(function(e){var t=$(this);f.setupAnimationScrollMagic(t,e)}))},setupAnimationScrollMagic:function(e){var t,o,n,i="",r=e.hasClass("video-scroll-play--once");function s(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.play()}))}}function u(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.pause()}))}}function d(e){var t=!c.isMobile();i=t?"desktop":"mobile";var o=e,n=$(e),a={poster:n.data("poster-path"),posterT:n.data("t-poster-path")};n.attr("poster",t?a.poster:a.posterT);var r=n.find('source[type="video/webm"]'),l=n.find('source[type="video/mp4"]');r.length>0&&l.length>0&&(c.canPlayWebM()?l.remove():r.remove());var s=o.load();void 0!==s&&s.then((function(e){o.pause()})).catch((function(e){}))}t=!1,o=!1,n=function(){return c.isMobile(),1*e.innerHeight()+.7*$(window).innerHeight()+1e3},new a.Scene({triggerElement:e[0],triggerHook:1,duration:n,offset:"-1000"}).on("enter",(function(){!1===t&&(t=!0,e.find("video").each((function(e,t){d(t)})))})).on("leave",(function(){r||(o=!1,e.find("video").each((function(e,t){u(t)})))})).on("progress",(function(t){var i=Math.floor(1e5/n()),a=Math.floor(100*$(window).innerHeight()/n()/10),l=Math.floor(100*t.progress);l>=i+2.5*a&&!1===o?(o=!0,e.find("video").each((function(t,o){e.hasClass("video-scroll-play--active")?(e.closest(".owl-item").hasClass("active")||c.isMobile())&&s(o):s(o)}))):l<i+2.5*a&&!0===o&&(r||(o=!1,e.find("video").each((function(t,o){e.hasClass("video-scroll-play--active")?(e.closest(".owl-item").hasClass("active")||c.isMobile())&&u(o):u(o)}))))})).addTo(l),$(window).on("resize",(function(){c.isMobile()||"mobile"!==i?c.isMobile()&&"desktop"===i&&e.find("video").each((function(e,t){d(t)})):e.find("video").each((function(e,t){d(t)}))})),r&&e.siblings(".replay").on("click",(function(t){t.preventDefault(),e.find("video").each((function(e,t){s(t)}))}))}},v={init:function(){var e=document.querySelectorAll(".section-feature");e.length>0&&e.forEach((function(e){v.setupColor(e)}))},setupColor:function(e){var t=!1;"rtl"===$("html").attr("dir")&&(t=!0),$(e).find(".owl-carousel").owlCarousel({rtl:t,center:!0,loop:!0,nav:!0,autoWidth:!0,dots:!0,navText:["<div aria-label='prev' data-event-category='htcu24pro' data-event-action='click-scroll-left' data-event-label='scrollleft-htcu24pro-design' data-event-gtm='event-tracking'><i class='fa fa-angle-left' aria-hidden='true'></i></div>","<div aria-label='next' data-event-category='htcu24pro' data-event-action='click-scroll-right' data-event-label='scrollright-htcu24pro-design' data-event-gtm='event-tracking'><i class='fa fa-angle-right' aria-hidden='true'></i></div>"]})}},p={init:function(){var e=document.querySelectorAll(".section-ai");e.length>0&&e.forEach((function(e){p.setupCarousel(e)}))},setupCarousel:function(e){var t=!1;"rtl"===$("html").attr("dir")&&(t=!0);var o=$(e).find(".ai-carousel-list");function n(){c.isMobile()?void 0!==o.data("owl.carousel")&&(o.data("owl.carousel").destroy(),o.removeClass("owl-carousel")):o.hasClass("owl-carousel")||(o.addClass("owl-carousel"),o.owlCarousel({rtl:t,loop:!1,nav:!0,autoWidth:!0,dots:!1,navText:["<div aria-label='prev' data-event-category='htcu24pro' data-event-action='click-scroll-left' data-event-label='scrollleft-htcu24pro-aiwithcamera' data-event-gtm='event-tracking'><i class='fa fa-angle-left' aria-hidden='true'></i></div>","<div aria-label='next' data-event-category='htcu24pro' data-event-action='click-scroll-right' data-event-label='scrollright-htcu24pro-aiwithcamera' data-event-gtm='event-tracking'><i class='fa fa-angle-right' aria-hidden='true'></i></div>"],onChanged:function(e){"position"===e.property.name&&$(e.currentTarget).find(".owl-item").each((function(t,o){var n=$(o).find("video")[0];e.item.index===t?function(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.play()}))}}(n):function(e){var t=e;if(t){var o=t.play();void 0!==o&&o.then((function(e){t.pause()}))}}(n)}))}}))}n(),$(window).on("resize",n)}},g={init:function(){var e=document.querySelectorAll(".section__short-spec");e.length>0&&e.forEach((function(e){g.setupCarousel(e)}))},setupCarousel:function(e){$(e).find(".color-btn-list .color-item").on("click",(function(t){t.preventDefault();var o=$(this).index(),n=$(this).attr("aria-label");$(this).addClass("active").siblings().removeClass("active"),$(e).find(".phone-image-block picture").eq(o).addClass("active").siblings().removeClass("active"),$(e).find(".color-name").text(n)}))}};$((function(){s.init(),u.init(),new n({elements_selector:".lazy-img",threshold:2e3}),d(),f.init(),v.init(),p.init(),g.init()}));var h={init:function(e){new YKU.Player("player",{styleid:"0",client_id:"2a8fda48fc709b73",vid:e,newPlayer:!1,autoplay:!0,show_related:!1,events:{onPlayEnd:function(){u.hideModal()},onPlayStart:function(){u.showModal(),u.setupCloseModalBtn()}}})},resetPlayerHeight:function(){"youku"===$(".player-container").data("vtype")&&$("#player").height($("picture").height())}},b={init:function(e){new YT.Player("player",{height:"390",width:"640",videoId:e,events:{onReady:function(e){e.target.playVideo(),u.showModal(),u.setupCloseModalBtn()},onStateChange:function(e){0===e.data&&u.hideModal()}}})}}}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var a=o[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,o,i,a)=>{if(!o){var r=1/0;for(u=0;u<e.length;u++){for(var[o,i,a]=e[u],l=!0,c=0;c<o.length;c++)(!1&a||r>=a)&&Object.keys(n.O).every((e=>n.O[e](o[c])))?o.splice(c--,1):(l=!1,a<r&&(r=a));if(l){e.splice(u--,1);var s=i();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,i,a]},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={913:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var i,a,[r,l,c]=o,s=0;if(r.some((t=>0!==e[t]))){for(i in l)n.o(l,i)&&(n.m[i]=l[i]);if(c)var u=c(n)}for(t&&t(o);s<r.length;s++)a=r[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},o=self.webpackChunkwp5=self.webpackChunkwp5||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var i=n.O(void 0,[736],(()=>n(48)));i=n.O(i)})();