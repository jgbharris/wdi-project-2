const rp = require('request-promise');

function weatherProxy(req, res) {
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat},${req.query.lng}`,
    method: 'GET',
    qs: { units: 'si' },
    json: true
  })
  .then((weather) => {
    res.json(weather);
  });
}

module.exports = {
  proxy: weatherProxy
};