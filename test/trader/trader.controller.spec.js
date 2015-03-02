/* jshint -W024, -W030, -W098, -W117 */
describe('Trader', function () {
    'use strict';

    var TraderController,
        TraderControllerScope,
        $q,
        // $http,
        traderService,
        socketService,
        cookieService,
        $modal,
        $state,
        $log,
        logger;

    beforeEach(module('app.trader'));

    beforeEach(function () {
        traderService = {
            getOrder: jasmine.createSpy(),
            setOrder: jasmine.createSpy(),
            deleteOrder: jasmine.createSpy(),
            getInstruments: jasmine.createSpy()
        };
        socketService = {};
        cookieService = {
            get:jasmine.createSpy()
        };
        module(function ($provide) {
            $provide.value('traderService', traderService);
            $provide.value('socketService', socketService);
            $provide.value('cookieService', cookieService);
        });
    });

    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _traderService_, _socketService_, _cookieService_, _$state_, _$modal_, _$log_, _logger_) {
            // $http = _$httpBackend_;
            $q = _$q_;
            TraderControllerScope = _$rootScope_.$new();
            // _logger_ = {
            //     info: jasmine.createSpy()
            // };
            TraderController = $controller('TraderController', {
                $scope: TraderControllerScope,
                traderService: _traderService_,
                socketService : _socketService_,
                cookieService : _cookieService_,
                $state: _$state_,   
                $modal : _$modal_,
                $log : _$log_,
                logger: _logger_
            });

            TraderControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(TraderControllerScope).toBeDefined();
        expect(traderService.getOrder).toHaveBeenCalled();
    }); 

    // it('should do its funcionality', function () {
        // expect(TraderController.logout).toHaveBeenCalled();
    //     // expect(logger.info).toHaveBeenCalledWith('Activated Trader View');
    // });


});