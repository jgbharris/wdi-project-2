const express = require('express');
const router  = express.Router();

const citiesController = require('../controllers/cities');
const weatherController = require('../controllers/weather');
const eventController = require('../controllers/events');

router.get('/', (req, res) => res.redirect('/cities'));

router.get('/weather', weatherController.proxy);

router.get('/event', eventController.proxy);

router.route('/cities')
  .get(citiesController.index)
  .post(citiesController.create);

router.route('/cities/new')
  .get(citiesController.new);

router.route('/cities/:id')
  .get(citiesController.show)
  .put(citiesController.update)
  .delete(citiesController.delete);

router.route('/cities/:id/edit')
  .get(citiesController.edit);

module.exports = router;
