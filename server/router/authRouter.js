var express = require('express');
var authRouter = express.Router();
var userController = require('../controllers/userController');
var validator = require('../controllers/userValidator');
var authController = require('../controllers/authController');
var httpError = require('../lib/httpError');

authRouter.post('/register', validator.setModel, validator.validateModel, userController.createUser);
authRouter.post('/authenticate', authController.authenticate);

authRouter.delete('/*', function (req, res, next) {
    return next(new httpError.NotImplementedError('We are sorry:', req.method + ' method not implemented for this route'));
});

authRouter.patch('/*', function (req, res, next) {
    return next(new httpError.NotImplementedError('We are sorry:', req.method + ' method not implemented for this route'));
});

authRouter.all('/*', function (req, res, next) {
    return next(new httpError.BadRequestError('We are sorry:', req.method + ' method syntax error'));
});

module.exports = authRouter;