var app = angular.module('ninja');

app.controller('registrationController', function($scope, registrationService, $location) {
	console.log("herxdfhe");
	$scope.submit = function(username, password){
		console.log("there");
	    registrationService.createUser(username, password)
	    .then(function(response){
	    	if (response.status === 200) {
	    		$location.url('/');
	    	}
	    });
	    
	  }
    console.log("Register");
});
