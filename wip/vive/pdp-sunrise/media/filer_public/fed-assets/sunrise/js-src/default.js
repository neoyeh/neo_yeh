/* global YKU, YT, LazyLoad, $, TimelineMax */
/* eslint-disable */
/**
 *
 * Fix word widow
 * Ref: https://github.com/andybelldesign/typemate
 *
 */
import TypeMate from './libs/typemate';

const _turnOnIndicators = false;
const controller = new ScrollMagic.Controller({
  loglevel: 0,
  addIndicators: _turnOnIndicators
});
const enterController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onEnter'
  }
});
const leaveController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
});
const centerController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {}
});

let isDesktopView = true;

const commonSetting = {
  mobileMaxResolution() {
    return 991;
  },
  isRtl() {
    return $('body').hasClass('rtl')
  },
  isMobile() {
    return $(window).width() <= commonSetting.mobileMaxResolution()
  },
  forcePageReload() {
    // Force page reload when desktop and mobile switch
    if ($(window)
      .width() <= commonSetting.mobileMaxResolution() && isDesktopView) {
      location.reload();
    }
    if ($(window)
      .width() > commonSetting.mobileMaxResolution() && !isDesktopView) {
      location.reload();
    }
  },
  updateScrollDurationPosition(sectionObj, scene) {
    let positionArray = commonSetting.getScrollDurationPosition(sectionObj),
      topTrigger = positionArray[0],
      bottomTrigger = positionArray[1];
    scene.offset(topTrigger);
    scene.duration(bottomTrigger);
  },
  getScrollDurationPosition(sectionObj) {
    let topTrigger = 0,
      bottomTrigger = 0,
      defaultTop = 5,
      defaultBottom = 5,
      sectionHeight = sectionObj.outerHeight();

    if (typeof sectionObj.data('top-trigger-percentage') !== 'undefined') {
      defaultTop = sectionObj.data('top-trigger-percentage');
    }
    topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
    if (typeof sectionObj.data('bottom-trigger-percentage') !== 'undefined') {
      defaultBottom = sectionObj.data('bottom-trigger-percentage');
    }
    bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
    return [topTrigger, bottomTrigger];
  },
};

const fixWidows = {
  init() {
    const siteList = ['us', 'uk', 'sg', 'nz', 'my-en', 'mea-en', 'in', 'hk', 'eu', 'ca', 'au'];
    const prefix = $(document.querySelector('body'))
      .attr('data-site');
    let detectString = '.text-fix-widow';
    if (siteList.indexOf(prefix) >= 0) {
      const contentElement = document.querySelectorAll('.sunrise-20-page')[0];
      const typeMateInstance = new TypeMate(contentElement, {
        selector: detectString,
        minWords: 2
      });
      // console.log(typeMateInstance)
      typeMateInstance.apply();
    }
  },
};

