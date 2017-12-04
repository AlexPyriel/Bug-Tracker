(function () {

    'use strict';

    function AuthInterceptor($q, authService) {

        var AuthInterceptor = {};

        AuthInterceptor.request = function (config) {
            if (authService.isAuthenticated()) {
                var secureRoutes = ['workitems', 'users'];
                var path = config.url.split('/')[1];
                angular.forEach(secureRoutes, function (route) {
                    if (path === route) {
                        config.headers.Authorization = authService.getUser().token;
                        return;
                    }
                });
            }
            return config;
        };

        return AuthInterceptor;
    }

    angular
        .module('app')
        .factory('authInterceptor', ['$q', 'authService', AuthInterceptor]);
})();