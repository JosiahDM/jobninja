var app = angular.module('ninja');

app.controller('profileController', function($scope, $location, profileService) {

    $scope.companies = [];
    $scope.user = {};

    // Get list of companies for user
    $scope.loadData = function() {
        profileService.getUser()
            .then(function(response) {
                console.log(response.data);
                $scope.user = response.data
                $scope.companies = response.data.companies;
            }).catch(function(e) {
                $location.path('/login');
            });
    };

    $scope.loadData();

    // Button to bring up company info for viewing/adding more data
    $scope.view = function(company) {
        console.log("VIEWING");
        $location.path('/company/'+company.companyid);
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
                console.log("PROFILE CONTROLLER:");
                console.log(response);
                $scope.companies.push(response.data);
            });
    };

});
