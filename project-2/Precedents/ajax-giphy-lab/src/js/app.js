$(() => {
  $('form').on('submit', getGifs);
  $('button').on('click', getGifs);
});

let offset = 0;

function addGif(gif) {
  $('main').append(`<img src="${gif.images.fixed_height.url}">`);
}

function getGifs(e) {
  e.preventDefault();
  const searchInput = $('input[name="q"]').val();

  if(!$(this).is('button')) {
    emptyGifs();
  }

  $.get(`http://api.giphy.com/v1/gifs/search?q=${searchInput}&offset=${offset}&api_key=dc6zaTOxFJmzC`)
    .done((gifs) => {
      $.each(gifs.data, (i, gif) => {
        addGif(gif);
      });
      offset += 25;
    });
}

function emptyGifs() {
  $('main').empty();
}
