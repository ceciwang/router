'use strict';

angular.module('routeApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'HomeController'
      })
        .when('/fancyLight', {
            templateUrl: 'views/light.html',
            controller: 'LightController'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
