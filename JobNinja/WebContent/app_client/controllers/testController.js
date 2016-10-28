var app = angular.module('ninja');

app.controller('testController', function($scope, $location, profileService) {

    $scope.user = {};
    // Returns undefined if no valid user logged in
    profileService.getUser()
        .then(function(response) {
            $scope.user = response.data;
        })
        .catch(function(e) {
            $location.path('/login');
        });

});
