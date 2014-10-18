(function (_) {
    'use strict';

    angular.module('routeApp').controller('MobileController', function ($scope) {

        $scope.lightOn = false;

        $scope.lights = [
            {
                id: "3368-0D",
                name: "客厅灯1",
                selected: true,
                lightOn: false
            }];

        var toRequestBody = function(light){
            var switchValue = $scope.lightOn ? 0 : 1;
            return '{"accessory_id":"' + light.id + '","switch":' + switchValue + '}';
        };

        $scope.switchLights = function () {
            var body = _.chain($scope.lights)
                .filter(function(light){return light.selected;})
                .map(function(light){return toRequestBody(light)})
                .value()
                .join(",");

            var request = 'body=[' + body + ']&uuid="1234"';

            console.log(request);

            $.ajax({
                type: "POST",
                url: "http://192.168.99.1:8090/smart/setAccessory",
                data: request,
                success: function (data) {
                    $scope.lightOn = !$scope.lightOn;
                }
            });
        };

    });
})(window._);