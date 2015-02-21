/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', '$location', 'exception', 'api'];
    /* @ngInject */
    function loginService($http, $location, exception, api) {
        var service = {
            getUser: getUser
        };

        return service;

        function getUser() {
            return $http.get(api + '/users')
                .then(getUserComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getUser')(message);
                    $location.url('/');
                });

            function getUserComplete(data) {
                return data.data;
            }
        }
    }
})();
