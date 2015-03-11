/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('crudService', crudService);

    crudService.$inject = ['$resource', 'api'];
    /* @ngInject */
    function crudService($resource, api) {
        return $resource(api + ':url',{},{
            users: {
                method:'GET',
                params : {url:'users'},
                isArray:true
            },
            orders: {
                method:'GET',
                params : {url:'orders'},
                isArray:true
            },
            setOrder: {
                method:'post',
                params : {url:'orders'}
            },
            deleteOrder: {
                method:'delete',
                params : {url:'orders'}
            },
            getInstruments:{
                method:'get',
                params : {url:'instruments'},
                isArray:true
            }
        }) ;



    }
})();
