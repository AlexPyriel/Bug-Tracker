var _ = require('lodash');
var inherits = require('util').inherits;
var validator = require('validator');
var sanitizeHtml = require('sanitize-html');
var sanitazeConfig = { allowedTags: [], allowedAttributes: [] };

function sanitize(dirty) {
    return sanitizeHtml(dirty, sanitazeConfig);
}

function ValidatorError(message, title) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ValidatorError';
    this.message = message;
    this.title = title;
    inherits(ValidatorError, Error);
}

var workitemModel = {
    allowedFields: ['assigned', 'created', 'updated', 'blocked', 'checkedout', 'id', 'priority', 'reprosteps', 'title', 'state', 'symptom', 'type', 'description', 'history'],
    validationRules: [
        function (model) {
            if (!model.assigned) return new ValidatorError('Path `assigned` is required.', 'assigned');
            return true;
        },
        function (model) {
            if (!model.blocked) return new ValidatorError('Path `blocked` is required.', 'blocked');
            return true;
        },
        function (model) {
            if (!model.priority) return new ValidatorError('Path `priority` is required.', 'priority');
            return true;
        },
        function (model) {
            if (!model.title) return new ValidatorError('Path `title` is required.', 'title');
            model.title = sanitize(model.title);
            if (!model.title) return new ValidatorError('Path `title` consist of unwanted data.', 'title');
            return true;
        },
        function (model) {
            if (!model.state) return new ValidatorError('Path `state` is required.', 'state');
            return true;
        },
        function (model) {
            if (!model.type) return new ValidatorError('Path `type` is required.', 'type');

            switch (model.type) {
                case 'Bug':
                    if (!model.reprosteps && !model.symptom) return new ValidatorError('Paths `reprosteps` and `symptom`are required.', 'reprosteps/symptom');
                    if (!model.reprosteps) return new ValidatorError('Path `reprosteps` is required.', 'reprosteps');
                    model.reprosteps = sanitize(model.reprosteps);
                    if (!model.reprosteps) return new ValidatorError('Model `reprosteps` consist of unwanted data.', 'reprosteps');

                    if (!model.symptom) return new ValidatorError('Path `symptom` is required.', 'symptom');
                    model.symptom = sanitize(model.symptom);
                    if (!model.symptom) return new ValidatorError('Model `symptom` consist of unwanted data.', 'symptom');
                    break;

                case 'Requirement':
                    if (!model.description) return new ValidatorError('Path `description` is required.', 'description');
                    model.description = sanitize(model.description);
                    if (!model.description) return new ValidatorError('Model `description` consist of unwanted data.', 'description');
                    break;

                default:
                    return new ValidatorError('Model `type` is not valid.', 'type');
            }
            return true;
        }
    ]
};

function setModel(req, res, next) {
    var modelToSave = _.pick(req.body, workitemModel.allowedFields);
    req.modelToSave = modelToSave;
    next();
}

function validateModel(req, res, next) {
    var e = new Error('Make sure to fill all the required fields with valid data');
    e.name = 'ValidationError';
    e.status = 400;
    e.title = 'Work Item validation failed:';
    e.method = req.method;
    if (e.method === 'PUT') {
        e.path = req.params.id;
    }
    e.errors = {};

    workitemModel.validationRules.forEach(function (ruleFn) {
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