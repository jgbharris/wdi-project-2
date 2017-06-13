const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

const User = require('../models/user');
const Event = require('../models/event');

User.collection.drop();
Event.collection.drop();


User
  .create([{
    firstName: 'James',
    lastName: 'Harris',
    username: 'jgbharris',
    email: 'jgbharris@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    firstName: 'Jimbo',
    lastName: 'Harris',
    username: 'jimboharris88',
    email: 'jimboharris88@googlemail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Event
      .create([{
        name: 'Big beat manifesto',
        location: 'Ministry of sound',
        lat: 51.515419,
        lng: -0.141099,
        date: '22/07/2017',
        description: 'Big beats are the best',
        createdBy: users[0]
      },{
        name: 'Bass Fest',
        location: 'Fabric',
        lat: 51.515419,
        lng: -0.141099,
        date: '25/07/2017',
        description: 'DJ mental cracking out some banging tunes til the early hours',
        createdBy: users[0]
      }]);
  })
  .then((events) => console.log(`${events.length} events created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
