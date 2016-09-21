//= ./jelect.js

//= ./matchHeight.js

//= ./clipboard.js


$('.jelect').jelect();

$('.match-height').matchHeight(false);

$('.alert__close').on('click', function() {
    $(this).parent().fadeOut(300);
})

var more = 'Show me more',
    less = 'Show me less'
var isMore = true;

$('.btn-collapse').on('click', function() {
    $(this).toggleClass('btn-collapse_in')
        .find('.btn-collapse__text')
        .text(isMore ? less : more);
    isMore = !isMore;
})
$('.btn-collapse-more').on('click', function() {
    $(this)
        .text(isMore ? less : more);
    isMore = !isMore;
})

$('.page_show_popup').css({marginTop: getPopupHeight()});

$('.popup-block__close').on('click', function(e) {
    e.preventDefault();
    $('.popup-block').hide();
    $('.page_show_popup').css({marginTop: 0});
})
 function getPopupHeight() {
    return $('.popup-block').outerHeight();
 }
var jelect = $('.js-jelect'),
    current = $('.js-jelect-current');

jelect.on( 'change', function (e) {
    current[0].className = 'choose-lang-mob__current js-jelect-current choose-lang-mob__current-' + this.value;
    current[1].className = 'choose-lang-mob__current js-jelect-current choose-lang-mob__current-' + this.value;
});
$('#full-view').on('click', function(e) {
        e.preventDefault();
        var mobileWidth =  (window.innerWidth > 0) ?
                        window.innerWidth :
                        screen.width;
    var viewport = (mobileWidth > 766) ?
                    'width=device-width, initial-scale=1.0' :
                    'width=1200';
    $("meta[name=viewport]").attr('content', viewport);

})

$('.dropdown-toggle').on('click', function(e) {
    e.preventDefault();
})

$('.trigger').on('click', function(e) {
    e.preventDefault();
})
$(function(){
	$(".trigger").on("click",function(e){

        if($(this).parent().hasClass('active')) {
            return;
        }
		var current = $(this).next();
		current.stop(true, true).slideToggle(250);
        current.parent().toggleClass('open');
		e.stopPropagation();
	});
});


    $(window).on('resize', function() {
        fixCollapse();
    });

    function fixCollapse() {
        if($(window).width() > 766)
            $('.about-collapse').height('auto');
    }
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('click', function(e){

        if($(this).hasClass('active')) {
            return;
        }
      $(this).find('.menu__dropdown').first().stop(true, true).slideToggle(250);
      $(this).toggleClass('open');
    });



    $(".modal-login-mob").on("hidden.bs.modal", function(){
        $(".js-modal-tab-register").removeClass('active');
        $(".js-modal-tab-login").addClass('active');
    });
