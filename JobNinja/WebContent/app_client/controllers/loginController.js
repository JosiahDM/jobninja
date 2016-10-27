var app = angular.module('ninja');

app.controller('loginController', function($scope, authenticationService, $location) {
	console.log("here");
	$scope.submit = function(username, password){
	    authenticationService.login(username, password)
	    .then(function(response){
	    	$location.url('/');
	    });
	  }
	
    console.log("login");
});
