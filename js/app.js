"use strict";

var app = angular.module('MyApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);