const fullHeight = {
  init(){
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
};


/*= ========================================================
=       Section: Sub Header Toggle                         =
========================================================= */
const subHeaderToggle = {
  init: function(){
    const subHeader = document.querySelectorAll('.page-sub-header .sub-header-link-area');
    if(subHeader.length>0){
      const btn = subHeader[0].querySelectorAll('.sub-header-toggle-btn')[0];
      const bg = subHeader[0].querySelectorAll('.page-sub-header-bg')[0];
      [btn, bg].forEach((elem)=>{
        if(elem){
          elem.onclick = function(){
            if(subHeader[0].classList.contains('active')){
              subHeader[0].classList.remove('active');
            }else{
              subHeader[0].classList.add('active');
            };
          };
        };
      });
    };
  }
};

/*= ========================================================
=       Section: productCarousel                           =
========================================================= */
const productCarousel = {
  init(){
    const carouselArea =  $('.recommend-carousel-area');
    let rtl = false;
    if($('html').attr('dir') === 'rtl'){
      rtl = true;
    }
    if(carouselArea.length > 0){
      carouselArea.owlCarousel({
        rtl: rtl,
        center: true,
        loop: true,
        nav: true,
        navText : [
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-prev-focus3' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>",
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-next-focus3' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>"
        ],
        responsive : {
          1920 : {
            items: 3,
          },
          1366 : {
            items: 3,
          },
          992:{
            items: 3,
          },
          0:{
            items: 1,
          }
        }
      });

    }
  }
};


/*= ========================================================
=       Section: scroll imagesPlaying
========================================================= */
const imagesPlaying = (function () {
  'use strict';

  var imagesPlaying = {
    imagelength: 61,
    imageLoadLength:[],
    init: function () {
      var sectionBanner = $('.section-scroll-image-play');
      if (sectionBanner.length > 0) {
        $.each(sectionBanner, function (index, val) {
          var currentSection = $(this);
          imagesPlaying.setupAnimation(currentSection, index);
        });
      }
    },
    setupAnimation: function (parentElement, index) {
      imagesPlaying.imageLoadLength[index]=0;
      imagesPlaying.preloadImages(imagesPlaying.imagelength, parentElement, index);
    },
    preloadImages:  function (totalImages, parentElement, index) {
      var bgImage = parentElement.find(".master-area");
      for (let i = 0; i < totalImages; i++) {
        let div = document.createElement('div');
        div.className = `lazy bg-image-item bg-image-item--${i}`;
        bgImage.append(div);
      }
      imagesPlaying.startAnimation(parentElement);
      imagesPlaying.setBgImage(0, bgImage, parentElement);


      let lazyloadImages;
      if ("IntersectionObserver" in window) {
        // console.log('IntersectionObserver');
        lazyloadImages = document.querySelectorAll(".lazy");
        const options = {
          // null means viewport, or use element
          root: null,
          rootMargin: '1000px',
        };
        var imageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        }, options);

        lazyloadImages.forEach(function(image) {
          imageObserver.observe(image);
        });
      } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload () {
          if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;

            lazyloadImages.forEach(function(img) {
              // console.log('scrollTop=',scrollTop);
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
            });
            if(lazyloadImages.length == 0) {
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
          }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
      }

    },
    startAnimation: function(parentElement){
      var bgImage = parentElement.find(".master-area");
      bgImage.show();
      var scene = new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        duration: '500%',
      })
      .setPin(parentElement[0], {
        pushFollowers: true,
        spacerClass: 'custome-id-pin-banner'
      })
      .addTo(leaveController)
      // .addIndicators() // add indicators (requires plugin)
      .on("progress", function (e) {
        imagesPlaying.setBgImage(e.progress*100, bgImage, parentElement);
      });
    },
    setBgImage: function (position, bgImage, parentElement) {
      let headestTime= 25;
      let textShowTime= 15;
      let textShowpx= 30;
      let textReadTime= 10;
      let progress = parseInt(position*10)/10;
      let imageNum;
      //headest open
      imageNum = (parseInt(progress*imagesPlaying.imagelength/headestTime)>imagesPlaying.imagelength)?
      imagesPlaying.imagelength-1:parseInt(progress*imagesPlaying.imagelength/headestTime);


      if(progress<=headestTime ){
        //<=25
        parentElement.find('.master-area').show(0);
        // bgImage.find(".bg-image-item").show(0);
        bgImage.find(".bg-image-item.active").removeClass('active');
        bgImage.find(".bg-image-item").eq(imageNum).addClass('active');
        // bgImage.find(".bg-image-item").eq(imageNum).css({'opacity':1});
        // bgImage.find(".bg-image-item").not(`:eq(${imageNum})`).css({'opacity':0});

        if(imageNum>=33 && imageNum<42){
          parentElement.find('.master-area .bg-mask').css({'opacity':`${(42-imageNum)/10}`});
        }else{
          parentElement.find('.master-area .bg-mask').css({'opacity':0});
        }
        //1: 頭盔
        parentElement.find('.wording-area--1, .wording-area--2, .wording-area--3').css({'opacity':0});
        parentElement.find('.bg-block--1').css({'top': 0});
      }else if(progress<= headestTime+textShowTime){
        //<=35
        let areaProgress = progress-(headestTime);
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--1').css({
          'opacity': areaProgress*1/textShowTime,
          'transform':`translate(0, ${(textShowTime-areaProgress) * textShowpx/textShowTime}px)`
        });
        //2: 1文字進
        parentElement.find('.wording-area--2, .wording-area--3').css({'opacity':0});
        parentElement.find('.bg-block--1').css({'top': 0});
      }else if(progress<= headestTime+textShowTime+textReadTime){
        //<=45
        parentElement.find('.wording-area--1').css({'opacity':1,'transform':`translate(0, 0)`});
        //3: 1文字看
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--2, .wording-area--3').css({'opacity':0});
        parentElement.find('.bg-block--1').css({'top': 0});
      }else if(progress<= headestTime+textShowTime+textReadTime+textShowTime){
        //<=60
        let areaProgress = progress-(headestTime+textShowTime+textReadTime);

        if(areaProgress<textShowTime/2){
          parentElement.find('.wording-area--1').css({
            'opacity': 1-areaProgress*2/textShowTime,
            'transform':`translate(0, ${areaProgress*2*-6}px)`
          });
        }else{
          parentElement.find('.wording-area--1').css({'opacity': 0});
        };
        if(areaProgress>textShowTime*0.8){
          parentElement.find('.wording-area--2').css({
            'opacity': Math.abs((1.5-areaProgress*2/textShowTime)*2),
            'transform':`translate(0, ${(textShowTime-areaProgress) * textShowpx/textShowTime * 2}px)`
          });
        }else{
          parentElement.find('.wording-area--2').css({'opacity': 0});
        };
        parentElement.find('.bg-block--1').css({
          'top': `${-1 * areaProgress*10/textShowTime*10}%`
        });
        parentElement.find('.bg-block--2, .gradient-box').css({
          'top': `${(textShowTime-areaProgress)*40/textShowTime}%`
        });
        //4: 1文字離 2文字進 1圖出 2圖進
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--3').css({'opacity':0});
        parentElement.find('.gradient-box').css({'transform':`scaleX(1)`,'opacity': 1,'top':0});
      }else if(progress<= headestTime+textShowTime+textReadTime+textShowTime+5){
        // <65
        let areaProgress = progress-(headestTime+textShowTime+textReadTime+textShowTime);
        parentElement.find('.gradient-box').css({
          'transform':`scaleX(${1+areaProgress*0.6/5})`,
          'opacity': 1,
          'top': 0
        });
        //5. 開窗
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--1, .wording-area--3').css({'opacity':0});
        parentElement.find('.wording-area--2').css({'opacity':1,'transform':`translate(0, 0)`});
        parentElement.find('.bg-block--2').css({'top': 0});
        parentElement.find('.bg-block--1').css({'top': '100%'});
      }else if(progress<= headestTime+textShowTime+textReadTime+textShowTime+5+textReadTime){
        //<75
        //6. 2文字看
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--1, .wording-area--3').css({'opacity':0});
        parentElement.find('.wording-area--2').css({'opacity':1,'transform':`translate(0, 0)`});
        parentElement.find('.bg-block--2').css({'top': 0});
        parentElement.find('.bg-block--1').css({'top': '100%'});
        parentElement.find('.gradient-box').css({'opacity': 0});
      }else if(progress<= headestTime+textShowTime+textReadTime+textShowTime+5+textReadTime+textShowTime){
        //<90
        let areaProgress = progress-(headestTime+textShowTime+textReadTime+textShowTime+5+textReadTime);
        if(areaProgress<textShowTime/2){
          parentElement.find('.wording-area--2').css({
            'opacity': 1-areaProgress*2/textShowTime,
            'transform':`translate(0, ${areaProgress*2*-6}px)`
          });
        }else{
          parentElement.find('.wording-area--2').css({'opacity': 0});
        };
        if(areaProgress>textShowTime*0.8){
          parentElement.find('.wording-area--3').css({
            'opacity': Math.abs((1.5-areaProgress*2/textShowTime)*2),
            'transform':`translate(0, ${(textShowTime-areaProgress) * textShowpx/textShowTime * 2}px)`
          });
        }else{
          parentElement.find('.wording-area--3').css({'opacity': 0});
        };
        parentElement.find('.bg-block--2').css({
          'top': `${-1 * areaProgress*10/textShowTime*10}%`
        });
        parentElement.find('.bg-block--3').css({
          'top': `${(textShowTime-areaProgress)*40/textShowTime}%`
        });
        //7. 2文字出 3文字進 2圖出 3圖進
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--1').css({'opacity':0});
        parentElement.find('.bg-block--1').css({'top': '100%'});
        parentElement.find('.gradient-box').css({'opacity': 0});
      }else{
        //<100
        //7 3字看
        parentElement.find('.master-area').hide(0);
        parentElement.find('.wording-area--1, .wording-area--2').css({'opacity':0});
        parentElement.find('.wording-area--3').css({'opacity':1,'transform':`translate(0, 0)`});
        parentElement.find('.bg-block--1, .bg-block--2').css({'top': '100%'});
        parentElement.find('.bg-block--3').css({'top': 0});
        parentElement.find('.gradient-box').css({'opacity': 0});
      }


      // console.log('=========')
      // console.log('progress:', progress);
      // console.log(`headset:${imagesPlaying.imagelength}:`, imageNum);
      // console.log(`opacity1:`, textShow)


    },
    getImgUrl: function (num, svg) {
      var newNum = imagesPlaying.updateZero(num, 3);
      if(!svg){
        return "/media/filer_public/fed-assets/sunrise/images/video-img/video-img-" + newNum + ".jpg";
      }else{
        return "/media/filer_public/fed-assets/sunrise/images/video-img/video-img-svg-" + newNum + ".svg";
      }
    },
    updateZero: function (num, length) {
      for (var len = (num + "").length; len < length; len = num.length) {
        num = num;
      }
      return num;
    }
  };

  return imagesPlaying;
}());

