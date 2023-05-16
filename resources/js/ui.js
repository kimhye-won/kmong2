// fix_bottom height calc
$(document).ready(function() {
    setLayoutResize();
});
$(window).on('resize', setLayoutResize);
function setLayoutResize() {
    let footerH = $('#fix_bottom').outerHeight();
    $('#wrap.scroll_fix #container .contents').css('padding-bottom', footerH);
}

function pop(e) {
    let target = e;
    document.getElementById(target).style.display = 'block';
    document.getElementById('mask').style.display = 'block';
}
function Close(e) {
    let targetclose = e;
    document.getElementById(targetclose).style.display = 'none';
    document.getElementById('mask').style.display = 'none';
}
function edit(e) {
    let targetparent = e;
    document.getElementById(targetparent).getElementsByClassName('result')[0].style.display = 'none';
    document.getElementById(targetparent).lastChild.previousSibling.style.display = 'block';
    document.getElementById(targetparent).nextSibling.nextSibling.style.display = 'none';
    document.getElementById(targetparent).nextSibling.nextSibling.nextSibling.nextSibling.style.display = 'block';
}
function editConfirm(e) {
    let targetEdit = e;
    document.getElementById(targetEdit).style.display = 'block';
    document.getElementById('mask').style.display = 'block';
}

$(document).ready(function() {
    // radio button
    $('.radio-btn').click(function() {
        $('.radio-btn').removeClass('active');
        $(this).addClass('active');
    });
    // swiper
    if ($('.swiper.main').length !== 0) {
        let swiper = new Swiper('.swiper.main', {
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }

    if ($('.swiper.freemode.view_type01').length !== 0) {
        let swiper = new Swiper('.swiper.freemode.view_type01', {
            slidesPerView: 1.29,
            spaceBetween: 20,
            freeMode: true,
        });
    }

    if ($('.swiper.freemode.view_type02').length !== 0) {
        let swiper = new Swiper('.swiper.freemode.view_type02', {
            slidesPerView: 2.26,
            spaceBetween: 14,
            freeMode: true,
        });
    }

    // quiz
    let $QuizBtn = $('.btn_answer');
    $QuizBtn.on('click', function() {
        $QuizBtn.removeClass('active');
        $(this).addClass('active');
        let data = $(this).data('answer');
        $(`.quiz_answer_alert .alert_txt`).removeClass('active');
        $(`.quiz_answer_alert .alert_txt[data-answer="${data}"]`).addClass('active');
    });

    // quiz_listening_play
    let quizLisPlay = $('.quiz_listening .btn_play');
    quizLisPlay.on('click', function() {
        if (quizLisPlay.hasClass('btn_pause')) {
            quizLisPlay.removeClass('btn_pause');
            quizLisPlay.addClass('btn_play');
        } else {
            quizLisPlay.removeClass('btn_play');
            quizLisPlay.addClass('btn_pause'); 
        }
    });

   // quiz_speaking_record
    let quizrecord = $('.quiz_speaking .btn_record');
    quizrecord.on('click', function() {
        $('.quiz_speaking .btn_top').hide();
        if (quizrecord.hasClass('btn_step0')) {
            quizrecord.removeClass('btn_step0');
            quizrecord.children('.text').text('듣고 있어요');
            quizrecord.addClass('btn_step1');
        } else if (quizrecord.hasClass('btn_step1')) {
            quizrecord.removeClass('btn_step1');
            quizrecord.children('.text').text('AI 분석중');
            quizrecord.addClass('btn_step2'); 
        }
    });

    // tab
    $('.tab_box').each(function() {
        let tabItem = $(this).find('.tab_top li');
        let tabCont = $(this).find('.tab_cont .tab_desc');
        tabItem.on('click', function() {
            let tabData = $(this).find('button').attr('data-tab');
            tabItem.removeClass('active');
            tabCont.removeClass('active');
            $(this).addClass('active');
            $('#' + tabData).addClass('active');
        });
    });

    // setting button
    $('.setting_item').each(function() {
        let item = $(this).find('.item_box button');
        item.on('click', function() {
            item.removeClass('active');
            $(this).addClass('active');
        })
    })

    //like button
    $('.like_btn').each(function () {
        $(this).on('click', function () {
            $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active') && showToastPop('add_like');
        });
    });

   // progress bar_animation
   $('.progress_bar').css('height', 0);
   setTimeout(function () {
       $('.progress_bar').each(function () {
           let figure = $(this).data('num');
           let t = 0;
           const barAnimation = setInterval(() => {
               $(this).css('height', t+'%');
               t++ >= figure && clearInterval(barAnimation);
           }, 10)
   
           if (figure === 100) {
               $(this).css('border-radius', '9px');
           }
       });
   }, 1000);

    // 학습창 비디오 리스트
    $('.learning_list_vid li').on('click', function() {
        // $('.learning_list_vid li').removeClass('active');
        $(this).addClass('active');
    });

    // 학습창 태그 
    $('.btn_bookmark').on('click', function() {
        $(this).toggleClass('active');
        if($(this).hasClass('active')) showToastPop('add_keep');
    });

    //복습창 단어 탭 버튼 토글
    $('.btn_word_chk').on('click', function() {
        $(this).toggleClass('active');
    });

    //복습창 단어 탭 버튼 토글
    $('.btn_del_reivew').on('click', function() {
        $(this).parents('.list').remove();
    });

    //학습창 단어 보기 버튼
    $('.word_btn').each(function () {
        $(this).on('click', function () {
            if ($('.word_btn').hasClass('active')) {
                $('.word_box').slideUp( "slow" );
                $('.word_btn').removeClass('active');
            } else {
                $('.word_box').slideDown( "slow" );
                $('.word_btn').addClass('active');
            }
        });
    });

    //학습창 단어 담기
    $('.word_list .word_select').each(function () {
        $(this).on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $('.word_select').removeClass('active');
                $(this).addClass('active');
            }
            if ($('.word_list .word_select').hasClass('active')) {
                $('.pick_noti .noti').text('단어를 선택하면\n사전으로 넘어갑니다.');
                $('.pick_noti .noti').html($('.pick_noti .noti').html().replace(/\n/g, '<br/>'));
                $('.pick_noti .btn_box button').prop('disabled', false);
            } else {
                $('.pick_noti .noti').text('단어를 선택해 주세요.');
                $('.pick_noti .btn_box button').prop('disabled', true);
            }
        });
    });

    //국기 팝업 닫기
    $('body').on('click', function(e){
        var $tgPoint = $(e.target);
        var $popCallBtn = $tgPoint.hasClass('select-list')
        var $popArea = $tgPoint.hasClass('select_btn')
     
        if ( !$popCallBtn && !$popArea ) {
            $('.select-list').hide();
            $('body, html').css('overflow', 'auto');
            $('.mask').remove();
        }
    });
});
//국기 팝업 열기
function flagPop() {
    console.log('bb');
    
    $('.select-list').show();
    $('body, html').css('overflow', 'hidden');
    $('.freeService').append('<div class="mask"></div>');
    $('.freeService').addClass('flagOn');
}

