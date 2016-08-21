var plugins = '';
(function ($) {

    $(function () {
        // Run on DOM ready
    });
    plugins = {
        fancybox: function (obj) {
            obj.fancybox({helpers: {media: {}, overlay: {locked: false}}});
        },
        swipers: function () {
            index_swiper = new Swiper('.index-slider.swiper-container', {
                autoplay: 5000,
                loop: true,
                scrollbarHide: true,
                pagination: '.index-slider .swiper-pagination',
                nextButton: '.index-slider .swiper-button-next',
                prevButton: '.index-slider .swiper-button-prev'
            });

        },
        buildMobile: function () {
            mobileModules.detect_smallest_rez();
            mobileModules.smart_vers();
            mobileModules.desktop_v_switcher();
        },
        actionScroll: function() {
          $('a.godown').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top+1}, 600);
          });
          $(window).scroll(function() {

            if($(window).scrollTop()>$("#here_1").offset().top) {
              $('body').addClass('menuopened');
            }else{
              $('body').removeClass('menuopened');
            }
          });
        }
    };

    /* SCRIPTS INIT */
    plugins.fancybox($('.fancy'));
    plugins.buildMobile();
    plugins.actionScroll();
    //plugins.swipers();
    /* SCRIPTS INIT END */

    /* OLD BROWSER WARNING */
    $.reject({
        reject: {msie: 9},
        closeCookie: true,
        imagePath: 'js/plugins/jReject-master/images/',
        header: 'Your browser is not supported here', // Header Text
        paragraph1: 'You are currently using an unsupported browser', // Paragraph 1
        paragraph2: 'Please install one of the many optional browsers below to proceed',
        closeMessage: 'Close this window at your own demise!' // Message below close window link
    });
    /* OLD BROWSER WARNING END */
})(jQuery);
