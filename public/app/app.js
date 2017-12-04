(function () {

    'use strict';

    function config($routeProvider, WorkitemsProviderProvider, UsersProviderProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                template: '<app-landing></app-landing>'
            })
            .when('/login', {
                template: '<app-login></app-login>'
            })
            .when('/signup', {
                template: '<app-sign-up></app-sign-up>'
            })
            .when('/home', {
                template: '<app-user></app-user>'
            })
            .when('/workitems', {
                template: '<app-workitems></app-workitems>'
            })
            .otherwise({ redirectTo: '/' });

        WorkitemsProviderProvider.setUrl('/workitems/:id');
        UsersProviderProvider.setUrl('/users/:id');
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('spinnerInterceptor');
        $httpProvider.interceptors.push('responseInterceptor');
    }

    angular
        .module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMessages'])
        // ng-Mock version
        // .module('app', ['ngRoute', 'ngResource', 'ngMockE2E', 'ngAnimate']) 
        .config(['$routeProvider', 'WorkitemsProviderProvider', 'UsersProviderProvider', '$httpProvider', config])
        .component('appRoot', {
            template: ['<app-header></app-header>', '<ng-view class="hidden-xs"></ng-view>', ' <app-xs-msg class=" visible-xs-block"></app-xs-msg>', '<app-spinner></app-spinner>', '<app-pop-up></app-pop-up>', '<app-footer></app-footer>'].join(''),
            controller: ['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
                $rootScope.$on('$locationChangeStart', function (event) {
                    if (!authService.isAuthenticated()) {
                        if ($location.url() === '/workitems' || $location.url() === '/home') {
                            event.preventDefault();
                            $location.path('/');
                        }
                    }
                });
            }]
        });
    // .run(['$httpBackend', function ($httpBackend) {
    //     var workitems = [
    //         {
    //             "id": 1,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_3",
    //             "priority": 2,
    //             "state": "Proposed",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "Alex"
    //         },
    //         {
    //             "id": 2,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_3",
    //             "priority": 1,
    //             "state": "Active",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         }, 
    //         {
    //             "id": 3,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 3,
    //             "state": "Resolved",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 4,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 3,
    //             "state": "Closed",
    //             "blocked": "No",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 5,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 1,
    //             "state": "Active",
    //             "blocked": "No",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 6,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 4,
    //             "state": "Active",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 7,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_3",
    //             "priority": 2,
    //             "state": "Resolved",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         }, 
    //         {
    //             "id": 8,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 2,
    //             "state": "Proposed",
    //             "blocked": "Yes",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "true"
    //         },
    //         {
    //             "id": 9,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 3,
    //             "state": "Closed",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 10,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 4,
    //             "state": "Resolved",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 11,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_3",
    //             "priority": 2,
    //             "state": "Proposed",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 12,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_3",
    //             "priority": 1,
    //             "state": "Active",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         }, 
    //         {
    //             "id": 13,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 3,
    //             "state": "Resolved",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 14,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 3,
    //             "state": "Closed",
    //             "blocked": "No",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 15,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 1,
    //             "state": "Active",
    //             "blocked": "No",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 16,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 4,
    //             "state": "Active",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 17,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_3",
    //             "priority": 2,
    //             "state": "Resolved",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         }, 
    //         {
    //             "id": 18,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 2,
    //             "state": "Proposed",
    //             "blocked": "Yes",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 19,
    //             "type": "Bug",
    //             "title": "Lorem ipsum",
    //             "assigned": "Developer_1",
    //             "priority": 3,
    //             "state": "Closed",
    //             "blocked": "No",
    //             "reprosteps": "Please refer to symptom and attached files.",
    //             "symptom": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         },
    //         {
    //             "id": 20,
    //             "type": "Requirement",
    //             "title": "Lorem ipsum dolor sit amet",
    //             "assigned": "Developer_2",
    //             "priority": 4,
    //             "state": "Resolved",
    //             "blocked": "Yes",
    //             "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    //             "checkedout": "false"
    //         }
    //     ];
    //     var regexpWorkitemId = /^\/workitems\/([0-9]+)$/;
    //     function findWorkitem(id) {
    //         var foundWorkitem = null;
    //         for (var i = 0; i < workitems.length; i++) {
    //             var workitem = workitems[i];
    //             if (workitem.id == id) {
    //                 foundWorkitem = workitem;
    //                 break;
    //             }
    //         }
    //         return foundWorkitem;
    //     }

    //     $httpBackend.whenGET('/workitems').respond(workitems);

    //     $httpBackend.whenGET(regexpWorkitemId).respond(function (method, url) {
    //         var id = url.match(regexpWorkitemId)[1];
    //         var foundWorkitem = findWorkitem(id);
    //         var result = foundWorkitem ? [200, foundWorkitem] : [404, 'Workitem not found'];
    //         return result;
    //     });

    //     $httpBackend.whenPOST('/workitems').respond(function (method, url, data) {
    //         var workitem = angular.fromJson(data);
    //         workitem.id = workitems.length + 1;
    //         workitems.push(workitem);
    //         return [200, workitem, {}];
    //     });

    //     $httpBackend.whenPUT(regexpWorkitemId).respond(function (method, url, data) {
    //         var workitem = angular.fromJson(data);
    //         var id = url.match(regexpWorkitemId)[1];
    //         var foundWorkitem = findWorkitem(id);
    //         workitems.splice(foundWorkitem.id -1, 1, workitem);
    //         return [200, workitem, {}];
    //     });
    //     $httpBackend.whenGET(/app\/.*/).passThrough();
    // }]);

})();