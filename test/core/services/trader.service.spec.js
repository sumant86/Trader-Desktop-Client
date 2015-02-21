/* jshint -W024, -W030, -W098, -W117 */
describe('traderService', function() {
    'use strict';
    var traderService,$http,$location,exception,api;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function (_$httpBackend_, _traderService_, _$location_,_api_) {
            traderService = _traderService_;
            $http = _$httpBackend_;
            $location = _$location_;
            api = _api_;
        });

    });
    it('should be defined', function () {
        expect(traderService).toBeDefined();
    });

    //Get Order test
    it('should make the HTTP request this is success call', function () {
        var result;
        $http.expectGET(api + '/orders').respond(200, {asd: 'asd'});
        traderService.getOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).toEqual({asd: 'asd'});
    });
    it('should execute the catch block and no response is returned', function () {
        var result;
        spyOn($location, 'url');
        $http.expectGET(api + '/orders').respond(404, {asd: 'asd'});
        traderService.getOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).not.toBeDefined();
        expect($location.url).toHaveBeenCalledWith('/');
    });

    //Get instrument test
    it('should make the HTTP request -this is success call', function () {
        var result;
        $http.expectGET(api + '/instruments').respond(200, {asd: 'asd'});
        traderService.getInstruments()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).toEqual({asd: 'asd'});
    });
    it('should execute the catch block and no response is returned', function () {
        var result;
        spyOn($location, 'url');
        $http.expectGET(api + '/instruments').respond(404, {asd: 'asd'});
        traderService.getInstruments()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).not.toBeDefined();
        expect($location.url).toHaveBeenCalledWith('/');
    });

    //Delete Order test
    it('should make the HTTP request -this is success call', function () {
        var result;
        $http.expectDELETE(api + '/orders').respond(200, {asd: 'asd'});
        traderService.deleteOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).toEqual({asd: 'asd'});
    });
    it('should execute the catch block and no response is returned', function () {
        var result;
        spyOn($location, 'url');
        $http.expectDELETE(api + '/orders').respond(404, {asd: 'asd'});
        traderService.deleteOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).not.toBeDefined();
        expect($location.url).toHaveBeenCalledWith('/');
    });

    //Set Order test
    it('should make the HTTP request -this is success call', function () {
        var result;
        $http.expectPOST(api + '/orders','postData').respond(201, {asd: 'asd'});
        traderService.setOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).toEqual({asd: 'asd'});
    });
    it('should execute the catch block and no response is returned', function () {
        var result;
        spyOn($location, 'url');
        $http.expectPOST(api + '/orders').respond(404, {asd: 'asd'});
        traderService.setOrder()
            .then(function (data) {
                result = data;
            });
        $http.flush();
        expect(result).not.toBeDefined();
        expect($location.url).toHaveBeenCalledWith('/');
    });
});
