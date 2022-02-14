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
      const contentElement = document.querySelectorAll('.tracker3-20-page')[0];
      const typeMateInstance = new TypeMate(contentElement, {
        selector: detectString,
      });
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
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-prev-pro2' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>",
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-next-pro2' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>"
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
    imagelength: 196,
    imagelengthM: 70,
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
    preloadImages: function (totalImages, parentElement, index) {
      var bgImage = parentElement.find(".master-area");
      for (let i = 0; i < totalImages; i++) {
        let div = document.createElement('div');
        div.className = `lazy bg-image-item bg-image-item--${i}`;
        bgImage.append(div);
      }
      imagesPlaying.startAnimation(parentElement);
      imagesPlaying.setBgImage(0, bgImage, parentElement);
    },
    startAnimation: function(parentElement){
      const duration = () => {
        if(!commonSetting.isMobile()){
          return $(window).innerHeight()*6;
        }else{
          return $(window).innerHeight()*3;
        }
      }
      var bgImage = parentElement.find(".master-area");
      bgImage.show();
      var scene = new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        duration: duration,
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
      let headestTime= 90;
      let progress = parseInt(position*10)/10;
      let imageNum;
      let imageNumM;
      let videoDom = parentElement.find('video');
      //headest open
      imageNum = (parseInt(progress*imagesPlaying.imagelength/headestTime)>imagesPlaying.imagelength)?
      imagesPlaying.imagelength-1:parseInt(progress*imagesPlaying.imagelength/headestTime);

      imageNumM = (parseInt(progress*imagesPlaying.imagelengthM/headestTime)>imagesPlaying.imagelengthM)?
      imagesPlaying.imagelengthM-1:parseInt(progress*imagesPlaying.imagelengthM/headestTime);

      if(!commonSetting.isMobile()){
        parentElement.find('.master-area').css({'opacity': 1 });
        if(progress<=headestTime ){
          if( imageNum>=61 && imageNum<=70){
            parentElement.find('.wording-area--1').css({
              'opacity': (imageNum-60)/10,
              'transform':`translate(0, ${(30-((imageNum-60)*3))}px)`
            });
          }else if(imageNum>70){
            parentElement.find('.wording-area--1').css({'opacity':1,'transform':`translate(0, 0)`});
          }else{
            parentElement.find('.wording-area--1').css({'opacity':0});
          };

          //<=80
          parentElement.find('.master-area').show(0);
          bgImage.find(".bg-image-item").show(0);
          bgImage.find(".bg-image-item").eq(imageNum).css({'opacity':1});
          bgImage.find(".bg-image-item").not(`:eq(${imageNum})`).css({'opacity':0});
          //1: 頭盔
          parentElement.find('.bg-block--1').css({'top': 0});
        }else{
          //3: 文字看
          parentElement.find('.wording-area--1').css({'opacity':1,'transform':`translate(0, 0)`});
          parentElement.find('.master-area').hide(0);
          parentElement.find('.master-area').css({'opacity': 1 });
          parentElement.find('.bg-block--1').css({'top': 0});
        }
      }else{
        if(progress<=headestTime ){
          if( imageNumM>=60 && imageNumM<=70){
            parentElement.find('.wording-area--1').css({
              'opacity': (imageNumM-60)/10,
              'transform':`translate(0, ${(30-((imageNumM-60)*3))}px)`
            });
            parentElement.find('.master-area').css({
              'opacity': (1-((imageNumM-60)/10)*2)>1?1:(1-((imageNumM-60)/10)*2)
            });
            if(!videoDom.hasClass('playing')){
              const promise = videoDom[0].play();
              videoDom.addClass('playing');
              // if (promise !== undefined) {
              //   promise.catch((error) => {
              //     // Auto-play was prevented
              //     // Show a UI element to let the user manually start playback
              //   })
              //     .then(() => {
              //       // Auto-play started
              //       videoDom.addClass('playing'); // Play once
              //     });
              // }
            };
          }else if(imageNumM>70){
            parentElement.find('.wording-area--1').css({'opacity':1,'transform':`translate(0, 0)`});
            parentElement.find('.master-area').css({'opacity': 0 });
          }else{
            parentElement.find('.wording-area--1').css({'opacity':0});
            parentElement.find('.master-area').css({'opacity': 1 });
            videoDom.removeClass('playing');
          };

          //<=80
          parentElement.find('.master-area').show(0);
          bgImage.find(".bg-image-item").show(0);
          bgImage.find(".bg-image-item").eq(imageNumM).css({'opacity':1});
          bgImage.find(".bg-image-item").not(`:eq(${imageNumM})`).css({'opacity':0});
          //1: 頭盔
          parentElement.find('.bg-block--1').css({'top': 0});
        }else{
          //3: 文字看
          parentElement.find('.wording-area--1').css({'opacity':1,'transform':`translate(0, 0)`});
          parentElement.find('.master-area').hide(0);
          parentElement.find('.master-area').css({'opacity': 1 });
          parentElement.find('.bg-block--1').css({'top': 0});
        }
      };



    },
    getImgUrl: function (num, svg) {
      var newNum = imagesPlaying.updateZero(num, 3);
      if(!svg){
        return "/media/filer_public/fed-assets/vivepro2/images/video-img/video-img-" + newNum + ".jpg";
      }else{
        return "/media/filer_public/fed-assets/vivepro2/images/video-img/video-img-svg-" + newNum + ".svg";
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
=       Section: zoom
========================================================= */
const zoomAnimate = (function () {
  'use strict';

  var zoomAnimate = {
    init: function () {
      var imageSection = $('.vivepro2-20-page .section--zoom-in');
      if (imageSection.length > 0) {
        $.each(imageSection, function (index, val) {
          var currentSection = $(this);
          zoomAnimate.setupAnimation(currentSection);
        });
      }
    },
    setupAnimation: function (parentElement) {
      const triggerHook = {
        d:(typeof(parentElement.data('trigger-hook'))==="number")?parentElement.data('trigger-hook'):0.05,
        m:(typeof(parentElement.data('trigger-hook-m'))==="number")?parentElement.data('trigger-hook-m'):0.5,
      }
      const zoomAnimateScrollMagicScene = new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        offset: 0,
        triggerHook: (!commonSetting.isMobile())?triggerHook.d:triggerHook.m,
      }).on('enter', (e) => {
        // console.log(parentElement)
        parentElement.addClass('active--zoom');
      }).on('leave', (e) => {
        parentElement.removeClass('active--zoom');
      })
      // .addIndicators({
      //   name: 'fadein',
      //   indent: 30
      // })
      .addTo(centerController);


      $(window).resize(function () {
        zoomAnimateScrollMagicScene.triggerHook((!commonSetting.isMobile())?triggerHook.d:triggerHook.m);
      });

    }
  };

  return zoomAnimate;
}());


