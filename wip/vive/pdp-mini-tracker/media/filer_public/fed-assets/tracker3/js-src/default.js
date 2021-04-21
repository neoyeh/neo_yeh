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
    return 767;
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

const productCarousel = {
  init(){
    const carouselArea =  $('.product-carousel-area');
    let rtl = false;
    if($('html').attr('dir') === 'rtl'){
      rtl = true;
    }
    if(carouselArea.length > 0){
      carouselArea.on('initialized.owl.carousel', function(event) {
        productCarousel.calculateHeight();
        productCarousel.fixOnlyTwoItems();
        productCarousel.addArrowTracking();
      })
      carouselArea.on('resized.owl.carousel', function(event) {
        productCarousel.calculateHeight();
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
}


const sectionTrackerRobot = {
  initVariable: [],
  initParalla: [],
  init: function () {
    var lightSection = $('.section-tracker-robot');
    if (lightSection.length > 0) {
      $.each(lightSection, function (index, val) {
        var currentSection = $(this);
        sectionTrackerRobot.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionTrackerRobot.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationParalla: function(parentElement, index){
      let duration = (parentElement.data('pin'))?parentElement.data('pin'):"200%";
      let triggerHook = () =>{
        if(!commonSetting.isMobile()){
          return "0.5";
        }else{
          return "0.4";
        }
      }
      const Wording = () => {
        return {
          ele:parentElement.find('.wording-area-paralla'),
          y:"-250%"
        };
      }
      const AnimateBlock = () => {
        return {
          ele:parentElement.find('.animate-block'),
          y:"-30%"
        };
      }
      const BgBlock = () => {
        return {
          ele:parentElement.find('.image-block'),
          y:"-30%"
        };
      }

      sectionTrackerRobot.initParalla[index]=[];
      [Wording,AnimateBlock,BgBlock].map((data,i)=>{
        go(i, data());
      });
      function go(order, data){
        sectionTrackerRobot.initParalla[index][order] = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: 0,
          duration: duration,
          triggerHook: triggerHook()
        })
        .setTween(data.ele, {y: data.y, ease: Linear.easeOut})
        // .addIndicators({
        //   name: 'Paralla--Robot',
        //   indent: 250
        // })
        .addTo(centerController);
      }
  },
  animationPin: function(parentElement, index){
    let triggerHook = () =>{
      if(!commonSetting.isMobile()){
        return "0.2";
      }else{
        return "0.6";
      }
    }
    sectionTrackerRobot.initVariable[index] = new ScrollMagic.Scene({
      triggerElement: parentElement.find('.image-block')[0],
      offset: 0,
      duration: 0,
      triggerHook: triggerHook()
    })
    .on("enter", function (e) {
      parentElement.addClass('active');
    })
    // .on("leave", function (e) {
    //   parentElement.removeClass('active');
    // })
    // .addIndicators({
    //   name: 'active-pin',
    //   indent: 30
    // })
    .addTo(centerController);
  },
  setupAnimationSize: function(parentElement, index){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const windowSize = height/width;
    const $ele = parentElement.find('.center-point');
    const size = {
      'dlg': {
        'size': 1080/1920,
      },
      'lg': {
        'size': 760/1366,
      },
      'lp': {
        'size': 570/992,
      },
      'tb': {
        'size': 300/360,
      }
      
    }
    const getSize = (size, isMobile) =>{
      if(size['size'] >= windowSize || isMobile===true){
        $ele.css({
          width: `${width}px`,
          height: `${width*size['size']}px`
        });
      }else{
        $ele.css({
          width: `${height/size['size']}px`,
          height: `${height}px`
        });
      }
    }
    if(width>=1920){
      getSize(size['dlg']);
    }else if(width>=1366){
      getSize(size['lg']);
    }else if(width>=992){
      getSize(size['lp']);
    }else{
      getSize(size['tb'], true);
    }
    
  },
  setupAnimation: function (parentElement, index) {
    sectionTrackerRobot.setupAnimationSize(parentElement, index);
    
    if (!commonSetting.isMobile()) {
      if (parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        if (typeof sectionTrackerRobot.initVariable[index] !== 'undefined') {
          sectionTrackerRobot.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-fix-mobile-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-set')) {
        sectionTrackerRobot.animationParalla(parentElement, index);
        sectionTrackerRobot.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-set');
      }
    } else {
      if (parentElement.hasClass('animation-scroll-fix-set')) {
        if (typeof sectionTrackerRobot.initVariable[index] !== 'undefined') {
          sectionTrackerRobot.initVariable[index].destroy(true);
        }
        sectionTrackerRobot.initParalla[index].map((data,i)=>{
          if (typeof data !== 'undefined') {
            data.destroy(true);
          }
        })
        parentElement.removeClass('animation-scroll-fix-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        sectionTrackerRobot.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-mobile-set');
      }
    }

  }
};
const sectionTrackerSmaller = {
  initVariable: [],
  initParalla: [],
  init: function () {
    var lightSection = $('.section-tracker-smaller');
    if (lightSection.length > 0) {
      $.each(lightSection, function (index, val) {
        var currentSection = $(this);
        sectionTrackerSmaller.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionTrackerSmaller.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationParalla: function(parentElement, index){
      let duration = (parentElement.data('pin'))?parentElement.data('pin'):"200%";
      let triggerHook = () =>{
        if(!commonSetting.isMobile()){
          return "0.5";
        }else{
          return "0.4";
        }
      }
      const Wording = () => {
        return {
          ele:parentElement.find('.wording-area-paralla'),
          y:"-250%"
        };
      }
      const BgImage = () => {
        return {
          ele:parentElement.find('.image-block'),
          y:"-30%"
        };
      }
      const Line = () => {
        return {
          ele:parentElement.find('.animate-block'),
          y:"-30%"
        };
      }

      sectionTrackerSmaller.initParalla[index]=[];

      [Wording,BgImage,Line].map((data,i)=>{
        go(i, data());
      });
      function go(order, data){
        sectionTrackerSmaller.initParalla[index][order] = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: 0,
          duration: duration,
          triggerHook: triggerHook()
        })
        .setTween(data.ele, {y: data.y, ease: Linear.easeOut})
        // .addIndicators({
        //   name: 'lighter',
        //   indent: 250
        // })
        .addTo(centerController);
      }
  },
  animationPin: function(parentElement, index){
    let triggerHook = () =>{
      if(!commonSetting.isMobile()){
        return "0.2";
      }else{
        return "0.6";
      }
    }
    sectionTrackerSmaller.initVariable[index] = new ScrollMagic.Scene({
      triggerElement: parentElement.find('.image-block')[0],
      offset: 0,
      duration: 0,
      triggerHook: triggerHook()
    })
    .on("enter", function (e) {
      parentElement.addClass('active');
    })
    // .on("leave", function (e) {
    //   parentElement.removeClass('active');
    // })
    // .addIndicators({
    //   name: 'active-pin',
    //   indent: 30
    // })
    .addTo(centerController);
  },
  setupAnimation: function (parentElement, index) {
    if (!commonSetting.isMobile()) {
      if (parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        if (typeof sectionTrackerSmaller.initVariable[index] !== 'undefined') {
          sectionTrackerSmaller.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-fix-mobile-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-set')) {
        sectionTrackerSmaller.animationParalla(parentElement, index);
        sectionTrackerSmaller.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-set');
      }
    } else {
      if (parentElement.hasClass('animation-scroll-fix-set')) {
        if (typeof sectionTrackerSmaller.initVariable[index] !== 'undefined') {
          sectionTrackerSmaller.initVariable[index].destroy(true);
        }
        sectionTrackerSmaller.initParalla[index].map((data,i)=>{
          if (typeof data !== 'undefined') {
            data.destroy(true);
          }
        })
        parentElement.removeClass('animation-scroll-fix-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        sectionTrackerSmaller.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-mobile-set');
      }
    }

  }
};
const sectionTrackerLighter = {
  initParalla: [],
  init: function () {
    var lightSection = $('.section-tracker-lighter');
    if (lightSection.length > 0) {
      $.each(lightSection, function (index, val) {
        var currentSection = $(this);
        sectionTrackerLighter.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionTrackerLighter.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationParalla: function(parentElement, index){
      let duration = (parentElement.data('pin'))?parentElement.data('pin'):"200%";
      let triggerHook = () =>{
        if(!commonSetting.isMobile()){
          return "0.2";
        }else{
          return "0.4";
        }
      }
      const Wording = () => {
        return {
          ele:parentElement.find('.wording-area-paralla'),
          y:"-250%"
        };
      }
      const BgTracker = () => {
        return {
          ele:parentElement.find('.lighter-top'),
          y:"-35%"
        };
      }
      const BgHand = () => {
        return {
          ele:parentElement.find('.lighter-bottom'),
          y:"-40%"
        };
      }
      const Bg = () => {
        return {
          ele:parentElement.find('.image-block'),
          y:"-30%"
        };
      }
      sectionTrackerLighter.initParalla[index]=[];
      [Wording,BgTracker,BgHand,Bg].map((data,i)=>{
        go(i, data());
      });
      function go(order, data){
        sectionTrackerLighter.initParalla[index][order] = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: 0,
          duration: duration,
          triggerHook: triggerHook()
        })
        .setTween(data.ele, {y: data.y, ease: Linear.easeOut})
        // .addIndicators({
        //   name: 'lighter',
        //   indent: 250
        // })
        .addTo(centerController);
      }
  },
  setupAnimation: function (parentElement, index) {
    if (!commonSetting.isMobile()) {
      if (!parentElement.hasClass('animation-scroll-fix-set')) {
        sectionTrackerSmaller.animationParalla(parentElement, index);
        parentElement.addClass('animation-scroll-fix-set');
      }
    } else {
      if (parentElement.hasClass('animation-scroll-fix-set')) {
        sectionTrackerSmaller.initParalla[index].map((data,i)=>{
          if (typeof data !== 'undefined') {
            data.destroy(true);
          }
        })
        parentElement.removeClass('animation-scroll-fix-set');
      }
    }


  }
};
const sectionTrackerBattery = {
  initVariable: [],
  initParalla: [],
  init: function () {
    var lightSection = $('.section-tracker-battery');
    if (lightSection.length > 0) {
      $.each(lightSection, function (index, val) {
        var currentSection = $(this);
        sectionTrackerBattery.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionTrackerBattery.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationParalla: function(parentElement, index){
      let duration = (parentElement.data('pin'))?parentElement.data('pin'):"200%";
      let triggerHook = () =>{
        if(!commonSetting.isMobile()){
          return "0.2";
        }else{
          return "0.4";
        }
      }

      const Wording = () => {
        return {
          ele:parentElement.find('.wording-area-paralla'),
          y:"-250%"
        };
      }
      const BgImage = () => {
        return {
          ele:parentElement.find('.image-block'),
          y:"-30%"
        };
      }
      sectionTrackerBattery.initParalla[index]=[];
      [Wording,BgImage].map((data,i)=>{
        go(i, data());
      });
      function go(order, data){
        sectionTrackerBattery.initParalla[index][order] = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: 0,
          duration: duration,
          triggerHook: triggerHook()
        })
        .setTween(data.ele, {y: data.y, ease: Linear.easeOut})
        // .addIndicators({
        //   name: 'gattery',
        //   indent: 250
        // })
        .addTo(centerController);
      }
  },
  animationPin: function(parentElement, index){
    let triggerHook = () =>{
      if(!commonSetting.isMobile()){
        return "0.2";
      }else{
        return "0.6";
      }
    }
    sectionTrackerBattery.initVariable[index] = new ScrollMagic.Scene({
      triggerElement: parentElement.find('.image-block')[0],
      offset: 0,
      duration: 0,
      triggerHook: triggerHook()
    })
    .on("enter", function (e) {
      parentElement.addClass('active');
    })
    // .on("leave", function (e) {
    //   parentElement.removeClass('active');
    // })
    // .addIndicators({
    //   name: 'active-pin',
    //   indent: 30
    // })
    .addTo(centerController);
  },
  setupAnimation: function (parentElement, index) {
    if (!commonSetting.isMobile()) {
      if (parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        if (typeof sectionTrackerBattery.initVariable[index] !== 'undefined') {
          sectionTrackerBattery.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-fix-mobile-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-set')) {
        sectionTrackerBattery.animationParalla(parentElement, index);
        sectionTrackerBattery.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-set');
      }
    } else {
      if (parentElement.hasClass('animation-scroll-fix-set')) {
        if (typeof sectionTrackerBattery.initVariable[index] !== 'undefined') {
          sectionTrackerBattery.initVariable[index].destroy(true);
        }
        sectionTrackerBattery.initParalla[index].map((data,i)=>{
          if (typeof data !== 'undefined') {
            data.destroy(true);
          }
        })
        parentElement.removeClass('animation-scroll-fix-set');
      }
      if (!parentElement.hasClass('animation-scroll-fix-mobile-set')) {
        sectionTrackerBattery.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-fix-mobile-set');
      }
    }

  }
};
const sectionTextOptimize = {
  initVariable: [],
  init: function () {
    let textSection = $('.section-text-optimize');
    if (textSection.length > 0) {
      $.each(textSection, function (index, val) {
        let currentSection = $(this);
        sectionTextOptimize.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionTextOptimize.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationPin: function(parentElement, index){
    let triggerHook = () =>{
      if(!commonSetting.isMobile()){
        return "0.2";
      }else{
        return "0.6";
      }
    }
    sectionTextOptimize.initVariable[index] = new ScrollMagic.Scene({
      triggerElement: parentElement[0],
      offset: 0,
      duration: 0,
      triggerHook: triggerHook()
    })
    .on("enter", function (e) {
      parentElement.find('.item-time').addClass('active');
      $.each(parentElement.find('.time-optimize'), function(index, el) {
        const numberEle = $(this)[0],
            duration = $(this).data('duration'),
            startNumber = $(this).data('start'),
            toNumber = $(this).data('to');
        sectionTextOptimize.runNumber(numberEle, startNumber, toNumber, duration);
      });
    })
    // .addIndicators({
    //   name: 'number-active-pin',
    //   indent: 30
    // })
    .addTo(centerController);
  },
  runNumber: function(numberEle, startNumber, toNumber, duration) {
      var od = new Odometer({
          el: numberEle,
          value: startNumber,
          duration: duration,
          format: 'd'
      });
      od.update(toNumber);
  },
  setupAnimation: function (parentElement, index) {
    if (!commonSetting.isMobile()) {
      if (parentElement.hasClass('animation-scroll-opt-mobile-set')) {
        if (typeof sectionTextOptimize.initVariable[index] !== 'undefined') {
          sectionTextOptimize.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-opt-mobile-set');
      }
      if (!parentElement.hasClass('animation-scroll-opt-set')) {
        sectionTextOptimize.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-opt-set');
      }
    }else{
      if (parentElement.hasClass('animation-scroll-opt-set')) {
        if (typeof sectionTextOptimize.initVariable[index] !== 'undefined') {
          sectionTextOptimize.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-opt-set');
      }
      if (!parentElement.hasClass('animation-scroll-opt-mobile-set')) {
        sectionTextOptimize.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-opt-mobile-set');
      }

    }

  }
};
const sectionMoreReal = {
  initVariable: [],
  init: function () {
    var lightSection = $('.section-more-real .content-item');
    if (lightSection.length > 0) {
      $.each(lightSection, function (index, val) {
        var currentSection = $(this);
        sectionMoreReal.setupAnimation(currentSection, index);
        $(window).resize(function () {
          sectionMoreReal.setupAnimation(currentSection, index);
        });
      });
    }
  },
  animationPin: function(parentElement, index){
    let triggerHook = () =>{
      if(!commonSetting.isMobile()){
        return "0.2";
      }else{
        return "0.5";
      }
    }
    sectionMoreReal.initVariable[index] = new ScrollMagic.Scene({
      triggerElement: parentElement.find('.bg-block')[0],
      offset: 0,
      duration: 0,
      triggerHook: triggerHook()
    })
    .on("enter", function (e) {
      parentElement.addClass('active');
    })
    // .on("leave", function (e) {
    //   parentElement.removeClass('active');
    // })
    // .addIndicators({
    //   name: 'active-pin',
    //   indent: 30
    // })
    .addTo(centerController);
  },
  setupAnimation: function (parentElement, index) {
    if (!commonSetting.isMobile()) {
      if (parentElement.hasClass('animation-scroll-active-mobile-set')) {
        if (typeof sectionMoreReal.initVariable[index] !== 'undefined') {
          sectionMoreReal.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-active-mobile-set');
      }
      if (!parentElement.hasClass('animation-scroll-active-set')) {
        sectionMoreReal.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-active-set');
      }
    }else{
      if (parentElement.hasClass('animation-scroll-active-set')) {
        if (typeof sectionMoreReal.initVariable[index] !== 'undefined') {
          sectionMoreReal.initVariable[index].destroy(true);
        }
        parentElement.removeClass('animation-scroll-active-set');
      }
      if (!parentElement.hasClass('animation-scroll-active-mobile-set')) {
        sectionMoreReal.animationPin(parentElement, index);
        parentElement.addClass('animation-scroll-active-mobile-set');
      }

    }
    
  }
};



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
  fullHeight.init();
  modalVideo.init();
  fixWidows.init();
  lazyLoadImg.init();
  productCarousel.init();

  sectionTrackerRobot.init();
  sectionTrackerSmaller.init();
  sectionTrackerLighter.init();
  sectionTrackerBattery.init();
  sectionTextOptimize.init();
  sectionMoreReal.init();


};
