var User = require('../models/userModel').User;
var httpError = require('../lib/httpError');
var log = require('../lib/log').devLogger;

exports.get = function (req, res, next) {
    if (req.query.id) {
        // User.findOne({ _id: req.query.id }, 'email', function (err, user) {
        User.findOne({ _id: req.query.id }, function (err, user) {
            if (err) { return next(err); }
            if (!user) { return next(new httpError.NotFoundError('Failed to get:', 'user not found', req.params.id)); } else {
                res.json({
                    success: true,
                    user: user
                });
                log.info('get findById: user ', user._id, 'has been pulled from DB and sent to the client');
            }
        });
    } else {
        User.find({}, function (err, users) {
            if (err) { return next(err); } else {
                res.json({
                    success: true,
                    users: users
                });
                log.info('get: List of users has been pulled from DB and sent to the client');
            }
        });
    }
};

exports.createUser = function (req, res, next) {
    var user = new User({
        email: req.modelToSave.email,
        password: req.modelToSave.password,
        firstName: req.modelToSave.firstName,
        lastName: req.modelToSave.lastName
    });
    user.id = null;
    user.save(function (err, user) {
        if (err) { return next(new httpError.BadRequestError('Failed to create user:', 'email address already exist', req.modelToSave.email)); } else {
            // res.json(user);
            res.json({
                success: true,
                title: 'Success:',
                message: 'user created!',
                user: user
            });
            log.info('post: user ', user._id, 'has been created');
        }
    });
};

exports.updateUser = function (req, res, next) {
    user.findOneAndUpdate({ id: req.params.id }, {
        $set: req.modelToSave
    }, { new: true }, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new httpError.NotFoundError('Failed to update:', 'user not found', req.params.id)); } else {
            res.json({
                success: true,
                title: 'Success:',
                message: 'user updated!',
                user: user
            });
            log.info('put findOneAndUpdate: user ', user._id, 'has been updated');
        }
    });
};

exports.deleteUser = function (req, res, next) {
    User.findOneAndRemove(req.params.id, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new httpError.NotFoundError('Failed to remove:', 'user not found', req.params.id)); } else {
            res.json({
                success: true,
                user: user
            });
            log.info('delete findByIdAndRemove: user ', user._id, 'has been removed');
        }
    });
};