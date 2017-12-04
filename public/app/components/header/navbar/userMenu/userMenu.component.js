(function () {

    'use strict';

    function HeaderUserController($location, authService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.user = authService.isAuthenticated() ? authService.getUser() : {};
        };

        ctrl.profile = function () {
            $location.path('/home');
        };

        ctrl.logOut = function () {
            authService.removeUser();
            $location.path('/');
        };

        ctrl.workitems = function() {
            $location.path('/workitems');
        };
    }

    var userMenu = {
        controller: ['$location', 'authService', HeaderUserController],
        templateUrl: 'app/components/header/navbar/userMenu/userMenu.component.html'
    };

    angular
        .module('app')
        .component('appUserMenu', userMenu);
})();