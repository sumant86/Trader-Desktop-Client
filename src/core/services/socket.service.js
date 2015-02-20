/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('socketService', socketService);

    socketService.$inject = ['$rootScope','api','socketFactory'];
    /* @ngInject */
    function socketService($rootScope,api,socketFactory) {
        var socket = io(api);
        var service = {
            socketAction: socketAction,
            socketRemove: socketRemove
        };

        return service;

        function socketAction() {
            return{
                on: function (eventName, callback) {
                    socket.on(eventName, function () {  
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                }
            }
        }
        function socketRemove(){
            socket.removeAllListeners();
        }
        // var myIoSocket = io.connect(api);

        //   var mySocket = socketFactory({
        //     ioSocket: myIoSocket
        //   });
        //   mySocket.forward(['orderCreatedEvent','placementCreatedEvent','executionCreatedEvent','allOrdersDeletedEvent'])
        //   return mySocket;

    }
})();
