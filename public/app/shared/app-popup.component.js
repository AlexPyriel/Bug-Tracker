(function () {

    'use strict';

    function PopUpController($rootScope, $scope, $timeout) {

        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.response = {};
            ctrl.show = false;
            ctrl.type = "";
        };

        var errorListener = $rootScope.$on('response error', function (event, data) {
            event.stopPropagation();
            ctrl.response = data;
            ctrl.type = "error";
            ctrl.show = true;
            $timeout(function () {
                ctrl.show = false;
            }, 2000);
        });

        var successListener = $rootScope.$on('response success', function(event, data) {
            event.stopPropagation();
            ctrl.response = data;
            ctrl.type = "success";
            ctrl.show = true;
            $timeout(function () {
                ctrl.show = false;
            }, 2000);
        });

        $scope.$on('$destroy', errorListener);
        $scope.$on('$destroy', successListener);
        
    }

    var popupComponent = {
        controller: ['$rootScope', '$scope', '$timeout', PopUpController],
        templateUrl: 'app/shared/app-popup.component.html'
    };

    angular
        .module('app')
        .component('appPopUp', popupComponent);
})();