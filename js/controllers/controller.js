'use strict';

function loginCtrl($scope){

}


function ControllerTwo($scope){
	
}

function orderCtrl($scope, Order, $resource, $routeParams){
   $scope.orders = [];
	//Perform "GET http://mydomain.com/api/user/"
	console.log($routeParams);
	Order.get().$promise.then(function(data) {
	$scope.orders = data;
	},
	 
	 function(error){
	    	console.log(error);
	
	});
	

}

app.controller('loginCtrl', loginCtrl)
.controller('ControllerTwo', ControllerTwo)
.controller('orderCtrl', orderCtrl);