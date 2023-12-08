import './styles/default.scss';
import TypeMate from 'typemate';
import LazyLoad from 'vanilla-lazyload';
import 'picturefill';
import { gsap } from 'gsap';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';
// import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// eslint-disable-next-line import/no-unresolved
import ScrollMagic from 'ScrollMagic';
// import 'ScrollMagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
// fuzzy-search
import Fuse from 'fuse.js';
import settings from '../settings.json';

ScrollMagicPluginGsap(ScrollMagic, gsap);

// gsap.registerPlugin(ScrollTrigger);

const controller = new ScrollMagic.Controller({
  loglevel: 0,
});

// eslint-disable-next-line no-unused-vars
const enterController = new ScrollMagic.Controller({
  // addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onEnter',
  },
});

// eslint-disable-next-line no-unused-vars
const leaveController = new ScrollMagic.Controller({
  // addIndicators: _turnOnIndicators,
  globalSceneOptions: {
    triggerHook: 'onLeave',
  },
});

// eslint-disable-next-line no-unused-vars
const centerController = new ScrollMagic.Controller({
  // addIndicators: _turnOnIndicators,
  globalSceneOptions: {},
});

// eslint-disable-next-line no-unused-vars
const isDesktopView = true;

const commonSetting = {
  mobileMaxResolution() {
    return 991;
  },
  isRtl() {
    return $('body').hasClass('rtl');
  },
  isMobile() {
    return $(window).width() <= commonSetting.mobileMaxResolution();
  },
  forcePageReload() {
    // Force page reload when desktop and mobile switch
    if (
      $(window).width() <= commonSetting.mobileMaxResolution()
      && isDesktopView
    ) {
      window.location.reload();
    }
    if (
      $(window).width() > commonSetting.mobileMaxResolution()
      && !isDesktopView
    ) {
      window.location.reload();
    }
  },
};

const fixWidows = {
  init() {
    const siteList = [
      'us',
      'uk',
      'sg',
      'nz',
      'my-en',
      'mea-en',
      'in',
      'hk',
      'eu',
      'ca',
      'au',
    ];
    const prefix = $(document.querySelector('body')).attr('data-site');
    const detectString = '.text-fix-widow';
    if (siteList.indexOf(prefix) >= 0) {
      const contentElement = document.querySelectorAll(
        `.${settings.bodyClass}`,
      )[0];
      const typeMateInstance = new TypeMate(contentElement, {
        selector: detectString,
      });
      typeMateInstance.apply();
    }
  },
};

const lazyLoadImg = {
  init() {
    const lazyLoadOptions = {
      elements_selector: '.lazy-img',
      threshold: 1500,
    };
    // eslint-disable-next-line no-unused-vars
    const pageLazyLoad = new LazyLoad(lazyLoadOptions);
  },
};

