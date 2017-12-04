(function () {

    'use strict';

    function SignUpController($scope, $http, $location, authService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.user = {};
            // is being updated from app-password directive
            ctrl.passLength = "";
        };

        ctrl.signup = function () {
            if ($scope.signupForm.$valid)
                $http.post('/auth/register', ctrl.user)
                    .then(function successCallback(response) {
                        console.log('Response: ', response);
                        authService.forget();
                        $location.path('/login');
                    }, function errorCallback(error) {
                        console.log('Error: ', error);
                    });
        };
    }

    var signUp = {
        templateUrl: 'app/components/view/signup/signup.component.html',
        controller: ['$scope', '$http', '$location', 'authService', SignUpController]
    };

    angular
        .module('app')
        .component('appSignUp', signUp);
})();