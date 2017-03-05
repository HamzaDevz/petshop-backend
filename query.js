var wrapper         = require('./config/connection');
var errorWrapper    = require('./errors/error-config');
var errorMessage    = errorWrapper.errors_message;

function query (res, query) {
    var connection = wrapper.connect.query(query, function (err, rows) {
        wrapper.close(connection);

        if (err) {
            errorWrapper.error(res, 500, errorMessage.wrong);
            throw err;
        }

        if (!rows.length) {
            errorWrapper.error(res, 404, errorMessage.pets_not_found);
            return;
        }

        res.json({
            pets: rows
        });
    });
}

module.exports = query;