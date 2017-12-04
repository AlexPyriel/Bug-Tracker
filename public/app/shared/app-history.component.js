(function () {
    
        'use strict';
    
        var historyComponent = {
            bindings: {
                history: '<'
            },
            templateUrl: 'app/shared/app-history.component.html'
        };
    
        angular
            .module('app')
            .component('appHistory', historyComponent);
    })();