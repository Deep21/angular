'use strict';

function loginCtrl($scope){

}


function ControllerTwo($scope){
	
}

function orderCtrl($scope, Order, $resource, $routeParams){
   $scope.orders = [];
   if($routeParams.orderId == null){
	  var orders = Order.query(function() {
	    console.log(orders);
	     $scope.orders = orders;
	  }); 
  //query() returns all the entries
 
   }else{
   		var id = $routeParams.orderId;
  		var order = Order.get({ orderId: $routeParams.orderId }, function() {
    	console.log(order.id_order,order.reference);
  	}); 
  // get() returns a single entry
   }


  /* var entry = Order.get({ orderId: $routeParams.orderId }, function() {
    console.log(entry.id_order);
  }); 
  // get() returns a single entry
 
  var entries = Order.query(function() {
    console.log(entries);
     $scope.orders = entries;
  }); 
  //query() returns all the entries
 
 $scope.orders = new Order(); 
  //You can instantiate resource class
 
  $scope.orders.data = 'some data';
 
  Order.save($scope.entry, function() {
    //data saved. do something here.
  }); 
*/

}

app.controller('loginCtrl', loginCtrl)
.controller('ControllerTwo', ControllerTwo)
.controller('orderCtrl', orderCtrl);