/*= ========================================================
=       Section: fade wording                            =
========================================================= */
const fadeInAnimate = (function () {
  'use strict';

  var fadeInAnimate = {
    init: function () {
      var imageSection = $('.sunrise-20-page .wording-area--slide');
      if (imageSection.length > 0) {
        $.each(imageSection, function (index, val) {
          var currentSection = $(this);
          fadeInAnimate.setupAnimation(currentSection);
        });
      }
    },
    setupAnimation: function (parentElement) {
      const triggerHook = {
        d:(typeof(parentElement.data('trigger-hook'))==="number")?parentElement.data('trigger-hook'):0.05,
        m:(typeof(parentElement.data('trigger-hook-m'))==="number")?parentElement.data('trigger-hook-m'):0.65,
      }
      const fadeInAnimateScrollMagicScene = new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        offset: 0,
        reverse: false,
        triggerHook: (!commonSetting.isMobile())?triggerHook.d:triggerHook.m,
      }).on('enter', (e) => {
        // console.log(parentElement)
        parentElement.addClass('active')
      })
      // .addIndicators({
      //   name: 'fadein',
      //   indent: 30
      // })
      .addTo(centerController);


      $(window).resize(function () {
        fadeInAnimateScrollMagicScene.triggerHook((!commonSetting.isMobile())?triggerHook.d:triggerHook.m);
      });

    }
  };

  return fadeInAnimate;
}());


