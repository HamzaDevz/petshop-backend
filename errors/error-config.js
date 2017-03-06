'use strict';

/* global require, module */

var message = require('./error-message');

function error (res, code, message) {
  if (res) {
    res.status(code).json({
      error: message,
      code: code
    });
  }
}

module.exports = {
  errors_message: message,
  error: error
};