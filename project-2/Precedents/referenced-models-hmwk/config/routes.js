const router = require('express').Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const secureRoute = require('../lib/secureRoute');
const cars         = require('../controllers/cars');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/cars')
.get(cars.index)
.post(secureRoute, cars.create);

router.route('/cars/new')
.get(secureRoute, cars.new);

router.route('/cars/:id')
.get(cars.show)
.put(secureRoute, cars.update)
.delete(secureRoute, cars.delete);

router.route('/cars/:id/edit')
.get(secureRoute, cars.edit);

router.route('/register')
.get(registrationsController.new)
.post(registrationsController.create);

router.route('/login')
.get(sessionsController.new)
.post(sessionsController.create);

router.route('/logout')
.get(sessionsController.delete);

router.route('/profile')
.get(secureRoute, registrationsController.show)
.put(secureRoute, registrationsController.update)
.delete(secureRoute, registrationsController.delete);

router.route('/profile/edit')
.get(secureRoute, registrationsController.edit);

router.route('/cars/:id/comments')
  .post(secureRoute, cars.createComment);

router.route('/cars/:id/comments/:commentId')
    .delete(secureRoute, cars.deleteComment);


router.all('*', (req, res) => res.notFound());

module.exports = router;
