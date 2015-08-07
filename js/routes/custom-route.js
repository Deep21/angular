app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        });
        $routeProvider.when('/mes-commandes', {
            templateUrl: 'partials/commande.html',
            controller: 'orderCtrl',
            authenticated:true
        });
        $routeProvider.when('/ajouter-utilisateur', {
            templateUrl: 'partials/ajouterUtilisateur.html',
            controller: 'userAddCtrl'
        });
        $routeProvider.when('/detail-order/:id_order', {
            templateUrl: 'partials/detail-order.html',
            controller: 'orderCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
    }]);