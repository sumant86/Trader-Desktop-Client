/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('cookieService', cookieService);

    cookieService.$inject = ['$cookieStore', '$cookies'];
    /* @ngInject */
    function cookieService($cookieStore, $cookies) {
        var service = {
            set: setCookie,
            get: getCookie,
            remove: removeCookie
        };

        return service;

        function setCookie(key, value) {
            return $cookieStore.put(key, value);
        }
        function getCookie(key) {
            return JSON.parse($cookies[key]);
        }
        function removeCookie(key) {
            return ($cookies[key] = null);
        }
    }
})();
