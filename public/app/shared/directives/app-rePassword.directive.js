(function () {

    'user strict';

    function rePasswordDirective() {
        return {
            restrict: 'A',
            require: ['ngModel', '^^appSignUp'],
            link: function (scope, elm, attrs, controllers) {
                var ctrl = controllers[0],
                    parent = controllers[1];

                ctrl.$validators.repassword = function (modelValue, viewValue) {

                    if (parent.user.password && modelValue) {
                        if (parent.user.password === modelValue) {
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
        .directive('appRePassword', rePasswordDirective);
})();