/*= ========================================================
=       Section: scroll imagesPlaying
========================================================= */
const handTracking = (function () {
  'use strict';

  var handTracking = {
    playActive: [],
    init: function () {
      var section = $('.section-hand-tracking');
      if (section.length > 0) {
        $.each(section, function (sectionIndex, val) {
          var currentSection = $(this);
          handTracking.setupfunction(currentSection, sectionIndex);
        });
      }
    },
    setupfunction: function (parentElement, sectionIndex) {
      const firstItem = parentElement.find('.video-list .video-item').eq(0);
      const videoArea = parentElement.find('.video-area');
      handTracking[sectionIndex] = {};
      handTracking[sectionIndex].playActive = 0;
      handTracking[sectionIndex].playStop = (commonSetting.isMobile())?true:false;
      handTracking[sectionIndex].forceStop = false;
      $(window).resize(function () {
        if(!handTracking[sectionIndex].forceStop){
          handTracking[sectionIndex].playStop = (commonSetting.isMobile())?true:false;
        };
      });


      firstItem.addClass('active');
      firstItem.find('.text-info').show();

      const duration = () => {
        if(!commonSetting.isMobile()){
          return $(window).innerHeight()*0.8;
        }else{
          return $(window).innerHeight()*1.2;
        }
      }
      let scene = new ScrollMagic.Scene({
        triggerElement: videoArea[0],
        duration: duration
      })
      // .addIndicators({
      //   name: 'handTracking'
      // })
      .addTo(controller)
      .on('leave enter', (e) => {
        if (e.type === 'enter') {
          // console.log('autoplay')
          handTracking.autoPlay(parentElement, 'play', sectionIndex);
        }else if(e.type === 'leave'){
          // console.log('stop auto')
          handTracking.autoPlay(parentElement, 'pause', sectionIndex);
        }
      });

      
      parentElement.find('.video-list .video-item').each(function(i){
        const video = $(this).find('video')[0];
        const bg = $(this).find('.video-bg');
        video.addEventListener('ended', function(){
          // console.log('video end ... ');
          if( handTracking[sectionIndex].playStop === false ){
            setTimeout(function() {
              handTracking.autoPlay(parentElement, 'finish', sectionIndex);  
            }, 500);
          }else{
            bg.addClass('played');
          };
        }, false);
        

        $(this).find('.text-title').on('click', function(e){
          e.preventDefault();
          handTracking[sectionIndex].playStop = true;
          handTracking[sectionIndex].forceStop = true;
          handTracking.autoPlay(parentElement, 'click', sectionIndex, i);  
          if(scene !== null){
            scene.destroy(true);
            scene = null;
          }
        });

        bg.find('.video-replay').on('click', function(e){
          e.preventDefault();
          handTracking.autoPlay(parentElement, 'click', sectionIndex, i);
        });
      });


      
    },
    autoPlay: function(parentElement, type, sectionIndex, clickIndex){
      const playActive = handTracking[sectionIndex].playActive;
      const video = parentElement.find('.video-list .video-item').eq(playActive).find('video');
      // let playPromise = video[0].play();
      switch (type) {
        case 'play':
          parentElement.find('.video-bg').removeClass('played');
          video[0].play();
          break;
        case 'pause':
          // let playPromise = video[0].play();
          // if (playPromise !== undefined) {
          //   playPromise.then(_ => {
              video[0].pause();
          //   })
          // };
          break;
        case 'finish':
          // if (playPromise !== undefined) {
          //   playPromise.then(_ => {
          //     video[0].pause();
          //   })
          // };
          const videoLength = parentElement.find('.video-list .video-item').length;
          const nextActive = (playActive+2>videoLength)?0:playActive+1;
          handTracking[sectionIndex].playActive = nextActive;
          handTracking.changeVideo(parentElement, playActive, nextActive, sectionIndex);
          break;
        case 'click':
          // let playPromise = video[0].play();
          // if (playPromise !== undefined) {
          //   playPromise.then(_ => {
              video[0].pause();
          //   })
          // };
          video[0].currentTime = 0;
          handTracking[sectionIndex].playActive = clickIndex;
          handTracking.changeVideo(parentElement, playActive, clickIndex, sectionIndex);

          break;
        default:
          break;
      };
    },
    changeVideo: function(parentElement, active, nextIndex, sectionIndex){
      const oldItem = parentElement.find('.video-list .video-item').eq(active);
      const oldText = oldItem.find('.text-info');
      const nexItem = parentElement.find('.video-list .video-item').eq(nextIndex);
      const nextText = nexItem.find('.text-info');
      if( active !== nextIndex ){
        oldItem.removeClass('active');
        oldText.slideUp();
        nexItem.addClass('active');
        nextText.slideDown();
      }
      handTracking.autoPlay(parentElement, 'play', sectionIndex);
    }
  };

  return handTracking;
}());


