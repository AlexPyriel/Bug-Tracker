(function () {

    'user strict';

    function emailDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.useremail = function (modelValue, viewValue) {

                    if (modelValue) {
                        if (validator.isEmail(modelValue)) {
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
        .directive('appEmail', emailDirective);
})();