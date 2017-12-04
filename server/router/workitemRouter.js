var express = require('express');
var router = express.Router();
var controller = require('../controllers/workitemController');
var validator = require('../controllers/workitemValidator');
var httpError = require('../lib/httpError');

router.get('/:id?', controller.get);

router.post('/', validator.setModel, validator.validateModel, controller.post);

router.put('/:id', validator.setModel, validator.validateModel, controller.put);

router.delete('/*', function (req, res, next) {
    return next(new httpError.NotImplementedError('We are sorry:', req.method + ' method not implemented for this route'));
});

router.patch('/*', function (req, res, next) {
    return next(new httpError.NotImplementedError('We are sorry:', req.method + ' method not implemented for this route'));
});

router.all('/*', function (req, res, next) {
    return next(new httpError.BadRequestError('We are sorry:', req.method + ' method syntax error'));
});

module.exports = router;