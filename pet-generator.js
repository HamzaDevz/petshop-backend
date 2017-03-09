"use strict";

/* global require */

var query = require('./query');
var _     = require('lodash');
var mysql = require('./config/connection');

var data = [
  {name: 'Dog', age: 10, type: 'Mammal', description: 'My Dog eats well !!'},
  {name: 'Horse', age: 10, type: 'Mammal', description: 'Horse eats well !!'},
  {name: 'Cat', age: 10, type: 'Mammal', description: 'Cat eats well !!'},
  {name: 'Animal', age: 10, type: 'Mammal', description: 'Animal eats well !!'},
  {name: 'LittleBigPlanet', age: 10, type: 'Mammal', description: 'Good game !'},
  {name: 'Ken', age: 22, type: 'Human being', description: 'Ken is the best !'},
  {name: 'Ryu', age: 38, type: 'Human being', description: 'Ryu is very strong !'}
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
