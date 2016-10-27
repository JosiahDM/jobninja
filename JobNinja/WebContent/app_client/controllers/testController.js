var app = angular.module('ninja');

app.controller('testController', function($scope, $window, authenticationService) {

    // Returns undefined if no valid user logged in
    var user = authenticationService.currentUser();

    // If user exists, load it into this scope
    if (user) {
        $scope.user = user;
    }

});
