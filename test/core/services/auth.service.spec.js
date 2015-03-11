/* jshint -W024, -W030, -W098, -W117 */
describe('authService', function() {
    'use strict';
    var authService,$cookieStore,$cookies;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function (_authService_, _$cookieStore_, _$cookies_) {
            authService = _authService_;
            $cookieStore = _$cookieStore_;
            $cookies = _$cookies_;
        });

    });
    it('should be defined', function () {
        expect(authService).toBeDefined();
    });


    it('should be able to create,access & remove cookie', function () {
        authService.setAuth('name','angular');
        expect(authService.getAuth('name')).toEqual('angular');
        authService.removeAuth('name');
        expect(authService.getAuth('name')).toEqual(null);
    });
});
