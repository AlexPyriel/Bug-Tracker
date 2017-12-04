var mongoose = require('server/lib/mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
var db = require('server/lib/mongoose').db;
var UserSchema = new Schema({

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Developer', 'BA', 'Project Manager', 'Admin'],
        // default: 'Contractor'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    }

});

//Save the user's hashed password
UserSchema.pre('save', function (next) {
    var user = this;
    user.fullName = this.lastName + ', ' + this.firstName;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) { return next(err); }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) { return next(err); }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// UserSchema.virtual('fullName').get(function () {
//     return this.lastName + ', ' + this.firstName;
// });

// Technique 2 (auto-gen a salt and hash):
// UserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.hash(user.password, 10, function (err, hash) {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     }
// });

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

exports.User = db.model('User', UserSchema);