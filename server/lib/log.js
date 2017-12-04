var winston = require('winston');

winston.configure({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
    },
    colors: {
        error: 'red',
        warn: 'cyan',
        info: 'blue'
    }
});

// used in errorHandler.js to log errors to file (PROD only)
var errorLogger = new (winston.Logger)({ 
    transports: [
        new winston.transports.File({
            filename: 'logs/debug.log',
            label: 'errorLogger',
            timestamp: tsFormat,
            json: false,
            level: 'error',
            maxsize: 1048576, //1 Mb 
            maxFiles: 5,
            zippedArchive: true,
            silent: process.env.NODE_ENV === 'production' ? false : true
        })
    ]
});

//used in server.js to console log for all the environments
var serverLogger = new (winston.Logger)({ 
    transports: [
        new winston.transports.Console({
            timestamp: tsFormat,
            label: 'serverLogger',
            colorize: true,
            level: 'warn'
        })
    ]
});

// used to console info (development only), (currently in workitemsRouter.js)
var devLogger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            timestamp: tsFormat,
            label: 'devLogger',
            colorize: true,
            level: 'info',
            silent: process.env.NODE_ENV === 'development' ? false : true
        })
    ]
});

function tsFormat() {
    return new Date().toString();
}

module.exports.errorLogger = errorLogger;
module.exports.serverLogger = serverLogger;
module.exports.devLogger = devLogger;