const Event = require('../models/event');


function indexRoute(req, res, next) {
  const regex = new RegExp(req.query.q, 'i');
  const query = { name: regex };
  Event
    .find(query)
    .populate('createdBy')
    .exec()
    .then((events) => res.render('events/index', { events }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('events/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  req.body.createdBy = req.user;
  console.log('req.user', req.user);

  Event
    .create(req.body)
    .then(() => res.redirect('/events'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/events/new`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .populate('createdBy comments.createdBy attendees')
    .exec()
    .then((event) => {
      if(!event) return res.notFound();
      return res.render('events/show', { event });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.redirect();
      if(!event.belongsTo(req.user)) return res.unauthorized(`/events/${event.id}`, 'You do not have permission to edit that resource');
      return res.render('events/edit', { event });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;

  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      for(const field in req.body) {
        event[field] = req.body[field];
      }

      return event.save();
    })
    .then(() => res.redirect(`/events/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/events/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();
      return event.remove();
    })
    .then(() => res.redirect('/events'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      event.comments.push(req.body);
      return event.save();
    })
    .then((event) => res.redirect(`/events/${event.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {

  Event
   .findById(req.params.id)
   .exec()
   .then((event) => {
     if(!event) return res.notFound();

     const comment = event.comments.id(req.params.commentId);
     comment.remove();

     return event.save();
   })
   .then((event) => res.redirect(`/events/${event.id}`))
   .catch(next);
}

function createAttendeeRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      console.log(event, req.user);

      event.attendees.push(req.user);
      return event.save();
    })
    .then((event) => res.redirect(`/events/${event.id}`))
    .catch(next);
}

function deleteAttendeeRoute(req, res, next) {

  Event
   .findById(req.params.id)
   .exec()
   .then((event) => {
     if(!event) return res.notFound();

     event.attendees.filter(attendeeId => attendeeId.toString() !== req.user.id);

     return event.save();
   })
   .then((event) => res.redirect(`/events/${event.id}`))
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
  deleteComment: deleteCommentRoute,
  createAttendee: createAttendeeRoute,
  deleteAttendee: deleteAttendeeRoute
};
