(function () {

    'use strict';

    function PaginationController() {
        var ctrl = this;
    }

    var pagination = {
        controller: PaginationController,
        templateUrl: 'app/components/view/workitems/table/pagination/pagination.component.html'
    };

    angular
        .module('app')
        .component('appPagination', pagination);
})();