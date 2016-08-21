var mobileModules = '';
(function ($) {

    $(function () {
        /**/
    });

    mobileModules = {

        xs_functions: function () {

            $("table").each(function (i) {
                var table = $(this);
                $(this).find('tbody > *').each(function (c) {
                    $(this).find('>td').each(function (d) {
                        console.log(d);
                        $(this).attr('data-label', table.find('thead>*>th').eq(d).text());
                    });
                });
            });

            mob_elemets_collector = function (selectors) {
                var value = '';
                $.each(selectors, function (i, val) {
                    if ($(val).html()) {
                        var html_tag = $(val).prop('tagName');
                        value = value + "<" + html_tag + " class='" + val.replace(".", "") + "'>" + $(val).html() + "</" + html_tag + ">";
                    }
                });
                return value;
            };

            collect_from_json = function (json) {
                variable = '';
                $.each(json, function (i, val) {
                    variable = variable + '<div class="' + val.class + '">' + val.before_content + mob_elemets_collector(val.content) + val.after_content + '</div>'
                });
                return variable;
            };

            mobile_data_json = {

                mob_nav_collection_structure: [
                    {
                        class: 'mob_nav_header',
                        before_content: '<div class="mob-top-icons">',
                        content: [
                            '.mob-nav-top-line'
                        ],
                        after_content: '</div>'
                    },
                    {
                        class: 'mob_nav_menus',
                        before_content: '',
                        content: [
                            '.menu'
                        ],
                        after_content: ''
                    }
                ],

                mob_header_structure: [
                    {
                        class: 'mob-header-items',
                        before_content: '',
                        content: [
                        ],
                        after_content: ''
                    }
                ],

                mob_search_structure: [
                    {
                        class: 'mob-search',
                        before_content: 'Search bar place.',
                        content: [

                        ],
                        after_content: ''
                    }
                ]

            };

            mob_nav_collection = collect_from_json(mobile_data_json['mob_nav_collection_structure']);
            mob_header_collection = collect_from_json(mobile_data_json['mob_header_structure']);
            mob_search_collection = collect_from_json(mobile_data_json['mob_search_structure']);

            $('.mob_nav_container_sticky, .mob_header_extention, .mob-search-container').remove();

            $('#page').before('<div class="mob_nav_container_sticky">' + mob_nav_collection + '</div>');
            $('#page #header').append('<div class="mob_header_extention hide">' + mob_header_collection + '</div>');
            $('#page #header').before('<div class="mob-search-container hide">' + mob_search_collection + '</div>');

            $('.langs-select select').on('change', function () {
                var value = $(this).val();
                window.location.href = value;
            });

            $('.mob_search a').on('click', function (event) {
                event.preventDefault();
                $('.mob-search-container').toggleClass('opened')
            });
            $('.index-slider .overlay_shape>svg>svg').attr('height', '54');
        },
        sm_functions: function () {
          $('.index-slider .overlay_shape>svg>svg').attr('height', '124');
        },
        md_functions: function () {
          $('.index-slider .overlay_shape>svg>svg').attr('height', '124');
        },
        lg_functions: function () {
          $('.index-slider .overlay_shape>svg>svg').attr('height', '124');
        },
        xlg_functions: function () {
          $('.index-slider .overlay_shape>svg>svg').attr('height', '124');
        },
        detect_smallest_rez: function () {

            w = $(window).width()+20;

            if (w <= 567) {
                status = 'xs';
                if (resolution_status != status) {
                    resolution_status = status;
                    if (!$('html').hasClass('no-responsive')) {
                        mobileModules.xs_functions();
                    }
                }
            } else if (w >= 568 && w <= 767) {
                status = 'sm';
                if (resolution_status != status) {
                    resolution_status = status;
                    //sm_functions(); /*Skip SM*/

                    if (!$('html').hasClass('no-responsive')) {
                        mobileModules.xs_functions();
                    }
                }
            } else if (w >= 768 && w <= 1023) {
                status = 'md';
                if (resolution_status != status) {
                    resolution_status = status;
                    mobileModules.md_functions();
                }
            } else if (w >= 1024 && w <= 1279) {
                status = 'lg';
                if (resolution_status != status) {
                    resolution_status = status;
                    mobileModules.lg_functions();
                }
            } else if (w >= 1280) {
                status = 'xlg';
                if (resolution_status != status) {
                    resolution_status = status;
                    mobileModules.xlg_functions();
                }
            }
            console.log(status+' '+w);

        },
        desktop_v_switcher: function () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                $('meta[name="viewport"]').attr('content', 'width=1360')
            }

        },
        smart_vers: function () {

            $(window).on('resize', function () {
                mobileModules.detect_smallest_rez();
            });

            $('a.logo').after('<a href="#" class="smart_menu_caller"><i class="icon-ico_hamburger"></i><i class="icon-ico_hamburger_close"></i></a>');

            $('a.smart_menu_caller').on('click', function (event) {
                event.preventDefault();
                $('body').toggleClass('mob_menu_opened');
            });

            $('body').on('click', '.mob_nav_container_sticky .s-menu-main ul > li.has-submenu > a', function (event) {
                event.preventDefault();
                if ($(this).parent().hasClass('open')) {
                    $(this).parent().removeClass('open');
                    $(this).next().slideUp('fast', function () {
                    });
                } else {
                    $(this).parent().addClass('open');
                    $(this).next().slideDown('fast', function () {
                    });
                }

            })

        }

    };

    var resolution_status;

})(jQuery);
