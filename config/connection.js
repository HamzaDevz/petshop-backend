var mysql   = require('mysql');
var db      = require('./config');

var wrapper = {
    connect: mysql.createConnection(db),
    close: function (connection) {
        connection.end();
    }
};

module.exports = wrapper;