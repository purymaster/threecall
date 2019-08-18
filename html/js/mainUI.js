$(function(){
	
	//브라우저 업데이트
	if(navigator.userAgent.match(/MSIE 8/)) {
		$('.ie8').show();
    };

	//스킵 네비게이션
	$('.skip a').click(function(){
		$('#content').attr('tabindex', '0').focus();
		return false;
	});
	
	//페이지 로딩시 마크업 추가
	$('.header_wrap').prepend('<div class="nav_bg"></div>'); //GNB 배경
	
	//GNB 제어
	var is_mobile = false;
	$(window).on('load resize',  function(){
		if(window.innerWidth < 1280){
			is_mobile = true;
		} else {
			is_mobile = false;
			$('header nav ul').show();
		};
	}).resize(function(){
		close_gnb();
	});
	
	$('.open_menu').click(function(){
		if(!is_mobile){
			if($('header nav').css('display') == 'none'){
				open_gnb();
			} else {
				close_gnb();
			};
		} else {
			open_gnb();
		};
	});
	
	$('.close_menu').on('click focusout',function(){
		close_gnb();
	});
	
	$('.header_wrap .nav_bg').click(function(){
		if(is_mobile){
			close_gnb();
		};
	});
	
	$('header .gnb > li > a').on('focusin', function(){
		close_gnb();
		$('header .gnb > li').removeClass('on');
		$(this).parents('li').addClass('on');
	}).parents('.gnb').on('clickoutside focusoutside', function(){
		$('header .gnb > li').removeClass('on');
	});

	
	$('header nav > ul > li > a').click(function(e){
		if(is_mobile){
			e.preventDefault();
			$(this).next('ul').find('a').removeClass('on');
			if($(this).next('ul').css('display') == 'none'){
				$('header nav > ul > li').removeClass('on');
				$(this).parent('li').addClass('on');
				$(this).parents('ul').find('ul').slideUp(300);
				$(this).next('ul').slideDown(300);
			} else {
				$(this).parents('ul').find('ul').slideUp(300);
				$('header nav > ul > li').removeClass('on');
			};
		};
	});
	
	$('header nav > ul > li > ul > li > a').click(function(){
		if(is_mobile){
			if($(this).next('ul').css('display') == 'none'){
				$('header nav > ul > li > ul > li > ul').slideUp(300);
				$('header nav > ul > li > ul > li > a').removeClass('on');
				$(this).addClass('on').next('ul').slideDown(300);
			} else {
				$('header nav > ul > li > ul > li > a').removeClass('on');
				$('header nav > ul > li > ul > li > ul').slideUp(300);
			};
		};
	});
	
	function open_gnb(){
		$('.header_wrap .nav_bg').show();
		if(is_mobile){
			$('header nav').show().stop().animate({
				right:0
			},300,'swing');
		} else {
			$('header nav').css('right',0).show();
		};
	};
	
	function close_gnb(){
		$('header nav li,header nav li a').removeClass('on');
		if(is_mobile){
			$('header nav').stop().animate({
				right:-260
			},300,'swing',function(){
				$(this).hide();
				$('.header_wrap .nav_bg').hide();
			}).children('ul').find('ul').slideUp(300);
		} else {
			$('header nav').css('right',0).hide();
			$('.header_wrap .nav_bg').hide();
		};
	};
	
	//계열사 보기
	$('.affiliate > a').on('focusin',function(){
		$('.affiliate ul').show();
	}).parent().on('clickoutside focusoutside', function(){
		$('.affiliate ul').hide();
	});
	
	$('.affiliate ul a').on('click', function(){
		$('.affiliate ul').hide();
	});
	
	//셀렉트박스 커스터마이징
	var select_box = $(".select_box select");
    select_box.on('mouseover focus', function(){
		$(this).parent('.select_box').addClass('on');
	}).on('mouseout focusout', function(){
		$(this).parent('.select_box').removeClass('on');
	}).change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
	
	//파일업로드 커스터마이징
	var file_target = $('.upload input[type=file]');
  	file_target.on('change', function(){
		if(window.FileReader){
		  var filename = $(this)[0].files[0].name;
		} else {
		  var filename = $(this).val().split('/').pop().split('\\').pop();
		};
		$(this).siblings('.upload_name').val(filename);
  	});
	
	//테이블 notice hover/focus/active 효과처리
	$('.board_list ul li a').on('mouseover focus', function(){
		$('.board_list ul li strong').removeClass('on');
		$(this).parents('li').find('strong').addClass('on');
	}).on('mouseout focusout', function(){
		$('.board_list ul li strong').removeClass('on');
	});
	
	//숫자 입력제어
	$("input[name=num]").bind('input keyup keydown paste change', function(e){
		var key_val = e.keyCode;
		if((key_val >= 37 && key_val <= 40) || (key_val >= 48 && key_val <= 57) || (key_val >= 96 && key_val <= 105) || (key_val == 8) || (key_val == 9) || (key_val == 46)){
			return;
		} else {
			return false;
		};
	});
	
	//제목 글자수 실시간 세기
	$('.remain').each(function(){
		// count 정보 및 count 정보와 관련된 textarea/input 요소를 찾아내서 변수에 저장한다.
		var $maxcount = $('.m_count', this);
		var $count = $('.c_count', this);
		var $input = $('.remain_check', this);
		var $title = $(this).prev('dt').children('label');
		
		// .text()가 문자열을 반환하기에 이 문자를 숫자로 만들기 위해 1을 곱한다.
		var maximumByte = $maxcount.text() * 1;
		// update 함수는 keyup, paste, input 이벤트에서 호출한다.
		var update = function () {
			var before = $count.text() * 1;
			var str_len = $input.val().length;
			var cbyte = 0;
			var li_len = 0;
			for (i = 0; i < str_len; i++) {
				var ls_one_char = $input.val().charAt(i);
				if (escape(ls_one_char).length > 4) {
					cbyte += 2; //한글이면 2를 더한다
				} else {
					cbyte++; //한글아니면 1을 다한다
				}
				if (cbyte <= maximumByte) {
					li_len = i + 1;
				}
			}
			// 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
			if (parseInt(cbyte) > parseInt(maximumByte)) {
				alert($title.text() +"은(는) "+ $maxcount.text() +"자 이상 입력할수 없습니다.");
				var str = $input.val();
				var str2 = $input.val().substr(0, li_len);
				$input.val(str2);
				var cbyte = 0;
				for (i = 0; i < $input.val().length; i++) {
					var ls_one_char = $input.val().charAt(i);
					if (escape(ls_one_char).length > 4) {
						cbyte += 2; //한글이면 2를 더한다
					} else {
						cbyte++; //한글아니면 1을 다한다
					}
				}
			}
			$count.text(cbyte);
		};
		// input, keyup, paste 이벤트와 update 함수를 바인드한다
		$input.bind('input keyup keydown paste change', function(){
			setTimeout(update, 0)
		});
		update();
	});
});