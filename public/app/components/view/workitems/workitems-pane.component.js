(function () {

    'use strict';

    function PaneController($scope, WorkitemsProvider, authService) {
        var ctrl = this;
        var titleLabel = "";

        ctrl.$onInit = function () {
            ctrl.disabled = true;
            ctrl.new = false;
            ctrl.workitem = {};
            ctrl.backup = {};
            ctrl.tab = {};
            ctrl.historyComment = "";
            ctrl.assigned = "";
            var user = authService.getUser();
            ctrl.currentUser = {
                id: user.id,
                fullName: user.fullName
            };

            if (ctrl.item) {
                if (ctrl.item.history) { // check if existing item or new
                    ctrl.initExisting();
                } else { ctrl.initNew(); }
            } else {
                ctrl.initDefault();
            }
            ctrl.appWorkitems.addTab(ctrl.tab);
        };

        ctrl.initExisting =  function () {
            ctrl.workitem = angular.copy(ctrl.item);
            angular.extend(ctrl.tab, { 
                id: ctrl.workitem.id,
                title: ctrl.workitem.id
            });
            angular.extend(ctrl.workitem, {
                updated: ctrl.currentUser,
            });
            ctrl.backup = angular.copy(ctrl.workitem);
            titleLabel = ctrl.workitem.type + " " + ctrl.workitem.id;
        };

        ctrl.initNew = function () {
            ctrl.workitem = angular.copy(ctrl.item);
            angular.extend(ctrl.tab, { 
                id: ctrl.workitem.id,
                title: "New " + ctrl.workitem.type
             });
            ctrl.disabled = false;
            ctrl.new = true;
            titleLabel = ctrl.tab.title;
            angular.extend(ctrl.workitem, {
                assigned: ctrl.currentUser,
                created: ctrl.currentUser,
                blocked: "No",
                priority: "4",
                state: "Proposed"
            });
            ctrl.backup = angular.copy(ctrl.workitem);
        };

        ctrl.initDefault = function () {
            angular.extend(ctrl.tab, {
                id: 'Work Items',
                title: 'Work Items'
            });
        };

        ctrl.selectUser = function(user) {
            ctrl.workitem.assigned = {
                id: user._id,
                fullName: user.fullName
            };
            $scope.appForm.$setDirty();
        };

        ctrl.save = function () {
            if (ctrl.new) {
                ctrl.createWorkItem(ctrl.workitem);
            } else { ctrl.updateWorkItem(ctrl.workitem); }
        };

        ctrl.edit = function () {
            ctrl.disabled = false;
            ctrl.workitem.updated = ctrl.currentUser;
        };

        ctrl.cancel = function () {
            ctrl.workitem = angular.copy(ctrl.backup);
            ctrl.disabled = true;
            ctrl.historyComment = "";
            $scope.appForm.$setPristine();
            console.log(ctrl.workitem.updated);
        };

        ctrl.refresh = function () {
            WorkitemsProvider.get({ id: ctrl.workitem.id }, function successCallback(data) {
                console.log('GET response: ', data);
                ctrl.workitem = angular.copy(data.workitem);
                ctrl.backup = angular.copy(data.workitem);
            }, function (error) {
                ctrl.appWorkitems.errorCallback(error);
            });
        };

        ctrl.createWorkItem = function (workitem) {
            console.log('Sent to create: ', workitem);
            var currentId = workitem.id;
            WorkitemsProvider.create({ id: null }, workitem, function successCallback(data) {
                console.log('POST response: ', data);
                ctrl.workitem = angular.copy(data.workitem);
                angular.extend(ctrl.workitem, {
                    updated: ctrl.currentUser,
                });
                ctrl.backup = angular.copy(data.workitem);
                ctrl.disabled = true;
                ctrl.new = false;
                ctrl.appWorkitems.updateTab(currentId, data.workitem);

                titleLabel = ctrl.workitem.type + " " + ctrl.workitem.id;
                $scope.appForm.$setPristine();
                ctrl.appWorkitems.getWorkItems();
            }, function (error) {
                ctrl.appWorkitems.errorCallback(error);
            });
        };

        ctrl.updateWorkItem = function (workitem) {
            workitem.historyComment = ctrl.historyComment;
            console.log('Sent to update: ', workitem);
            WorkitemsProvider.update({ id: workitem.id }, workitem, function successCallback(data) {
                console.log('PUT response: ', data);
                ctrl.workitem = angular.copy(data.workitem);
                ctrl.backup = angular.copy(data.workitem);
                ctrl.historyComment = "";
                ctrl.disabled = true;
                $scope.appForm.$setPristine();
                ctrl.appWorkitems.getWorkItems();
            }, function (error) {
                ctrl.appWorkitems.errorCallback(error);
            });
        };

        ctrl.getID = function () {
            return ctrl.workitem.id;
        };

        ctrl.getTitleLabel = function () {
            return titleLabel;
        };
    }

    var pane = {
        bindings: {
            item: '<',
            users: '<'
        },
        controller: ['$scope', 'WorkitemsProvider', 'authService', PaneController],
        require: {
            appWorkitems: '^',
        },
        templateUrl: 'app/components/view/workitems/workitems-pane.component.html',
        transclude: true
    };

    angular
        .module('app')
        .component('workitemsPane', pane);
})();