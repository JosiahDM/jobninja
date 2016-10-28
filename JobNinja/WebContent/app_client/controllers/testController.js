var app = angular.module('ninja');

app.controller('testController', function($scope, $location, profileService) {


    // Returns undefined if no valid user logged in
    profileService.getUser()
        .then(function(response) {
            $scope.user = response.data;
            console.log("test controller ")
            console.log($scope.user);
        })
        .catch(function(e) {
            $location.path('/login');
        });

});
