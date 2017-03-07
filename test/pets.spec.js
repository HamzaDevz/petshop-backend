"use strict";

/* global require */

var frisby = require('frisby');
var _      = require('lodash');

var URL = 'http://localhost:3000';

// POST
frisby.create('Create new pet')
  .post(URL + '/pets', {name: "PetTest_"+ Math.random().toString(36).substr(2, 5), age: 10})
  .expectStatus(200)
  .toss();

frisby.create('Create new pet with empty data')
  .post(URL + '/pets', {})
  .expectStatus(400)
  .toss();

frisby.create('GET pet\'s listing')
  .get(URL + '/pets')
  .expectStatus(200)
  .expectJSONTypes('pets.0', {
    id: Number,
    name: String,
    age: function (val) {
      expect(val).toBeTypeOrNull(Number);
    }
  })
  // 'afterJSON' automatically parses response body as JSON and passes it as an argument
  .afterJSON(function (json) {
    var pets = _.reverse(json.pets);

    // PUT OK
    // Use data from previous result in next test
    frisby.create('Update last pet')
      .put(URL + '/pets/' + pets[0].id, {name: "PetTestOnPut_"+ Math.random().toString(36).substr(2, 5), age: 11})
      .expectStatus(200)
      .toss();

    // PUT With wrong key
    frisby.create('Update with wrong key')
      .put(URL + '/pets/' + pets[0].id, {namone: "toto"})
      .expectStatus(500)
      .toss();

    // DELETE
    // Use again data from previous result in next test
    frisby.create('Delete last pet')
      .delete(URL + '/pets/' + pets[0].id)
      .expectStatus(200)
      .toss();

    frisby.create('Check if pet is deleted')
      .get(URL + '/pets/' + pets[0].id)
      .expectStatus(404)
      .toss();
  })
  .toss();