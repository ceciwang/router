'use strict';

angular.module('routeApp').controller('HomeController', function ($scope, $http) {
    $scope.lightOn = false;
    $scope.switchLight = function(){
        var request = {
            body: [
                {"accessory_id":"3-1","switch":"1"}
            ],
            uuid: "1234"
        };
        $scope.lightOn = !$scope.lightOn;

//        $http.post("http://192.168.99.1:8090/smart/setAccessory", request, function(data){
//            console.log(data);
//            $scope.lightOn = !$scope.lightOn;
//        });
//        data: {"body": [{"accessory_id":"3-1","switch":"1"}], "uuid": "1234"},


        $.ajax({
            type: "POST",
            url:"http://192.168.99.1:8090/smart/setAccessory",
            data: 'body=[{"accessory_id":"3-1","switch":"1"}]&uuid="1234"',
            success: function(data){
                alert(data);
            }
        });

//        $http.jsonp("http://192.168.99.1:8090/smart/setAccessory?callback").success(data){
//            console.log(data);
//        }
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
