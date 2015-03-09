(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService', 'cookieService', '$state', 'logger'];

    /* @ngInject */
    function LoginController(loginService, cookieService, $state, logger) {
        var vm = this;

        vm.users = null;
        vm.userlogin = userlogin;
        activate();

        function activate() {
            return getUser().then(function() {
                logger.info('Activated Login View');
            });
        }

        function getUser() {
            return loginService.getUser().then(function(data) {
                vm.users = data;
                return vm.users;
            });
        }
        
        function userlogin() {
            if (typeof(vm.userSelect) !== 'undefined') {
                cookieService.set('user', vm.userSelect);
                $state.go('trader.table');
            }
        }
    }
})();
