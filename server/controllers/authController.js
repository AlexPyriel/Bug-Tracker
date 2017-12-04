var User = require('../models/userModel').User;
var httpError = require('../lib/httpError');
var log = require('../lib/log').devLogger;
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.authenticate = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new httpError.NotFoundError('Authentication failed:', 'user or password is not valid', req.params.id)); } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({ user: this.user }, config.get('jwt:secret'));
                    // var token = jwt.sign({ user: this.user }, config.get('jwt:secret'), { expiresIn: 10000 });
                    log.info('Token sent to the client: ', token);
                    res.json({ 
                        success: true,
                        title: 'Authentication success:',
                        message: 'Welcome!',
                        user: {
                            id: user._id,
                            fullName: user.fullName,
                            token: 'Bearer ' + token 
                        }
                    });
                } else {
                    log.info('user.comparePassword error: ', err);
                    return next(new httpError.BadRequestError('Authentication failed:', 'user or password is not valid'));
                }
            });
        }
    });
};