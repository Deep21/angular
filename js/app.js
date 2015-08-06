"use strict";

var app = angular.module('MyApp', ['ngRoute','ngResource'])
.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };

      var options = {
        dateFormat: "dd/mm/yy",
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun','Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        firstDay: 1,
        prevText: '&#x3c;Préc', prevStatus: 'Voir le mois précédent',
        prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Voir l\'année précédent',
        nextText: 'Suiv&#x3e;', nextStatus: 'Voir le mois suivant',
        nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Voir l\'année suivant',
        currentText: 'Courant', currentStatus: 'Voir le mois courant',
        todayText: 'Aujourd\'hui', todayStatus: 'Voir aujourd\'hui',
        clearText: 'Effacer', clearStatus: 'Effacer la date sélectionnée',
        closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
        yearStatus: 'Voir une autre année', monthStatus: 'Voir un autre mois',
        weekText: 'Sm', weekStatus: 'Semaine de l\'année',
        dayStatus: '\'Choisir\' le DD d MM',
        defaultStatus: 'Choisir la date',
        isRTL: false,
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
}).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/mes-commandes', {templateUrl: 'partials/commande.html', controller: 'orderCtrl'});
  $routeProvider.when('/ajouter-utilisateur', {templateUrl: 'partials/ajouterUtilisateur.html', controller: 'userAddCtrl'});
  $routeProvider.when('/detail-order/:id_order', {templateUrl: 'partials/detail-order.html', controller: 'orderCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);

var orderFactory = function($resource){
	return $resource('http://localhost/rest/index.php/order/:id_order', {id_order:'@id_order'},
    { 
        delete_order: {
            method: 'DELETE'
        }
    });
};


var userFactory = function($resource){
	return $resource('http://localhost/rest/index.php/user/:userId')
};


app.factory('Order', ['$resource', orderFactory]);
app.factory('User', ['$resource', userFactory]);
