!function(){function e(n,t,i){function o(a,l){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!l&&c)return c(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=t[a]={exports:{}};n[a][0].call(u.exports,function(e){return o(n[a][1][e]||e)},u,u.exports,e,n,t,i)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}return e}()({1:[function(e,n,t){"use strict";var i=function(e){return e&&e.__esModule?e:{default:e}}(e("./libs/typemate")),o={init:function(){var e=document.querySelectorAll(".section-full-wide")[0];new i.default(e,{selector:".w-row, .txt-headline, .font-blue2"}).apply()}},r={init:function(e){new YKU.Player("player",{styleid:"0",client_id:"2a8fda48fc709b73",vid:e,newPlayer:!1,autoplay:!0,show_related:!1,events:{onPlayEnd:function(){l.hideModal()},onPlayStart:function(){l.showModal(),l.setupCloseModalBtn()}}})}},a={init:function(e){function n(e){e.target.playVideo(),l.showModal(),l.setupCloseModalBtn()}function t(e){0===e.data&&l.hideModal()}var i;!function(){i=new YT.Player("player",{height:"390",width:"640",videoId:e,events:{onReady:n,onStateChange:t}})}()}},l={init:function(){var e=document.querySelectorAll(".wrap-vrs-video .box-video");e&&e.forEach(function(e){var n=e.querySelector(".play-modal-video-btn"),t=n.getAttribute("data-vtype"),i=n.getAttribute("data-vid");n.addEventListener("click",function(e){e.preventDefault(),"youtube"===t?a.init(i):(r.init(i),l.showModal(),l.setupCloseModalBtn())})})},setupCloseModalBtn:function(){document.querySelector(".modal-overlap-container .btn-close").addEventListener("click",function(e){e.preventDefault(),l.hideModal()})},showModal:function(){var e=document.querySelector(".modal-overlap-container"),n=document.getElementsByTagName("html")[0],t=document.body;e.classList.add("show"),n.classList.add("fixed"),t.classList.add("fixed")},hideModal:function(){var e=document.querySelector(".modal-overlap-container"),n=document.getElementsByTagName("html")[0],t=document.body;e.classList.remove("show"),n.classList.remove("fixed"),t.classList.remove("fixed"),document.querySelector(".modal-overlap-container .align-center").innerHTML="<div id='player'></div>"}},c={init:function(){if("undefined"!=typeof LazyLoad){new LazyLoad({elements_selector:".lazy-img",threshold:1024})}}},s=function(){var e={init:function(){var n=$(".image-comparison-block");n.length>0&&$.each(n,function(n,t){var i=$(this);e.sliderSetup(i)})},sliderSetup:function(n){var t=n.find(".cd-image-container"),i=n.find(".cd-handle"),o=t.find(".cd-resize-img"),r=o.find("img");t.length>0&&(t[0].addEventListener("mousemove",function(n){e.trackImageClipLocation(t,o,r,i,n)},!1),t[0].addEventListener("touchstart",function(n){e.trackImageClipLocation(t,o,r,i,n)},!1),t[0].addEventListener("touchmove",function(n){e.trackImageClipLocation(t,o,r,i,n)},!1),t.addClass("is-visible"))},trackImageClipLocation:function(e,n,t,i,o){var r=e[0].getBoundingClientRect(),a=(o.pageX-r.left)/e.outerWidth()*100;if((a=void 0!==o.changedTouches?(o.changedTouches[0].pageX-r.left)/e.outerWidth()*100:(o.pageX-r.left)/e.outerWidth()*100)<=100){$(window).innerWidth()<768?(a>85&&(a=85),a<15&&(a=15)):(a>95&&(a=95),a<5&&(a=5)),i.css({left:a+"%"}),n.width(a+"%"),t.css({width:100/a*100+"%",zIndex:3})}}};return e}();window.onload=function(){c.init(),$(".lazy-video-bg").Lazy(),l.init(),o.init(),s.init()}},{"./libs/typemate":2}],2:[function(e,n,t){"use strict";function i(e){return a(e)||r(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function a(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}function l(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function c(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function s(e,n,t){return n&&c(e.prototype,n),t&&c(e,t),e}var u=function(){function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};l(this,e);var o=this;o.settings=Object.assign({minWords:4,selector:"p",ignoreClass:"js-typemate__ignore",ignoreExistingSpaceChars:!1},t),o.elems=i(void 0===n?document.querySelectorAll(o.settings.selector):n.querySelectorAll(o.settings.selector))}return s(e,[{key:"apply",value:function(){var e=this;e.elems.map(function(n){if(n.classList.contains(e.settings.ignoreClass))return!1;if(e.shouldElementBeIgnored(n))return!1;var t="",i=n.innerHTML.trim().replace(/&nbsp;/g," ").split(/ (?=[^>]*(?:<|$))/);i.length<e.settings.minWords||(i=e.preventOrphans(i),t=i.join(" "),t=t.replace(/&nbsp; /g,"&nbsp;"),n.innerHTML=t)})}},{key:"preventOrphans",value:function(e){var n=e[e.length-2];if(e[e.length-2]=n+"&nbsp;",window.innerWidth>991.98){var t=e[e.length-3];e[e.length-3]=t+"&nbsp;"}return e}},{key:"reset",value:function(){var e=this;e.elems.map(function(n){if(e.shouldElementBeIgnored(n))return!1;n.innerHTML=n.innerHTML.replace(/&nbsp;/g," ")})}},{key:"shouldElementBeIgnored",value:function(e){var n=this;return!!(e.innerHTML.indexOf("&nbsp;")>-1&&n.settings.ignoreExistingSpaceChars)}}]),e}();n.exports=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new u(e,n)}},{}]},{},[1]);