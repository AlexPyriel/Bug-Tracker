(function () {

    'use strict';

    function PreviewController() {
        var ctrl = this;

        ctrl.close = function () {
            ctrl.onClose();
        };
    }

    var preview = {
        bindings: {
            workitem: '<',
            selected: '<',
            onClose: '&'
        },
        controller: PreviewController,
        templateUrl: 'app/components/view/workitems/table/preview/preview.component.html'
    };

    angular
        .module('app')
        .component('appPreview', preview);
})();