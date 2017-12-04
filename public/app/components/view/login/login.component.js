(function () {

    'use strict';

    function LoginController($scope, $http, $location, authService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.user = {};
            ctrl.rememberMe = false;
            if (authService.isRemembered()) {
                ctrl.user.email = authService.recall();
                ctrl.rememberMe = true;
            }
            authService.removeUser();
        };

        ctrl.touchEmail = function () {
            ctrl.rememberMe = false;
        };

        ctrl.login = function () {
            if ($scope.loginForm.$valid)
                $http.post('/auth/authenticate', ctrl.user)
                    .then(function successCallback(response) {
                        if (ctrl.rememberMe) {
                            authService.remember(ctrl.user.email);
                        } else { authService.forget(); }
                        console.log('Response: ', response);
                        authService.setUser(response.data.user);
                        $location.path('/home');
                    }, function errorCallback(error) {
                        console.log('Error: ', error);
                    });
        };
    }

    var login = {
        templateUrl: 'app/components/view/login/login.component.html',
        controller: ['$scope', '$http', '$location', 'authService', LoginController]
    };

    angular
        .module('app')
        .component('appLogin', login);
})();