const router = require('express').Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const secureRoute = require('../lib/secureRoute');
const events         = require('../controllers/events');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');


router.route('/oauth/facebook')
  .get(oauth.facebook);

router.get('/', (req, res) => res.render('statics/index'));

router.route('/events')
.get(events.index)
.post(secureRoute, upload.single('image'), events.create);

router.route('/events/new')
.get(secureRoute, events.new);

router.route('/events/:id')
.get(events.show)
.post(secureRoute, upload.single('image'), events.update)
.delete(secureRoute, events.delete);

router.route('/events/:id/edit')
.get(secureRoute, events.edit);

router.route('/register')
.get(registrationsController.new)
.post(upload.single('image'), registrationsController.create);

router.route('/login')
.get(sessionsController.new)
.post(sessionsController.create);

router.route('/logout')
.get(sessionsController.delete);

router.route('/profile/edit')
.get(secureRoute, registrationsController.edit)
.post(secureRoute, upload.single('image'), registrationsController.update);

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment);

router.route('/events/:id/comments/:commentId')
    .delete(secureRoute, events.deleteComment);

router.route('/events/:id/attendees')
  .post(secureRoute, events.createAttendee); // ADDED IN FOR GUESTLIST

router.route('/events/:id/attendees/:attendeeId')
    .delete(secureRoute, events.deleteAttendee); // ADDED IN FOR GUESTLIST

router.route('/profile')
  .get(secureRoute, registrationsController.show)
  .post(secureRoute, upload.single('image'), registrationsController.update)
  .delete(secureRoute, registrationsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
