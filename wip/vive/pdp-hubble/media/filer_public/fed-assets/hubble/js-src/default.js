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
  init(){
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
=       Section: fade wording                            =
========================================================= */
const fadeInAnimate = (function () {
  'use strict';

  var fadeInAnimate = {
    init: function () {
      var imageSection = $('.hubble-20-page .section-scroll-toggle-active');
      if (imageSection.length > 0) {
        $.each(imageSection, function (index, val) {
          var currentSection = $(this);
          fadeInAnimate.setupAnimation(currentSection);
        });
      }
    },
    setupAnimation: function (parentElement) {
      if(parentElement.find('.center-line').length>0){
        const triggerHook = {
          d:(typeof(parentElement.data('trigger-hook'))==="number")?parentElement.data('trigger-hook'):0.05,
          m:(typeof(parentElement.data('trigger-hook-m'))==="number")?parentElement.data('trigger-hook-m'):0.65,
        }
        const fadeInAnimateScrollMagicScene = new ScrollMagic.Scene({
          triggerElement: parentElement.find('.center-line')[0],
          offset: 0,
          // triggerHook: (!commonSetting.isMobile())?triggerHook.d:triggerHook.m,
        }).on('enter leave', (e) => {
          if(e.type === 'enter'){
            parentElement.addClass('active');
          }else if(e.type === 'leave'){
            parentElement.removeClass('active');
          };
        })
        // .addIndicators({
        //   name: 'fadein',
        //   indent: 30
        // })
        .addTo(centerController);


        // $(window).resize(function () {
        //   fadeInAnimateScrollMagicScene.triggerHook((!commonSetting.isMobile())?triggerHook.d:triggerHook.m);
        // });
      };

    }
  };

  return fadeInAnimate;
}());


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
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-prev-vive-flow' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>",
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-next-vive-flow' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>"
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
=       Section: accessoryCarousel                           =
========================================================= */
const accessoryCarousel = (function(){
  const accessoryCarousel = {
    init(){
      const carouselArea =  $('.accessory-carousel-area');
      if(carouselArea.length>0){
        $.each(carouselArea, function (index, val) {
          const currentArea = $(this);
          accessoryCarousel.setupCarousel(currentArea);
        });
      };
    },
    setupCarousel(currentArea){
      const allCarousel = currentArea.find('.accessory-carousel-item').length > 3;
      if( allCarousel ){
        accessoryCarousel.initCarousel(currentArea);
      }else{
        if(commonSetting.isMobile()){
          // console.log('init c');
          currentArea.addClass('init-carousel');
          accessoryCarousel.initCarousel(currentArea);
        };

        $(window).resize(function(){
          if(commonSetting.isMobile()){
            if(!currentArea.hasClass('init-carousel')){
              // console.log('init c');
              currentArea.addClass('init-carousel');
              accessoryCarousel.initCarousel(currentArea);
            };
          }else{
            if(currentArea.hasClass('init-carousel')){
              // console.log('destory c');
              currentArea.removeClass('init-carousel');
              currentArea.owlCarousel('destroy');
            };
          };
        });
      };
    },
    initCarousel(currentArea){
      let rtl = false;
      if($('html').attr('dir') === 'rtl'){
        rtl = true;
      }
      currentArea.owlCarousel({
        rtl: rtl,
        loop: true,
        nav: true,
        navText : [
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-prev-focus3' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>",
          "<div data-event-category='pdp' data-event-action='click-arrow' data-event-label='arrow-next-focus3' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>"
        ],
        dots: true,
        autoWidth:true,
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
  return accessoryCarousel;
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
          offset = -350,
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
            // .addIndicators({
            //   name: 'single video ',
            //   indent: 100
            // })
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
      if ($('.section-card-content, .section-scroll-toggle-active-video').length > 0) {
        $.each($('.section-card-content, .section-scroll-toggle-active-video'), function (index, el) {
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
=       Component: Fields Search Box
========================================================= */
const FieldsSearchBox = (function(){
  'use strict';
  const FieldsSearchBox = {
    init(){
      const inputBox = $('.fields-search-box');
      if (inputBox.length > 0) {
        $.each(inputBox, function (index, val) {
          const currentBox = $(this);
          FieldsSearchBox.setupStatus(currentBox);
        });
      }
      const inputBoxVR = $('.fields-search-box .input-box.input-box--plugVR');
      if (inputBoxVR.length > 0) {
        $.each(inputBoxVR, function (index, val) {
          const currentBox = $(this);
          FieldsSearchBox.setupSearchBox(currentBox);
        });
      }

      // toggle modal spec
      $('.item-toggle-btn').on('click', function(){
        $(this).closest('.f-toggle-item-top').siblings('.f-toggle-item-bottom').slideToggle(150);
        $(this).closest('.f-toggle-item').toggleClass('active');
      });
      $('.fields-modal-close, .fields-bg').on('click', function(){
        $(this).closest('.fields-search-modal.show-modal').removeClass('show-modal');
        $('body').css({
          "overflow":"initial",
          "overflow-x":"hidden"
        });
      });
    },
    setupStatus(currentBox){
      const input = currentBox.find('.input-box-input');
      const cancel = currentBox.find('.input-cancel');
      input.val('');
      function clearStatus(inputEle ,ele){
        if(inputEle.val()===''){
          ele.removeClass('input-box--enter');
        }else{
          ele.addClass('input-box--enter');
        };
      }
      input.on('input change', function(e){
        clearStatus($(this), $(this).closest('.input-box'));
      });
      cancel.on('click', function(){
        currentBox.find('.input-box-input').val('').trigger("change");
      });
      function changeActive(isTop, dataList){
        const linkLength = dataList.find('.dataitem').length;
        if( linkLength > 0 ){
          const index = dataList.find('.dataitem.active').index(); 
          // const t1 = isTop?linkLength-1:0;
          const t1 = isTop?index-1:index+1;
          const t2 = isTop?linkLength-1:0;
          dataList.find('.dataitem.active').removeClass('active');
          if(index === -1){
            dataList.find('.dataitem').eq(t2).addClass('active');
          }else if( t1 < 0 ){
            dataList.find('.dataitem').eq(linkLength-1).addClass('active');
          }else if( t1 === linkLength ){
            dataList.find('.dataitem').eq(0).addClass('active');
          }else{
            dataList.find('.dataitem').eq(t1).addClass('active');
          };
        };
      }
      input.on('keydown', function(e){
        const datalistDiv = $(this).siblings('.input-datalist');
        switch (e.keyCode) {
          case 27:
            // esc
            currentBox.find('.input-box-input').val('').trigger("change");
            break;
          case 38:
            // top
            e.preventDefault();
            changeActive(true, datalistDiv);
            break;
          case 40:
            // bottom
            e.preventDefault();
            changeActive(false, datalistDiv);
            break;
            
          default:
            
        };
      });
      input.on('blur', function(e){
        if($(this).val() === ''){
          clearStatus($(this), $(this).closest('.input-box'));
        };
      });
      input.closest('form').on('submit', function(e){
        e.preventDefault();
        if( $(this).find('.input-box-input').hasClass('input-box-input--page') ){
          currentBox.find('.fields-search-modal').addClass('show-modal');
          $('body').css({
            "overflow":"hidden"
          });
        };
        const datalistDiv = $(this).find('.input-datalist');
        // console.log('submit');
        // console.log(datalistDiv.find('.active'))

        // const device = datalistDiv.find('.active').data('name')?datalistDiv.find('.active').data('name'):datalistDiv.find('.dataitem').eq(0).data('name');
        const device = datalistDiv.find('.active').data('name')?datalistDiv.find('.active').data('name'):$(this).find('.input-box-input').val().trim();
        // console.log(device)
        if( device ){
          // console.log(device.toLowerCase());
          let inputJson = false;
          datalistDiv.find('.dataitem').each(function(e){
            if(device.toLowerCase() === $(this).data('name').toLowerCase()){
              // console.log('===')
              // console.log(device.toLowerCase());
              // console.log($(this).data('name').toLowerCase());
              const info = $(this).data('info');
              inputJson = JSON.parse(decodeURIComponent(info))['item'];

              return false;
            }
          });
          // console.log(inputJson);

          // const json = datalistDiv.find('.active').data('info')?datalistDiv.find('.active').data('info'):datalistDiv.find('.dataitem').eq(0).data('info');
          
          currentBox.find('.input-box-input').val(device).trigger("change");

          if(typeof dataLayer !== 'undefined'){
            dataLayer.push({'event':'click-event','eventCategory':'pdp','eventAction':'search-phone','eventLabel':`${device}`});
          };
          if(inputJson){
            // console.log(inputJson['VR_capability'])
            currentBox.find('.f-toggle-item .item--model-name').text( inputJson['Phone_model_name'] );
            currentBox.find('.f-toggle-item .item--vr').text( (inputJson['VR_capability']==='true')?'Yes':'No' );
            currentBox.find('.f-toggle-item .item--mirror').text( (inputJson['miracast_capability']==='true')?'Yes':'No' );
            currentBox.find('.f-toggle-item .item--drm').text( (inputJson['hdcp_capability']==='true')?'Yes':'No' );
            currentBox.find('.fields-modal-toggle-footer').hide();
          }else{
            currentBox.find('.input-box-input').val(device).trigger("change");
            currentBox.find('.f-toggle-item .item-text').text('N/A');
            currentBox.find('.f-toggle-item .item--model-name').text(device);
            currentBox.find('.fields-modal-toggle-footer').show();
          }
        }else{
          // console.log('no value');
          input.val('').trigger("change");      
          currentBox.find('.f-toggle-item .item-text').text('N/A');      
          currentBox.find('.f-toggle-item .item--model-name').text('');
        };
        currentBox.find('.input-datalist').hide();
        currentBox.find('.input-box-input').removeClass('active');
        $(this).find('.input-box-input').blur();
      });
      $(document).on('click', '.dataitem', function(e){
        e.preventDefault();
        // console.log('click')
        const form = $(this).closest('form');
        input.val($(this).data('name')).trigger("change");
        form.submit();
      });
      
    },
    setupSearchBox(currentBox){
      const getSearchResults = async () => {
        const timeVersion = Math.floor(Date.now() / 1000);
        const getResultshApi = `/media/filer_public/fed-assets/hubble/images/phone.json?v=${timeVersion}`;
        const resultshApi = await fetch(getResultshApi)
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then((response) => {
            currentBox.removeClass('hide-box');
            const options = {
              keys: ["Phone_model_name"],
              useExtendedSearch: true,
            }
            const fuse = new Fuse(response, options);
            const input = currentBox.find('input');
            const datalistDiv = currentBox.find('.input-datalist');
            let oldHtml = '';
            let oldValue = '';
            input.on('input change', function(){
              // console.log('input change')
              const value = $(this).val().trim();
              const newValue = `'${value.split(' ').join(' \'')}`;
              const result = fuse.search(newValue);
              if(value===''){
                oldHtml='';
                oldValue='';
                $(this).siblings('.input-cancel').addClass('input-cancel--search');
              }else{
                $(this).siblings('.input-cancel').removeClass('input-cancel--search');
              };
              if(result.length>0){
                let html = '';
                result.slice(0, 6).map((e)=>{
                  let name = e['item']['Phone_model_name'];
                  const info = encodeURIComponent(JSON.stringify(e));
                  const index = name.toLowerCase().indexOf(value.toLowerCase());
                  if( index !== -1 ){
                    const origin = name.slice(index, index+value.length);
                    const re = new RegExp(value,"ig");
                    name = name.replace(re,`<b>${origin}</b>`);
                  }
                  html+=`<a class="dataitem" data-name="${e['item']['Phone_model_name']}" data-info="${info}" href="#">${name}</a>`
                });
                if(oldHtml !== html && oldValue !== value){
                  oldHtml = html;
                  oldValue = value;
                  datalistDiv.html(html);
                }else{
                  // console.log('fail');
                }
                datalistDiv.show();
                input.addClass('active');
              }else{
                datalistDiv.html('');
                datalistDiv.hide();
                input.removeClass('active');
              }
            });
            
        });
      }
      getSearchResults();
    }
  }
   return FieldsSearchBox;
}());



/*= ========================================================
=       Section: change section                           =
========================================================= */
const changeSection = (function(){
  'use strict';
  const changeSection = {
    init(){
      const currentSection = $('.section-quick-setup');
      if( currentSection.length > 0){
        $.each(currentSection, function (index, val) {
          const currentBox = $(this);
          changeSection.setupAnimation(currentBox);
        });
      };
    },
    setupAnimation(parentElement){
      const duration = () => {
        if(!commonSetting.isMobile()){
          return $(window).innerHeight()*2.5;
        }else{
          return $(window).innerHeight()*2;
        }
      }
      let scene = new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        offset: 0,
        duration: duration,
      })
      .setPin(parentElement[0], {
        pushFollowers: true
      })
      .addTo(leaveController)
      // .addIndicators() // add indicators (requires plugin)
      .on("progress", function (e) {
        // console.log(e.progress*100)
        const progress = e.progress*100;
        if(progress<=33){
          parentElement.addClass('active-1').removeClass('active-2 active-3');
        }else if(progress>33&&progress<=66){
          parentElement.addClass('active-2').removeClass('active-1 active-3');
        }else{
          parentElement.addClass('active-3').removeClass('active-1 active-2');
        };
      });
    }
  };
  return changeSection;
}());


/*= ========================================================
=       Section: galleryCarousel                           =
========================================================= */

const galleryCarousel = (function () {
  'use strict';

  var galleryCarousel = {
    init: function () {
      var carouselObj = $('.section-gallery .owl-carousel');
      if (carouselObj.length > 0) {
        $.each(carouselObj, function (indexInArray, valueOfElement) {
          if (commonSetting.isMobile()) {
            galleryCarousel.setupMobileCarousel($(this), indexInArray);
          } else {
            galleryCarousel.setupCarousel($(this), indexInArray);
          }
          // random carousel
          const itemNum = $(this).find('.owl-item').not('.cloned').length;
          const idx = Math.floor(Math.random() * itemNum);
          $(this).trigger('to.owl.carousel', [idx]);
        });
      }
    },
    setupMobileCarousel: function (parentElement, indexInArray) {
      var fixOwl = function () {
        var $stage = parentElement.find('.owl-stage'),
            stageW = $stage.width(),
            $el = parentElement.find('.owl-item'),
          elW = 0;
        $stage.width(stageW + 3);
        lazyLoadImg.init();
      };
      

      parentElement.owlCarousel({
        rtl: commonSetting.isRtl(),
        navText: [
          `<i data-event-action="click-arrow" data-event-category="event-pdp" data-event-label="arrow-prev-part${indexInArray+1}-vivetalk" data-gtm="event-tracking" class="fa fa-angle-left"></i>`, 
          `<i data-event-action="click-arrow" data-event-category="event-pdp" data-event-label="arrow-next-part${indexInArray+1}-vivetalk" data-gtm="event-tracking" class="fa fa-angle-right"></i>`
        ],
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        onInitialized: fixOwl,
        onRefreshed: fixOwl
      });
    },
    setupCarousel: function (parentElement, indexInArray) {
      var fixOwl = function () {
        var $stage = parentElement.find('.owl-stage'),
            stageW = $stage.width(),
            $el = parentElement.find('.owl-item'),
          elW = 0;
        $stage.width(stageW + 100);
        lazyLoadImg.init();
      }

      console.log('commonSetting.isRtl=', commonSetting.isRtl());
      
      parentElement.owlCarousel({
        rtl: commonSetting.isRtl(),
        autoWidth:true,
        center: true,
        navText: [
          `<div data-event-action="click-arrow" data-event-category="event-pdp" data-event-label="arrow-prev-part${indexInArray+1}-vivetalk" data-gtm="event-tracking" class="round-bg"><i class="fa fa-angle-left"></i></div>`, 
          `<div data-event-action="click-arrow" data-event-category="event-pdp" data-event-label="arrow-prev-next${indexInArray+1}-vivetalk" data-gtm="event-tracking" class="round-bg"><i class="fa fa-angle-right"></i></div>`
        ],
        items: 3,
        loop: true,
        nav: true,
        dots: false,
        margin: 20,
        onInitialized: fixOwl,
        onRefreshed: fixOwl
      });
    }
  };

  return galleryCarousel;
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
    const modalVideoBlock = document.querySelectorAll('.section-gallery .box-video, .section-kv .box-video, .page-sub-header .box-video');
    if (modalVideoBlock) {
      modalVideoBlock.forEach((elem) => {
        const playBtn = elem.querySelector('.play-modal-video-btn');
        const videoType = playBtn.getAttribute('data-vtype');
        const videoId = playBtn.getAttribute('data-vid');
        playBtn.addEventListener('click', (event) => {
          event.preventDefault();
          // console.log('.box-video')
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
    const closeBg = document.querySelector('.modal-overlap-container .modal-overlap-bg');
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      modalVideo.hideModal();
    });
    closeBg.addEventListener('click', (event) => {
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
  fixWidows.init();
  fullHeight.init();
  subHeaderToggle.init();

  FieldsSearchBox.init();
  changeSection.init();
  galleryCarousel.init();
  fadeInAnimate.init();
  modalVideo.init();
  singleVideo.init();
  accessoryCarousel.init();
  lazyLoadImg.init();
  productCarousel.init();
});
