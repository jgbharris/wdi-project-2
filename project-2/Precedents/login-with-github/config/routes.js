const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const oauth = require(`../controllers/oauth`);

router.get('/', (req, res) => res.render('statics/index'));

router.route(`/oauth/github`)
.all(oauth.github);

router.route('/profile')
  .get(secureRoute, registrations.show);

router.route('/profile')
  .delete(secureRoute, registrations.delete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;
