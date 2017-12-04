(function () {

    'use strict';

    function WorkitemsController($scope, $element, $compile, WorkitemsProvider, UsersProvider) {
        var ctrl = this;
        ctrl.errorCallback = function (error) {
            console.log('response from errorCallback: \n', error);
            if (error.status <= 0) {
                console.log('Service Unavailable');
            }
        };

        ctrl.$onInit = function () {
            ctrl.tabs = [];
            ctrl.newTabID = 1;
            ctrl.workitems = {};
            ctrl.users = {};
            ctrl.workitemsPaneItem = {};
            ctrl.workitemsPaneItem_new = {};
            ctrl.getWorkItems();
            ctrl.getUsers();
        };

        ctrl.addTab = function (tab) {
            ctrl.selectTab(tab);
            ctrl.tabs.push(tab);
        };
        ctrl.selectTab = function (tab) {
            angular.forEach(ctrl.tabs, function (tab) {
                tab.selected = false;
            });
            tab.selected = true;
        };
        ctrl.updateTab = function (current, update) {
            angular.forEach(ctrl.tabs, function (tab) {
                if (tab.id === current) {
                    angular.extend(tab, {
                        title: update.id,
                        id: update.id
                    });
                    return;
                }
            });
        };

        ctrl.getWorkItems = function () {
            WorkitemsProvider.query(function successCallback(response) {
                console.log('GET response: ', response);
                ctrl.workitems = response.workitems;
            }, function (error) {
                ctrl.errorCallback(error);
            });
        };

        ctrl.getUsers = function () {
            UsersProvider.query(function successCallback(response) {
                ctrl.users = response.users;
                console.log('getusers', ctrl.users);
            }, function errorCallback(error) {
                ctrl.errorCallback(error);
            });
        };

        ctrl.$postLink = function () {

            ctrl.openWorkitem = function (event) {
                var existingTab;
                angular.forEach(ctrl.tabs, function (tab) {
                    if (tab.id === event.id) {
                        existingTab = tab;
                        return;
                    }
                });

                if (existingTab) {
                    console.log('already opened');
                    ctrl.selectTab(existingTab);
                } else {
                    WorkitemsProvider.get({ id: event.id }, function successCallback(data) {
                        console.log('GET response: ', data);
                        ctrl.workitemsPaneItem = angular.copy(data.workitem);
                        var tabsContainer = angular.element(document.getElementById("PanesContainer"));
                        var tab = angular.element('<workitems-pane item="$ctrl.workitemsPaneItem" users="$ctrl.users"></workitems-pane>');
                        angular.element(tabsContainer).append(tab);
                        $compile(tab)($scope);
                    }, function (error) {
                        ctrl.errorCallback(error);
                    });
                }
            };

            ctrl.createWorkitemPane = function (event) {
                ctrl.workitemsPaneItem_new = {
                    id: "New tab " + ctrl.newTabID,
                    type: event.type
                };

                var tabsContainer = angular.element(document.getElementById("PanesContainer"));
                var tab = angular.element('<workitems-pane item="$ctrl.workitemsPaneItem_new" users="$ctrl.users"></workitems-pane>');
                angular.element(tabsContainer).append(tab);
                $compile(tab)($scope);

                ctrl.newTabID += 1;
            };


            ctrl.closeWorkitem = function (tab, index) {
                ctrl.tabs.splice(index, 1);
                angular.element(document.getElementById(tab.id)).parent().remove();
                if (tab.selected && ctrl.tabs.length > 0) {
                    ctrl.tabs[index - 1].selected = true;
                }
            };
        };
    }

    var workitems = {
        controller: ['$scope', '$element', '$compile', 'WorkitemsProvider', 'UsersProvider', WorkitemsController],
        templateUrl: 'app/components/view/workitems/workitems.component.html',
    };

    angular
        .module('app')
        .component('appWorkitems', workitems);
})();