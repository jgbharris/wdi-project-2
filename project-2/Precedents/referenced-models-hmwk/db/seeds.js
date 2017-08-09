const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const { env } = require('../config/environment');

const dbURI = process.env.MONGODB_URI || `mongodb://localhost/referenced-models-${env}`;
mongoose.connect(dbURI);

const User = require('../models/user');
const Car = require('../models/car');

User.collection.drop();
Car.collection.drop();


User
  .create([{
    firstName: 'James',
    lastName: 'Harris',
    username: 'jgbharris',
    email: 'jimboharris88@googlemail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Car
      .create([{
        model: 'CCXR',
        brand: 'Koenigsegg',
        speed: 180,
        acceleration: 3.2,
        image: 'https://images.askmen.com/top_10/cars/1245427247_top-10-supercars-that-should-be-affordable_6.jpg',
        stars: 5,
        createdBy: users[0]
      },{
        model: 'Sesto Elemento',
        brand: 'Lamborghini',
        speed: 180,
        acceleration: 3.2,
        image: 'http://i.ebayimg.com/images/g/cl4AAOSwnHZYReus/s-l300.jpg',
        stars: 4,
        createdBy: users[0]
      }]);
  })
  .then((cars) => console.log(`${cars.length} cars created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
