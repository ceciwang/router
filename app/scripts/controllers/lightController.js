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
    };

    $scope.$watch('color', function(value, newVal){
        var id = "4F16-0D";
        var request = 'body=[{"accessory_id":"' + id + '","color":{"R":'+ $scope.color.red + ',"G":' + $scope.color.green + ',"B":' + $scope.color.blue + '}}]&uuid="1234"';

        $.ajax({
            type: "POST",
            url:"http://192.168.99.1:8090/smart/setAccessory",
            data: request,
            success: function(data){
            }
        });
    }, true)

});
