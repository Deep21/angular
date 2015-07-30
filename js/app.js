"use strict";

var app = angular.module('MyApp', ['ngRoute','ngResource'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/mes-commandes', {templateUrl: 'partials/commande.html', controller: 'orderCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'loginCtrl'});
  $routeProvider.when('/detail-order/:orderId', {templateUrl: 'partials/detail-order.html', controller: 'orderCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);

var orderFactory = function($resource){
	return $resource('http://localhost/rest/index.php/order/:orderId', {orderId:'@id'},
		{ 'get' :  { method:'GET', isArray: true }})
	 };


app.factory('Order', [ '$resource', orderFactory ]);