(function () {

    'use strict';

    function ToolbarContorller() {
        var ctrl = this;

        ctrl.id = null;

        ctrl.openPane = function (id) {
            if(id)
            ctrl.onOpen({
                $event: { id: parseInt(id) }
            });
            ctrl.id = null;
        };
        ctrl.createPane = function (selection) {
            ctrl.onCreate({
                $event: { type: selection }
            });
        };
    }

    var toolbar = {
        bindings: {
            onOpen: '&',
            onCreate: '&'
        },
        controller: ToolbarContorller,
        templateUrl: 'app/components/view/workitems/toolbar/toolbar.component.html'
    };

    angular
        .module('app')
        .component('appToolbar', toolbar);
})();