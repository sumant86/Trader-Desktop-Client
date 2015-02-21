/* jshint -W024, -W030, -W098, -W117 */
describe('cookieService', function() {
    'use strict';
    var cookieService,$cookieStore,$cookies;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function (_cookieService_, _$cookieStore_,_$cookies_) {
            cookieService = _cookieService_;
            $cookieStore = _$cookieStore__;
            $cookies = _$cookies_;
        });

    });
    it('should be defined', function () {
        expect(cookieService).toBeDefined();
    });


    it('should be able to create,access & remove cookie', function () {
        cookieService.set('name','angular');
        expect(cookieService.get('name')).toEqual('angular');
        cookieService.remove('name');
        expect(cookieService.get('name')).toEqual(null);
    });
});
