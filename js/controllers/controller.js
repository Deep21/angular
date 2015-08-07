'use strict';

function userAddCtrl($scope, User, $resource, $routeParams, testService) {

    $scope.userSubmit = function() {
        testService.saveEmail("samfisher8456@hotmail.com");
        var birthdate = $scope.user.birthdate;
        var sex = $scope.user.sexe;
        var lastname = $scope.user.lastname;
        var firstname = $scope.user.firstname;
        var email = $scope.user.email;
        var address = $scope.user.address;
        var user = new User({
            birthdate: birthdate,
            sex: sex,
            lastname: lastname,
            firstname: firstname,
            email: email,
            address: address
        });
        var save = user.$save();

        save.then(function(res) {
            $scope.submissionSuccess = true;
            console.log(res);

        }).catch(function(res) {

            console.log("error: ", res);
        });

    }


}



function orderCtrl($route, $scope, Order, $resource, $routeParams, $location, testService) {
    var em = testService.getEmail("samfisher8456@hotmail.com");
    console.log(em);
    $scope.onDeleteOrder = function(id_order) {
        var order = new Order();
        order.$delete_order({
                id_order: id_order
            })
            .then(function(res) {
                //permet de charger le cotroller
                $route.reload();
            }).catch(function(res) {
                console.log("error: ", res);
            });
    }

    $scope.orders = [];
    if ($routeParams.orderId == null) {
        var orders = Order.query(function() {
            $scope.orders = orders;
        });
        //query() returns all the entries

    } else {
        var id = $routeParams.orderId;
        var order = Order.get({
            orderId: $routeParams.orderId
        }, function() {
            console.log(order.id_order, order.reference);
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

app.controller('orderCtrl', orderCtrl)
    .controller('userAddCtrl', userAddCtrl);
