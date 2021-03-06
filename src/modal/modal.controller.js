(function() {
    'use strict';

    angular
        .module('app.trader')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$modalInstance', '$modal', 'logger'];

    /* @ngInject */
    function ModalController($modalInstance, $modal, logger) {
        var vm = this;

        vm.cancel = cancel;
        vm.onSubmit = create;
        activate();
        function activate() {
            logger.info('Activated Trader Modal');
        }
        function cancel() {
            $modalInstance.dismiss('cancel');
        }
        function create(){
            if (vm.tradeCount) {
                $modalInstance.close(vm.tradeCount);
            }
        }
    }
})();
