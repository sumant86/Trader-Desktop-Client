(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['accountService', 'logger','cookieService','$state'];

    /* @ngInject */
    function LoginController(accountService, logger, cookieService, $state) {
        var vm = this;

        vm.users = null;
        vm.userlogin = userlogin;
        activate();

        function activate() {
            return getAccount().then(function() {
                logger.info('Activated Login View');
            });
        }

        function getAccount() {
            return accountService.getAccount().then(function(data) {
                vm.users = data;
                return vm.users;
            });
        }
        function userlogin(){
            if(typeof(vm.userSelect) !='undefined'){
                cookieService.set('user', vm.userSelect);
                $state.go('trader.table');
            }
        }
    }
})();
