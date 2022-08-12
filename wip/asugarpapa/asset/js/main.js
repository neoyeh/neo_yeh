$(function(){
	// lazyload img
	$( ".lazy-img" ).lazyload();

	// ========== toggle mobile header menu start =========
	$(document).on('click','#header .mobile-header .menu-toggle-btn',function(){
		var id = $(this).attr('data-link');
		$('#header .mobile-header').find('#'+id).addClass('active');
	});
	$(document).on('click','#header .mobile-header .close-btn',function(){
		$(this).closest('.toggle-menu').removeClass('active');
	});
	// ========== toggle mobile header menu end =========

	
	


	// 點擊展開
	$(document).on('click','.component-toggle .component-toggle-btn', function(e){
		e.preventDefault();
		var $ele = $(this).closest('.component-toggle');
		if($ele.hasClass('active')){
			$ele.removeClass('active');
		}else{
			$ele.addClass('active');
		}
	});


	//登入
	// header 還沒load完點了會打不開
	$(document).on('click','.desktop-login',function(e){
		e.preventDefault();
		$('.form-modal--login').modal('show');
		// $('.form-modal--login').modal('hide');
	});
	// $(window).resize(function(){
	// 	var w = $(window).innerWidth();
	// 	if(w<992){
	// 		$('.form-modal--login').modal('hide');
	// 	}
	// })


	// 註冊============
	// 註冊開關
	$(document).on('click','.btn-signup, .btn-index-signup', function(e){
		e.preventDefault();
		var type = $(this).attr('data-type');
		// console.log(type)
		$('.signup-container').attr('data-page',1)
		$('.form-modal--signup').modal('show');
		if(type==="papa"){
			$('.signup-container .signup-top .custom-auto-btn:first-child').addClass('active').siblings('.active').removeClass('active');
		}else if(type==="baby"){
			$('.signup-container .signup-top .custom-auto-btn:last-child').addClass('active').siblings('.active').removeClass('active');
		}else{
			$('.signup-container .signup-top .custom-auto-btn.active').removeClass('active');
		};
	});

	$(document).on('click','.signup-container .btn-signup-cancel, .signup-container .btn-signup-wait', function(e){
		e.preventDefault();
		$('.form-modal--signup').modal('hide');
	});
	// 註冊關閉callback
	// 離開上傳圖片callback
	$(document).on('hidden.bs.modal','.form-modal--signup, .form-modal--upload',function(){
		$(this).find('.upload-image-bottom').removeClass('active');
		$(this).find('.upload-image-bottom .item').removeClass('active');
		$(this).find('.upload-image-bottom-content .item:first-child').addClass('active');
	})
	// 切換性別
	$(document).on('click','.signup-container .signup-top .custom-auto-btn',function(){
		$(this).addClass('active').siblings('.active').removeClass('active');
	});
	// 切換頁面
	$(document).on('click','.signup-container .btn-signup-next',function(){
		changePage('next')
	});
	$(document).on('click','.signup-container .btn-signup-back',function(){
		changePage('back')
	});
	function changePage(active){
		var nowPage = Number($('.signup-container').attr('data-page'));
		var newPage = (active==='next')?nowPage+1:nowPage-1
		$('.signup-container').attr('data-page',newPage);
	}
	// 切換照片
	$(document).on('click','.upload-image-block .item',function(){
		$(this).closest('.upload-image-block').find('.item.active').removeClass('active');
		$(this).addClass('active');
	});
	// 註冊============


	// 等待審合關閉
	$(document).on('click','.form-modal--review .btn-review-wait', function(e){
		e.preventDefault();
		$('.form-modal--review').modal('hide');
	});

	// 聯絡我們開啟
	$(document).on('click','.btn-contact-us', function(e){
		e.preventDefault();
		$('.form-modal--contact-us').modal('show');
	});

	// 發送打招呼訊息 快速配對
    $(document).on('click', '.btn-message', function(e) {
        e.preventDefault();
        $('.form-modal--message').modal('show');
    });

	// 發送打招呼訊息 快速配對 vip
    $(document).on('click', '.btn-message-vip', function(e) {
        e.preventDefault();
        $('.form-modal--message-vip').modal('show');
    });




	// 上傳大頭貼
	function readURL(input, $ele) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    
	    reader.onload = function(e) {
	    	$ele.siblings('.upload-image-bottom').find('.mask-image').attr('src', e.target.result);
	      // $('.mask-image').attr('src', e.target.result);
	    }
	    
	    reader.readAsDataURL(input.files[0]);
	  }
	}
	$(document).on('change','.imgInp',function(){
		var $ele = $(this).closest('.upload-image-content');
		readURL(this, $ele);
		$ele.siblings('.upload-image-bottom').addClass('active');
		// $('.signup-container .upload-image-bottom').addClass('active');
	});


	// 調整100vh
	let rel_vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${rel_vh}px`);
	$(window).resize(function(){
		var w = $(window).innerWidth();
		if(w<1440){
			let rel_vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${rel_vh}px`);
		}
	});


	// 下拉選單
	$(document).on('click','.dropdown-menu .dropdown-item', function(e){
		e.preventDefault();
		var text = $(this).text();
		$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').text(text);
		$(this).addClass('selected').siblings('.selected').removeClass('selected');
	});

})