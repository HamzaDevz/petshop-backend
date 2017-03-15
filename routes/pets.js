'use strict';

/* global require, module */

var express         = require('express');
var router          = express.Router();
var _               = require('lodash');
var query           = require('../query');
var errorWrapper    = require('../errors/error-config');
var errorMessage    = errorWrapper.errors_message;

/* GET pets listing. */
router.route('/').get(function (req, res) {
  query(res, 'SELECT * FROM pets');
});

/* POST new pet(s) */
router.route('/').post(function (req, res) {
  var data = _.pickBy(req.body, function (val) {
    return !_.isEmpty(val);
  });

  if (! _.isEmpty(data)) {
    query(res, 'INSERT INTO pets SET ?', data, req.method);
  } else {
    errorWrapper.error(res, 400, errorMessage.bad_request);
  }
});

/* GET specific pet */
router.route('/:id').get(function (req, res) {
  var id = Number(req.params.id);

  if (id > 0) {
    query(res, 'SELECT * FROM pets WHERE id = ?', [id], req.method);
  } else {
    errorWrapper.error(res, 400, 'Id param ' + errorMessage.integer);
  }
});

/* PUT pet */
router.route('/:id').put(function (req, res) {
  var id = Number(req.params.id);
  var message = "";

  var data = _.pickBy(req.body, function (val) {
    return !_.isEmpty(val);
  });

  if (id > 0 && !_.isEmpty(data)) {
    query(res, 'UPDATE pets SET ? WHERE id = ?', [data, id], req.method);
  } else {
    if (id <= 0 || isNaN(id)) {
      message = 'Id param ' + errorMessage.integer;
    } else {
      message = errorMessage.bad_request;
    }
    errorWrapper.error(res, 400, message);
  }
});

/* DELETE pet */
router.route('/:id').delete(function (req, res) {
  var id = Number(req.params.id);

  if (id > 0) {
    query(res, 'DELETE FROM pets WHERE id = ?', [id], req.method);
  } else {
    errorWrapper.error(res, 400, 'Id param ' + errorMessage.integer);
  }
});

module.exports = router;
