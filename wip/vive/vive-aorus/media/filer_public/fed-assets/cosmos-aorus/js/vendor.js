function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),r=function(e){var t,r,s=e.parentNode;"PICTURE"===s.nodeName.toUpperCase()?(t=n.cloneNode(),s.insertBefore(t,s.firstElementChild),setTimeout(function(){s.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},s=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},i=function(){clearTimeout(t),t=setTimeout(s,99)},a=e.matchMedia&&matchMedia("(orientation: landscape)"),c=function(){i(),a&&a.addListener&&a.addListener(i)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?c():document.addEventListener("DOMContentLoaded",c),i}())}(window),function(e,t,n){"use strict";function r(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}function s(){D=!1,$=e.devicePixelRatio,O={},U={},g.DPR=$||1,B.width=Math.max(e.innerWidth||0,E.clientWidth),B.height=Math.max(e.innerHeight||0,E.clientHeight),B.vw=B.width/100,B.vh=B.height/100,h=[B.height,B.width,$].join("-"),B.em=g.getEmValue(),B.rem=B.em}function i(e,t,n,r){var s,i,a,c;return"saveData"===x.algorithm?e>2.7?c=n+1:(i=t-n,s=Math.pow(e-.6,1.5),a=i*s,r&&(a+=.1*s),c=e+a):c=n>1?Math.sqrt(e*t):e,c>n}function a(e){var t,n=g.getSet(e),r=!1;"pending"!==n&&(r=h,n&&(t=g.setRes(n),g.applySetCandidate(t,e))),e[g.ns].evaled=r}function c(e,t){return e.res-t.res}function o(e,t,n){var r;return!n&&t&&(n=e[g.ns].sets,n=n&&n[n.length-1]),r=u(t,n),r&&(t=g.makeUrl(t),e[g.ns].curSrc=t,e[g.ns].curCan=r,r.res||X(r,r.set.sizes)),r}function u(e,t){var n,r,s;if(e&&t)for(s=g.parseSet(t),e=g.makeUrl(e),n=0;n<s.length;n++)if(e===g.makeUrl(s[n].url)){r=s[n];break}return r}function l(e,t){var n,r,s,i,a=e.getElementsByTagName("source");for(n=0,r=a.length;r>n;n++)s=a[n],s[g.ns]=!0,(i=s.getAttribute("srcset"))&&t.push({srcset:i,media:s.getAttribute("media"),type:s.getAttribute("type"),sizes:s.getAttribute("sizes")})}function f(e,t){function n(t){var n,r=t.exec(e.substring(f));return r?(n=r[0],f+=n.length,n):void 0}function s(){var e,n,r,s,c,o,u,l,f,p=!1,m={};for(s=0;s<a.length;s++)c=a[s],o=c[c.length-1],u=c.substring(0,c.length-1),l=parseInt(u,10),f=parseFloat(u),j.test(u)&&"w"===o?((e||n)&&(p=!0),0===l?p=!0:e=l):q.test(u)&&"x"===o?((e||n||r)&&(p=!0),0>f?p=!0:n=f):j.test(u)&&"h"===o?((r||n)&&(p=!0),0===l?p=!0:r=l):p=!0;p||(m.url=i,e&&(m.w=e),n&&(m.d=n),r&&(m.h=r),r||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,d.push(m))}for(var i,a,c,o,u,l=e.length,f=0,d=[];;){if(n(Q),f>=l)return d;i=n(F),a=[],","===i.slice(-1)?(i=i.replace(H,""),s()):function(){for(n(W),c="",o="in descriptor";;){if(u=e.charAt(f),"in descriptor"===o)if(r(u))c&&(a.push(c),c="",o="after descriptor");else{if(","===u)return f+=1,c&&a.push(c),void s();if("("===u)c+=u,o="in parens";else{if(""===u)return c&&a.push(c),void s();c+=u}}else if("in parens"===o)if(")"===u)c+=u,o="in descriptor";else{if(""===u)return a.push(c),void s();c+=u}else if("after descriptor"===o)if(r(u));else{if(""===u)return void s();o="in descriptor",f-=1}f+=1}}()}}function d(e){var t,n,s,i,a,c,o=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(n=function(e){function t(){i&&(a.push(i),i="")}function n(){a[0]&&(c.push(a),a=[])}for(var s,i="",a=[],c=[],o=0,u=0,l=!1;;){if(""===(s=e.charAt(u)))return t(),n(),c;if(l){if("*"===s&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(r(s)){if(e.charAt(u-1)&&r(e.charAt(u-1))||!i){u+=1;continue}if(0===o){t(),u+=1;continue}s=" "}else if("("===s)o+=1;else if(")"===s)o-=1;else{if(","===s){t(),n(),u+=1;continue}if("/"===s&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}i+=s,u+=1}}}(e),s=n.length,t=0;s>t;t++)if(i=n[t],a=i[i.length-1],function(e){return!!(o.test(e)&&parseFloat(e)>=0)||(!!u.test(e)||("0"===e||"-0"===e||"+0"===e))}(a)){if(c=a,i.pop(),0===i.length)return c;if(i=i.join(" "),g.matchesMedia(i))return c}return"100vw"}t.createElement("picture");var p,m,h,g={},A=!1,v=function(){},_=t.createElement("img"),b=_.getAttribute,y=_.setAttribute,w=_.removeAttribute,E=t.documentElement,S={},x={algorithm:""},z="data-pfsrc",C=z+"set",L=navigator.userAgent,T=/rident/.test(L)||/ecko/.test(L)&&L.match(/rv\:(\d+)/)&&RegExp.$1>35,I="currentSrc",R=/\s+\+?\d+(e\d+)?w/,k=/(\([^)]+\))?\s*(.+)/,M=e.picturefillCFG,P="font-size:100%!important;",D=!0,O={},U={},$=e.devicePixelRatio,B={px:1,in:96},N=t.createElement("a"),G=!1,W=/^[ \t\n\r\u000c]+/,Q=/^[, \t\n\r\u000c]+/,F=/^[^ \t\n\r\u000c]+/,H=/[,]+$/,j=/^\d+$/,q=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,V=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},K=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},J=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=K(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,r){var s;if(!(t in O))if(O[t]=!1,r&&(s=t.match(e)))O[t]=s[1]*B[s[2]];else try{O[t]=new Function("e",n(t))(B)}catch(e){}return O[t]}}(),X=function(e,t){return e.w?(e.cWidth=g.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},Y=function(e){if(A){var n,r,s,i=e||{};if(i.elements&&1===i.elements.nodeType&&("IMG"===i.elements.nodeName.toUpperCase()?i.elements=[i.elements]:(i.context=i.elements,i.elements=null)),n=i.elements||g.qsa(i.context||t,i.reevaluate||i.reselect?g.sel:g.selShort),s=n.length){for(g.setupRun(i),G=!0,r=0;s>r;r++)g.fillImg(n[r],i);g.teardownRun(i)}}};e.console&&console.warn,I in _||(I="src"),S["image/jpeg"]=!0,S["image/gif"]=!0,S["image/png"]=!0,S["image/svg+xml"]=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.ns=("pf"+(new Date).getTime()).substr(0,9),g.supSrcset="srcset"in _,g.supSizes="sizes"in _,g.supPicture=!!e.HTMLPictureElement,g.supSrcset&&g.supPicture&&!g.supSizes&&function(e){_.srcset="data:,a",e.src="data:,a",g.supSrcset=_.complete===e.complete,g.supPicture=g.supSrcset&&g.supPicture}(t.createElement("img")),g.supSrcset&&!g.supSizes?function(){var e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",n=t.createElement("img"),r=function(){2===n.width&&(g.supSizes=!0),m=g.supSrcset&&!g.supSizes,A=!0,setTimeout(Y)};n.onload=r,n.onerror=r,n.setAttribute("sizes","9px"),n.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",n.src=e}():A=!0,g.selShort="picture>img,img[srcset]",g.sel=g.selShort,g.cfg=x,g.DPR=$||1,g.u=B,g.types=S,g.setSize=v,g.makeUrl=K(function(e){return N.href=e,N.href}),g.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},g.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?g.matchesMedia=function(e){return!e||matchMedia(e).matches}:g.matchesMedia=g.mMQ,g.matchesMedia.apply(this,arguments)},g.mMQ=function(e){return!e||J(e)},g.calcLength=function(e){var t=J(e,!0)||!1;return 0>t&&(t=!1),t},g.supportsType=function(e){return!e||S[e]},g.parseSize=K(function(e){var t=(e||"").match(k);return{media:t&&t[1],length:t&&t[2]}}),g.parseSet=function(e){return e.cands||(e.cands=f(e.srcset,e)),e.cands},g.getEmValue=function(){var e;if(!p&&(e=t.body)){var n=t.createElement("div"),r=E.style.cssText,s=e.style.cssText;n.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",E.style.cssText=P,e.style.cssText=P,e.appendChild(n),p=n.offsetWidth,e.removeChild(n),p=parseFloat(p,10),E.style.cssText=r,e.style.cssText=s}return p||16},g.calcListLength=function(e){if(!(e in U)||x.uT){var t=g.calcLength(d(e));U[e]=t||B.width}return U[e]},g.setRes=function(e){var t;if(e){t=g.parseSet(e);for(var n=0,r=t.length;r>n;n++)X(t[n],e.sizes)}return t},g.setRes.res=X,g.applySetCandidate=function(e,t){if(e.length){var n,r,s,a,u,l,f,d,p,m=t[g.ns],h=g.DPR;if(l=m.curSrc||t[I],f=m.curCan||o(t,l,e[0].set),f&&f.set===e[0].set&&((p=T&&!t.complete&&f.res-.1>h)||(f.cached=!0,f.res>=h&&(u=f))),!u)for(e.sort(c),a=e.length,u=e[a-1],r=0;a>r;r++)if(n=e[r],n.res>=h){s=r-1,u=e[s]&&(p||l!==g.makeUrl(n.url))&&i(e[s].res,n.res,h,e[s].cached)?e[s]:n;break}u&&(d=g.makeUrl(u.url),m.curSrc=d,m.curCan=u,d!==l&&g.setSrc(t,u),g.setSize(t))}},g.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},g.getSet=function(e){var t,n,r,s=!1,i=e[g.ns].sets;for(t=0;t<i.length&&!s;t++)if(n=i[t],n.srcset&&g.matchesMedia(n.media)&&(r=g.supportsType(n.type))){"pending"===r&&(n=r),s=n;break}return s},g.parseSets=function(e,t,r){var s,i,a,c,o=t&&"PICTURE"===t.nodeName.toUpperCase(),f=e[g.ns];(f.src===n||r.src)&&(f.src=b.call(e,"src"),f.src?y.call(e,z,f.src):w.call(e,z)),(f.srcset===n||r.srcset||!g.supSrcset||e.srcset)&&(s=b.call(e,"srcset"),f.srcset=s,c=!0),f.sets=[],o&&(f.pic=!0,l(t,f.sets)),f.srcset?(i={srcset:f.srcset,sizes:b.call(e,"sizes")},f.sets.push(i),(a=(m||f.src)&&R.test(f.srcset||""))||!f.src||u(f.src,i)||i.has1x||(i.srcset+=", "+f.src,i.cands.push({url:f.src,d:1,set:i}))):f.src&&f.sets.push({srcset:f.src,sizes:null}),f.curCan=null,f.curSrc=n,f.supported=!(o||i&&!g.supSrcset||a&&!g.supSizes),c&&g.supSrcset&&!f.supported&&(s?(y.call(e,C,s),e.srcset=""):w.call(e,C)),f.supported&&!f.srcset&&(!f.src&&e.src||e.src!==g.makeUrl(f.src))&&(null===f.src?e.removeAttribute("src"):e.src=f.src),f.parsed=!0},g.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[g.ns]||(e[g.ns]={}),n=e[g.ns],(r||n.evaled!==h)&&((!n.parsed||t.reevaluate)&&g.parseSets(e,e.parentNode,t),n.supported?n.evaled=h:a(e))},g.setupRun=function(){(!G||D||$!==e.devicePixelRatio)&&s()},g.supPicture?(Y=v,g.fillImg=v):function(){var n,r=e.attachEvent?/d$|^c/:/d$|^c|^i/,s=function(){var e=t.readyState||"";i=setTimeout(s,"loading"===e?200:999),t.body&&(g.fillImgs(),(n=n||r.test(e))&&clearTimeout(i))},i=setTimeout(s,t.body?9:99),a=E.clientHeight,c=function(){D=Math.max(e.innerWidth||0,E.clientWidth)!==B.width||E.clientHeight!==a,a=E.clientHeight,D&&g.fillImgs()};V(e,"resize",function(e,t){var n,r,s=function(){var i=new Date-r;t>i?n=setTimeout(s,t-i):(n=null,e())};return function(){r=new Date,n||(n=setTimeout(s,t))}}(c,99)),V(t,"readystatechange",s)}(),g.picturefill=Y,g.fillImgs=Y,g.teardownRun=v,Y._=g,e.picturefillCFG={pf:g,push:function(e){var t=e.shift();"function"==typeof g[t]?g[t].apply(g,e):(x[t]=e[0],G&&g.fillImgs({reselect:!0}))}};for(;M&&M.length;)e.picturefillCFG.push(M.shift());e.picturefill=Y,"object"==typeof module&&"object"==typeof module.exports?module.exports=Y:"function"==typeof define&&define.amd&&define("picturefill",function(){return Y}),g.supPicture||(S["image/webp"]=function(t,n){var r=new e.Image;return r.onerror=function(){S[t]=!1,Y()},r.onload=function(){S[t]=1===r.width,Y()},r.src=n,"pending"}("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document),function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.LazyLoad=t()}(this,function(){"use strict";var e="undefined"!=typeof window,t=e&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=e&&"IntersectionObserver"in window,r=e&&"classList"in document.createElement("p"),s={elements_selector:"img",container:t||e?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1},i=function(e,t){var n,r=new e(t);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:r}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:r})}window.dispatchEvent(n)},a=function(e,t){return e.getAttribute("data-"+t)},c=function(e,t,n){var r="data-"+t;null!==n?e.setAttribute(r,n):e.removeAttribute(r)},o=function(e){return"true"===a(e,"was-processed")},u=function(e,t){return c(e,"ll-timeout",t)},l=function(e){return a(e,"ll-timeout")},f=function(e,t){e&&e(t)},d=function(e,t){e._loadingCount+=t,0===e._elements.length&&0===e._loadingCount&&f(e._settings.callback_finish)},p=function(e){for(var t,n=[],r=0;t=e.children[r];r+=1)"SOURCE"===t.tagName&&n.push(t);return n},m=function(e,t,n){n&&e.setAttribute(t,n)},h=function(e,t){m(e,"sizes",a(e,t.data_sizes)),m(e,"srcset",a(e,t.data_srcset)),m(e,"src",a(e,t.data_src))},g={IMG:function(e,t){var n=e.parentNode;n&&"PICTURE"===n.tagName&&p(n).forEach(function(e){h(e,t)}),h(e,t)},IFRAME:function(e,t){m(e,"src",a(e,t.data_src))},VIDEO:function(e,t){p(e).forEach(function(e){m(e,"src",a(e,t.data_src))}),m(e,"src",a(e,t.data_src)),e.load()}},A=function(e,t){var n,r,s=t._settings,i=e.tagName,c=g[i];if(c)return c(e,s),d(t,1),void(t._elements=(n=t._elements,r=e,n.filter(function(e){return e!==r})));!function(e,t){var n=a(e,t.data_src),r=a(e,t.data_bg);n&&(e.style.backgroundImage='url("'.concat(n,'")')),r&&(e.style.backgroundImage=r)}(e,s)},v=function(e,t){r?e.classList.add(t):e.className+=(e.className?" ":"")+t},_=function(e,t,n){e.addEventListener(t,n)},b=function(e,t,n){e.removeEventListener(t,n)},y=function(e,t,n){b(e,"load",t),b(e,"loadeddata",t),b(e,"error",n)},w=function(e,t,n){var s=n._settings,i=t?s.class_loaded:s.class_error,a=t?s.callback_loaded:s.callback_error,c=e.target;!function(e,t){r?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(c,s.class_loading),v(c,i),f(a,c),d(n,-1)},E=function(e,t){var n=function n(s){w(s,!0,t),y(e,n,r)},r=function r(s){w(s,!1,t),y(e,n,r)};!function(e,t,n){_(e,"load",t),_(e,"loadeddata",t),_(e,"error",n)}(e,n,r)},S=["IMG","IFRAME","VIDEO"],x=function(e,t){var n=t._observer;L(e,t),n&&t._settings.auto_unobserve&&n.unobserve(e)},z=function(e){var t=l(e);t&&(clearTimeout(t),u(e,null))},C=function(e,t){var n=t._settings.load_delay,r=l(e);r||(r=setTimeout(function(){x(e,t),z(e)},n),u(e,r))},L=function(e,t,n){var r=t._settings;!n&&o(e)||(S.indexOf(e.tagName)>-1&&(E(e,t),v(e,r.class_loading)),A(e,t),function(e){c(e,"was-processed","true")}(e),f(r.callback_reveal,e),f(r.callback_set,e))},T=function(e){return!!n&&(e._observer=new IntersectionObserver(function(t){t.forEach(function(t){return function(e){return e.isIntersecting||e.intersectionRatio>0}(t)?function(e,t){var n=t._settings;f(n.callback_enter,e),n.load_delay?C(e,t):x(e,t)}(t.target,e):function(e,t){var n=t._settings;f(n.callback_exit,e),n.load_delay&&z(e)}(t.target,e)})},{root:(t=e._settings).container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}),!0);var t},I=["IMG","IFRAME"],R=function(e,t){return function(e){return e.filter(function(e){return!o(e)})}((n=e||function(e){return e.container.querySelectorAll(e.elements_selector)}(t),Array.prototype.slice.call(n)));var n},k=function(e,t){this._settings=function(e){return _extends({},s,e)}(e),this._loadingCount=0,T(this),this.update(t)};return k.prototype={update:function(e){var n,r=this,s=this._settings;this._elements=R(e,s),!t&&this._observer?(function(e){return e.use_native&&"loading"in HTMLImageElement.prototype}(s)&&((n=this)._elements.forEach(function(e){-1!==I.indexOf(e.tagName)&&(e.setAttribute("loading","lazy"),L(e,n))}),this._elements=R(e,s)),this._elements.forEach(function(e){r._observer.observe(e)})):this.loadAll()},destroy:function(){var e=this;this._observer&&(this._elements.forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,t){L(e,this,t)},loadAll:function(){var e=this;this._elements.forEach(function(t){x(t,e)})}},e&&function(e,t){if(t)if(t.length)for(var n,r=0;n=t[r];r+=1)i(e,n);else i(e,t)}(k,window.lazyLoadOptions),k});