/*= ========================================================
=       Section: accessoryCarousel
========================================================= */
const accessoryCarousel = {
  init(){
    const carouselArea =  $('.product-carousel-area');
    let rtl = false;
    if($('html').attr('dir') === 'rtl'){
      rtl = true;
    }
    if(carouselArea.length > 0){
      carouselArea.on('initialized.owl.carousel', function(event) {
        accessoryCarousel.calculateHeight();
        accessoryCarousel.fixOnlyTwoItems();
        // accessoryCarousel.addArrowTracking();
      })
      carouselArea.on('resized.owl.carousel', function(event) {
        accessoryCarousel.calculateHeight();
      })
      carouselArea.owlCarousel({
        rtl: rtl,
        items: 4,
        loop: false,
        nav: true,
        navText : ["<div class='icon-nav icon-prev'></div>","<div class='icon-nav icon-next'></div>"],
        responsive : {
          1920 : {
            items: 4,
            stagePadding: 77.5
          },
          1366 : {
            items: 4,
            stagePadding: 0
          },
          992:{
            items: 4,
            stagePadding: 0
          },
          0:{
            items: 2,
            stagePadding: 0
          }
        }
      });

    }
  },
  calculateHeight(){
    //Title
    // const carouselTitle = $('.carousel-title');
    // let maxTitle = -1;
    // carouselTitle.each(function() {
    //   $(this).attr('style','');
    //   const h = $(this).height();
    //   maxTitle = h > maxTitle ? h : maxTitle;
    // });
    // if(maxTitle > 0){
    //   carouselTitle.height(maxTitle);
    // }
    //Content
    const carouselContent = $('.fix-height');
    let max = -1;
    carouselContent.each(function() {
      $(this).attr('style','');
      const h = $(this).height();
      max = h > max ? h : max;
    });
    if(max > 0){
      carouselContent.height(max);
    }
  },
  fixOnlyTwoItems(){
    const owlItem = $('.owl-item');
    if(owlItem.length <=2){
      $('.owl-loaded').addClass('fixed-items')
    }
  },
  addArrowTracking(){
    setTimeout(
      function() {
        const owlNext = $('.owl-next');
        owlNext.attr('data-event-category','event-pdp');
        owlNext.attr('data-event-action','click-arrow');
        owlNext.attr('data-event-label','arrow-next-2020halloween');
        owlNext.attr('data-gtm','event-tracking');

        const owlPrev = $('.owl-prev');
        owlPrev.attr('data-event-category','event-pdp');
        owlPrev.attr('data-event-action','click-arrow');
        owlPrev.attr('data-event-label','arrow-prev-2020halloween');
        owlPrev.attr('data-gtm','event-tracking');
      }
      , 500);
  }
}

/*= ========================================================
=       Section: fade wording                            =
========================================================= */
const fadeInAnimate = (function () {
  'use strict';

  var fadeInAnimate = {
    init: function () {
      var imageSection = $('.vivepro2-20-page .wording-area--slide');
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
        parentElement.addClass('active');
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

const recommendCarousel = {
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
          offset = -500,
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
  fullHeight.init();
  modalVideo.init();
  fixWidows.init();
  lazyLoadImg.init();

  fadeInAnimate.init();
  singleVideo.init();
  subHeaderToggle.init();
  accessoryCarousel.init();
  imagesPlaying.init();
  zoomAnimate.init();
  recommendCarousel.init();
});

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    const options = {
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
})
