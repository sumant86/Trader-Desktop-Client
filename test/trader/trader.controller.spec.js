/* jshint -W024, -W030, -W098, -W117 */
describe('Trader', function () {
    'use strict';

    var TraderController,
        TraderControllerScope,
        // $q,
        // $http,
        traderService,
        socketService,
        authService,
        $modal,
        $state,
        $log;

    beforeEach(module('app.trader'));

    beforeEach(function () {
        
        socketService = {};
        authService = {
            getAuth:jasmine.createSpy(),
            removeAuth:jasmine.createSpy()
        };
        crudService = {
            orders : jasmine.createSpy(),
            setOrder : jasmine.createSpy(),
            deleteOrder : jasmine.createSpy(),
            getInstruments : jasmine.createSpy()

        };
        module(function ($provide) {
            $provide.value('crudService', crudService);
            $provide.value('socketService', socketService);
            $provide.value('authService', authService);
        });
    });

    beforeEach(function () {
        inject(function (_$rootScope_, $controller,  _crudService_, _socketService_, _authService_, _$state_, _$modal_, _$log_) {
            // $http = _$httpBackend_;
            // $q = _$q_;
            TraderControllerScope = _$rootScope_.$new();
            TraderController = $controller('TraderController', {
                $scope: TraderControllerScope,
                crudService: _crudService_,
                socketService : _socketService_,
                authService : _authService_,
                $state: _$state_,   
                $modal : _$modal_,
                $log : _$log_
            });

            TraderControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(TraderControllerScope).toBeDefined();
        expect(crudService.getOrder).toHaveBeenCalled();
    }); 

    // it('should do its funcionality', function () {
    //     // expect(TraderController.logout).toHaveBeenCalled();
    // });


});