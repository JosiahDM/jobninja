var app = angular.module('ninja');

app.controller('loginController', function($scope, authenticationService, $location) {
	
	$scope.login = function(username, password){
	    authenticationService.login(username, password)
	    .then(function(response){
	    	console.log("login");
	    	$location.path('/');
	    });
	  }
	
	$scope.logout = function(){
		console.log("logout");
		authenticationService.logout();
		$location.path('/');
	}
	
	$scope.isLoggedIn = function() {
		return authenticationService.isLoggedIn();
	}
});
