var express         = require('express');
var router          = express.Router();
var query           = require('../query');
var errorWrapper    = require('../errors/error-config');
var errorMessage    = errorWrapper.errors_message;

/* GET pets listing. */
router.get('/', function (req, res) {
    query(res, 'SELECT * FROM pets');
});

/* GET specific pet */
router.get('/:id', function (req, res) {
    var id = Number(req.params.id);

    if (id > 0) {
        query(res, 'SELECT * FROM pets WHERE id = ' + id);
    } else {
        errorWrapper.error(res, 400, 'Id param ' + errorMessage.integer);
    }
});

module.exports = router;
