$(function() {


    // 全域
    header_init();

    // scrolltop
    $(document).on('click', '.backtop', function() {
        var body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 350, 'swing', function() {});
    });







    // header
    function header_init() {
        function toggleli() {
            var ww = $(window).innerWidth();
            var $li = $(this).parent();
            if (ww < 992) {
                $li.toggleClass('active');
                $li.find('li.active').removeClass('active');
                $li.siblings('li.active').removeClass('active').find('li.active').removeClass('active');
            }
        }
        // 手機點擊選項開關
        $(document).on('click', '#header .menu-1>li>a', '#header .menu-2>.menu-list>li>a', toggleli);
        $(document).on('click', '#header .menu-2>.menu-list>li>a', toggleli);
        // 手機點擊選單開關
        $(document).on('click', '#header .bars', function(e) {
            e.preventDefault();
            $(this).parent().siblings('.menu').toggleClass('active');
        });
        $(window).resize(function() {
            var ww = $(window).innerWidth();
            if (ww > 991) {
                $('#header .menu .active').removeClass('active')
            }
        })
    };


    // 首頁
    fixbg();
    index_info_slider();
    index_info_slider_show();


    $(window).scroll(function() {
        /* Act on the event */
        fixbg()
        index_info_slider_show();
    });
    $(window).resize(function() {
        $('.new-card h4, .new-card p, .row2').ellipsis({ row: 2 });
        $('.row1').ellipsis();
        index_info_slider();
    })
    $(document).on('show.bs.collapse','.collapse', function () {
        $(this).find('p').css({'opacity':0,'transition':'0.35s'})
        $('.row1').ellipsis();
    })
    $(document).on('shown.bs.collapse','.collapse', function () {
        $(this).find('p').css({'opacity':1})
        $('.row1').ellipsis();
    })

    $('.row1').ellipsis();
    // 首頁新聞
    $('.new-card h4, .new-card p, .row2').ellipsis({ row: 2 });
    // 首頁新聞換圖
    $('.new-card-box .new-card > a').hover(
        function() {
            var id = $(this).attr('data-id');
            $(this).addClass('active').parent().siblings('li').find('a.active').removeClass('active');
            if (id) {
                $(this).closest('.new-box').find('.new-box-img[data-id="' + id + '"]').addClass('active').siblings('.new-box-img').removeClass('active');
            } else {
                $(this).closest('.new-box').find('.new-box-img').removeClass('active');
            }
        },
        function() {
            // ...
        }
    );
    // 最新消息點擊切換
    $('.new-box-section .double-btn').click(function() {
        var $section = $(this).closest('.new-box-section');
        var $ul = $section.find('.new-card-box > ul');
        var height = $ul[0].scrollHeight;
        var total = $section.find('.new-card-box > ul > li').length;
        var li_h = height / total;
        var top = $ul.scrollTop();
        var new_h;
        if ($(this).hasClass('pre')) {
            new_h = (top % li_h === 0) ? top - li_h : top - top % li_h;
        } else {
            new_h = top - top % li_h + (li_h);
        }
        $ul.stop().animate({ scrollTop: new_h }, 250, 'swing');

    })

    // 首頁背景
    function fixbg() {
        var $div = $('.index-section')[0];
        var top = ($div) ? $div.getBoundingClientRect().top : null;
        if (top <= 0) {
            $('.index-section').addClass('active')
        } else {
            $('.index-section').removeClass('active')
        }
    }


    // 2個圖片的slider
    var $owl_double = $('.double-item-slider');
    $owl_double.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            }
        },
        onInitialized: function(){
            $('.row1').ellipsis();
        }
    });
    var $owl_double_left = $owl_double.closest('section').find('.owl-btn.left');
    var $owl_double_right = $owl_double.closest('section').find('.owl-btn.right');

    $owl_double_left.click(function(e) {
        e.preventDefault()
        $owl_double.trigger('prev.owl.carousel');
    });
    $owl_double_right.click(function(e) {
        e.preventDefault()
        $owl_double.trigger('next.owl.carousel');
    });


    // 2個圖片的slider手機
    var $owl_double_mobile = $('.double-item-slider-mobile .owl-carousel');
    $owl_double_mobile.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });
    var $owl_double_mobile_left = $owl_double_mobile.closest('.double-item-slider-mobile').find('.double-btn.pre');
    var $owl_double_mobile_right = $owl_double_mobile.closest('.double-item-slider-mobile').find('.double-btn.next');

    $owl_double_mobile_left.click(function(e) {
        e.preventDefault()
        $owl_double_mobile.trigger('prev.owl.carousel');
    });
    $owl_double_mobile_right.click(function(e) {
        e.preventDefault()
        $owl_double_mobile.trigger('next.owl.carousel');
    });

    // logo slider
    var $owl_stagePadding = $('.stagePadding-slider .owl-carousel');
    $owl_stagePadding.owlCarousel({
        center: true,
        loop: true,
        margin: 25,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            992: {
                items: 4
            }
        }
    });
    var $owl_stagePadding_left = $owl_stagePadding.siblings('.stagePadding-slider-btn.left');
    var $owl_stagePadding_right = $owl_stagePadding.siblings('.stagePadding-slider-btn.right');
    $owl_stagePadding_left.click(function(e) {
        e.preventDefault()
        $owl_stagePadding.trigger('prev.owl.carousel');
    });
    $owl_stagePadding_right.click(function(e) {
        e.preventDefault()
        $owl_stagePadding.trigger('next.owl.carousel');
    });


    // 富宇動態 新造鉅作 黑背景slider
    $('.black-bg-banner-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    // 富宇精神 slider
    function index_info_slider() {
        var $owl_info_slider = $('.index-info-slider .owl-carousel');
        var w = $(window).innerWidth();
        if (w > 1199 && $owl_info_slider.hasClass('owl-loaded')) {
            $owl_info_slider.trigger('destroy.owl.carousel');
        } else if (w < 1200 && !$owl_info_slider.hasClass('owl-loaded')) {
            $owl_info_slider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
            var $owl_info_slider_left = $owl_info_slider.siblings('.button-list').find('.pre');
            var $owl_info_slider_right = $owl_info_slider.siblings('.button-list').find('.next');;
            $owl_info_slider_left.click(function(e) {
                e.preventDefault()
                $owl_info_slider.trigger('prev.owl.carousel');
            });
            $owl_info_slider_right.click(function(e) {
                e.preventDefault()
                $owl_info_slider.trigger('next.owl.carousel');
            });
        }
    }
    // 富宇精神 圖片顯示
    function index_info_slider_show() {
        $('.index-info-slider').each(function() {
            var h = $(this)[0].getBoundingClientRect().top;
            if (h <= $(window).height() * 0.15) {
                $(this).find('.reserce-card').addClass('active')
            }
        })
    };


    // 富宇動態 
    $(window).resize(function() {
        $('.normal-card h3, .normal-card p').ellipsis({ row: 2 });
    })

    // 首頁新聞
    $('.normal-card h3, .normal-card p').ellipsis({ row: 2 });





    // select
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });




    // 搜尋
    selectTag();

    $(window).resize(function() {
        selectTag();
    });
    // lv1
    $('.search .select-lv1').on('click','li',function(){
        $('.search .select-lv2 ul').hide();
        $('.search .select-more').hide();
    	if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).hasClass('more')){
                $('.search .select-more').show();
            }else{
                var type = $(this).attr('data-type');
                $('.search .select-lv2').find('ul[data-type="'+type+'"]').show();
            };
        };
    });
    // lv2
    $('.search .select-lv2, .search .select-more').on('click','li',function(){
        var id = $(this).attr('data-id') ;
        if($(this).hasClass('active')){
            $('.search li[data-id="'+id+'"]').removeClass('active');
            $('.select-tag').find('li[data-id="'+id+'"]').remove();
        }else{
            $('.search li[data-id="'+id+'"]').addClass('active');
            var html='<li data-id="'+id+'">'+$(this).text()+'</li>';
            if($('.select-tag ul .search-bar').length>0){
                $('.select-tag ul .search-bar').before(html);
            }else{
                $('.select-tag ul').append(html);
            }
        };
    });
    // tag
    $('.search .select-tag').on('click','li',function(){
        $('.select-lv2, .select-more').find('li[data-id="'+$(this).attr('data-id')+'"]').removeClass('active');
        $(this).remove();
    })





    $(document).on('submit','form[name="search-bar"]',function(e){
        e.preventDefault();
        var length = $(this).find('.select-tag li').length;
        if(length>=5){
        	alert('搜尋條件不可超過五個')
        }else{
	        var text=$(this).find('input').val().trim();
	        if(text){
	            var html='<li>'+text+'</li>';
	            $(this).find('.select-tag').append(html);
	            $(this).find('input').val('');
	        }
        }
    })
    //resize
    function selectTag(){
        if($(window).innerWidth()>767){
            $('.search .select-more').hide();
            $('.search .select-lv1 .more').removeClass('active');
        }
    }
    

})