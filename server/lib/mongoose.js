var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = global.Promise;
// mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'), function (err) {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
// });
var connection = mongoose.createConnection(config.get('mongoose:uri'), config.get('mongoose:options'), function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

module.exports = mongoose;
module.exports.db = connection;