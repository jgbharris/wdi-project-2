/* global google:ignore */
$(() => {
  const $map = $('#map');
  const $autocomplete = $('.autocomplete');
  let map = null;
  if($map.length) initMap();
  if($autocomplete.length) initAutocomplete();

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



});
