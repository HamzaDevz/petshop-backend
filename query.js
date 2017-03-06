'use strict';

var mysql           = require('./config/connection');
var errorWrapper    = require('./errors/error-config');

var errorMessage    = errorWrapper.errors_message;

function query (res, query, params, method) {
    mysql.query(query, params, function (err, rows) {
        console.log(params);
        if (err) {
            errorWrapper.error(res, 500, errorMessage[err.code]);
            return;
        }

        if (!rows.length && method === "GET") {
            errorWrapper.error(res, 404, errorMessage.pets_not_found);
            return;
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