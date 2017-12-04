(function () {

    'use strict';

    var footer = {
        template: [
            '<nav class="navbar navbar-inverse navbar-fixed-bottom footer">',
                '<div class="container">',
                    '<p class="footer__wording">M.E.A.N. </p>',
                    '<img src="assets/img/ant.png" class="footer__logo">',
                    '<p class="footer__wording"> Bug Tracker</p>',
                '</div>',
            '</nav>'
        ].join('')
    };

    angular
        .module('app')
        .component('appFooter', footer);
})();