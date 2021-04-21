/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */

!function(e,i){"function"==typeof define&&define.amd?define(["ScrollMagic","velocity"],i):"object"==typeof exports?i(require("scrollmagic"),require("velocity")):i(e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic,e.Velocity||e.jQuery&&e.jQuery.Velocity)}(this,function(e,i){"use strict";var t="animation.velocity",o=0;e.Scene.extend(function(){var r,u,n,c,l=this,s=e._util,a=0;l.on("progress.plugin_velocity",function(){v()}),l.on("destroy.plugin_velocity",function(e){l.off("*.plugin_velocity"),l.removeVelocity(e.reset)});var f=function(e,t,o){s.type.Array(e)?e.forEach(function(e){f(e,t,o)}):(i.Utilities.data(e,c)||i.Utilities.data(e,c,{reverseProps:s.css(e,Object.keys(u))}),i(e,t,o),void 0!==o.queue&&i.Utilities.dequeue(e,o.queue))},y=function(e,t){if(s.type.Array(e))e.forEach(function(e){y(e,t)});else{var o=i.Utilities.data(e,c);o&&o.reverseProps&&(i(e,o.reverseProps,t),void 0!==t.queue&&i.Utilities.dequeue(e,t.queue))}},v=function(){if(r){var e=l.progress();e!=a&&(0===l.duration()&&(e>0?f(r,u,n):y(r,n)),a=e)}};l.setVelocity=function(e,i,a){return r&&l.removeVelocity(),r=s.get.elements(e),u=i||{},n=a||{},c="ScrollMagic."+t+"["+o++ +"]",void 0!==n.queue&&(n.queue=c+"_queue"),v(),l},l.removeVelocity=function(e){return r&&(void 0!==n.queue&&i(r,"stop",n.queue),e&&y(r,{duration:0}),r.forEach(function(e){i.Utilities.removeData(e,c)}),r=u=n=c=void 0),l}})});