'use strict';
/* global Pace */
/* global grecaptcha */

/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function(doc) {
  /*
    VIEWPORT BUG FIX
    iOS viewport scaling bug fix, by @mathias, @cheeaun and @jdalton
  */
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

$(function() {
  // Preloader display / hide
  Pace.on('start', function() {
    $('#curtain').fadeIn(500);
  });
  Pace.on('hide', function() {
    $('#curtain').fadeOut(1000);
    $('.banner-heading').delay(500).queue(function() {
      $(this).addClass('logo-fire').dequeue();
      $(this).delay(1250).queue(function() {
        $(this).removeClass('logo-fire').dequeue();
      });
    });
  });

  $('.banner-heading').click('#contact');

  /*!
   * http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
   * davidcondrey
   */
  var isMobile = false; // initiate as false
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  // If not mobile, then resize each section to fill the screen
  function resizeSectionToScreen() {
    $('#home').animate({
      height: $(window).height()
    }, 500);
    var m = (($(window).height() - $('#home .container').height()) / 4) > 0 ? (($(window).height() - $('#home .container').height()) / 4) : 0;
    $('#home .container').css({
      'margin-top': '' + m + 'px',
      'margin-bottom': '' + m + 'px'
    });
    $.each($('section'), function() {
      $(this).animate({
        'min-height': $(window).height()
      }, 500);
      m = (($(window).height() - $(this).height()) / 4) > 0 ? (($(window).height() - $(this).height()) / 4) : 0;
      $('.container', this).css({
        'margin-top': '' + m + 'px',
        'margin-bottom': '' + m + 'px'
      });
    });
  }

  if (!(isMobile)) {
    window.onresize = function(event) {
      resizeSectionToScreen();
    };

    window.onload = function(event) {
      resizeSectionToScreen();
    };
  }

  // jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
    if ($('.navbar').offset().top > 50) {
      $('.navbar-fixed-top').addClass('top-nav-collapse');
    }
    else {
      $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
  });

  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).position().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar'
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

  // Brand highlighting marquee
  var taglines = ['Coding loops since 2000, drumming loops since 1982', 'Has your on-time delivery covered', 'Multi-tasking is second nature', 'The droid you\'re looking for'];
  (function taglineMarquee() {
    $.each(taglines, function(i, v) {
      var tagline = v;
      setTimeout(function() {
        $('.banner-heading > span').fadeOut(1000, function() {
          $(this).text(tagline).fadeIn(1000);
          if (i === 3) {
            taglineMarquee();
          }
        });
      }, 6000 + (i * 6000));
    });
  })(0);

  // Animate logo by navbar site name
  /* (function nameLogoFade() {
      $('.navbar-brand.page-scroll > i').delay(4000).fadeOut(1000, function() {
          $(this).removeClass('fa-headphones').addClass('fa-code').fadeIn(1000, function() {
              $(this).delay(4000).fadeOut(1000, function() {
                  $(this).removeClass('fa-code').addClass('fa-headphones').fadeIn(1000, function() {
                      nameLogoFade();
                  });
              });
          });
      });
  })(0); */

  /* BEGIN: contact form processing
    https://github.com/jonmbake/bootstrap3-contact-form
  */

  // Contact form object
  var contactFormUtils = {
    isValidEmail: function(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    },
    clearErrors: function() {
      $('#emailAlert').remove();
      $('#contactForm .help-block').hide();
      $('#contactForm .form-group').removeClass('has-error');
    },
    clearForm: function() {
      $('#contactForm .glyphicon').removeClass('glyphicon-check').addClass('glyphicon-unchecked').css({
        color: ''
      });
      $('#contactForm input,textarea').val('');
      grecaptcha.reset();
    },
    addError: function($input) {
      var parentFormGroup = $input.parents('.form-group');
      parentFormGroup.children('.help-block').show();
      parentFormGroup.addClass('has-error');
    },
    addAjaxMessage: function(msg, isError) {
      $('#msgSendBtn').before('<div id="emailAlert" class="alert alert-' + (isError ? 'danger' : 'success') + '">' + $('<div/>').text(msg).html() + '</div>');
    }
  };

  $('#msgSendBtn').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    $btn.html('<i class="fa fa-paper-plane-o"></i> Sending...');
    contactFormUtils.clearErrors();
    // Do a little client-side validation -- check that each field has a value and e-mail field is in proper format
    var hasErrors = false;
    $('#contactForm input,#contactForm textarea').not('.optional').each(function() {
      var $this = $(this);
      if (($this.is(':checkbox') && !$this.is(':checked')) || !$this.val()) {
        hasErrors = true;
        contactFormUtils.addError($(this));
      }
    });
    var $email = $('#email');
    if (!contactFormUtils.isValidEmail($email.val())) {
      hasErrors = true;
      contactFormUtils.addError($email);
    }

    // If there are any errors return without sending e-mail
    if (hasErrors) {
      $btn.html('<i class="fa fa-envelope-o"></i> Send');
      return false;
    }

    // Send the feedback e-mail
    $.ajax({
      type: 'POST',
      url: 'lib/sendmail.php',
      dataType: 'json',
      data: $('#contactForm').serialize(),
      success: function(data) {
        contactFormUtils.addAjaxMessage('Thank you for your message! Expect a reply soon!', false);
        $btn.html('<i class="fa fa-envelope-o"></i> Send');
        contactFormUtils.clearForm();
      },
      error: function(response) {
        if (response.status === 200) {
          contactFormUtils.addAjaxMessage('Thank you for your message! Expect a reply soon!', false);
          $btn.html('<i class="fa fa-envelope-o"></i> Send');
          contactFormUtils.clearForm();
        }
        else {
          contactFormUtils.addAjaxMessage(response.responseJSON.message, true);
          $btn.html('<i class="fa fa-envelope-o"></i> Send');
        }
      }
    });
    return false;
  });
  $('#contactForm input, #contactForm textarea').change(function() {
    var checkBox = $(this).siblings('span.input-group-addon').children('.glyphicon');
    if ($(this).val()) {
      checkBox.removeClass('glyphicon-unchecked').addClass('glyphicon-check').css({
        color: 'green'
      });
    }
    else {
      checkBox.removeClass('glyphicon-check').addClass('glyphicon-unchecked').css({
        color: ''
      });
    }
  });

  /* END: contact form processing */
});
