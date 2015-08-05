<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim([
        'db.dsn' => 'mysql:host=localhost;dbname=prestashop;charset=utf8',
        'db.username' => 'root',
        'db.password' => '',
    ]);
$app->contentType('application/json');
$app->container->singleton('db', function($container) {
	return new PDO($container['settings']['db.dsn'], $container['settings']['db.username'],$container['settings']['db.password']);
	} 
);
/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route
$app->get('/order', function () use ($app){
		$tmp = array();
        
        $pdo = $app->container->get('db');
        $reponse = $pdo->query('SELECT o.id_order,o.reference reference ,od.product_name,od.product_quantity,od.product_price FROM ps_order_detail od LEFT JOIN ps_orders o ON o.id_order = od.id_order');
        $orderList = $reponse->fetchAll(PDO::FETCH_ASSOC);
		foreach ($orderList as $key => $value) {
			$tmp[] = array('id_order'=>$key, 'reference'=>$value['reference'],'product'=>$value['product_name'],'quantity'=>$value['product_quantity'],'price'=>$value['product_price']);
		}
		error_log(print_r($orderList,true));
        echo json_encode($tmp);
    }
);


$app->get('/order/:id_order', function ($id_order) use ($app){
		$tmp = array();
        $app->contentType('application/json');
        $pdo = $app->container->get('db');
        $reponse = $pdo->prepare('SELECT o.id_order,o.reference FROM ps_orders o WHERE o.id_order = :id_order');
        $reponse->bindParam(':id_order', $id_order, PDO::PARAM_INT);
        $order = $reponse->execute();
        $order = $reponse->fetch(PDO::FETCH_ASSOC);
		error_log(print_r($order, true));
        echo $order;
    }
);




// POST route
$app->post('/user', function () use ($app) {
    	  $body = $app->request->getBody();
    	  $user = json_decode($body);
    	  error_log(print_r(json_decode($body), true));
		  $app->response->setStatus(202);
          echo $body;
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
