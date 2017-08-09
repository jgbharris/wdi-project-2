$(() => {
  const location = $('h3').data('location');

  if($('*[data-location]').length > 0) getWeather();
  if($('*[data-location]').length > 0) getEvents();
  const $idRadius = $('#radius');
  $idRadius.on('change', getRadius);

});



function getWeather() {

  const $weather = $('.weather');
  const location = $('h3').data('location');

  $.ajax({
    url: '/weather',
    method: 'GET',
    data: location
  })
  .then((data) => {
    $weather.html(`
      <strong>${data.currently.temperature}ºC</strong> ${data.currently.summary}
    `);
  });
}

function initMap(id, event) {
  console.log(event.venue.latitude);
  const latLng = { lat: event.venue.latitude, lng: event.venue.longitude };

  const map = new google.maps.Map(document.getElementById(id), {
    zoom: 14,
    center: latLng
  });

  new google.maps.Marker({
    map: map,
    position: latLng
  }) ;
}



function getEvents(radius=5) {



  const $eventName = $('.event-name');
  const location = $('h3').data('location');
  location.radius = radius;


  $.ajax({
    url: '/events',
    method: 'GET',
    data: location
  })
  .then((data) => {

    $eventName.empty();

    for( let i = 0; i < data.results.length; i ++) {
      console.log(data.results[i]);
      $eventName.prepend(`
    <img src="${data.results[i].imageurl}" alt="${data.results[i].eventname}" height="75px" width="75px">

    <h3>${data.results[i].eventname}</h3>
      <p class="card-text">Venue Name: <span class= "venue-name">${data.results[i].venue.name}</span></p>

      <p class="card-text">Event Type: <span class= "event-type">${data.results[i].venue.type}</span></p>

      <p class="card-text">Event Date: <span class="event-date">${data.results[i].date}</span></p>

      <p class="card-text">Event Description: <span class="event-description">${data.results[i].description}</span></p>
      <a href="${data.results[i].link}" target="_blank">More Info</a>

      <div id="map${i}"></div>
      <hr />`);

      initMap(`map${i}`, data.results[i]);
    }
  });

}

function getRadius(){
  const value = $('#radius').val();
  console.log('radius value is', value);
  getEvents(value);
  $('#miles').html(value);
}






// event name - data.results.eventname
// venue name - data.results.venue.name
// lat/longitude - data.results.venue.latitude, data.results.venue.longitude
// event type - data.results.venue.type
// image - data.results.imageurl

// Date - data.results.date
// description - data.results.description

// link url - data.results.link
