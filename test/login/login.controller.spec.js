/* jshint -W024, -W030, -W098, -W117 */
describe('Login', function () {
    'use strict';

    var LoginController,
        loginControllerScope,
        $q,
        // $http,
        loginService,
        cookieService,
        $state,
        logger;

    beforeEach(module('app.login'));

    beforeEach(function () {
        loginService = {
            getUser: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('loginService', loginService);
        });
    });
    beforeEach(function () {
        cookieService = {
            set: jasmine.createSpy()
        };
        module(function ($provide) {
            $provide.value('cookieService', cookieService);
        });
    });

    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _loginService_, _cookieService_, _$state_, _logger_) {
            // $http = _$httpBackend_;
            $q = _$q_;
            loginControllerScope = _$rootScope_.$new();
            _logger_ = {
                info: jasmine.createSpy()
            };
            var deferred = $q.defer();
            deferred.resolve({
                data: 'user'
            });
            LoginController = $controller('LoginController', {
                $scope: loginControllerScope,
                loginService: _loginService_,
                logger: _logger_,
                cookieService: _cookieService_,
                $state: $state
            });
            
            loginControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(loginControllerScope).toBeDefined();
        expect(LoginController).toBeDefined();
        
    });

    // it('should do its funcionality', function () {

    //     // expect(LoginController.getUser).toHaveBeenCalled();
    //     // expect(logger.info).toHaveBeenCalledWith('Activated Login View');
    //     // expect(LoginController.user).toEqual({ data : 'user' });
    // });


});