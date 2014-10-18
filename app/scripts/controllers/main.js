(function (_) {
    'use strict';

    angular.module('routeApp').controller('HomeController', function ($scope, $http) {
        $scope.lightOn = false;

        var toRequestBody = function(id){
            var switchValue = $scope.lightOn ? 0 : 1;
            return '{"accessory_id":"' + id + '","switch":' + switchValue + '}';
        };

        $scope.switchLight = function () {
            $scope.lightOn = !$scope.lightOn;

            var lightIds = ["accf23299c88202020202020", "3-1", "4F16-0D"];

            var connected = _.map(lightIds, toRequestBody).join(",");
            var request = 'body=[' + connected + ']&uuid="1234"';

            $.ajax({
                type: "POST",
                url: "http://192.168.99.1:8090/smart/setAccessory",
                data: request,
                success: function (data) {
                }
            });
        };

        $scope.color = {
            red: 255, green: 255, blue: 255
        };

        $scope.changeColor = function () {
            var color = "rgb(" + $scope.color.red + "," + $scope.color.green + "," + $scope.color.blue + ")";
            return {
                "background-color": color
            }

        }

    });
})(window._);