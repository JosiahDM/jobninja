var app = angular.module('ninja');

app.controller('profileController', function($scope, profileService) {

    $scope.companies = [];

    // Get list of companies for user
    $scope.loadData = function() {
        profileService.getCompanies()
            .then(function(response) {
                console.log(response.data.companies);
                $scope.companies = response.data.companies;
            });
    };
    $scope.loadData();

    // Button to bring up company info for viewing/adding more data
    $scope.view = function(company) {
        console.log("CLICKED " + company.companyname);

    };
    // Remove a company from user's list
    $scope.remove = function(company) {
        console.log("REMOVE " + company.companyname);
    };

    // Button to view an "Add Company" display
    $scope.addCompany = function(company) {
        console.log(company);
        
    };

});
