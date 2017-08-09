// jQuery
$(() => {
  $('form#new-donut').on('submit', createDonut);
  $('body').on('click', '.delete', removeDonut);
  getDonuts();
});

function createDonut(e){
  e.preventDefault();

  // our API uses JSON, so we need to make a javascript object! There are a lot of ways to do this, this just a basic example.
  const donut = {
    style: $('select#donut-style').val(),
    flavor: $('input#donut-flavor').val()
  };

  // create a new AJAX request
  $.post('https://ga-doughnuts.herokuapp.com/donuts', donut)
    .done((data) => {
      console.log(data);
      addDonut(data);
    });

  // clear our input box!
  $('input#donut-flavor').val(null);
}

function getDonuts(){
  $.get('https://ga-doughnuts.herokuapp.com/donuts')
    .done((data) => {
      $.each(data, (index, donut) => {
        addDonut(donut);
      });
    });
}

function addDonut(donut) {
  $('ul#donuts').prepend(`
    <li>${donut.flavor} - <em>${donut.style}</em> - <button data-id="${donut.id}" class="delete">Delete</button></li>
    `);
}

function removeDonut(){
  const id = $(this).data('id');

  $.ajax({
    // grab the id of the donut (that we stored in the button data-id attribute) and send it in our request
    url: `https://ga-doughnuts.herokuapp.com/donuts/${id}`,
    method: 'DELETE'
  }).done(() => {
    // remove the button's parent (the <li>) from the dom
    $(this).parent().remove();
  });
}
