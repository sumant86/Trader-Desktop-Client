/* global d3 */
(function() {
    'use strict';

    angular
        .module('app.trader')
        .controller('TraderController', TraderController);

    TraderController.$inject = ['traderService', 'socketService',
                                'cookieService', '$state', '$modal',
                                '$log', 'logger'];

    /* @ngInject */
    function TraderController(traderService, socketService, cookieService, $state, $modal, $log, logger) {
        var vm = this;
        vm.order = null;
        vm.user = cookieService.get('user');
        vm.instrument = getInstrument;
        vm.logout = logout;
        vm.tradeModel = tradeModel;
        vm.deleteAllTrade = deleteOrders;
        vm.reloadTrades = reloadTrades;
        activate();
        function activate() {
            if (typeof(vm.user) === 'undefined' || vm.user === null) {
                return $state.go('login');
            }
            return getOrder().then(function() {
                logger.info('Activated Trader View');
            });
        }
        // Socket event Listners Started
        socketService.socketRemove();
        socketService.socketAction().on('orderCreatedEvent', orderCreated);
        socketService.socketAction().on('placementCreatedEvent', orderPlaced);
        socketService.socketAction().on('executionCreatedEvent', orderExecuted);
        socketService.socketAction().on('allOrdersDeletedEvent', orderdeleted);

        function orderCreated(data) {
            vm.order.push(data);
        }
        function orderPlaced(data) {
            vm.order.forEach(function(d) {
                if (d.id === data.orderId) {
                    d.status = data.status;
                    d.quantityPlaced += data.quantityPlaced;
                }
            });
        }
        function orderExecuted(data) {
            vm.order.forEach(function(d) {
                if (d.id === data.orderId) {
                    d.status = data.status;
                    d.quantityExecuted += data.quantityExecuted;
                }
            });
        }
        function orderdeleted() {
            vm.order = [];
        }

        //Socket event Listners end

        function reloadTrades() {
            return getOrder();
        }
        function deleteOrders() {
            return traderService.deleteOrder().then(function(data) {
                vm.order = data;
                // if (d3.selectAll('svg g')) {
                //     d3.selectAll('svg g').remove();    
                // }
                
                return vm.order;
            });
        }
        function getOrder() {
            return traderService.getOrder().then(function(data) {
                vm.order = data;
                return vm.order;
            });
        }
        function logout() {
            cookieService.remove('user');
            $state.go('login');
        }
        function getInstrument() {
            return traderService.getInstruments().then(function(data) {
                vm.instrument = data;
                return vm.instrument;
            });
        }
        function createTrade(n) {
            var side = ['Sell', 'Buy'];
            for (var i = 1; i <= n; i++) {
                var postData = {};
                postData.traderId = vm.user.id;
                var inst = Math.floor((Math.random() * vm.instrument.length));
                postData.symbol = vm.instrument[inst].symbol;
                postData.side = side[Math.floor(Math.random() * 2)];
                postData.quantity = Math.floor((Math.random() * 10000) + 1);
                postData.limitPrice = Math.floor((Math.random() * 10000) + 1);
                traderService.setOrder(postData);
            }
        }
        function tradeModel(size) {
            getInstrument();
            var modalInstance = $modal.open({
                templateUrl: 'modal/createTradeModal.html',
                controller: 'ModalController',
                controllerAs: 'vm',
                size: size
            });

            modalInstance.result.then(function (tradeCount) {
                createTrade(tradeCount);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
