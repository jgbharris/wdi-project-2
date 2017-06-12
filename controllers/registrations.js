const User = require('../models/user');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;

  console.log(req.body);

  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
      return res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

function showRoute(req, res) {
  return res.render('registrations/show');
}

function editRoute(req, res) {
  return res.render('registrations/edit');
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile/edit', err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  return req.user.remove()
    .then(() => {
      req.session.regenerate(() => res.redirect('/'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
