//= jelect.js

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
    option = $('.js-jelect-option'),
    current = $('.js-jelect-current'),
    type;

jelect.on( 'change', function (e) {
    current[0].className = 'choose-lang-mob__current js-jelect-current choose-lang-mob__current-' + this.value;
});

$(function(){
	$(".menu__dropdown > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
        current.parent().toggleClass('open');
		e.stopPropagation();
	});
	$(".menu__dropdown > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});
});
