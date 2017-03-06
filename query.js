'use strict';

/* global require, module */

var mysql           = require('./config/connection');
var errorWrapper    = require('./errors/error-config');

var errorMessage    = errorWrapper.errors_message;

function query (res, query, params, method) {
  mysql.query(query, params, function (err, rows) {
    if (err) {
      errorWrapper.error(res, 500, errorMessage[err.code]);
      return new Error(err);
    }

    if (!rows.length && method === "GET") {
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

    res.json(methodHandler(method, params, rows));
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