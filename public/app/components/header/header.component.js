(function () {

    'use strict';

    var header = {
        template: [
            '<nav class="navbar navbar-inverse navbar-fixed-top">',
                '<div class="container">',
                    '<div class="navbar-header">',
                        '<span class="logo"></span>',
                        '<a class="navbar-brand" href="/">[m.e.a.n.Bt]</a>',
                    '</div>',
                    '<app-navbar class="hidden-xs"></app-navbar>',
                '</div>',
            '</nav>',
        ].join(''),
    };

    angular
        .module('app')
        .component('appHeader', header);
})();