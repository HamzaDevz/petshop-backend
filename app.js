'use strict';

/* global require, __dirname, module */

var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

// Routes
var index         = require('./routes/index');
var pets          = require('./routes/pets');
var app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  } else {
    return next();
  }
});

app.use('/', index);

// Endpoint PETS
app.use('/pets', pets);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  var status = err.status || 500;

  // render the error page
  res.status(status);
  res.json({error: err.message, code: status});
});

module.exports = app;
