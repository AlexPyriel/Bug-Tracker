var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema,
    User = require('../models/userModel').User,
    autoIncrement = require('mongoose-auto-increment');
    var db = require('server/lib/mongoose').db;
    
    autoIncrement.initialize(db);

var workItemSchema = new Schema({
    
    assigned: {
        type: Schema.ObjectId, 
        ref: 'User'
    },
    checkedout: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    updated: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    blocked: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    history: {
        type: Schema.Types.Mixed
    },
    id: {
        type: Number
    },
    priority: {
        type: String,
        required: true
    },
    reprosteps: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    symptom: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

}, { bufferCommands: false });

workItemSchema.plugin(autoIncrement.plugin, { model: 'WorkItem', field: 'id', startAt: 1 });

exports.WorkItem = db.model('WorkItem', workItemSchema);