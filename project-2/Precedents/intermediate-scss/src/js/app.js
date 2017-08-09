$(() => {
/* global google:true */
  $(window).scroll(updateHeader).trigger('scroll');

  function updateHeader() {
    const viewportHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    if (scrollTop>= viewportHeight - $('header').height()) {
      $('header').addClass('translucent');
    } else {
      $('header').removeClass('translucent');
    }
  }

  $('nav a').on('click', scrollToSection);

  function scrollToSection() {
    const section = $(this).attr('href');
    $('body').animate({
      scrollTop: $(section).offset().top - 40
    }, 1000, () => {
      if ($(window).width() < 575) {
        $('.dropdown').slideToggle();
      }
    });

  }

  function initMap() {
    const lat = $('#map').data('lat');
    const lng = $('#map').data('lng');
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    const map = new google.maps.Map(document.getElementById('map'), {
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
    let count = 0;
    const wordsArray = ['Get', 'Ready', 'To', 'Shake', 'Your ', 'Booty'];
    setInterval(function () {
      count++;
      $('#word').fadeOut(400, function () {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 1500);

  }

  intro();



});
