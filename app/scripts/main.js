/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
    }
    else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
});

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar'
    });

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).position().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
$('.navbar-brand.page-scroll').click(function() {
    if ($('.navbar-collapse.navbar-right.navbar-main-collapse.collapse').attr('aria-expanded') === 'true') {
        $('.navbar-toggle:visible').click();
    }
});

// animate logo by navbar site name
(function nameLogoFade() {
    $('.navbar-brand.page-scroll > i').delay(4000).fadeOut(1000, function() {
        $(this).removeClass('fa-headphones').addClass('fa-laptop').fadeIn(1000, function() {
            $(this).delay(4000).fadeOut(1000, function() {
                $(this).removeClass('fa-laptop').addClass('fa-headphones').fadeIn(1000, function() {
                    nameLogoFade();
                });
            });
        });
    });
})(0);


/*
	VIEWPORT BUG FIX
	iOS viewport scaling bug fix, by @mathias, @cheeaun and @jdalton
*/
(function(doc) {
    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }
    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }
}(document));


// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(42.314414, -71.475738), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 17
            }]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 20
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 17
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 29
            }, {
                'weight': 0.2
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 18
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 16
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 21
            }]
        }, {
            'elementType': 'labels.text.stroke',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#000000'
            }, {
                'lightness': 16
            }]
        }, {
            'elementType': 'labels.text.fill',
            'stylers': [{
                'saturation': 36
            }, {
                'color': '#000000'
            }, {
                'lightness': 40
            }]
        }, {
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'transit',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 19
            }]
        }, {
            'featureType': 'administrative',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 20
            }]
        }, {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#000000'
            }, {
                'lightness': 17
            }, {
                'weight': 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id='map' seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'images/map-marker.png';
    var myLatLng = new google.maps.LatLng(42.314414, -71.475738);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
