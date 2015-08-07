"use strict";

var app = angular.module('MyApp', ['ngRoute', 'ngResource']);

var orderFactory = function($resource) {
    return $resource('http://localhost/rest/index.php/order/:id_order', {
        id_order: '@id_order'
    }, {
        delete_order: {
            method: 'delete'
        }
    });
};


var userFactory = function($resource) {
    return $resource('http://localhost/rest/index.php/user/:userId');
};


app.factory('Order', ['$resource', orderFactory]);
app.factory('User', ['$resource', userFactory]);
