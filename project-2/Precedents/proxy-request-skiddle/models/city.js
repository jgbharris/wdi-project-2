const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String },
  population: { type: Number },
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model('City', citySchema);
