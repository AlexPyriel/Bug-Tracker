(function() {

    'use strict';

    angular
        .module('app')
        .component('appXsMsg', {
            controller: function () {
                var ctrl = this;
                ctrl.active = false;
                ctrl.open = function () {
                    ctrl.active = true;
                };
                ctrl.close = function () {
                    ctrl.active = false;
                };
            },
            templateUrl: "app/shared/xs-device-msg.component.html" 
        });
})();