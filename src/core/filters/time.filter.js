// Formats a time in to LocaleString.
// Usage:
//     {{2015-02-22T13:42:22.460Z | timeFilter}
//  => 2/22/2015 7:12:22 PM

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('timeFilter', formatTime);

    formatTime.$inject = ['$filter'];
    /* @ngInject */
    function formatTime($filter) {
        return function(input) {
        	var date = new Date(input);
            return $filter('date')(date.toLocaleString().replace(',',' '));
        };
    }
})();
