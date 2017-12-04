(function () {

    'use strict';

    function TableController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.selectedItem = {};
            ctrl.selected = false;
            ctrl.offset = ($('#table').height() / 4) - 15;
        };
        ctrl.$onChanges = function (changes) {
            ctrl.closePreview();
        };
        ctrl.isSelected = function (id) {
            return ctrl.selectedItem.id === id;
        };

        ctrl.select = function (workitem) {
            ctrl.selectedItem = workitem;
            ctrl.selected = true;
            var tableRow = document.getElementById('tr_' + ctrl.selectedItem.id);
            $('#table').animate({ scrollTop: tableRow.offsetTop - ctrl.offset }, 400);
        };

        ctrl.openPane = function (id) {
            ctrl.onOpen({
                $event: { id: id }
            });
        };

        ctrl.closePreview = function () {
            ctrl.selected = false;
        };
    }

    var table = {
        bindings: {
            workitems: '<',
            onOpen: '&'
        },
        controller: TableController,
        templateUrl: 'app/components/view/workitems/table/table.component.html',
    };

    angular
        .module('app')
        .component('appTable', table);
})();