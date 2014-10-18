'use strict';

angular.module('routeApp').controller('HomeController', function ($scope, $http) {
    $scope.lightOn = false;
    $scope.switchLight = function(){
        $scope.lightOn = !$scope.lightOn;

        var switchValue = $scope.lightOn ? 0 : 1;

        var request = 'body=[{"accessory_id":"3-1","switch":'+ switchValue + '}]&uuid="1234"';

        $.ajax({
            type: "POST",
            url:"http://192.168.99.1:8090/smart/setAccessory",
            data: request,
            success: function(data){
            }
        });
    };

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
