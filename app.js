const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sendRoutes = require('./api/routes/send');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allows for cross origin resource sharing since our Mongo may or may not be one the same serving machine
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows for requests from any domain.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/send', sendRoutes);

module.exports = app;
