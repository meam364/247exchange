//= ./jelect.js

//= ./selectivity-full.min.js

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

var jelect = $('.js-jelect'),
    current = $('.js-jelect-current');

jelect.on( 'change', function (e) {
    current[0].className = 'choose-lang-mob__current js-jelect-current choose-lang-mob__current-' + this.value;
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
        placeholder: 'Bank branch',
        showSearchInputInDropdown: false
    });

    $('#bank-branch-2').selectivity({
        allowClear: false,
        items: ['test', 'test1', 'test2'],
        placeholder: 'Tutte le Banche di Credito Cooperativo',
        showSearchInputInDropdown: false
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

    $('#cites').selectivity({
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


        $('#points').selectivity({
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


    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('modal__map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
