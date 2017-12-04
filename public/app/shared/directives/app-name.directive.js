(function () {

    'user strict';

    function nameDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.username = function (modelValue, viewValue) {

                    if (modelValue) {
                        if (validator.isAlpha(modelValue)) {
                            return true;
                        }
                    }

                    return false;
                };
            }
        };
    }

    angular
        .module('app')
        .directive('appName', nameDirective);
})();