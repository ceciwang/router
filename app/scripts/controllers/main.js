'use strict';

angular.module('routeApp').controller('HomeController', function ($scope, $http) {
    $scope.lightOn = false;
    $scope.switchLight = function(){
        var request = {
            body: [
                {
                    "accessary_id": "abc",
                    "switch": $scope.lightOn ? 1 : 0 }
            ],
            uuid: "1234"
        };
        $scope.lightOn = !$scope.lightOn;

//        $http.post("http://192.168.99.1:8090/smart", request, function(data){
//            $scope.lightOn = !$scope.lightOn;
//        });
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
