!function(){function e(t,n,o){function i(a,c){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){return i(t[a][1][e]||e)},s,s.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}return e}()({1:[function(e,t,n){"use strict";function o(e){return c(e)||a(e)||r(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function a(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function c(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var u=function(e){return e&&e.__esModule?e:{default:e}}(e("./libs/typemate")),s={mobileMaxResolution:function(){return 767},isRtl:function(){return $("body").hasClass("rtl")},isMobile:function(){return $(window).width()<=s.mobileMaxResolution()},forcePageReload:function(){$(window).width()<=s.mobileMaxResolution()&&location.reload(),$(window).width(),s.mobileMaxResolution()},updateScrollDurationPosition:function(e,t){var n=s.getScrollDurationPosition(e),o=n[0],i=n[1];t.offset(o),t.duration(i)},getScrollDurationPosition:function(e){var t=0,n=0,o=5,i=5,r=e.outerHeight();return void 0!==e.data("top-trigger-percentage")&&(o=e.data("top-trigger-percentage")),t=parseInt(r*(o/100),10),void 0!==e.data("bottom-trigger-percentage")&&(i=e.data("bottom-trigger-percentage")),n=r-parseInt(r*(i/100),10)-t,[t,n]}},d={init:function(){var e=["us","uk","sg","nz","my-en","mea-en","in","hk","eu","ca","au"],t=$(document.querySelector("body")).attr("data-site");if(e.indexOf(t)>=0){var n=document.querySelectorAll(".halloween-20-page")[0];new u.default(n,{selector:".text-fix-widow"}).apply()}}},f={init:function(e){new YKU.Player("player",{styleid:"0",client_id:"2a8fda48fc709b73",vid:e,newPlayer:!1,autoplay:!0,show_related:!1,events:{onPlayEnd:function(){p.hideModal()},onPlayStart:function(){p.showModal(),p.setupCloseModalBtn()}}})}},m={init:function(e){function t(e){e.target.playVideo(),p.showModal(),p.setupCloseModalBtn()}function n(e){0===e.data&&p.hideModal()}var o;!function(){o=new YT.Player("player",{height:"390",width:"640",videoId:e,events:{onReady:t,onStateChange:n}})}()}},p={init:function(){var e=document.querySelectorAll(".section-trailer-video .box-video");e&&e.forEach(function(e){var t=e.querySelector(".play-modal-video-btn"),n=t.getAttribute("data-vtype"),o=t.getAttribute("data-vid");t.addEventListener("click",function(e){e.preventDefault(),"youtube"===n?m.init(o):(f.init(o),p.showModal(),p.setupCloseModalBtn())})})},setupCloseModalBtn:function(){document.querySelector(".modal-overlap-container .btn-close").addEventListener("click",function(e){e.preventDefault(),p.hideModal()})},showModal:function(){var e=document.querySelector(".modal-overlap-container"),t=document.getElementsByTagName("html")[0],n=document.body;e.classList.add("show"),t.classList.add("fixed"),n.classList.add("fixed")},hideModal:function(){var e=document.querySelector(".modal-overlap-container"),t=document.getElementsByTagName("html")[0],n=document.body;e.classList.remove("show"),t.classList.remove("fixed"),n.classList.remove("fixed"),document.querySelector(".modal-overlap-container .align-center").innerHTML="<div id='player'></div>"}},h={init:function(){if("undefined"!=typeof LazyLoad){new LazyLoad({elements_selector:".lazy-img",threshold:2e3})}}},y={init:function(){var e=$(".moment-block");e.length>0&&y.countdownFunc(e)},countdownFunc:function(e){var t=e.attr("data-time")?e.attr("data-time"):"2020-11-13",n=moment.utc(t,"YYYY-MM-DD H:mm"),o=n.format("X"),i=function(e){return e-moment.utc().format("X")-28800},r=setInterval(function(){e.addClass("active"),i(o)<1&&(e.remove(),clearInterval(r));var t=moment.duration(1e3*i(o),"milliseconds"),n=e.find(".moment-days"),a=e.find(".moment-hours"),c=e.find(".moment-minutes"),l=e.find(".moment-seconds");n.text(t.days()<10?"0".concat(t.days()):t.days()),a.text(t.hours()<10?"0".concat(t.hours()):t.hours()),c.text(t.minutes()<10?"0".concat(t.minutes()):t.minutes()),l.text(t.seconds()<10?"0".concat(t.seconds()):t.seconds())},1e3)}},g={init:function(){var e=$(".product--area");e.length>0&&e.each(function(){g.fixHeight(e),$(window).resize(function(){g.fixHeight(e)})})},fixHeight:function(e){if(e.find(".fix-height").css({height:"auto"}),!s.isMobile()){var t=o(e[0].querySelectorAll(".product-item")),n=Math.max.apply(Math,o(t.map(function(e){return $(e).find(".fix-height").innerHeight()})));e.find(".fix-height").css({height:"".concat(n,"px")})}}},v={init:function(){if(document.cookie.indexOf("dr-htc-locale-info")>0){var e=document.cookie.split("; ").find(function(e){return e.startsWith("dr-htc-locale-info")}).split("=")[1],t=unescape(e),n=t.indexOf('"storeLocale": "')+16,o=t.indexOf('"',n),i=t.slice(n,o);for(var r in local_price_list[i]){console.log(local_price_list[i][r].price);var a=$("div[data-slug=".concat(r,"]"));a.find(".price-origin").text(local_price_list[i][r].price),a.find(".price-copy").text(local_price_list[i][r].copy)}}else $(".price-origin").hide()}};window.onload=function(){p.init(),d.init(),h.init(),g.init(),v.init()},$(document).ready(function(){y.init()})},{"./libs/typemate":2}],2:[function(e,t,n){"use strict";function o(e){return c(e)||a(e)||r(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function a(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function c(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}var f=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};u(this,e);var i=this;i.settings=Object.assign({minWords:4,selector:"p",ignoreClass:"js-typemate__ignore",ignoreExistingSpaceChars:!1},n),i.elems=o(void 0===t?document.querySelectorAll(i.settings.selector):t.querySelectorAll(i.settings.selector))}return d(e,[{key:"apply",value:function(){var e=this;e.elems.map(function(t){if(t.classList.contains(e.settings.ignoreClass))return!1;if(e.shouldElementBeIgnored(t))return!1;var n="",o=t.innerHTML.trim().replace(/&nbsp;/g," ").split(/ (?=[^>]*(?:<|$))/);o.length<e.settings.minWords||(o=e.preventOrphans(o),n=o.join(" "),n=n.replace(/&nbsp; /g,"&nbsp;"),t.innerHTML=n)})}},{key:"preventOrphans",value:function(e){if(window.innerWidth>991.98){var t=e[e.length-2];e[e.length-2]=t+"&nbsp;"}else{var n=e[e.length-2];e[e.length-2]=n+"&nbsp;"}return e}},{key:"reset",value:function(){var e=this;e.elems.map(function(t){if(e.shouldElementBeIgnored(t))return!1;t.innerHTML=t.innerHTML.replace(/&nbsp;/g," ")})}},{key:"shouldElementBeIgnored",value:function(e){var t=this;return!!(e.innerHTML.indexOf("&nbsp;")>-1&&t.settings.ignoreExistingSpaceChars)}}]),e}();t.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new f(e,t)}},{}]},{},[1]);