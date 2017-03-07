# REST API NodeJS

REST API using Node.js and Express.js framework with MysqlCache for working with Mysql.

## Security API

##### Currently, the API can be reached by everyone who has the db's credentials specified in "root_project/config/config.js".

### How can we add security ?

Basics:
* Use an authentication with credentials.
* Generate a Token which has 2 hours and then it expires.
* Api's Authentication with token in http header (X-Access-Token)
* Specify rules, for each users
* Use secure http (https)

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

### Generate data
```
npm run build
```

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