(function () {

    'use strict';

    function SpinnerInterceptor($q, $rootScope) {

        var SpinnerInterceptor = {};

        SpinnerInterceptor.request = function (config) {

            var routes = ['auth', 'workitems', 'users'];
            var path = config.url.split('/')[1];

            angular.forEach(routes, function (route) {
                if (path === route) {
                    $rootScope.$emit('start loader');
                    return;
                }
            });
            return config;
        };

        SpinnerInterceptor.response = function (response) {
            if (response.data.success) {
                $rootScope.$emit('stop loader');
            }
            return response;
        };

        SpinnerInterceptor.responseError = function (rejection) {
            if (rejection.data.title && rejection.data.message) {
                $rootScope.$emit('stop loader');
            }
            return $q.reject(rejection);
        };

        return SpinnerInterceptor;
    }

    angular
        .module('app')
        .factory('spinnerInterceptor', ['$q', '$rootScope', SpinnerInterceptor]);
})();