/*= ========================================================
=       Section: Single video                            =
========================================================= */
const videoScrollAndPlay = (function () {
  var videoScrollAndPlay = {
    setupVideoSource(parentElement) {
      // if (!commonSetting.isMobile()) {
      let sectionObj = parentElement,
        sectionDom = sectionObj[0];

      $.each(sectionObj.find('video'), function (index, el) {
        let videoObj = $(this),
          videoDom = videoObj[0],
          offset = -640,
          forceVideoPreload = videoObj.data('force-preload'),
          videoAttr = {
            ld: {
              videoPoster: videoObj.data('poster-path'),
              videoPath: videoObj.data('video-path'),
            },
            d: {
              videoPoster: videoObj.data('d-poster-path'),
              videoPath: videoObj.data('d-video-path'),
            },
            l: {
              videoPoster: videoObj.data('l-poster-path'),
              videoPath: videoObj.data('l-video-path'),
            },
            t: {
              videoPoster: videoObj.data('t-poster-path'),
              videoPath: videoObj.data('t-video-path'),
            }
          };
        if (typeof forceVideoPreload !== 'undefined' && forceVideoPreload === 'yes') {
          videoScrollAndPlay.changeView(videoObj, videoAttr);
          // videoDom.pause();
          // videoDom.load();
          const promise = videoDom.play();
          if (promise !== undefined) {
            promise.catch((error) => {
              // Auto-play was prevented
              // Show a UI element to let the user manually start playback
            })
              .then(() => {
                // Auto-play started
                videoDom.pause();
                // videoDom.load();
                videoObj.addClass('loaded'); // Play once
              });
          }
          // videoObj.addClass('loaded');
        } else {
          const scene = new ScrollMagic.Scene({
            triggerElement: sectionDom,
            offset,
          }).addTo(controller)
            .on('enter', (e) => {
              if (e.type === 'enter' && !videoObj.hasClass('loaded')) {
                videoScrollAndPlay.changeView(videoObj, videoAttr);
                videoDom.pause();
                videoDom.load();
                videoObj.addClass('loaded');
              }
            });
        }


        videoDom.addEventListener('loadeddata', () => {
          videoScrollAndPlay.setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom);
        }, false);
      });
      // }
    },
    changeView(ele, data) {
      const changeViewFunc = (ele, data) => {
        const windowW = $(window)
          .innerWidth();
        const changeClass = (windowW > 1919) ? 'ld'
        : (windowW > 1365) ? 'd'
        : (windowW > 991) ? 'l'
        : 't';
        const useData = data[changeClass];
        if (!ele.hasClass(`video-changeView-${changeClass}`)) {
          ele.removeClass('video-changeView-ld video-changeView-d video-changeView-l video-changeView-t');
          ele.addClass(`video-changeView-${changeClass}`);
          ele.attr('poster', useData.videoPoster || data.d.videoPoster);
          ele[0].src = useData.videoPath || data.d.videoPoster;
        };
      };
      changeViewFunc(ele, data);
      $(window)
        .resize(function () {
          changeViewFunc(ele, data);
        });
    },
    getPosition(sectionObj, videoObj) {
      let vh = window.innerHeight;
      let topTrigger = 0,
        bottomTrigger = 0,
        defaultTop,
        defaultBottom,
        sectionHeight = sectionObj.outerHeight();

      if (commonSetting.isMobile()) {
        defaultTop = -15;
        defaultBottom = -15;
        if (typeof videoObj.data('md-top-trigger-playing') !== 'undefined') {
          defaultTop = videoObj.data('md-top-trigger-playing');
        }
        topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
        if (typeof videoObj.data('md-bottom-trigger-playing') !== 'undefined') {
          defaultBottom = videoObj.data('md-bottom-trigger-playing');
        }
        if(videoObj.data('md-trigger-vh')==='yes'){
          sectionHeight = vh;
        }
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      } else {
        defaultTop = 5;
        defaultBottom = 5;
        if (typeof videoObj.data('top-trigger-playing') !== 'undefined') {
          defaultTop = videoObj.data('top-trigger-playing');
        }
        topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
        if (typeof videoObj.data('bottom-trigger-playing') !== 'undefined') {
          defaultBottom = videoObj.data('bottom-trigger-playing');
        }
        if(videoObj.data('trigger-vh')==='yes'){
          sectionHeight = vh;
        }
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      }


      return [topTrigger, bottomTrigger];
    },
    updatePosition(sectionObj, videoObj, scene) {
      let positionArray = videoScrollAndPlay.getPosition(sectionObj, videoObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
      scene.duration(bottomTrigger);
    },
    setupReplayBtn(sectionObj, videoObj, videoDom) {
      const replayBtn = sectionObj.find('.replay-block');
      if (typeof replayBtn !== 'undefined') {
        replayBtn.addClass('show');
        replayBtn.on('click', function (e) {
          e.preventDefault();
          videoDom.play();
          videoObj.addClass('playing');
          replayBtn.removeClass('show');
        });
      }
    },
    setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom) {
      let scene,
      videoLoop = videoObj.data('loop'),
      playOnce = videoObj.data('play-once'),
      leavePause = videoObj.data('leave-pause')||'no',
      positionArray = videoScrollAndPlay.getPosition(sectionObj, videoObj),
      topTrigger = positionArray[0],
      bottomTrigger = positionArray[1],
      videoHeight = videoObj.outerHeight(),
      sectionHeight = sectionObj.outerHeight(),
      resetPlay = function(){
        if (typeof playOnce === 'undefined' || playOnce !== 'yes') {
            videoDom.pause();
            videoObj.removeClass('playing');

        }
      };
      resetPlay();
      scene = new ScrollMagic.Scene({
        triggerElement: sectionDom,
        offset: topTrigger,
        duration: bottomTrigger,
      })
        // .addIndicators({
        //   name: 'videoScrollAndPlay'
        // })
        .addTo(enterController)
        .on('enter leave', (e) => {
          switch (e.type) {
            case 'enter':
              if (videoObj.hasClass('loaded') && !videoObj.hasClass('playing')) {
                // videoDom.play();
                // videoObj.addClass('playing');
                const promise = videoDom.play();
                if (promise !== undefined) {
                  promise.catch((error) => {
                    // Auto-play was prevented
                    // Show a UI element to let the user manually start playback
                  })
                    .then(() => {
                      // Auto-play started
                      videoObj.addClass('playing'); // Play once
                    });
                }
              }
              break;
            case 'leave':
              if(leavePause==='yes'){
                resetPlay();
              }
              break;
          }
        });

      // scene.addIndicators({
      //     name: `scroll (sHeight:${sectionHeight} | vHeight:${videoHeight} | offset:${topTrigger} | duration:${bottomTrigger})`,
      // });
      //
      // scene.removeIndicators();

      videoDom.addEventListener('ended', () => {
        if (typeof playOnce !== 'undefined' && playOnce === 'yes') {
          videoObj.addClass('playing');
          videoScrollAndPlay.setupReplayBtn(sectionObj, videoObj, videoDom);
        } else if (typeof videoLoop !== 'undefined' && videoLoop === 'no') {
          videoObj.removeClass('playing');
          videoScrollAndPlay.setupReplayBtn(sectionObj, videoObj, videoDom);
        } else if (videoObj.hasClass('playing')) {
          videoObj.attr('loop', 'loop');
          videoDom.play();
        }
      }, false);
      $(window)
        .resize((event) => {
          /* Act on the event */
          videoScrollAndPlay.updatePosition(sectionObj, videoObj, scene);
        });
    },
  };
  return videoScrollAndPlay;
}());

