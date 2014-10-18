'use strict';

angular.module('routeApp').controller('LightController', ["$scope","colorpicker", function ($scope, colorpicker) {
//    $scope.color = {
//        red: 255, green: 255, blue: 255
//    };

//    $scope.changeColor = function() {
//        var color = "rgb(" + $scope.color.red + "," + $scope.color.green + "," + $scope.color.blue + ")";
//        return {
//            "background-color" : color
//        }
//    };

    function sendRequest(red, green, blue){
        var id = "4F16-0D";
        var request = 'body=[{"accessory_id":"' + id + '","color":{"R":'+ red + ',"G":' + green + ',"B":' + blue + '}}]&uuid="1234"';

        console.log(request);

        $.ajax({
            type: "POST",
            url:"http://192.168.99.1:8090/smart/setAccessory",
            data: request,
            success: function(data){
            }
        });
    }

    $scope.$watch('colorpicker', function (value, newVal) {
        var id = "4F16-0D";
        var request = 'body=[{"accessory_id":"' + id + '","color":{"R":' + newVal.red + ',"G":' + newVal.green + ',"B":' + newVal.blue + '}}]&uuid="1234"';

        console.log(request);
        $.ajax({
            type: "POST",
            url: "http://192.168.99.1:8090/smart/setAccessory",
            data: request,
            success: function (data) {
            }
        });
    }, true);


//    $scope.$watch('color', function(value, newVal){
//        var id = "4F16-0D";
//        var request = 'body=[{"accessory_id":"' + id + '","color":{"R":'+ $scope.color.red + ',"G":' + $scope.color.green + ',"B":' + $scope.color.blue + '}}]&uuid="1234"';
//
//        $.ajax({
//            type: "POST",
//            url:"http://192.168.99.1:8090/smart/setAccessory",
//            data: request,
//            success: function(data){
//            }
//        });
//    }, true);


    function refreshSwatch (ev, ui) {
        var red = $scope.colorpicker.red,
            green = $scope.colorpicker.green,
            blue = $scope.colorpicker.blue;
        colorpicker.refreshSwatch(red, green, blue);
//        sendRequest(red, green, blue);
    }

    // Slider options with event handlers
    $scope.slider = {
        'options': {
            start: function (event, ui) { $log.info('Event: Slider start - set with slider options', event); },
            stop: function (event, ui) { $log.info('Event: Slider stop - set with slider options', event); }
        }
    };

    $scope.colorpicker = {
        red: 255,
        green: 255,
        blue: 255,
        options: {
            orientation: 'horizontal',
            min: 0,
            max: 255,
            range: 'min',
            change: refreshSwatch,
            slide: refreshSwatch
        }
    };


}]);