$('.learning_wrap').scroll(function () {
    if($('.learning_wrap').scrollTop() > $('.learning_wrap').offset().top){
        $('.home_btn').addClass('show');
    } else {
        $('.home_btn').removeClass('show')
    }
});

// 투데이 알람 - 전체 읽음 처리
function setMsgAllChk() {
    $('.today_alarm_wrap ul li').addClass('chk_alarm');
}

//레이어 팝업 
function showPop(ele) {
    $('#' + ele).addClass('open');
    $('body, html').css('overflow', 'hidden');
    $('#wrap').append('<div class="mask"></div>');
}
function hidePop() {
    $('.layerPopupWrap').removeClass('open');
    $('body, html').css('overflow', 'auto');
    $('.mask').remove();
}

// 비디오 제어
const video = $('#vid');
$(document).ready(function() {
    if (video.length !== 0) setInterval(vidTimer);
});
function vidTimer() {
    let timePercent = Math.floor((video.get(0).currentTime / video.get(0).duration) * 100);
    if (isNaN(timePercent)) {
        return;
    }
    $('#vid_progress').val(timePercent);
}
function vidCurrFirst() {
    video.get(0).currentTime = 0;
}
function vidCurrLast() {
    video.get(0).currentTime = video.get(0).duration;
}
function vidTogglePlay() {
    let togglePlay = $('.btn_toggle_play');
    if (video[0].paused){
        video.get(0).play();
        togglePlay.removeClass('btn_play');
        togglePlay.addClass('btn_pause');
    } else {
        video.get(0).pause();
        togglePlay.removeClass('btn_pause');
        togglePlay.addClass('btn_play');
    }
}

// 비디오 제어 버튼
let countLang = 0;
function vidLoopLang(target) { // 한영키
    countLang++;
    let langArr = ['korEng', 'kor', 'eng', 'x'];
    if (countLang === langArr.length) countLang = 0;
    $(target).attr('data-lang', langArr[countLang]);
}

let countRepeat = 0;
function vidLoopRepeat(target) { // 재생 반복 횟수
    countRepeat++;
    let repeatArr = ['default', '1', '2', '3', '4', 'all', 'off'];
    if (countRepeat === repeatArr.length) countRepeat = 0;
    $(target).attr('data-repeat', repeatArr[countRepeat]);
}

