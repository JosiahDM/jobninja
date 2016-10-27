var app = angular.module('ninja');

app.controller('registrationController', function($scope, registrationService, $location) {

	$scope.submit = function(username, password){
	    registrationService.createUser(username, password)
	    .then(function(response){
	    	if (response.status === 200) {
	    		var id = response.data.userId;
	    		registrationService.createAssessment()
	    		.then(function(response){
	    			console.log(response.data.id);
	    			var user = {
						'id' : id,
						'username' : username,
						'password' : password,
						'testId' : response.data.id
	    			}
	    			registrationService.editUser(user)
	    			.then(function(response){
	    				console.log(response);
	    			});
	    		});
	    		$location.url('/');
	    	}
	    });
	  }
	
    console.log("Register");
});
