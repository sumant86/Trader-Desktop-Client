/* jshint -W024, -W030, -W098, -W117 */
describe('Trader', function () {
    'use strict';

    var TraderController,
        TraderControllerScope,
        $q,
        // $http,
        loginService,
        // socketService,
        cookieService,
        $modal,
        $state,
        $log,
        logger;

    beforeEach(module('app.trader'));

    beforeEach(function () {

        module(function ($provide) {
            $provide.value('loginService', loginService);
            // $provide.value('socketService', socketService);
            // $provide.value('cookieService', cookieService);
        });
    });

    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _loginService_, _cookieService_, _$modal_, _$log_, _$state_, _logger_) {
            // $http = _$httpBackend_;
            $q = _$q_;
            TraderControllerScope = _$rootScope_.$new();
            
            TraderController = $controller('TraderController', {
                $scope: TraderControllerScope,
                loginService: _loginService_,
                // socketService : _socketService_,
                cookieService : _cookieService_,
                $modal : _$modal_,
                $log : _$log_,
                logger: _logger_,
                $state: _$state_
            });

            logger = {
                info: jasmine.createSpy()
            };

            TraderControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(TraderControllerScope).toBeDefined();
    });
    it('should be defined', function () {
        expect(TraderControllerScope).toBeDefined();
        console.log(TraderController);
    });

    // it('should do its funcionality', function () {
    //     expect(TraderController.logout).toHaveBeenCalled();
    //     // expect(logger.info).toHaveBeenCalledWith('Activated Trader View');
    //     // expect(LoginController.user).toEqual({ data : 'user' });
    // });


});