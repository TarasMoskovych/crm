const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./routes/auth');
const analytic = require('./routes/analytic');
const category = require('./routes/category');
const order = require('./routes/order');
const position = require('./routes/position');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/analytic', analytic);
app.use('/api/category', category);
app.use('/api/order', order);
app.use('/api/position', position);

module.exports = app;
