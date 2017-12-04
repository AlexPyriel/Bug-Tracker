var _ = require('lodash');
var inherits = require('util').inherits;
var validator = require('validator');

function ValidatorError(message, title) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ValidatorError';
    this.message = message;
    this.title = title;
    inherits(ValidatorError, Error);
}

var userModel = {
    allowedFields: ['email', 'password', 'firstName', 'lastName'],
    validationRules: [
        function (model) {
            if (!model.email) return new ValidatorError('Path `email` is required.', 'email');
            if (!validator.isEmail(model.email)) return new ValidatorError('Model `email` is not valid.', 'email');
            return true;
        },
        function (model) {
            if (!model.password) return new ValidatorError('Path `password` is required.', 'password');
            if (!validator.isAlphanumeric(model.password) || model.password.length < 8 || model.password.length > 20) return new ValidatorError('Path `password` is not valid.', 'password');
            return true;
        },
        function (model) {
            if (!model.firstName) return new ValidatorError('Path `firstName` is required.', 'firstName');
            if (!validator.isAlpha(model.firstName)) return new ValidatorError('Model `firstName` consist of unwanted data.', 'firstName');
            return true;
        },
        function (model) {
            if (!model.lastName) return new ValidatorError('Path `lastName` is required.', 'lastName');
            if (!validator.isAlpha(model.lastName)) return new ValidatorError('Model `lastName` consist of unwanted data.', 'lastName');
            return true;
        }
    ]
};

function setModel(req, res, next) {
    var modelToSave = _.pick(req.body, userModel.allowedFields);
    req.modelToSave = modelToSave;
    next();
}

function validateModel(req, res, next) {
    var e = new Error('Make sure to fill all the required fields with valid data');
    e.name = 'ValidationError';
    e.status = 400;
    e.title = 'User validation failed:';
    e.method = req.method;
    if (e.method === 'PUT') {
        e.path = req.params.id;
    }
    e.errors = {};

    userModel.validationRules.forEach(function (ruleFn) {
        var res = ruleFn(req.modelToSave);
        if (res instanceof Error) {
            e.errors[res.title] = res;
        }
    });

    if (Object.keys(e.errors).length > 0) { return next(e); } else {
        next();
    }
}

module.exports.setModel = setModel;
module.exports.validateModel = validateModel;