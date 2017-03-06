'use strict';

/* global module, require */

var MysqlCache  = require('mysql-cache');
var config      = require('./config');
var mysql       = new MysqlCache(config);

mysql.connect(function (err) {
  if (err) {
    return err;
  }
});

module.exports = mysql;