/*= ========================================================
=       Section: intro video play                          =
========================================================= */
const playIntroVideo = (() => {
  const playIntroVideoCB = {
      init() {
          const section = $('.video-scroll-play');
          if (section.length > 0) {
              // eslint-disable-next-line func-names
              $.each(section, function (i) {
                  const currentSection = $(this);
                  playIntroVideo.setupAnimationScrollMagic(currentSection, i);
              });
          }
      },
      setupAnimationScrollMagic(parentElement) {
          let videoResponsive = '';
          function startVideo(elem) {
              const video = elem;
              // console.log("start");
              if (video) {
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                      // eslint-disable-next-line no-unused-vars
                      playPromise.then((_) => {
                          video.play();
                      });
                  }
              }
          }

          function stopVideo(elem) {
              const video = elem;
              // console.log("pause");
              if (video) {
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                      // eslint-disable-next-line no-unused-vars
                      playPromise.then((_) => {
                          video.pause();
                      });
                  }
              }
          }

          function initVideo(elem) {
              // console.log('init video')
              const isDesktop = !commonSetting.isMobile();
              videoResponsive = isDesktop ? 'desktop' : 'mobile';
              // console.log(videoResponsive)
              const video = elem;
              const $video = $(elem);
              const videoData = {
                  poster: $video.data('poster-path'),
                  video: $video.data('video-path'),
                  webm: $video.data('video-webm-path'),
                  posterT: $video.data('t-poster-path'),
                  videoT: $video.data('t-video-path'),
                  webmT: $video.data('t-video-webm-path'),
              };
              $video.attr('poster', isDesktop ? videoData.poster : videoData.posterT);
              $video.find('.webm').attr('src', isDesktop ? videoData.webm : videoData.webmT);
              $video.find('.mp4').attr('src', isDesktop ? videoData.video : videoData.videoT);

              const playPromise = video.load();
              if (playPromise !== undefined) {
                  playPromise
                      // eslint-disable-next-line no-unused-vars
                      .then((_) => {
                          video.pause();
                      })
                      // eslint-disable-next-line no-unused-vars
                      .catch((error) => {
                          // Auto-play was prevented
                      });
              }
          }

          // eslint-disable-next-line no-unused-vars
          const sceneAnimation = createSceneAnimation();

          function createSceneAnimation() {
              let firstInited = false;
              let start = false;
              const duration = () => {
                  if (!commonSetting.isMobile()) {
                      return (
                          parentElement.innerHeight() * 1
                          + $(window).innerHeight() * 0.7
                          + 1000
                      );
                  }
                  return (
                      parentElement.innerHeight() * 1
                      + $(window).innerHeight() * 0.7
                      + 1000
                  );
              };

              return new ScrollMagic.Scene({
                  triggerElement: parentElement[0],
                  triggerHook: 1,
                  duration,
                  offset: '-1000',
              })
                  .on('enter', () => {
                      if (firstInited === false) {
                          firstInited = true;
                          parentElement
                            .find('video')
                            .each((i, elem) => {
                                // console.log('infirstInitedit')
                                initVideo(elem);
                            });
                      }
                  })
                  .on('leave', () => {
                      // console.log('leave')
                      start = false;
                      parentElement
                        .find('video')
                        .each((i, elem) => {
                            stopVideo(elem);
                        });
                  })
                  .on('progress', (e) => {
                      const offsetPercent = Math.floor(100 * 1000 / duration());
                      const windowHeightPercent = Math.floor(
                          100 * $(window).innerHeight() / duration() / 10,
                      );
                      const progressValue = Math.floor(100 * e.progress);
                      if (progressValue >= offsetPercent + windowHeightPercent * 2.5
                          && start === false) {
                          start = true;
                          parentElement
                            .find('video')
                            .each((i, elem) => {
                                startVideo(elem);
                            });
                      } else if (progressValue < offsetPercent + windowHeightPercent * 2.5
                          && start === true) {
                          start = false;
                          parentElement
                            .find('video')
                            .each((i, elem) => {
                                stopVideo(elem);
                            });
                      }
                  })
                  // .addIndicators({
                  //   name: 'scroll video play',
                  // })
                  .addTo(centerController);
          }

          $(window).on('resize', () => {
              if (!commonSetting.isMobile() && videoResponsive === 'mobile') {
                  parentElement
                    .find('video')
                    .each((i, elem) => {
                        initVideo(elem);
                    });
              } else if (commonSetting.isMobile() && videoResponsive === 'desktop') {
                  parentElement
                    .find('video')
                    .each((i, elem) => {
                        initVideo(elem);
                    });
              }
          });
      },
  };

  return playIntroVideoCB;
})();

/*= ========================================================
=       Section: product size carousel                    =
========================================================= */
const productSizeOwl = (function () {
  const productSizeOwlCB = {
    init() {
      const owlSection = $('.product-size-carousel');
      if (owlSection.length > 0) {
        $.each(owlSection, (index, el) => {
          const isMobileSet = !commonSetting.isMobile();
          const currentSection = $(el);
          productSizeOwlCB.setupCaruosel(currentSection, isMobileSet);
        });
      }
    },
    setupCaruosel(parentElement, isMobileSet) {
      let mobileSet = isMobileSet;
      function changeView() {
        if (commonSetting.isMobile()) {
          if (!mobileSet) {
            // console.log('changeView to mobile')
            mobileSet = true;
            slide.attr('max', count);
            slide.val(1);
            parentElement.trigger('to.owl.carousel', 0);
          }
        } else if (mobileSet) {
          // console.log('changeView to desktop')
          mobileSet = false;
          // console.log(count)
          slide.attr('max', count);
        }
      }
      parentElement.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        responsive: {
          0: {
            items: 1,
            autoWidth: true,
          },
          992: {
            items: 1,
          },
        },
        onInitialized(event) {
        },
      });
    },
  };
  return productSizeOwlCB;
}());


/*= ========================================================
=       Section: click toggle active                       =
========================================================= */
const clickToggleActive = (() => {
  const clickToggleActiveCB = {
      init() {
          const section = $('.click-toggle-active');
          if (section.length > 0) {
              // eslint-disable-next-line func-names
              $.each(section, function (i) {
                  const currentSection = $(this);
                  clickToggleActive.setupToggleActive(currentSection, i);
              });
          }
      },
      setupToggleActive(parentElement) {
          const btn = parentElement.find('.btn-toggle');
          const target = parentElement.find('.target-toggle-active');
          btn.on('click', () => {
              target.toggleClass('active');
              btn.toggleClass('active');
          });
      },
  };

  return clickToggleActiveCB;
})();

