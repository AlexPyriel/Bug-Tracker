(function () {

    'use strict';

    var headerButton = {
        bindings: {
            icon: '@'
        },
        template: ['$element', '$attrs', function($element, $attrs) {
            var spanIcon = $attrs.icon ? '<span class="{{::$ctrl.icon}}" aria-hidden="true"></span>' : '';
            var template = '<div type="button" class="btn btn-info app-btn app-btn_shadow">' + spanIcon + '<ng-transclude></ng-transclude></div>';
            return template;
        }],
        transclude: true
    };

    angular
        .module('app')
        .component('appNavButton', headerButton);
})();

//<app-nav-button ng-click="$ctrl.signup()" icon="glyphicon glyphicon-user"> Sign Up</app-nav-button>