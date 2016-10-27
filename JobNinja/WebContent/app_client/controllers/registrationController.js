var app = angular.module('ninja');

app.controller('registrationController', function($scope, registrationService, $location) {

	$scope.submit = function(username, password){
	    registrationService.createUser(username, password)
	    .then(function(response){
	    	if (response.status === 200) {
	    		console.log(response.data.userId);
	    		registrationService.createAssessment()
	    		.then(function(response){
	    			console.log(response);
	    		});
	    		$location.url('/');
	    	}
	    });
	  }
	
    console.log("Register");
});
