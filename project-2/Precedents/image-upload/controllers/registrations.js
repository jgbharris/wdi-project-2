const User = require('../models/user');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

function showRoute(req, res) {
  return res.render('registrations/show');
}

function editRoute(req, res) {
  return res.render('registrations/edit');
}

function updateRoute(req, res) {

  if(req.file) req.body.image = req.file.key;

  for(const key in req.body) {
    req.user[key] = req.body[key];
  }

  return req.user
    .save()
    .then(() => res.redirect('/profile'));
}

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};