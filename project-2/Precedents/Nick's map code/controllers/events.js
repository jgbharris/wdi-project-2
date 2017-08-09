const rp = require('request-promise');

function eventProxy(req, res) {
  rp({
    url: `http://www.skiddle.com/api/v1/events/search/?api_key=${process.env.SKIDDLE_API_KEY}&latitude=${req.query.lat}&longitude=${req.query.lng}&radius=${req.query.radius}`,
    method: 'GET',
    json: true
  })
  .then((event) => {
    res.json(event);
  });
}

module.exports = {
  proxy: eventProxy
};
