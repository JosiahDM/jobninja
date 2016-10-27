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
    // Delete a company from user's list
    $scope.deleteCompany = function(companyObj) {
        profileService.deleteCompany(companyObj)
            .then(function(response) {
                if (response.status === 200) {
                    var loc = $scope.companies.indexOf(companyObj);
                    $scope.companies.splice(loc, 1);
                }
            });
    };

    // Button to view an "Add Company" display
    // Currently no data in response.
    $scope.addCompany = function(companyObj) {
        profileService.addCompany(companyObj)
            .then(function(response) {
                if (response.status === 200) {
                    $scope.companies.push(response.data);
                }
            });
    };

});
