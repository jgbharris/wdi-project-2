const Car = require('../models/car');

function indexRoute(req, res, next) {
  Car
    .find()
    .populate('createdBy')
    .exec()
    .then((cars) => res.render('cars/index', { cars }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('cars/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Car
    .create(req.body)
    .then(() => res.redirect('/cars'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/cars/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Car
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((car) => {
      if(!car) return res.notFound();
      return res.render('cars/show', { car });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Car
    .findById(req.params.id)
    .exec()
    .then((car) => {
      if(!car) return res.redirect();
      if(!car.belongsTo(req.user)) return res.unauthorized(`/cars/${car.id}`, 'You do not have permission to edit that resource');
      return res.render('cars/edit', { car });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Car
    .findById(req.params.id)
    .exec()
    .then((car) => {
      if(!car) return res.notFound();

      for(const field in req.body) {
        car[field] = req.body[field];
      }

      return car.save();
    })
    .then(() => res.redirect(`/cars/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/cars/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Car
    .findById(req.params.id)
    .exec()
    .then((car) => {
      if(!car) return res.notFound();
      return car.remove();
    })
    .then(() => res.redirect('/cars'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Car
    .findById(req.params.id)
    .exec()
    .then((car) => {
      if(!car) return res.notFound();

      car.comments.push(req.body);
      return car.save();
    })
    .then((car) => res.redirect(`/cars/${car.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {

  Car
   .findById(req.params.id)
   .exec()
   .then((car) => {
     if(!car) return res.notFound();

     const comment = car.comments.id(req.params.commentId);
     comment.remove();

     return car.save();
   })
   .then((car) => res.redirect(`/cars/${car.id}`))
   .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
