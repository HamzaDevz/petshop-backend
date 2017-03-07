"use strict";

/* global require */

var query = require('./query');
var _     = require('lodash');
var mysql = require('./config/connection');

var data = [
  {name: 'Dog', age: 10},
  {name: 'Horse', age: 10},
  {name: 'Cat', age: 10},
  {name: 'Animal', age: 10},
  {name: 'LittleBigPlanet', age: 10},
  {name: 'Ken', age: 22},
  {name: 'Ryu', age: 38}
];

// Clean all data from this table
mysql.query('DELETE FROM pets', {}, function () {
  //  Auto increment update
  mysql.query('ALTER TABLE pets AUTO_INCREMENT = 1', {}, function () {

    var itemIterator = 0,
      killScript = false;

    _.forEach(data, function (val) {
      itemIterator++;

      if (data.length === itemIterator) {
        killScript = true;
      }

      query({}, 'INSERT INTO pets SET ?', val, "POST", killScript);
    });


  });
});
