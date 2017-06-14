const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');

function facebook(req, res, next) {
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: oauth.facebook.redirectURL,
      client_secret: oauth.facebook.clientSecret,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    console.log(token);
    return rp({
      method: 'GET',
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(961)',
      qs: token,
      json: true

    });
  })
  .then((profile) => {
    return User
      .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
      .then((user) => {
        console.log('user after finding via email or facebook', user);
        if(!user) {
          user = new User({
            username: profile.name,
            email: profile.email
          });
        }

        user.facebookId = profile.id;
        return user.save();
      });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isLoggedIn = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect('/profile');
  })
  .catch(next);
}

module.exports = {
  facebook
};