/*= ========================================================
=       Section: Modal Video                              =
========================================================= */
const singleVideo = (function () {
  const singleVideo = {
    init() {
      if ($('.section--scroll-video-play').length > 0) {
        $.each($('.section--scroll-video-play'), function (index, el) {
          let sectionObj = $(this),
            videoBlock = sectionObj.find('.video-bg');
          videoScrollAndPlay.setupVideoSource(videoBlock);
        });
      }
    },
  };

  return singleVideo;
}());





/*= ========================================================
=       Detect Youtube or Youku plugin                    =
========================================================= */
const youkuVideo = {
  init(videoId) {
    const playerIgnored = new YKU.Player('player', {
      styleid: '0',
      client_id: '2a8fda48fc709b73',
      vid: videoId,
      newPlayer: false,
      autoplay: true,
      show_related: false,
      events: {
        onPlayEnd: function onPlayEnd() {
          modalVideo.hideModal();
        },
        onPlayStart: function onPlayStart() {
          modalVideo.showModal();
          modalVideo.setupCloseModalBtn();
        },
      },
    });
  },
};

const youtubeVideo = {
  init(vid) {
    let playerIgnored;

    function onPlayerReady(event) {
      event.target.playVideo();
      modalVideo.showModal();
      modalVideo.setupCloseModalBtn();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        modalVideo.hideModal();
      }
    }

    function onYouTubePlayerAPIReady() {
      playerIgnored = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: vid,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    onYouTubePlayerAPIReady();
  },
};

