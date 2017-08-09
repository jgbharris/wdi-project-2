const City = require('../models/city');

function citiesIndex(req, res) {
  City
    .find()
    .exec()
    .then(cities => {
      res.render('cities/index', { cities });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function citiesNew(req, res) {
  res.render('cities/new');
}

function citiesShow(req, res) {
  City
    .findById(req.params.id)
    .exec()
    .then(city => {
      if (!city) return res.status(404).render('error', { error: 'No city found.'});
      res.render('cities/show', { city });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function citiesCreate(req, res) {
  City
    .create(req.body)
    .then(() => {
      res.redirect('/cities');
    });
}

function citiesEdit(req, res)  {
  City
    .findById(req.params.id)
    .exec()
    .then(city => {
      if (!city) return res.status(404).render('error', { error: 'No city found.'});
      res.render('cities/edit', { city });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function citiesUpdate(req, res) {
  City
    .findById(req.params.id)
    .exec()
    .then(city => {
      if (!city) return res.status(404).render('error', { error: 'No city found.'});

      for(const field in req.body) {
        city[field] = req.body[field];
      }
      return city.save();
    })
    .then(city => {
      res.redirect(`/cities/${city.id}`);
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function citiesDelete(req, res) {
  City
    .findById(req.params.id)
    .exec()
    .then(city => {
      if (!city) return res.status(404).render('error', { error: 'No city found.'});
      return city.remove();
    })
    .then(() => {
      res.redirect('/cities');
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: citiesIndex,
  new: citiesNew,
  show: citiesShow,
  create: citiesCreate,
  edit: citiesEdit,
  update: citiesUpdate,
  delete: citiesDelete
};
