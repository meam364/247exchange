//= ./jelect.js

//= ./selectivity-full.min.js

$('.jelect').jelect();

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

    $(window).on('resize', function() {
        checkResolution();
        fixCollapse();
    });

    $(window).on('load', checkResolution);

    function fixCollapse() {
        if($(window).width() > 766)
            $('.about-collapse').height('auto');
    }
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
        items: [{
            text: 'International Bank Wire',
            children: ['SWIFT Transfer (USD)']
        },
        {
            text: 'Credit/Debit Card',
            children: ['Visa/Mastercard (EUR)', 'Visa/Mastercard (USD)']
        }],
        placeholder: 'Choose E-currency',
        showSearchInputInDropdown: false
    });



    $('#payment-method').selectivity({
        allowClear: false,
        items: [
            'Bitcoin (BTC)',
            'Litecoin (LTC)',
            'Namecoin (NMC)',
            'Peercoin (PPC)'
        ],
        placeholder: 'Choose payment method',
        showSearchInputInDropdown: false
    });

    $('#bank-branch').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Bank branch'
    });

    $('#bank-branch-2').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Tutte le Banche di Credito Cooperativo'
    });

    $('#country').selectivity({
        allowClear: false,
        items: [
                'Abkhazia',
                'Afghanistan',
                'Albania',
                'Algeria',
                'Andorra',
                'Angola',
                'Anguilla',
                'Antarctica',
                'Antigua and/or Barbuda',
                'Argentina',
                'Armenia',
                'Aruba',
                'Australia',
                'Austria',
                'Azerbaijan',
                'Bahamas',
                'Bahrain',
                'Barbados',
                'Belarus',
                'Belgium',
                'Benin',
                'Bermuda',
                'Bhutan',
                'Bolivia',
                'Bosnia and Herzegovina',
                'Botswana'
        ],
        placeholder: 'Please Choose Country of Your Residence'
    });

    $(".modal-login-mob").on("hidden.bs.modal", function(){
        $(".js-modal-tab-register").removeClass('active');
        $(".js-modal-tab-login").addClass('active');
    });
