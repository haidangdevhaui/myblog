$(document).ready(function() {
    $('.search-box').click(function() {
        $('.search-div').fadeIn('fast');
    });
    $('.close-search-div').click(function() {
        $('.search-div').fadeOut('fast');
    });
    $('.menu-active').click(function(){
    	$(window).scrollTop(0);
    	$('.menu').slideToggle('fast');
    });
});
