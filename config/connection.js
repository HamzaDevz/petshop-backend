'use strict';

const MysqlCache = require('mysql-cache');
const config     = require('./config');
var mysql        = new MysqlCache(config);

mysql.connect(function (err) {
    if (err) {
        return err;
    }
});

module.exports = mysql;