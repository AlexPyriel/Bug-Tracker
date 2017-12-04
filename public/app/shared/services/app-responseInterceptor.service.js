(function () {

    'use strict';

    function ResponseInterceptor($q, $rootScope, $location, authService) {

        var ResponseInterceptor = {};

        ResponseInterceptor.response = function (response) {
            if (response.data.title && response.data.message) {
                $rootScope.$emit('response success', response.data);
            }
            return response;
        };

        ResponseInterceptor.responseError = function (rejection) {
            if (rejection.status === 401) {
                rejection.data = {
                    title: 'Authorization failed:',
                    message: 'User token expired or invalid'
                };
                authService.removeUser();
                $location.path('/');
            }
            if (rejection.data.title && rejection.data.message) {
                $rootScope.$emit('response error', rejection.data);
            }
            return $q.reject(rejection);
        };

        return ResponseInterceptor;
    }

    angular
        .module('app')
        .factory('responseInterceptor', ['$q', '$rootScope', '$location', 'authService', ResponseInterceptor]);
})();