/* jshint -W024, -W030, -W098, -W117 */
describe('socketService', function() {
    'use strict';
    var socketService,$rootScope,api;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function (_$rootScope_, _socketService_, _api_) {
            socketService = _socketService_;
            $rootScope = _$rootScope_;
            api = _api_;
        });

    });
    // it('should be defined', function () {
    //     expect(socketService.socketAction).toBeDefined();
    // });


    
});