/*= ========================================================
=       Section: Banner modal video                       =
========================================================= */
const modalVideo = {
  init() {
    const modalVideoBlock = document.querySelectorAll('.section-trailer-video .box-video');
    if (modalVideoBlock) {
      modalVideoBlock.forEach((elem) => {
        const playBtn = elem.querySelector('.play-modal-video-btn');
        const videoType = playBtn.getAttribute('data-vtype');
        const videoId = playBtn.getAttribute('data-vid');

        playBtn.addEventListener('click', (event) => {
          event.preventDefault();
          /* Act on the event */
          if (videoType === 'youtube') {
            // Youtube
            youtubeVideo.init(videoId);
          } else {
            // YouKu
            youkuVideo.init(videoId);
            modalVideo.showModal();
            modalVideo.setupCloseModalBtn();
          }
        });
      });
    }
  },
  setupCloseModalBtn() {
    const closeBtn = document.querySelector('.modal-overlap-container .btn-close');
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      modalVideo.hideModal();
    });
  },
  showModal() {
    const modalContainer = document.querySelector('.modal-overlap-container');
    const htmlTag = document.getElementsByTagName('html')[0];
    const bodyTag = document.body;
    modalContainer.classList.add('show');
    htmlTag.classList.add('fixed');
    bodyTag.classList.add('fixed');
  },
  hideModal() {
    const modalContainer = document.querySelector('.modal-overlap-container');
    const htmlTag = document.getElementsByTagName('html')[0];
    const bodyTag = document.body;
    modalContainer.classList.remove('show');
    htmlTag.classList.remove('fixed');
    bodyTag.classList.remove('fixed');

    const playArea = document.querySelector('.modal-overlap-container .align-center');
    playArea.innerHTML = '<div id=\'player\'></div>';
  },
};

const lazyLoadImg = {
  init() {
    if (typeof LazyLoad !== 'undefined') {
      const lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy-img',
        threshold: 2000,
      });
    }
  }
};

window.onload = () => {
};
$(function(){
  subHeaderToggle.init();
  fixWidows.init();
  imagesPlaying.init();
  fadeInAnimate.init();
  fullHeight.init();
  modalVideo.init();
  singleVideo.init();
  productCarousel.init();
  lazyLoadImg.init();
  handTracking.init();
});
