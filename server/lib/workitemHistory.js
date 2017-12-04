var _ = require('lodash');
var config = require('../config');
var properties = config.get('workitem:properties');

function provideHistory(oldVersion, newVersion) {
  var history = oldVersion.history || [];
  var update = { changes: [], timeStamp: new Date().toLocaleString(), workNote: "" };

  if (!newVersion) {
    update.initial = true;
    update.created = oldVersion.created.fullName;
    update.changes = _.transform(properties, function (result, value, key) {
      if (oldVersion[key]) result.push({ property: value, initialValue: oldVersion[key] });
    }, []);
  } else {
    if (newVersion.historyComment) update.workNote = newVersion.historyComment;
    update.updated = newVersion.updated.fullName;
    update.changes = _.transform(properties, function (result, value, key) {
      if (!_.isEqual(oldVersion[key], newVersion[key]))
        result.push({ property: value, oldValue: oldVersion[key], newValue: newVersion[key] });
    }, []);

    var assignedResult = compareAssigned(oldVersion.assigned, newVersion.assigned);
    if (assignedResult) update.changes.push(assignedResult);
  }
  
  history.unshift(update);
  return history;
}

function compareAssigned(oldVersionPerson, newVersionPerson) {
  oldID = oldVersionPerson._id.toString();
  newID = newVersionPerson.id.toString();
  if(!_.isEqual(oldID, newID)) {
    return {property: "Assigned", oldValue: oldVersionPerson.fullName, newValue: newVersionPerson.fullName};
  } else return false;
}

module.exports.provideHistory = provideHistory;