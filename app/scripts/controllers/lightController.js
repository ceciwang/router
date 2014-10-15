'use strict';

angular.module('routeApp').controller('LightController', function ($scope) {
    $scope.color = {
        red: 255, green: 255, blue: 255
    };

    $scope.changeColor = function() {
        var color = "rgb(" + $scope.color.red + "," + $scope.color.green + "," + $scope.color.blue + ")";
        return {
            "background-color" : color
        }

    }

});
