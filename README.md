# REST API NodeJS

REST API using Node.js and Express.js framework with MysqlCache for working with Mysql.

## Running project

You need to have installed Node.js

### Install dependencies

To install dependencies enter project folder and run following command:
```
npm install
```

### Run server

To run server execute:
```
npm start
```

### Modules used

Some of non standard modules used:

* [express](https://www.npmjs.com/package/express)
* [mysql-cache](https://www.npmjs.com/package/mysql-cache)
* [frisbyjs](https://www.npmjs.com/package/frisby)
* [jasmine-node](https://www.npmjs.com/package/jasmine-node)
* [lodash](https://www.npmjs.com/package/lodash)

### Make CRUD Requests

##### Pet's listing :
```
curl -X GET localhost:3000/pets
```

##### Search specific pet :
```
curl -X GET localhost:3000/pets/:id
```

##### Add new pet :
````
curl -X POST --data "name=MyNewPet&age=10" http://localhost:3000/pets
````

##### Delete existing pet :
````
curl -X DELETE http://localhost:3000/pets/:id
````

### ESLint

For running ESLint
```
./node_modules/.bin/eslint */*.js *.js

```

### TESTS

For running test using Jasmine-node
```
npm test

```