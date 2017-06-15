/* global google:ignore */
$(() => {
  const $map = $('#map');
  const $autocomplete = $('.autocomplete');
  const $date = $('#date');
  let map = null;
  if($map.length) initMap();
  if($autocomplete.length) initAutocomplete();

  function pickDate() {
    $date.datepicker();
  }

  pickDate();

  function addCoordinates(latLng) {
    console.log('inside addCoordinates()');
    $('#lat').val(latLng.lat);
    $('#lng').val(latLng.lng);
  }

  function initMap() {
    const lat = $map.data('lat');
    const lng = $map.data('lng');
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: latLng,
      scrollwheel: false
    });

    addMarker(latLng);
  }


  function addMarker(latLng) {
    new google.maps.Marker({
      position: latLng,
      map: map,
      icon: '../assets/images/dot.svg'
    });
  }

  function initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete($autocomplete.get(0), { componentRestrictions: { country: 'gb' } });
    autocomplete.addListener('place_changed', () => {
      console.log('changed');
      const latLng = autocomplete.getPlace().geometry.location.toJSON();
      addCoordinates(latLng);
    });
  }

  function intro() {
    let count = 0;
    const wordsArray = ['Go', 'Big', 'or', 'Go', 'Home!'];
    setInterval(function () {
      count++;
      $('#word').fadeOut(400, function () {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 1000);

  }

  intro();



  function backgroundChange() {
    let count = 0;
    const backgroundArray = ['../assets/images/homepage1.jpg', '../assets/images/homepage2.jpg', '../assets/images/homepage3.jpg', '../assets/images/homepage4.jpg', '../assets/images/homepage5.jpg'];

    setInterval(function () {
      count++;
      $('#homeimage').fadeOut(400, function() {
        console.log(this);
        $(this).css('background-image', `url(${backgroundArray[count % backgroundArray.length]})`).fadeIn(400);
      });
    }, 1000);
  }

  backgroundChange();

});
