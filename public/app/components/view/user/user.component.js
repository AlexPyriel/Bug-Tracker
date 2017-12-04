(function() {

    'use strict';

    function UserController($location, authService) {
        var ctrl = this;

        ctrl.$onInit = function() {

        };

        ctrl.workitems = function() {
            $location.path('/workitems');
        };
        
        ctrl.check = function() {
            console.log(authService.isAuthenticated());
        };
    }

    var userPage = {
        controller: ['$location', 'authService', UserController],
        templateUrl: 'app/components/view/user/user.component.html'
    };

    angular
    .module('app')
    .component('appUser', userPage);

})();