// 학습창 컨텐츠 높이 resize 
$(window).on('load resize', resizeCalcHeight);
function resizeCalcHeight() {
    let learningH = $('.learning_wrap').outerHeight();
    let topH = $('.learning_wrap .learning_top').outerHeight();
    let cntH = $('.learning_wrap .learning_area').outerHeight();
    let fixBottomH = $('#fix_bottom').outerHeight();
    let calcH = learningH - topH - fixBottomH;
    if (cntH < $(window).outerHeight()) {
        $('.learning_wrap .learning_area').css('min-height',  calcH);
    }
}

// ios issue 100vh calc
$(window).on('load resize', resizeIosHeight);
function resizeIosHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 단어보기
function wordViewShow(ele) {
    $('#'+ele).addClass('show');
    $('body, html').css('overflow', 'hidden');
}

function wordViewHide(ele) {
    $('#'+ele).removeClass('show');
    $('body, html').css('overflow', '');
}

// 토스트팝업
function showToastPop(ele){
    $('#' + ele).finish().fadeIn(500).delay(1000).fadeOut(500);
    return false;
}

/** 
 * version2 
**/

// scroll animation
$(document).ready(function() {
    if ($('.ani_sec').length !== 0) {
        let secController = new ScrollMagic.Controller();
        let sec = $('.ani_sec'); // section
        let obj = $('.obj'); // this animation obj
        let dur = [];
        sec.each(function(i) {
            let h = $(this).height();
            dur.push(h);
            let secCon = new ScrollMagic.Scene({
                    triggerElement: sec.get(i),
                    duration: dur[i],
                    offset: -50,
                })
                .setClassToggle(sec.get(i),'visible')
                .on('enter', function(){
                    $(sec.get(i)).find(obj).addClass('animated');	
                })
                .addTo(secController);
        });	
    }
});

// ios 100vh issue
setMobileHeight();
window.addEventListener('resize', function () {
    setMobileHeight()
});
function setMobileHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}


$(document).ready(function() {
    // 요금제 선택 active
    $('.prd_list li button').on('click', function() {
        $('.prd_list li').removeClass('active');
        $(this).parents('li').addClass('active');
        return false;
    });

    // 크리에이터 소개 swiper
    if ($('.swiper.creator').length !== 0) {
        let swiper = new Swiper('.swiper.creator', {
            slidesPerView: 'auto',
            freeMode: false,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                1400: {
                    freeMode: true,
                },
            }
        });
    }
});

// 헤더 aside navi
function aside(e) {
    let target = $(e).parents('.header_wrap');
    if (target.hasClass('open')) {
        target.removeClass('open');
        $('.header_list').hide();
    } else {
        target.addClass('open');
        $('.header_list').show();
    }
}

$(document).ready(function() {
    if ($('.stroy_main').length !== 0) {
        let swiper = new Swiper('.swiper.story_main', {
            // freeMode: true,
            spaceBetween: 30,
            pagination : {
                el : '.swiper-pagination',
                clickable : true, 
            },
            breakpoints: {
                1400: {
                    freeMode: true,
                    slidesPerView: 'auto',
                },
            },
        });
    }
    
    if ($('.stroy_main').length !== 0) {
        let swiper_sub = new Swiper('.swiper.story_sub', {
            // freeMode: true,
            spaceBetween: 30,
            pagination : {
                el : '.swiper-pagination',
                clickable : true, 
            },
            breakpoints: {
                1400: {
                    slidesPerView: 4,
                },
            },
        });
    }
    
    // 반응형
    if (window.innerWidth > 1400) {
        
    } else {
    }
});

// 리사이징
$(window).on('resize', function(){
    if (window.innerWidth > 1400) {
        // $('.header_list').show();
    } else {
        // $('.header_list').hide();
    }
});

//구독 상세보기
$('.ticket_more').click(function() {
    $('.profile .filter').addClass('active');
})
$('.profile .filter_btn').click(function(){
    $('.profile .filter').removeClass('active');
})
$('.profile .cancel_btn').click(function(){
    $('.ticket_pop_1').addClass('active');
    $('.profile').addClass('filter_bg');
    $('.agree').click(function(){
        $('.ticket_pop_1').removeClass('active');
        $('.ticket_pop_2').addClass('active');
    })
    $('.cancle').click(function(){
        $('.ticket_pop_1').removeClass('active');
        $('.profile').removeClass('filter_bg');
    })
    $('.clear').click(function(){
        $('.ticket_pop').removeClass('active');
        $('.profile').removeClass('filter_bg');
    })
})