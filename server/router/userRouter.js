var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');
var validator = require('../controllers/userValidator');
var httpError = require('../lib/httpError');

// router.get('/:email?', controller.get);

router.get('/:query?', controller.get);
// router.get('/:id?', controller.get);

router.post('/', validator.setModel, validator.validateModel, controller.createUser);

router.put('/:id', validator.setModel, validator.validateModel, controller.updateUser);

router.delete('/:id', controller.deleteUser);

router.patch('/*', function (req, res, next) {
    return next(new httpError.NotImplementedError('We are sorry:', req.method + ' method not implemented for this route'));
});

router.all('/*', function (req, res, next) {
    return next(new httpError.BadRequestError('We are sorry:', req.method + ' method syntax error'));
});

module.exports = router;