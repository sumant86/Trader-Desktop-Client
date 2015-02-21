/* global io */

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('socketService', socketService);

    socketService.$inject = ['$rootScope', 'api'];
    /* @ngInject */
    function socketService($rootScope, api) {
        var socket = io(api);
        var service = {
            socketAction: socketAction,
            socketRemove: socketRemove
        };

        return service;

        function socketAction() {
            return {
                on: function (eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply( function () {
                            callback.apply( socket, args);
                        });
                    });
                }
            };
        }
        function socketRemove() {
            socket.removeAllListeners();
        }
    }
})();
