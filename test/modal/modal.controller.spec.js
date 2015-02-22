/* jshint -W024, -W030, -W098, -W117 */
describe('Modal', function () {
    'use strict';

    var ModalController,
        ModalControllerScope,
        $q,
        $modalInstance,
        $modal,
        logger;

    beforeEach(module('app.trader'));


    beforeEach(function () {
        inject(function (_$rootScope_, $controller, _$q_, _$modalInstance_, _$modal_, _logger_) {
            $q = _$q_;
            ModalControllerScope = _$rootScope_.$new();
            ModalController = $controller('ModalController', {
                $scope: ModalControllerScope,
                modalInstance: _$modalInstance_,
                $modal: _$modal_,
                logger: _logger_
            });
            logger = {
                info: jasmine.createSpy()
            };
            ModalControllerScope.$digest();
        });
    });

    it('should be defined', function () {
        expect(ModalControllerScope).toBeDefined();
        expect(ModalController).toBeDefined();
    });
     it('should do its funcionality', function () {

        expect(logger).toHaveBeenCalledWith('Activated Trader Modal');
    });

});