/*= ========================================================
=       Section: suppport Topics carousel
========================================================= */
const appOwl = (function () {
  const appOwlCB = {
    init() {
      const owlSection = $('.accessories-owl-content, .product-size-carousel');
      if (owlSection.length > 0) {
        $.each(owlSection, (index, el) => {
          const isMobileSet = !commonSetting.isMobile();
          const currentSection = $(el);
          appOwl.setupCaruosel(currentSection, isMobileSet);
        });
      }
    },
    setupCaruosel(parentElement, isMobileSet) {
      let mobileSet = isMobileSet;
      const slide = parentElement
        .siblings('.carousel-slide')
        .find('.topics-slider');
      const isSlide = slide.length > 0;
      let count = 0;

      function changeView() {
        if (commonSetting.isMobile()) {
          if (!mobileSet) {
            // console.log('changeView to mobile')
            mobileSet = true;
            slide.attr('max', count);
            slide.val(1);
            parentElement.trigger('to.owl.carousel', 0);
          }
        } else if (mobileSet) {
          // console.log('changeView to desktop')
          mobileSet = false;
          // console.log(count)
          slide.attr('max', count);
        }
      }
      let rtl = false;
      if ($('html').attr('dir') === 'rtl') {
        rtl = true;
      }
      parentElement.owlCarousel({
        rtl,
        loop: true,
        nav: true,
        dots: false,
        lazyLoad: true,
        lazyLoadEager: 1,
        navText: [
          "<div data-event-category='accessory' data-event-action='click-arrow' data-event-label='arrow-prev-accessory-carousel' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-prev'></div></div>",
          "<div data-event-category='accessory' data-event-action='click-arrow' data-event-label='arrow-next-accessory-carousel' data-event-gtm='event-tracking' style='width:100%;height:100%;'><div class='icon-nav icon-next'></div></div>",
        ],
        responsive: {
          0: {
            items: 1,
            autoWidth: true,
          },
          992: {
            items: 2,
          },
        },
        onInitialized(event) {
          count = event.item.count;
          if (isSlide) {
            changeView();
            slide[0].oninput = function () {
              parentElement.trigger('to.owl.carousel', this.value - 1);
            };
          }
          const items = parentElement.find('.owl-item:not(.cloned) .js-slug-product');
          Array.from(items).forEach((item) => {
            const slug = item.getAttribute('data-slug');
            if (slug) {
              const cloneBlock = parentElement.find(`.owl-item.cloned .js-slug-product[data-slug=${slug}]`);
              if (cloneBlock.length > 0) {
                const observer = new MutationObserver(() => {
                  const cloneHtml = item.innerHTML;
                  const btn = item.querySelectorAll('.vive20-btn')[0];
                  cloneBlock.each((i, elem) => {
                    const element = elem;
                    element.innerHTML = cloneHtml;
                    element.querySelectorAll('.vive20-btn')[0].addEventListener('click', () => {
                      event.preventDefault();
                      btn.click();
                    });
                  });
                });
                observer.observe(item, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  characterData: true,
                });
              }
            }
          });
        },
        onTranslate(event) {
          if (isSlide) {
            // eslint-disable-next-line no-underscore-dangle
            let current = event.item.index + 1 - event.relatedTarget._clones.length / 2;
            const itemsCount = event.item.count;

            if (current > itemsCount) {
              current = 1;
            }

            if (current === 0) {
              current = event.item.count;
            }
            slide.val(current);
          }
        },
      });

      if (isSlide) {
        $(window).on('resize', () => {
          if (isSlide) {
            changeView();
          }
        });
      }
    },
  };
  return appOwlCB;
}());

/*= ========================================================
=       Section: Banner modal video                       =
========================================================= */
const modalVideo = {
  init() {
    const modalVideoBlock = document.querySelectorAll('.box-video');
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
            // eslint-disable-next-line no-use-before-define
            youtubeVideo.init(videoId);
          } else {
            // YouKu
            // eslint-disable-next-line no-use-before-define
            youkuVideo.init(videoId);
            modalVideo.showModal();
            modalVideo.setupCloseModalBtn();
          }
        });
      });
    }
  },
  setupCloseModalBtn() {
    const closeBtn = document.querySelector(
      '.modal-overlap-container .btn-close',
    );
    const closeBg = document.querySelector(
      '.modal-overlap-container .modal-overlap-bg',
    );
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

    const playArea = document.querySelector(
      '.modal-overlap-container .align-center',
    );
    playArea.innerHTML = "<div id='player'></div>";
  },
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
      // eslint-disable-next-line no-undef
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

$(() => {
  fixWidows.init();
  lazyLoadImg.init();
  productSizeOwl.init();
  // modalVideo.init();
  playIntroVideo.init();
  clickToggleActive.init();
  appOwl.init();
});
