import './styles/default.scss';
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
                  posterT: $video.data('t-poster-path'),
                  videoT: $video.data('t-video-path'),
              };
              $video.attr('poster', isDesktop ? videoData.poster : videoData.posterT);
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

                          // sub menu
                          if (parentElement.attr('data-target')) {
                            $('.sub-h-list').find('.active').removeClass('active');
                            $('.sub-h-list').find(`.menu-${parentElement.attr('data-target')}`).addClass('active');
                          }
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

                      // sub menu
                      $('.sub-h-list').find('.active').removeClass('active');
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

                          // sub menu
                          if (parentElement.attr('data-target')) {
                            $('.sub-h-list').find('.active').removeClass('active');
                            $('.sub-h-list').find(`.menu-${parentElement.attr('data-target')}`).addClass('active');
                          }
                      } else if (progressValue < offsetPercent + windowHeightPercent * 2.5
                          && start === true) {
                          start = false;
                          parentElement
                            .find('video')
                            .each((i, elem) => {
                                stopVideo(elem);
                            });

                          // sub menu
                          $('.sub-h-list').find('.active').removeClass('active');
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
=       Section: scroll fadin in                           =
========================================================= */
const scrollFadeIn = (() => {
  const scrollFadeInCB = {
    init() {
      const content = $('.scroll-fade-in');
      if (content.length > 0) {
        // eslint-disable-next-line func-names
        $.each(content, function (i) {
          const currentcontent = $(this);
          scrollFadeIn.setupAnimationScrollMagic(currentcontent, i);
        });
      }
    },
    setupAnimationScrollMagic(parentElement) {
      let tl = gsap.timeline();
      if (parentElement.find('.scroll-fade-in--3').length > 0) {
        tl.from(parentElement.find('.scroll-fade-in--1'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" })
        .from(parentElement.find('.scroll-fade-in--2'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" }, "-=0.5")
        .from(parentElement.find('.scroll-fade-in--3'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" }, "-=0.5");
      } else if (parentElement.find('.scroll-fade-in--2').length > 0) {
        tl.from(parentElement.find('.scroll-fade-in--1'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" })
        .from(parentElement.find('.scroll-fade-in--2'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" }, "-=0.5")
      } else {
        tl.from(parentElement.find('.scroll-fade-in--1'), { opacity: 0, translateY: 100, duration: 0.8, ease: "power4.out" })
      }

      new ScrollMagic.Scene({
        triggerElement: parentElement[0],
        triggerHook: 0.75,
        reverse: false,
      })
      .setTween(tl)
      // .addIndicators({name: 'scroll' })
      .addTo(centerController);
    }
  };
  return scrollFadeInCB;
})();




/*= ========================================================
=       Section: product size carousel                    =
========================================================= */
const productSizeOwl = (function () {
  const productSizeOwlCB = {
    init() {
      const owlSection = $('.product-size-content');
      if (owlSection.length > 0) {
        $.each(owlSection, (index, el) => {
          const currentSection = $(el);
          productSizeOwlCB.setupCaruosel(currentSection);
        });
      }
    },
    setupCaruosel(parentElement) {
      const owl = parentElement.find('.owl-carousel');
      const sizeList = parentElement.find('.carousel-list .carousel-item');
      const innerHTMLArray = sizeList.map((i, e) => $(e).html()).get();
      owl.html(innerHTMLArray[0]);
      function setNavWidth(dots, nav) {
        if (dots && nav) {
          const newNav = nav;
          newNav.style.width = `${dots.offsetWidth + 80}px`;
        }
      };
      function initOwl() {
        owl.owlCarousel({
          loop: false,
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
          onInitialized(e) {
            const dots = e.currentTarget.querySelector('.owl-dots');
            const nav = e.currentTarget.querySelector('.owl-nav');
            setNavWidth(dots, nav);
          },
          onResized(e) {
            const dots = e.currentTarget.querySelector('.owl-dots');
            const nav = e.currentTarget.querySelector('.owl-nav');
            setNavWidth(dots, nav);
          },
        });
      };
      initOwl();

      // size change
      parentElement.find('.size-item').on('click', (e) => {
        e.preventDefault();
        if ($(e.currentTarget).hasClass('active')) return;
        const previousScrollPosition = window.scrollY;
        const target = $(e.currentTarget);
        const index = parseInt(target.attr('data-index'));
        // owl.trigger('replace.owl.carousel', innerHTMLArray[index]).trigger('refresh.owl.carousel');
        owl.data('owl.carousel').destroy();
        owl.html(innerHTMLArray[index]);
        initOwl();

        parentElement.find('.size-item.active').removeClass('active');
        target.addClass('active');
        parentElement.find('.color-item.active').removeClass('active')
        parentElement.find('.color-item').eq(0).addClass('active');

        const dots = owl.find('.owl-dots')[0];
        const nav = owl.find('.owl-nav')[0];
        setNavWidth(dots, nav);
      });

      // color change
      parentElement.find('.color-item').on('click', (e) => {
        e.preventDefault();
        if ($(e.currentTarget).hasClass('active')) return;
        
        const target = $(e.currentTarget);
        const index = parseInt(target.attr('data-index'));
        owl.find('.product-size-item').each((i, e) => {
          const u1920 = $(e).find('[data-d-url]').eq(index).attr('data-d-url');
          const u360 = $(e).find('[data-m-url]').eq(index).attr('data-d-url');
          $(e).find('.s1920').attr('srcset', u1920);
          $(e).find('.s360').attr('srcset', u360);
          
          parentElement.find('.color-item.active').removeClass('active');
          target.addClass('active');
        });
      });
      
    },
  };
  return productSizeOwlCB;
}());

/*= ========================================================
=       Section: fearure carousel                    =
========================================================= */
const fearureOwl = (function () {
  const fearureOwlCB = {
    init() {
      const owlSection = $('.section-feature-carousel');
      if (owlSection.length > 0) {
        $.each(owlSection, (index, el) => {
          const currentSection = $(el);
          fearureOwlCB.setupCaruosel(currentSection);
        });
      }
    },
    setupCaruosel(parentElement) {
      const owl = parentElement.find('.owl-carousel');
      owl.owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        navText: [
          '<button type="button" role="presentation" aria-label="Previous" class="owl-prev"><img width="13" height="22" src="media/images/arrow-l.svg"></button>',
          '<button type="button" role="presentation" aria-label="Next" class="owl-next "><img width="13" height="22" src="media/images/arrow-r.svg"></button>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          992: {
            items: 1,
          },
        },
        onInitialized(e) {
        },
        onTranslate(e) {
          const { index } = e.item;
          parentElement.find('.feature-carousel-item.active').removeClass('active');
          parentElement.find(`.feature-carousel-item[data-index=${index}]`).addClass('active');
        },
      });
      parentElement.find('.feature-carousel-item').on('click', (e) => {
        e.preventDefault();
        if ($(e.currentTarget).hasClass('active')) return;
        parentElement.find('.feature-carousel-item.active').removeClass('active');
        const index = parseInt($(e.currentTarget).attr('data-index'));
        owl.trigger('to.owl.carousel', index);
        $(e.currentTarget).addClass('active');
      });
    },
  };
  return fearureOwlCB;
}());

/*= ========================================================
=       Section: application carousel                    =
========================================================= */
const applicationOwl = (function () {
  const applicationOwlCB = {
    init() {
      const owlSection = $('.section-application');
      if (owlSection.length > 0) {
        $.each(owlSection, (index, el) => {
          const currentSection = $(el);
          applicationOwlCB.setupCaruosel(currentSection);
        });
      }
    },
    setupCaruosel(parentElement) {
      const owl = parentElement.find('.owl-carousel');
      owl.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        navText: [
          '<button type="button" role="presentation" aria-label="Previous" class="owl-prev"><img width="13" height="22" src="media/images/arrow-l.svg"></button>',
          '<button type="button" role="presentation" aria-label="Next" class="owl-next "><img width="13" height="22" src="media/images/arrow-r.svg"></button>',
        ],
        responsive: {
          0: {
            items: 1,
            autoWidth: true,
          },
          992: {
            items: 1,
            autoWidth: true,
          }
        },
        onInitialized(e) {
        },
        onTranslate(e) {
        },
      });
    },
  };
  return applicationOwlCB;
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
  lazyLoadImg.init();
  productSizeOwl.init();
  fearureOwl.init();
  applicationOwl.init();
  modalVideo.init();
  playIntroVideo.init();
  scrollFadeIn.init();

  document.querySelectorAll(".to-top, .totop-btn").forEach(function(element) {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

});
