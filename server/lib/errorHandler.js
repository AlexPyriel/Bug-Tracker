var log = require('./log').errorLogger;

module.exports = function (err, req, res, next) {

    var e = err.status ? { title: err.title, message: err.message, status: err.status } : { title: 'Internal Server Error', message: 'Please try again later', status: 500 };

    if (process.env.NODE_ENV === 'development') console.log(new Date().toString(), err);

    log.error(err);

    res.status(e.status).send({title: e.title, message: e.message});
};
// Name             status message

// workitemsRouter.js
// ValidationError - 400 - Workitem/user validation failed
// SyntaxEror      - 400 - {method} method syntax error
// NotFoundError   - 404 - Workitem/user not found
// ServerError     - 501 - PATCH method not implemented

// Index.js
// NotFoundError   - 404 - Route not found