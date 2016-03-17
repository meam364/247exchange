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
