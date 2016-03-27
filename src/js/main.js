//= ./jelect.js

//= ./selectivity-full.min.js

$('.jelect').jelect();

var more = 'Show me more',
    less = 'Shoe me less'
var isMore = true;
$('.btn-collapse').on('click', function() {
    $(this).toggleClass('btn-collapse_in')
        .find('.btn-collapse__text')
        .text(isMore ? less : more);
    isMore = !isMore;
})
var jelect = $('.js-jelect'),
    current = $('.js-jelect-current');

jelect.on( 'change', function (e) {
    current[0].className = 'choose-lang-mob__current js-jelect-current choose-lang-mob__current-' + this.value;
});

$(function(){
	$(".trigger").on("click",function(e){
		var current=$('.sub-menu');
		current.stop(true, true).slideToggle(250);
        current.parent().toggleClass('open');
		e.stopPropagation();
	});
});

    $btns = $('.more__btn');

    $(window).on('resize', checkResolution);

    $(window).on('load', checkResolution);


    function checkResolution() {
        var $window = $(window);
        if($window.width() >= 766) {
            setName(true);
        }else {
            setName(false);
        }
    }

    function setName(flag) {
        $btns.map(function(i, btn) {
            if(!flag) {
                $(btn).html('View All')
            }else {
                $(btn).text($(this).data('text'))
            }
        })
    }
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('click', function(e){
      $(this).find('.menu__dropdown').first().stop(true, true).slideToggle(250);
      $(this).toggleClass('open');
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('#e-currency').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Choose E-currency'
    });

    $('#payment-method').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Choose payment method'
    });

    $('#bank-branch').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Choose payment method'
    });

    $('#bank-branch-2').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Choose payment method'
    });

    $('#country').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Please Choose Country of Your Residence'
    });
