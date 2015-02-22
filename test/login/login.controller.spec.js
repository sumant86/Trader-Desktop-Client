/* jshint -W024, -W030, -W098, -W117 */
describe('Login', function () {
    'use strict';

    var LoginController,
        loginControllerScope,
        $q,
        $http,
        loginService,
        cookieService,
        $state,
        logger;

    beforeEach(module('app.login'));

    beforeEach(function () {
        // loginService = {
        //     getUser: jasmine.createSpy()
        // };

        module(function ($provide) {
            $provide.value('loginService', loginService);
        });
    });

    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _$httpBackend_, _loginService_,_cookieService_,_$state_) {
            $http = _$httpBackend_;
            $q = _$q_;
            loginService = _loginService_;
            loginControllerScope = _$rootScope_.$new();
            
            var deferred = $q.defer();
            deferred.resolve({
                data: 'user'
            });
            LoginController = $controller('LoginController', {
                $scope: loginControllerScope,
                loginService: _loginService_,
                logger: logger,
                cookieService: cookieService,
                $state: $state
            });
            logger = {
                info: jasmine.createSpy()
            };
            loginControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(loginControllerScope).toBeDefined();
        expect(loginController).toBeDefined();
        
    });

    it('should do its funcionality', function () {

        // expect(LoginController.getUser).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledWith('Activated Login View');
        // expect(LoginController.user).toEqual({ data : 'user' });
    });


});