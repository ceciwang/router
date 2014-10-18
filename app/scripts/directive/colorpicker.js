'use strict';

angular.module('routeApp').factory('colorpicker', function () {
    function hexFromRGB(r, g, b) {
        var hex = [r.toString(16), g.toString(16), b.toString(16)];
        angular.forEach(hex, function(value, key) {
            if (value.length === 1) hex[key] = "0" + value;
        });
        return hex.join('').toUpperCase();
    }
    return {
        refreshSwatch: function (r, g, b) {
            var color = '#' + hexFromRGB(r, g, b);
            angular.element('#swatch').css('background-color', color);
        }
    };
});