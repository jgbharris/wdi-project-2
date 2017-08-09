const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const router         = require('./config/routes');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');
mongoose.Promise     = require('bluebird');
const port           = process.env.PORT || 3000;
const app            = express();
const cors           = require('cors');

const databaseURL = 'mongodb://localhost/proxy';
mongoose.connect(databaseURL);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(cors());
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);

app.listen(port, () => console.log(`Express is listening to port ${port}`));
