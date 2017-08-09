const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const databaseURL = 'mongodb://localhost/proxy';
mongoose.connect(databaseURL);

const City = require('../models/city');

City.collection.drop();

City
  .create([
    {
      name: 'London',
      country: 'England',
      image: 'https://www.city.ac.uk/__data/assets/image/0009/328797/building-partnerships.jpg',
      population: 8673713,
      lat: 51.5074,
      lng: 0.1278
    },
    {
      name: 'Paris',
      country: 'France',
      image: 'http://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_233/visuel-carrousel-dossier-ou-sortir-le-soir-a-paris-740x380-c-dr/16967596-1-fre-FR/Visuel-carrousel-dossier-Ou-sortir-le-soir-a-Paris-740x380-C-DR.jpg',
      population: 2229621,
      lat: 48.8566,
      lng: 2.3522
    },
    {
      name: 'Rome',
      country: 'Italy',
      image: 'https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5232386545001_5215063851001-vs.jpg?pubId=5104226627001&videoId=5215063851001',
      population: 4353775,
      lat: 41.9028,
      lng: 12.4964
    },
    {
      name: 'Berlin',
      country: 'Germany',
      image: 'http://www.slate.com/content/dam/slate/articles/news_and_politics/roads/2016/04/160414_RK_Berlin.jpg.CROP.promo-xlarge2.jpg',
      population: 3671000,
      lat: 52.5200,
      lng: 13.4050
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://www.visitdubai.com/-/media/optimised-images/itineraries/24%20hours%20in%20dubai/dubai-in-24-hours-panel-desktop.jpg',
      population: 2752736,
      lat: 25.2048,
      lng: 55.2708
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      image: 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/tokyo-mud-bath-bar-mudbath0716.jpg?itok=dJ8lDXJh',
      population: 13617445,
      lat: 35.6895,
      lng: 139.6917
    },
    {
      name: 'Sydney',
      country: 'Australia',
      image: 'https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200',
      population: 5005400,
      lat: 33.8688,
      lng: 151.2093
    },
    {
      name: 'New York City',
      country: 'United States of America',
      image: 'http://www.newyorker.com/wp-content/uploads/2015/12/Veix-Goodbye-New-York-Color-1200.jpg',
      population: 8550405,
      lat: 40.7128,
      lng: 74.0059
    },
    {
      name: 'Mumbai',
      country: 'India',
      image: 'https://imghtlak.mmtcdn.com/blog/sites/default/files/mumbai-independence.jpg',
      population: 12442373,
      lat: 19.0760,
      lng: 72.8777
    },
    {
      name: 'Beijing',
      country: 'China',
      image: 'https://www.whitecase.com/sites/whitecase/files/images/locations/Beijing_China_Tablet_1920x960.jpg',
      population: 21700000,
      lat: 39.9042,
      lng: 116.4074
    }
  ])
  .then((cities) => {
    console.log(`${cities.length} cities created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });