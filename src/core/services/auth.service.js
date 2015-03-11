/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$cookieStore', '$cookies'];
    /* @ngInject */
    function authService($cookieStore, $cookies) {
        var service = {
            setAuth: setAuth,
            getAuth: getAuth,
            removeAuth: removeAuth
        };

        return service;

        function setAuth(key, value) {
            return $cookieStore.put(key, value);
        }
        function getAuth(key) {
            return JSON.parse($cookies[key]);
        }
        function removeAuth(key) {
            return ($cookies[key] = null);
        }
    }
})();
