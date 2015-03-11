(function() {
    'use strict';

    angular
        .module('app.trader')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'trader',
                config: {
                    url: '',
                    templateUrl: 'trader/trader.html',
                    controller: 'TraderController',
                    controllerAs: 'vm',
                    title: 'Trader'
                }
            },
            {
                state: 'trader.table',
                config: {
                    url: '/table',
                    templateUrl: 'trader/table.html'
                }
            },
            {
                state: 'trader.chart',
                config: {
                    url: '/chart',
                    templateUrl: 'trader/chart.html'
                }
            }
        ];
    }
})();
