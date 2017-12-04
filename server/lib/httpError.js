var inherits = require('util').inherits;

var NotFoundError = function (title, message, path) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotFoundError';
    this.status = 404;
    this.title = title;
    this.message = message;
    this.path = path;
    inherits(NotFoundError, Error);
};

var BadRequestError = function (title, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'SyntaxError';
    this.status = 400;
    this.title = title;
    this.message = message;
    inherits(BadRequestError, Error);
};

var NotImplementedError = function (title, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ServerError';
    this.status = 501;
    this.title = title;
    this.message = message;
    inherits(NotImplementedError, Error);
};

module.exports.NotFoundError = NotFoundError;
module.exports.BadRequestError = BadRequestError;
module.exports.NotImplementedError = NotImplementedError;