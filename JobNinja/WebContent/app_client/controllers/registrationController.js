var app = angular.module('ninja');

app.controller('registrationController', function($scope, registrationService, $location) {

	$scope.submit = function(username, password){
	    registrationService.createUser(username, password)
	    .then(function(response){
	    	if (response.status === 200) {
	    		$location.url('/');
	    	}
	    });
	  }
	
    console.log("Register");
});
