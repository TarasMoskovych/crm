const express = require('express');

const auth = require('./routes/auth');
const analytic = require('./routes/analytic');
const category = require('./routes/category');
const order = require('./routes/order');
const position = require('./routes/position');

const app = express();

app.use('/api/auth', auth);
app.use('/api/analytic', analytic);
app.use('/api/category', category);
app.use('/api/order', order);
app.use('/api/position', position);

module.exports = app;
