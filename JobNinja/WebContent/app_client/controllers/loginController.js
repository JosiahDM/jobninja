var app = angular.module('ninja');

app.controller('loginController', function($scope, authenticationService, $location) {

    $scope.error = null;

	$scope.login = function(username, password){
	    authenticationService.login(username, password)
	    .then(function(response){
	    	$location.path('/profile');
	    })
        .catch(function(response){
            $scope.error = response.data.error;
        });
	  }

	$scope.logout = function(){
		authenticationService.logout();
		$location.path('/');
	}

	$scope.isLoggedIn = function() {
		return authenticationService.isLoggedIn();
	}
});
