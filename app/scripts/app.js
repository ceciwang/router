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
      .otherwise({
        redirectTo: '/'
      });
  });
