var message = require('./error-message');

function error (res, code, message) {
    if (res) {
        res.status(code).send({error: message, code: code});
    }
}

module.exports = {
    errors_message: message,
    error: error
};