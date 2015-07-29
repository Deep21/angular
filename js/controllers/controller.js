'use strict';

function loginCtrl($scope){
	console.log("loginCtrl");
}


function ControllerTwo($scope){
	
}

app.controller('loginCtrl', loginCtrl).controller('ControllerTwo', ControllerTwo);