var app = angular.module('ninja');

app.controller('testController', function($scope, $location, profileService) {

    var user = {};
    // Returns undefined if no valid user logged in
    profileService.getUser()
        .then(function(response) {
            user = response.data;
        })
        .catch(function(e) {
            $location.path('/login');
        });

});
