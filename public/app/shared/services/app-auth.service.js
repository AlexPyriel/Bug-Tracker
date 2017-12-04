(function () {

    'use strict';

    function Service() {

        var Service = {};

        function setUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        function getUser() {
            return JSON.parse(localStorage.getItem('user'));
        }
        function isAuthenticated() {
            return localStorage.getItem('user') ? true : false;
        }
        function removeUser() {
            localStorage.removeItem('user');
        }
        function remember(email) {
            localStorage.setItem('rememberMe', email);
        }
        function forget() {
            localStorage.removeItem('rememberMe');
        }
        function recall() {
            return localStorage.getItem('rememberMe');
        }
        function isRemembered() {
            return localStorage.getItem('rememberMe') ? true : false;
        }

        Service.setUser = setUser;
        Service.getUser = getUser;
        Service.removeUser = removeUser;
        Service.isAuthenticated = isAuthenticated;
        Service.remember = remember;
        Service.forget = forget;
        Service.recall = recall;
        Service.isRemembered = isRemembered;

        return Service;
    }

    angular
        .module('app')
        .factory('authService', Service);
})();