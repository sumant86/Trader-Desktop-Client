/* jshint -W024, -W030, -W098, -W117 */
describe('loginService', function() {
    'use strict';
    var loginService,$http,$location,exception,api;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function (_$httpBackend_, _loginService_, _$location_,_api_) {
            loginService = _loginService_;
            $http = _$httpBackend_;
            $location = _$location_;
            api = _api_;
        });

    });
    it('should be defined', function () {
        expect(loginService).toBeDefined();
    });


    it('should make the HTTP request this is success call', function () {
        var result;
        $http.expectGET(api + '/users').respond(200, {asd: 'asd'});
        loginService.getUser()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).toEqual({asd: 'asd'});
    });
    it('should execute the catch block and no response is returned', function () {
        var result;
        spyOn($location, 'url');
        $http.expectGET(api + '/users').respond(404, {asd: 'asd'});
        loginService.getUser()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).not.toBeDefined();
        expect($location.url).toHaveBeenCalledWith('/');
    });
});
