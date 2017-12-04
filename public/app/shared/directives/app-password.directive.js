(function () {

    'user strict';

    function passwordDirective() {
        return {
            restrict: 'A',
            require: ['ngModel', '^^appSignUp'],
            link: function (scope, elm, attrs, controllers) {
                var ctrl = controllers[0],
                    parent = controllers[1];

                ctrl.$validators.userpassword = function (modelValue, viewValue) {

                    if (modelValue) {
                        parent.passLength = modelValue.length;
                        if (validator.isAlphanumeric(modelValue)) {
                            return true;
                        } else { return false; }
                    }
                    parent.passLength = "";
                    return false;
                };
            }
        };
    }

    angular
        .module('app')
        .directive('appPassword', passwordDirective);
})();