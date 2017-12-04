(function () {

    'use strict';

    function SpinnerController($rootScope, $scope) {
        var ctrl = this;
        ctrl.show = false;

        var startListener = $rootScope.$on('start loader', function (event, data) {
            ctrl.show = true;
            event.stopPropagation();
        });
        var stopListener = $rootScope.$on('stop loader', function (event, data) {
            ctrl.show = false;
            event.stopPropagation();
        });

        $scope.$on('$destroy', startListener);
        $scope.$on('$destroy', stopListener);
    }

    var spinnerComponent = {
        controller: ['$rootScope', '$scope', SpinnerController],
        templateUrl: 'app/shared/app-spinner.html'
    };

    angular
        .module('app')
        .component('appSpinner', spinnerComponent);
})();