var WorkItem = require('../models/workitemModel').WorkItem;
var httpError = require('../lib/httpError');
var log = require('../lib/log').devLogger;
var history = require('../lib/workitemHistory');

exports.get = function (req, res, next) {
    if (req.params.id) {
        WorkItem.findOne({ id: req.params.id })
            .populate('assigned', ['fullName'])
            .exec(function (err, workitem) {
                if (err) { return next(err); }
                if (!workitem) { return next(new httpError.NotFoundError('Request error:', 'Work item not found', req.params.id)); } else {
                    res.json({
                        success: true,
                        workitem: workitem
                    });
                    log.info('get findById: workitem ', workitem._id, 'has been pulled from DB and sent to the client');
                }
            });
    } else {
        // WorkItem.find({}, '-description', function (err, workitems) {
        WorkItem.find({})
            .populate('assigned', ['fullName'])
            .exec(function (err, workitems) {
                if (err) { return next(err); } else {
                    res.json({
                        success: true,
                        workitems: workitems
                    });
                    log.info('get: List of workitems has been pulled from DB and sent to the client');
                }
            });
    }
};

exports.post = function (req, res, next) {
    var workitem = new WorkItem(req.modelToSave);
    workitem.id = null;
    workitem.history = history.provideHistory(req.modelToSave); //сменить на req.body
    workitem.assigned = req.modelToSave.assigned.id; //вынести в валидатор в req.modeltosave
    workitem.created = req.modelToSave.created.id;
    workitem.save(function (err, workitem) {
        if (err) { return next(err); } else {
            
            var newWorkitem = workitem.populate('assigned', ['fullName']).execPopulate();
            newWorkitem.then(function success(result) {
                res.json({
                    success: true,
                    title: 'Success:',
                    message: 'work item created!',
                    workitem: result
                });
            }, function error(error) {
                return next(error);
            });
           
            log.info('post: workitem ', workitem._id, 'has been created');
        }
    });
};

exports.put = function (req, res, next) {
    WorkItem.findOne({ id: req.params.id })
        .populate('assigned', ['fullName'])
        .exec(function (err, workitem) {
            if (err) { return next(err); }
            if (!workitem) { return next(new httpError.NotFoundError('Failed to update:', 'work item not found', req.params.id)); } else {
                log.info('get findOne: workitem ', workitem._id, 'has been pulled from DB');
                var historyUpdate = history.provideHistory(workitem, req.body);
                WorkItem.findOneAndUpdate({ id: req.params.id }, {
                    $set: req.modelToSave,
                    history: historyUpdate,
                    updated: req.modelToSave.updated.id,
                    assigned: req.modelToSave.assigned.id
                }, { new: true }, function (err, workitem) {
                    if (err) { return next(err); }
                    if (!workitem) { return next(new httpError.NotFoundError('Failed to update:', 'work item not found', req.params.id)); } else {

                        var newWorkitem = workitem.populate('assigned', ['fullName']).execPopulate();
                        newWorkitem.then(function success(result) {
                            res.json({
                                success: true,
                                title: 'Success:',
                                message: 'work item updated!',
                                workitem: result
                            });
                        log.info('put findOneAndUpdate: workitem ', workitem._id, 'has been updated');
                        
                        }, function error(error) {
                            return next(error);
                        });

                    }
                });
            }
        });
};