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
  if (! _.isEmpty(req.body)) {
    query(res, 'INSERT INTO pets SET ?', req.body, req.method);
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

  if (id > 0 && !_.isEmpty(req.body)) {
    query(res, 'UPDATE pets SET ? WHERE id = ?', [req.body, id], req.method);
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
