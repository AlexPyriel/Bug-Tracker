(function () {

    'use strict';

    function Service() {

        var url;
        var Service = {};

        Service.setUrl = function (configUrl) {
            url = configUrl;
        };

        Service.$get =  ['$resource', function ($resource) {
            return $resource(url, { id: '@id' }, {
                get: { method: 'GET' },
                query: { method: 'GET', isArray: false },
                create: { method: 'POST' },
                update: { method: 'PUT' },
                delete: { method: 'DELETE' }
            });
        }];
        
        return Service;
    }

    angular
        .module('app')
        .provider('WorkitemsProvider', Service);
})();