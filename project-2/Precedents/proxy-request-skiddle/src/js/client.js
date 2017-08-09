$(() => {

  const $slider = $('input[type="range"]');
  const $distance = $('.distance');
  const $events = $('.events');

  if($('*[data-location]').length > 0){
    getWeather();
    getEvents();
  }

  $slider.on('change', getEvents);

  function getWeather() {
    const location = $('h3').data('location');
    const $weather = $('.weather');

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

  function getEvents() {

    // Grab current value from range
    const radius = $slider.val();
    $distance.text(radius);

    // Empty out events div first
    $events.empty();

    // Grab the location (lat and lng) from the data attribute
    const location = $('h3').data('location');
    // Adding the radius to the location object
    location.radius = radius;


    $.ajax({
      url: '/event',
      method: 'GET',
      data: location
    })
      .then((data) => {
        data.results.forEach((event) => {
          $events.prepend(`
            <div class="col-md-6">
              <div class="card">
                <div class="card-block">
                  <h4 class="card-title">${event.eventname}</h4>
                  <p class="card-text">${event.venue.name}</p>
                  <p class="card-text">${event.venue.type}</p>
                  <p class="card-text">${event.description}</p>
                  <a href="${event.link}" class="btn btn-primary">More Info</a>
                </div>
              </div>
            </div>
          `);
        });
      });
  }

});
