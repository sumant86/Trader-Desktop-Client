/* jshint -W024, -W030, -W098, -W117 */
describe('Login', function () {
    'use strict';

    var LoginController,
        loginControllerScope,
        // $q,
        // $http,
        crudService,
        authService,
        $state;

    beforeEach(module('app.login'));

    beforeEach(function () {
        crudService = {
            users: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('crudService', crudService);
        });
    });

    beforeEach(function () {
        authService = {
            setAuth: jasmine.createSpy()
        };
        module(function ($provide) {
            $provide.value('authService', authService);
        });
    });




    beforeEach(function () {
        inject(function (_$rootScope_, _$controller_, _crudService_, _authService_, _$state_) {
            // $http = _$httpBackend_;
            // $q = _$q_;
            loginControllerScope = _$rootScope_.$new();
            // $controller = _$controller_;
            // var deferred = $q.defer();
            // deferred.resolve({
            //     data: 'user'
            // });
            LoginController = _$controller_('LoginController', {
                $scope: loginControllerScope,
                crudService: _crudService_,
                authService: _authService_,
                $state: _$state_
            });
            
            loginControllerScope.$digest();
        });
    });

    it('Login Controller should be defined', function () {
        expect(loginControllerScope).toBeDefined();
        expect(LoginController).toBeDefined();
        
    });

    it('should do its funcionality', function () {
        expect(crudService.users).toHaveBeenCalled();
        // expect(authService.setAuth).toHaveBeenCalled();
    });

});