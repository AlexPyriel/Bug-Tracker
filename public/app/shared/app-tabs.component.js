(function () {

    'use strict';

    function TabsController() {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.panes = [];
            ctrl.class = ctrl.height;

        };
        ctrl.select = function (pane) {
            angular.forEach(ctrl.panes, function (pane) {
                pane.selected = false;
            });
            pane.selected = true;
        };
        ctrl.addPane = function (pane) {
            if (ctrl.panes.length === 0) {
                ctrl.select(pane);
            }
            ctrl.panes.push(pane);
        };
    }

    var tabs = {
        bindings: {
            height: '@'
        },
        transclude: true,
        controller: TabsController,
        templateUrl: 'app/shared/app-tabs.component.html'
    };
    angular
        .module('app')
        .component('appTabs', tabs);
})();