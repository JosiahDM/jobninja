var app = angular.module('ninja');

app.controller('registrationController', function($scope, registrationService, $location, authenticationService) {

    var testId = "";

    // Runs query for new testId, sets the local value, then
    // updates the current user with the new test id and redirects to profile page.
    $scope.newTestId = function() {
        registrationService.createAssessment()
        .then(function(response){
            testId = response.data.id;
        })
        .then(function() {
            var user = authenticationService.currentUser();
            if (user) {
                user.testId = testId;
                registrationService.editUser(user);
                $location.path('/profile');
            }
        });
    }
    // Initial submit of new user registration.
    // Creates user with username and password. Then logs user in,
    // finally queries for a new test ID from Traitify.
	$scope.submit = function(username, password){
	    registrationService.createUser(username, password)
        .then(function(response) {
            authenticationService.login(username, password)
            .then(function(response){
    	    	$scope.newTestId();
    	    })
            .catch(function(response) {
                $scope.regError = "There was an error in generating the new assessment.";
            });
        })
        .catch(function(response) {
            $scope.regError = response.data.error
        });

	}

});
