/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('traderService', traderService);

    traderService.$inject = ['$http', '$location', 'exception', 'api'];
    /* @ngInject */
    function traderService($http, $location, exception, api) {
        var service = {
            getOrder: getOrder,
            setOrder: setOrder,
            deleteOrder: deleteOrder,
            getInstruments:getInstruments
        };

        return service;

        function getOrder() {
            return $http.get(api + '/orders')
                .then(getOrderComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function getOrderComplete(data) {
                return data.data;
            }
        }
        function setOrder(postData) {
            return $http.post(api + '/orders',postData)
                .then(setOrderComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function setOrderComplete(data) {
                return data.data;
            }
        }
        function deleteOrder() {
            return $http.delete(api + '/orders')
                .then(deleteOrderComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function deleteOrderComplete(data) {
                return data.data;
            }
        }
        function getInstruments(){
            return $http.get(api + '/instruments')
                .then(getInstrumentsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function getInstrumentsComplete(data) {
                return data.data;
            }   
        }
    }
})();
