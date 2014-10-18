'use strict';

angular.module('routeApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute'
]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'HomeController'
      })
        .when('/fancyLight', {
            templateUrl: 'views/light.html',
            controller: 'LightController'
        })
        .when('/mobile', {
            templateUrl: 'views/mobile.html',
            controller: 'MobileController'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
