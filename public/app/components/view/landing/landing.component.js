(function () {

    'use strict';

    var landing = {
        template: '<div class="block-vertical-align"><img src="assets/img/ant.png" draggable="false"/></div>'
    };

    angular
        .module('app')
        .component('appLanding', landing);
})();