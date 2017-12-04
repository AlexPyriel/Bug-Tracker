var NotFoundError = require('../lib/httpError').NotFoundError;
var workitemRouter = require('./workitemRouter');
var userRouter = require('./userRouter');
var authRouter = require('./authRouter');

var passport = require('passport');

module.exports = function (app) {

  // handles /auth/register and /auth/authenticate routes
  app.use('/auth', authRouter);
  
  // intercepts all other requests to authorize the user
  app.use(passport.authenticate('jwt', {session: false}), function(req, res, next) {
    return next();
});

  // hadles request to workitems and  user dbs
  app.use('/workitems', workitemRouter);
  app.use('/users', userRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(new NotFoundError('404', 'route not found', req.url + req.baseUrl));
  });
};