(function () {

    'use strict';

    function HeaderNavController($location, $rootScope, authService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.path = $location.path();
        };

        $rootScope.$on('$routeChangeSuccess', function () {
            ctrl.path = $location.path();
        });

        ctrl.signup = function () {
            $location.path('/signup');
        };

        ctrl.login = function () {
            $location.path('/login');
        };

        ctrl.isAuthenticated = function () {
            return authService.isAuthenticated();   
        };
    }

    var headerNav = {
        templateUrl: 'app/components/header/navbar/navbar.component.html',
        controller: ['$location', '$rootScope', 'authService', HeaderNavController]
    };

    angular
        .module('app')
        .component('appNavbar', headerNav);
})();