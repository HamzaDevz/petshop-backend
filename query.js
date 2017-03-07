'use strict';

/* global require, module, process */

var mysql           = require('./config/connection');
var errorWrapper    = require('./errors/error-config');
var _               = require('lodash');

var errorMessage    = errorWrapper.errors_message;

function query (res, query, params, method, killScript) {
  mysql.query(query, params, function (err, rows) {
    if (err && !_.isEmpty(res)) {
      errorWrapper.error(res, 500, errorMessage[err.code]);
      return new Error(err);
    }

    if (_.isEmpty(rows) && method === "GET" && !_.isEmpty(res)) {
      errorWrapper.error(res, 404, errorMessage.pets_not_found);
      return;
    } else {
      // If we alter data with [PUT,DELETE OR POST] method, we flush cache
      mysql.flush(function (err) {
        if (err) {
          return new Error(err);
        }
      });
    }

    if (!_.isEmpty(res)) {
      res.json(methodHandler(method, params, rows));
    }

    if (killScript) {
      process.exit();
    }
  });
}

function methodHandler (method, params, rows) {
  var value = {
    pets: []
  };

  switch (method) {
    case "DELETE":
      value.pets = {
        deleted: params[0]
      };
      break;
    case "POST":
      value.pets = params;
      break;
    case "PUT":
      value.pets = params[0];
      break;
    default:
      value.pets = rows;
      break;
  }

  return value;
}

module.exports = query;