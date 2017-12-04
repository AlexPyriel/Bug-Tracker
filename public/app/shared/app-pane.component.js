(function () {

    'use strict';

    function PaneController() {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.pane = {
                title: ctrl.title,
                selected: false
            };
            ctrl.appTabs.addPane(ctrl.pane);
        };
    }

    var pane = {
        bindings: {
            title: '@'
        },
        controller: PaneController,
        require: {
            appTabs: '^^'
        },
        template: '<div ng-show="$ctrl.pane.selected" ng-transclude></div>',
        transclude: true
    };

    angular
        .module('app')
        .component('appPane', pane);
})();