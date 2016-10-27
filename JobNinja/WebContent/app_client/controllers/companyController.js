var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, profileService) {

    $scope.company = profileService.getCompany();

    console.log($scope.company);
    
});
