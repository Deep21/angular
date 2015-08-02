"use strict";

var app = angular.module('MyApp', ['ngRoute','ngResource'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/mes-commandes', {templateUrl: 'partials/commande.html', controller: 'orderCtrl'});
  $routeProvider.when('/ajouter-utilisateur', {templateUrl: 'partials/ajouterUtilisateur.html', controller: 'userAddCtrl'});
  $routeProvider.when('/detail-order/:orderId', {templateUrl: 'partials/detail-order.html', controller: 'orderCtrl'});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

var orderFactory = function($resource){
	return $resource('http://localhost/rest/index.php/order/:orderId')};



var userFactory = function($resource){
	return $resource('http://localhost/rest/index.php/user/:userId')};



app.factory('Order', ['$resource', orderFactory]);
app.factory('User', ['$resource', userFactory]);
