var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./server/config');
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./server/lib/mongoose').db;
var errorHandler = require('./server/lib/errorHandler');
var log = require('./server/lib/log').serverLogger;

var app = express();
var server = http.createServer(app);

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

require('./server/router')(app);
require('./server/lib/passport')(passport);

connect()
    .once('open', function () {
        log.warn('Server successfully connected to ' + config.get('mongoose:uri'));
        listen();
    })
    .on('disconnected', function () {
        log.warn('Mongoose default connection disconnected');
    })
    .on('reconnected', function () {
        log.warn('Mongoose reconnected to ' + config.get('mongoose:uri'));
    })
    .on('error', function (err) {
        log.error(err);
        process.exit(1);
    });

function connect() {
    return db; 
}

function listen() {
    server.listen(process.env.PORT || 5000);
    log.warn('Server listening on port ' + process.env.PORT || 5000);
}

app.use(errorHandler);