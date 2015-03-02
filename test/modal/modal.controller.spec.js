/* jshint -W024, -W030, -W098, -W117 */
describe('Modal', function () {
    'use strict';

    var ModalController,
        modalControllerScope,
        $q,
        $modalInstance,
        $modal,
        logger;

    beforeEach(module('app.trader'));
    beforeEach(function(){
        $modalInstance = {};
        module(function ($provide) {
            $provide.value('$modalInstance', $modalInstance);
        });
    });
    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _$modalInstance_, _$modal_, _logger_) {
            $q = _$q_;
            modalControllerScope = _$rootScope_.$new();
            ModalController = $controller('ModalController',{
                $modalInstance:_$modalInstance_, $modal:_$modal_, logger :_logger_
            });
            modalControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(ModalController).toBeDefined();
        expect(modalControllerScope).toBeDefined();
    });

});