(function() {
    'use strict';

    angular
        .module('app.trader')
        .controller('TraderController', TraderController);

    TraderController.$inject = ['traderService','socketService', 'logger','cookieService','$state','$modal','$log','$scope'];

    /* @ngInject */
    function TraderController(traderService, socketService, logger, cookieService,$state,$modal,$log,$scope) {
        var vm = this;
        vm.order = null;
        vm.user = cookieService.get('user');
        vm.instrument = getInstrument;
        vm.logout = logout;
        vm.tradeModel = tradeModel;
        vm.deleteAllTrade = deleteOrders;
        vm.reloadTrades = reloadTrades;
        activate();
        if(typeof(vm.user) =='undefined' || vm.user === null){
            return $state.go('login');
        }
        function activate() {
            return getOrder().then(function() {
                logger.info('Activated Trader View');
            });
        }
        
        // Socket event Listners Started
        socketService.socketRemove();
        socketService.socketAction().on('orderCreatedEvent',orderCreated);
        socketService.socketAction().on('placementCreatedEvent',orderPlaced);
        socketService.socketAction().on('executionCreatedEvent',orderExecuted);
        socketService.socketAction().on('allOrdersDeletedEvent',orderdeleted);

        // // socketService.socketRemove();
        // $scope.$on('socket:orderCreatedEvent',orderCreated);
        // $scope.$on('socket:placementCreatedEvent',orderPlaced);
        // $scope.$on('socket:executionCreatedEvent',orderExecuted);
        // $scope.$on('socket:allOrdersDeletedEvent',orderdeleted);

        function orderCreated(data){
            console.log(data);
            vm.order.push(data);
            // $scope.$apply();
        }
        function orderPlaced(data){
            console.log('orderPlaced');
            vm.order.forEach(function(d,i){
                if(d.id === data.orderId){
                    d.status = data.status;
                    d.quantityPlaced += data.quantityPlaced; 
                }
            });
            // $scope.$apply();
        }
        function orderExecuted(data){
            console.log('orderExecuted');
            vm.order.forEach(function(d,i){
                if(d.id === data.orderId){
                    d.status = data.status;
                    d.quantityExecuted += data.quantityExecuted; 
                }
            });
            // $scope.$apply();
        }
        function orderdeleted(data){
            console.log('orderDeleted');
            vm.order = [];
            // $scope.$apply();
        }
        //Socket event Listners end

        function reloadTrades(){
            return getOrder();
        }
        function deleteOrders(){
            return traderService.deleteOrder().then(function(data) {
                vm.order = data;
                d3.select("svg").remove();
                return vm.order;
            });
        }
        function getOrder() {
            return traderService.getOrder().then(function(data) {
                vm.order = data;
                return vm.order;
            });
        }
        function logout(){
            cookieService.remove('user');
            $state.go('login');
        }
        function getInstrument(){
            return traderService.getInstruments().then(function(data) {
                vm.instrument = data;
                return vm.instrument;
            });   
        }
        function createTrade(n){
            var side = ["Sell", "Buy"];
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
        function tradeModel(size){
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
