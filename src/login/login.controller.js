(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['crudService', 'authService', '$state'];

    /* @ngInject */
    function LoginController(crudService, authService, $state) {
        var vm = this;

        vm.users = null;
        vm.userlogin = userlogin;
        activate();

        function activate() {
            getUser();
        }

        function getUser() {
            vm.users = crudService.users();
        }
        
        function userlogin() {
            if (typeof(vm.userSelect) !== 'undefined') {
                authService.setAuth('user', vm.userSelect);
                $state.go('trader.table');
            }
        }
    }
})();
