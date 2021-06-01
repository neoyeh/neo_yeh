'use strict';

var _turnOnIndicators = false,
  autoVideoMagicScene,
  viewZoomPinAnimationScrollMagicScene,
  viewZoomClassAnimationScrollMagicScene,
  lightAnimationScrollMagicScene,
  lightAnimationScrollMagicSceneMobile;

var controller = new ScrollMagic.Controller({
  loglevel: 0,
  addIndicators: _turnOnIndicators
});

var enterController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onEnter'
  }
});

var leaveController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
});

var centerController = new ScrollMagic.Controller({
  addIndicators: _turnOnIndicators,
  globalSceneOptions: {}
});

var commonSetting = function () {
  var commonSetting = {
    mobileMaxReserlution: function mobileMaxReserlution() {
      return 767.98;
    },
    tabletMaxReserlution: function mobileMaxReserlution() {
      return 991.98;
    },
    isRtl: function isRtl() {
      if ($('body').hasClass('rtl')) {
        return true;
      }
      return false;
    },
    isMobile: function isMobile() {
      if ($(window).width() <= commonSetting.mobileMaxReserlution()) {
        return true;
      }
      return false;
    },
    isTablet: function isMobile() {
      if ($(window).width() <= commonSetting.tabletMaxReserlution() && $(window).width() > commonSetting.mobileMaxReserlution()) {
        return true;
      }
      return false;
    },
    isDesktop: function isMobile() {
      if ($(window).width() > commonSetting.tabletMaxReserlution()) {
        return true;
      }
      return false;
    },
    updateScrollPosition: function updateScrollPosition(sectionObj, scene) {
      var positionArray = commonSetting.getScrollDurationPosition(sectionObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
    },
    updateScrollDurationPosition: function updateScrollDurationPosition(sectionObj, scene) {
      var positionArray = commonSetting.getScrollDurationPosition(sectionObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
      scene.duration(bottomTrigger);
    },
    updateMobileScrollDurationPosition: function updateMobileScrollDurationPosition(sectionObj, scene) {
      var positionArray = commonSetting.getMobileScrollDurationPosition(sectionObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
      scene.duration(bottomTrigger);
    },
    getScrollDurationPosition: function getScrollDurationPosition(sectionObj) {
      var topTrigger = 0,
        bottomTrigger = 0,
        defaultTop = 5,
        defaultBottom = 5,
        sectionHeight = sectionObj.outerHeight();

      if (typeof sectionObj.data('top-trigger-percentage') !== 'undefined') {
        defaultTop = sectionObj.data('top-trigger-percentage');
        topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
      }
      if (typeof sectionObj.data('bottom-trigger-percentage') !== 'undefined') {
        defaultBottom = sectionObj.data('bottom-trigger-percentage');
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      }
      return [topTrigger, bottomTrigger];
    },
    getMobileScrollDurationPosition: function getMobileScrollDurationPosition(sectionObj) {
      var topTrigger = 0,
        bottomTrigger = 0,
        defaultTop = 5,
        defaultBottom = 5,
        sectionHeight = sectionObj.outerHeight();

      if (typeof sectionObj.data('m-top-trigger-percentage') !== 'undefined') {
        defaultTop = sectionObj.data('m-top-trigger-percentage');
        topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
      }
      if (typeof sectionObj.data('m-bottom-trigger-percentage') !== 'undefined') {
        defaultBottom = sectionObj.data('m-bottom-trigger-percentage');
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      }
      return [topTrigger, bottomTrigger];
    }
  };
  return commonSetting;
}();

/*= ========================================================
=       Info bar related                                  =
========================================================= */
var infoBar = function () {
  var infoBar = {
    init: function init() {
      if ($('.info-bar').length > 0) {
        infoBar.setupSticky();
        infoBar.switchItemSelected();
        infoBar.switchSpecSelected();
        infoBar.setupToggleMenu();
        setTimeout(function () {
          infoBar.setupScrollToTab();
        }, 100);
      }
    },
    switchSpecSelected: function switchSpecSelected() {
      setTimeout(function () {
        var scene = new ScrollMagic.Scene({
            triggerElement: '.section-spec-wrapper',
            duration: $('.section-spec-wrapper').height() - 1
          }).setClassToggle('.scroll-btn_spec', 'selected')
          // .addIndicators({ name: 'each section', indent: 30 }) // add indicators (requires plugin)
          .addTo(centerController);
        // scene.removeIndicators();
      }, 1000);
    },
    switchItemSelected: function switchItemSelected() {
      setTimeout(function () {
        $('.scroll-btn').each(function (index, el) {
          var tagName = $(this).data('scroll-to');
          var scene = new ScrollMagic.Scene({
              triggerElement: '.tab-group_' + tagName,
              duration: $('.tab-group_' + tagName).height() - 1
            }).setClassToggle('.scroll-btn_' + tagName, 'selected')
            // .addIndicators({ name: 'each section', indent: 30 }) // add indicators (requires plugin)
            .addTo(centerController);
          // scene.removeIndicators();
        });
      }, 1000);
    },
    setupSticky: function setupSticky() {
      // init controller
      var scene = new ScrollMagic.Scene({
        triggerElement: '.info-bar',
        triggerHook: 'onLeave'
      }).setPin('.info-bar', {
        pushFollowers: true,
        spacerClass: 'custome-id-pin-info-bar'
      }).addTo(controller);
      var $headerDiv = $('.info-bar');
      var $rowDiv = $(window);
      if ($('body').hasClass('rtl')) {
        $rowDiv.scroll(function (e) {
          if ($headerDiv.css('position') === 'fixed') {
            $headerDiv.css({
              left: 'auto',
              right: $rowDiv.scrollLeft() + 'px'
            });
          } else {
            $headerDiv.css({
              left: 'auto',
              right: '0px'
            });
          }
        });
      } else {
        $rowDiv.scroll(function (e) {
          if ($headerDiv.css('position') === 'fixed') {
            $headerDiv.css({
              left: -$rowDiv.scrollLeft() + 'px'
            });
          } else {
            $headerDiv.css({
              left: '0px'
            });
          }
        });
      }
    },
    setupScrollToTab: function setupScrollToTab() {
      $('.scroll-btn').on('click', function (event) {
        event.preventDefault();
        if (!$(this).hasClass('selected')) {
          var scrollToItem = $(this).data('scroll-to'),
            scrollPosition = 0,
            triggerAnimation = $(this).hasClass('trigger-animation');
          if (typeof scrollToItem !== 'undefined') {
            $('.scroll-btn').removeClass('selected');
            // console.log('triggerAnimation=', triggerAnimation);
            if (triggerAnimation) {
              scrollPosition = $('#' + scrollToItem).offset().top - $('.info-bar').height();
            } else {
              scrollPosition = $('#' + scrollToItem).offset().top - $('.info-bar').height();
            }

            $('.tab-group').css('visibility', 'hidden');

            $('html, body').animate({
              scrollTop: scrollPosition
            }, 500, function () {
              $('.tab-group').css('visibility', 'visible');
            });

            $('.info-bar').find('.m-toggle-menu').text($(this).text());

            $(this).addClass('selected');
            infoBar.toggleMenu();
          }
        }
      });
    },
    setupToggleMenu: function setupToggleMenu() {
      $('.m-toggle-menu').on('click', function (event) {
        event.preventDefault();
        infoBar.toggleMenu();
      });
    },
    toggleMenu: function toggleMenu() {
      $('.m-toggle-menu').toggleClass('active');
      $('.scroll-btn-group').toggleClass('show');
    }
  };
  return infoBar;
}();

/*= ========================================================
=       Section: Banner modal video                       =
========================================================= */
var modalVideo = function () {
  var modalVideo = {
    init: function init() {
      var modalVideoBlock = $('.section__watch-video .modal-video');
      if (modalVideoBlock.length > 0) {
        $.each(modalVideoBlock, function (index, val) {
          /* iterate through array or object */
          var currentSection = $(this),
            playBtn = $(this).find('.play-modal-video-btn'),
            videoType = playBtn.data('vtype'),
            videoId = playBtn.data('vid');
          playBtn.on('click', function (event) {
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
    setupCloseModalBtn: function setupCloseModalBtn() {
      $('.modal-overlap-container .btn-close').off('click').on('click', function (event) {
        event.preventDefault();
        /* Act on the event */
        modalVideo.hideModal();
      });
    },
    showModal: function showModal() {
      $('.modal-overlap-container').addClass('show');
      $('html, body').addClass('fixed');
    },
    hideModal: function hideModal() {
      $('.modal-overlap-container').removeClass('show');
      $('html, body').removeClass('fixed');
      $('.modal-overlap-container .align-center').html('<div id="player"></div>');
    }
  };
  return modalVideo;
}();

/*= ========================================================
=       Section: Single video                            =
========================================================= */
var videoScrollAndPlay = function () {
  var videoScrollAndPlay = {
    setupVideoSource: function setupVideoSource(parentElement) {
      // if (!commonSetting.isMobile()) {
      var sectionObj = parentElement,
        sectionDom = sectionObj[0];

      $.each(sectionObj.find('video'), function (index, el) {
        var videoObj = $(this),
          videoDom = videoObj[0],
          videoPoster = videoObj.data('poster-path'),
          videoPath = videoObj.data('video-path'),
          offset = -700,
          forceVideoPreload = videoObj.data('force-preload');

        if (commonSetting.isMobile()) {
          videoPoster = videoObj.data('m-poster-path');
        }

        videoObj.attr('poster', videoPoster);

        if (typeof forceVideoPreload !== 'undefined' && forceVideoPreload === 'yes') {
          videoDom.pause();
          videoDom.src = videoPath;
          videoDom.load();
          videoObj.addClass('loaded');
        } else {
          var scene = new ScrollMagic.Scene({
            triggerElement: sectionDom,
            offset: offset
          }).addTo(controller).on('enter', function (e) {
            if (e.type === 'enter' && !videoObj.hasClass('loaded')) {
              videoDom.pause();
              videoDom.src = videoPath;
              videoDom.load();
              videoObj.addClass('loaded');
            }
          });
        }

        videoDom.addEventListener('loadeddata', function () {
          videoScrollAndPlay.setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom);
        }, false);
      });
      // }
    },
    getPosition: function getPosition(sectionObj, videoObj) {
      var topTrigger = 0,
        bottomTrigger = 0,
        defaultTop = void 0,
        defaultBottom = void 0,
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
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      }

      return [topTrigger, bottomTrigger];
    },
    updatePosition: function updatePosition(sectionObj, videoObj, scene) {
      var positionArray = videoScrollAndPlay.getPosition(sectionObj, videoObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
      scene.duration(bottomTrigger);
    },
    setupScrollAndPlay: function setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom) {
      var scene = void 0,
        videoLoop = videoObj.data('loop'),
        playOnce = videoObj.data('play-once'),
        positionArray = videoScrollAndPlay.getPosition(sectionObj, videoObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1],
        videoHeight = videoObj.outerHeight(),
        sectionHeight = sectionObj.outerHeight();
      scene = new ScrollMagic.Scene({
        triggerElement: sectionDom,
        offset: topTrigger,
        duration: bottomTrigger
      }).addTo(controller).on('enter leave', function (e) {
        switch (e.type) {
          case 'enter':
            if (videoObj.hasClass('loaded') && !videoObj.hasClass('playing')) {
              var promise = videoDom.play();

              if (promise !== undefined) {
                promise.catch(function (error) {
                  // Auto-play was prevented
                  // Show a UI element to let the user manually start playback
                }).then(function () {
                  // Auto-play started
                  videoObj.addClass('playing'); // Play once
                });
              }
            }
            break;
          case 'leave':
            if (typeof playOnce === 'undefined' || playOnce !== 'yes') {
              if (typeof videoLoop === 'undefined' || videoLoop !== 'no') {
                videoDom.pause();
                videoObj.removeClass('playing');
              }
            }

            break;
        }
      });

      // scene.addIndicators({
      //     name: `scroll (sHeight:${sectionHeight} | vHeight:${videoHeight} | offset:${topTrigger} | duration:${bottomTrigger})`,
      // });
      //
      // scene.removeIndicators();

      videoDom.addEventListener('ended', function () {
        if (typeof playOnce !== 'undefined' && playOnce === 'yes') {
          videoObj.addClass('playing');
        } else if (typeof loop !== 'undefined' && loop === 'no') {
          videoObj.removeClass('playing');
        } else if (videoObj.hasClass('playing')) {
          videoObj.attr('loop', 'loop');
          videoDom.play();
        }
      }, false);
      $(window).resize(function (event) {
        /* Act on the event */
        videoScrollAndPlay.updatePosition(sectionObj, videoObj, scene);
      });
    }
  };
  return videoScrollAndPlay;
}();

var mouseScrollAndPlay = function () {
  var mouseScrollAndPlay = {
    setupVideoSource: function setupVideoSource(parentElement) {
      // if (!commonSetting.isMobile()) {
      var sectionObj = parentElement,
        sectionDom = sectionObj[0];

      $.each(sectionObj.find('video'), function (index, el) {
        var videoObj = $(this),
          videoDom = videoObj[0],
          videoPoster = videoObj.data('poster-path'),
          videoPath = videoObj.data('video-path'),
          offset = -700,
          forceVideoPreload = videoObj.data('force-preload');

        videoObj.attr('poster', videoPoster);

        if (typeof forceVideoPreload !== 'undefined' && forceVideoPreload === 'yes') {
          videoDom.pause();
          videoDom.src = videoPath;
          videoDom.load();
          videoObj.addClass('loaded');
        } else {
          var scene = new ScrollMagic.Scene({
            triggerElement: sectionDom,
            offset: offset
          }).addTo(controller).on('enter', function (e) {
            if (e.type === 'enter' && !videoObj.hasClass('loaded')) {
              videoDom.pause();
              videoDom.src = videoPath;
              videoDom.load();
              videoObj.addClass('loaded');
            }
          });
        }

        videoDom.addEventListener('loadeddata', function () {
          mouseScrollAndPlay.setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom);
        }, false);
      });
      // }
    },
    getPosition: function getPosition(sectionObj, videoObj) {
      var topTrigger = 0,
        bottomTrigger = 0,
        defaultTop = void 0,
        defaultBottom = void 0,
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
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      } else {
        defaultTop = 12;
        defaultBottom = 42;
        // if (typeof videoObj.data('top-trigger-playing') !== 'undefined') {
        //     defaultTop = videoObj.data('top-trigger-playing');
        // }
        topTrigger = parseInt(sectionHeight * (defaultTop / 100), 10);
        // if (typeof videoObj.data('bottom-trigger-playing') !== 'undefined') {
        //     defaultBottom = videoObj.data('bottom-trigger-playing');
        // }
        bottomTrigger = sectionHeight - parseInt(sectionHeight * (defaultBottom / 100), 10) - topTrigger;
      }

      return [topTrigger, bottomTrigger];
    },
    updatePosition: function updatePosition(sectionObj, videoObj, scene) {
      var positionArray = mouseScrollAndPlay.getPosition(sectionObj, videoObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1];
      scene.offset(topTrigger);
      scene.duration(bottomTrigger);
    },
    setupScrollAndPlay: function setupScrollAndPlay(sectionObj, sectionDom, videoObj, videoDom) {
      var scene = void 0,
        scrollpos = 0,
        lastpos = 0,
        videoLoop = videoObj.data('loop'),
        playOnce = videoObj.data('play-once'),
        positionArray = mouseScrollAndPlay.getPosition(sectionObj, videoObj),
        topTrigger = positionArray[0],
        bottomTrigger = positionArray[1],
        videoHeight = videoObj.outerHeight(),
        sectionHeight = sectionObj.outerHeight();
      scene = new ScrollMagic.Scene({
        triggerElement: sectionDom,
        offset: topTrigger,
        duration: bottomTrigger
      }).addTo(controller).on('enter leave progress', function (e) {
        switch (e.type) {
          case 'progress':
            // console.log('e.progress=', e.progress, '|videoDom.duration=', videoDom.duration);
            scrollpos = e.progress;
            break;
          case 'enter':
            break;
          case 'leave':
            break;
        }
      });

      setInterval(function () {
        if (lastpos === scrollpos) return;
        requestAnimationFrame(function () {
          videoDom.currentTime = videoDom.duration * scrollpos;
          videoDom.pause();
          lastpos = scrollpos;
          // console.log('video.videoDom=', videoDom.currentTime, '|scrollpos=', scrollpos);
        });
      }, 30);

      // scene.addIndicators({
      //     name: `scroll (sHeight:${sectionHeight} | vHeight:${videoHeight} | offset:${topTrigger} | duration:${bottomTrigger})`,
      // });
      //
      // scene.removeIndicators();

      videoDom.addEventListener('ended', function () {
        if (typeof playOnce !== 'undefined' && playOnce === 'yes') {
          videoObj.addClass('playing');
        } else if (typeof loop !== 'undefined' && loop === 'no') {
          videoObj.removeClass('playing');
        } else if (videoObj.hasClass('playing')) {
          videoObj.attr('loop', 'loop');
          videoDom.play();
        }
      }, false);
      $(window).resize(function (event) {
        /* Act on the event */
        mouseScrollAndPlay.updatePosition(sectionObj, videoObj, scene);
      });
    }
  };
  return mouseScrollAndPlay;
}();

var singleVideo = (function () {
  var singleVideo = {
    init: function () {
      var playVideoSection = $('.single__video-scroll-and-play');
      if (playVideoSection.length > 0) {
        $.each(playVideoSection, function (index, el) {
          let sectionObj = $(this),
            videoBlock = sectionObj.find('.video-block');
          videoScrollAndPlay.setupVideoSource(videoBlock);
        });
      }
    },
  };

  return singleVideo;
}());

/*= ========================================================
=       Section: VIEW ZOOM                        =
========================================================= */
var viewZoomAnimation = (function () {
  'use strict';

  var viewZoomAnimation = {
    init: function () {
      var viewZoomSection = $('.section__view-zoom-animation');
      if (viewZoomSection.length > 0) {
        $.each(viewZoomSection, function (index, val) {
          var currentSection = $(this);
          viewZoomAnimation.setupAnimation(currentSection);
          $(window).resize(function () {
            viewZoomAnimation.setupAnimation(currentSection);
          });
        });
      }
    },
    setupAnimation: function (parentElement) {
      if (!commonSetting.isMobile()) {
        if (!parentElement.hasClass('animation-set-pin')) {
          viewZoomPinAnimationScrollMagicScene = new ScrollMagic.Scene({
              triggerElement: parentElement[0],
              offset: 0,
              duration: '70%',
            })
            .setPin(parentElement[0], {
              pushFollowers: true,
            })
            // .addIndicators({
            //   name: 'view-zoom',
            //   indent: 30
            // })
            .addTo(leaveController);

          parentElement.addClass('animation-set-pin');
        }

      } else {

        if (parentElement.hasClass('animation-set-pin')) {
          if (typeof viewZoomPinAnimationScrollMagicScene !== 'undefined') {
            viewZoomPinAnimationScrollMagicScene.destroy(true);
            parentElement.removeClass('animation-set-pin');
          }
        }
      }

      var offset = (!commonSetting.isMobile())?(parentElement.outerHeight() * 0.8):(parentElement.outerHeight() * .4);
      if(!parentElement.hasClass('animation-set-class')){
        viewZoomClassAnimationScrollMagicScene = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: offset,
          duration: "200%"
        })
        .setClassToggle(parentElement[0], "active")
        // .addIndicators({
        //   name: 'view-zoom-class',
        //   indent: 0
        // })
        .addTo(centerController);

        parentElement.addClass('animation-set-class');
      }else{
        viewZoomClassAnimationScrollMagicScene.offset(offset);
      }

    }
  };

  return viewZoomAnimation;
}());



/*= ========================================================
=       Section: light animation                     =
========================================================= */
var lightAnimation = (function () {
  'use strict';

  var lightAnimation = {
    init: function () {

      var lightSection = $('.section__light-animation');
      if (lightSection.length > 0) {
        $.each(lightSection, function (index, val) {
          var currentSection = $(this);
          lightAnimation.setupAnimation(currentSection);
          $(window).resize(function () {
            lightAnimation.setupAnimation(currentSection);
          });
        });
      }
    },
    setupAnimation: function (parentElement) {

      if (!parentElement.hasClass('animation-set')) {
        var vh = parentElement.innerHeight()/2;
        lightAnimationScrollMagicScene = new ScrollMagic.Scene({
            triggerElement: parentElement[0],
            offset: vh,
          })
          .on("enter", function (e) {
            parentElement.addClass('active');
          })
          .on("leave", function (e) {
            parentElement.removeClass('active');
          })
          // .addIndicators({
          //   name: 'light',
          //   indent: 30
          // })
          .addTo(centerController);
        
        parentElement.addClass('animation-set');
      }


    }
  };

  return lightAnimation;
}());

var autoPlayVideo = (function () {
  'use strict';

  var autoPlayVideo = {
    init: function () {

      let $video = $('.section__auto-video video');
      $video.on("timeupdate", function(event){
        onTrackedVideoFrame(this.currentTime, this.duration, $(this));
      });
      function onTrackedVideoFrame(currentTime, duration, ele){
        // console.log("======V======")
        // console.log(currentTime)
        // console.log(duration)
        if(currentTime + 2 >= duration){
          ele.siblings('.caption-block').addClass('active')
        }else{
          ele.siblings('.caption-block').removeClass('active')
        }
      }

      var autoVideoSection = $('.section__auto-video');
      if (autoVideoSection.length > 0) {
        $.each(autoVideoSection, function (index, val) {
          var currentSection = $(this);
          autoPlayVideo.setupAnimation(currentSection);
          $(window).resize(function () {
            autoPlayVideo.setupAnimation(currentSection);
          });
        });
      }

      
    },
    setupAnimation: function (parentElement) {
      if (!parentElement.hasClass('animation-set')) {
        autoVideoMagicScene = new ScrollMagic.Scene({
          triggerElement: parentElement[0],
          offset: 0,
          duration: "50%",
        })
        .on("enter leave", function (e) {
          // console.log(e.type == "enter" ? "inside" : "outside")
          if(e.type === "enter"){
            parentElement.find('video')[0].play()
          }else{
            parentElement.find('video')[0].pause()
          }
        })
        // .addIndicators({
        //   name: 'video',
        //   indent: 30
        // })
        .addTo(centerController);

       

        parentElement.addClass('animation-set');
      }
    }
  };

  return autoPlayVideo;
}());

var lazyLoadImg = (function () {
  'use strict';
  
  var lazyLoadImg = {
    init: function () {
      if (typeof LazyLoad !== 'undefined') {
        //Ref: https://github.com/verlok/lazyload
        var lazyLoadInstance = new LazyLoad({
          elements_selector: ".lazy-img"
        });
      }
    }
  };

  return lazyLoadImg;
}());


var resizeViewSection = (function () {
  'use strict';

  var resizeViewSection = {
    init: function () {
      let window_width = $(window).innerWidth();
      if(window_width>=768){
        let secion_height = $('.custom-id-view').innerHeight();
        let title_min_PT = 100;
        let title_PT = parseFloat($('.custom-id-view .caption-block').css("padding-top"));
        let title_height = $('.custom-id-view .caption-block').innerHeight() - title_PT ;
        let boxWidth = (window_width>=1200) ? 1000 : window_width*(5/6);
        let boxHeight = (window_width>=1200) ? 560 : window_width*(7/15);
        let center_def_height = title_height + boxHeight + 60;

        let isDefBox = (secion_height> (center_def_height+title_min_PT*2) );
        let title_top = (isDefBox) ? (secion_height-center_def_height)/2 : title_min_PT;
        boxHeight = (isDefBox) ? boxHeight : secion_height - (title_height + title_top*2 + 60);
        let center_height = (isDefBox) ? center_def_height : title_height + boxHeight + 60;
        $('.custom-id-view .caption-block').css({"padding-top":title_top})
        $('.custom-id-view .bg-block').css({
          "clip": "rect("+(title_top+title_height+60)+"px,"+(window_width/2+boxWidth/2)+"px,"+(title_top+center_height)+"px,"+(window_width/2-boxWidth/2)+"px)"
        });
        // console.log(title_top)
        // console.log( secion_height - (center_def_height+title_min_PT*2))
        // console.log( ((window_width/2+boxWidth/2)-(window_width/2-boxWidth/2)) +":"+ ((title_top+center_height)-(title_top+title_height+60)) );
      }else{
        let c_l = window_width * 0.15;
        let c_r = window_width * 0.85;
        let c_t = window_width/3*2 * 0.15;
        let c_b = window_width/3*2 * 0.85;
        // clip: rect(293px, calc(50vw+400px), 743px, calc(50vw-400px));
        // clip: rect(293px, c_r, 743px, c_l);
        $('.custom-id-view .bg-block').css({
          "clip": "rect("+c_t+"px,"+c_r+"px,"+c_b+"px,"+c_l+"px)"
        });
      }
    }
  };

  return resizeViewSection;
}());

$(window).resize(function(){
  resizeViewSection.init();
})

$(document).ready(function () {
  lazyLoadImg.init();
});

$(window).load(function () {
  /* Fix AU site popup */
  if ($('.signup-popup-container').length > 0) {
    $('.signup-popup-container').remove();
    $('body').removeClass('fixed');
  }
  infoBar.init();
  modalVideo.init();
  singleVideo.init();
  autoPlayVideo.init();
  resizeViewSection.init();
  viewZoomAnimation.init();
  lightAnimation.init();
});

/*= ========================================================
=       Detect Youtube or Youku plugin                    =
========================================================= */
var youkuVideo = function () {
  var youkuVideo = {
    init: function init(vid) {
      var player = void 0;
      // youkuVideo.resetPlayerHeight();
      player = new YKU.Player('player', {
        styleid: '0',
        client_id: '2a8fda48fc709b73',
        vid: vid,
        newPlayer: false,
        autoplay: true,
        show_related: false,
        events: {
          onPlayEnd: function onPlayEnd() {
            modalVideo.hideModal();
          },
          onPlayStart: function onPlayStart() {
            // youkuVideo.resetPlayerHeight();
            modalVideo.showModal();
            modalVideo.setupCloseModalBtn();
          }
        }
      });
      // $(window).resize(function(event) {
      //      Act on the event
      //     youkuVideo.resetPlayerHeight();
      // });
    },
    resetPlayerHeight: function resetPlayerHeight() {
      if ($('.player-container').data('vtype') === 'youku') {
        $('#player').height($('picture').height());
      }
    }
  };
  return youkuVideo;
}();

var youtubeVideo = function () {
  var youtubeVideo = {
    init: function init(vid) {
      var player = void 0;

      function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: vid,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      }

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
      onYouTubePlayerAPIReady();
    }
  };
  return youtubeVideo;
}();
(function ($) {
  $.fn.videobject = function (callerSettings) {
    var settings = $.extend({
      // flash: '<object width="mywidth" height="myheight" type="application/x-shockwave-flash" data="myurl" id="youku_player" style="visibility: visible;"><param name="quality" value="high"><param name="wmode" value="opaque"><param name="allowScriptAccess" value="always"><param name="SCALE" value="exactfit"><param name="flashvars" value="playMovie=true&isAutoPlay=true"></object>',
      flash: '<iframe width="mywidth" height="myheight" src="myurl" frameborder="0" allowfullscreen></iframe>',
      id: 'XMTcwMDMxNTA4',
      url: 'youtube',
      width: '500',
      height: '282',
      warning: 'You need Flash Player enabled.'
    }, callerSettings || {});
    var checkFlash = function checkFlash() {
      // checks if flash is installed/enabled on the browser
      var hasFlash = false;
      try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
          hasFlash = true;
        }
      } catch (e) {
        if (navigator.mimeTypes['application/x-shockwave-flash'] !== undefined) {
          hasFlash = true;
        }
      }
      return hasFlash;
    };
    var showvideo = function showvideo(uri) {
      var okFlash = true,
        yk = void 0,
        ytb = 'http' + (/^https/.test(location.protocol) ? 's' : '') + '://www.youtube.com/embed/myid?autoplay=1&wmode=opaque';
      if ($('html').hasClass('desktop')) {
        okFlash = checkFlash();
        yk = 'http://static.youku.com/v/swf/qplayer.swf?VideoIDS=myid=&isAutoPlay=true&isShowRelatedVideo=false&embedid=-&showAd=0';
      } else {
        // yk = 'http://player.youku.com/embed/myid';
        yk = 'http://static.youku.com/v1.0.0149/v/swf/loader.swf?VideoIDS=myid&quality=high&isAutoPlay=true&winType=adshow';
      }
      if (okFlash) {
        // youku or youtube
        if (uri.length === 11) {
          // Youtube
          settings.id = ytb.replace(/myid/, uri);
        } else {
          // Youku
          settings.id = yk.replace(/myid/, uri);
          settings.flash = "<embed src='myurl' allowFullScreen='true' quality='high' width='mywidth' height='myheight' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>";
        }
        return uri === 'youku' ? settings.flash.replace(/myurl/, settings.id).replace(/mywidth/, settings.width).replace(/myheight/, settings.height) : settings.flash.replace(/myurl/, settings.id).replace(/mywidth/, settings.width).replace(/myheight/, settings.height);
      }
      return settings.warning;
    };
    return this.empty().html(showvideo(settings.id));
  };
})(jQuery);