'use strict';

$(function () {
  /* global google:true */
  $(window).scroll(updateHeader).trigger('scroll');

  function updateHeader() {
    var viewportHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= viewportHeight - $('header').height()) {
      $('header').addClass('translucent');
    } else {
      $('header').removeClass('translucent');
    }
  }

  $('nav a').on('click', scrollToSection);

  function scrollToSection() {
    var section = $(this).attr('href');
    $('body').animate({
      scrollTop: $(section).offset().top - 40
    }, 1000, function () {
      if ($(window).width() < 575) {
        $('.dropdown').slideToggle();
      }
    });
  }

  function initMap() {
    var lat = $('#map').data('lat');
    var lng = $('#map').data('lng');
    var latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: latLng
    });

    new google.maps.Marker({
      map: map,
      position: latLng
    });
  }
  initMap();

  $('.menu').on('click', toggleMenu);

  function toggleMenu() {
    $('.dropdown').slideToggle();
  }

  function intro() {
    var count = 0;
    var wordsArray = ['Get', 'Ready', 'To', 'Shake', 'Your ', 'Booty'];
    setInterval(function () {
      count++;
      $('#word').fadeOut(400, function () {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 1500);
  }

  intro();
});