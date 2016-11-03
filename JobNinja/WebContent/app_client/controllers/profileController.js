var app = angular.module('ninja');

app.controller('profileController', function($scope, $location, profileService) {

    $scope.companies = [];
    $scope.user = {};

    // Get list of companies for user
    $scope.loadData = function() {
        profileService.getUser()
            .then(function(response) {
                $scope.user = response.data
                $scope.companies = response.data.companies;
            }).catch(function(e) {
                $location.path('/login');
            });
    };

    $scope.loadData();

    // Button to bring up an invididual company view
    $scope.view = function(company) {
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

    // Adds company to user profile.
    $scope.addCompany = function(companyObj) {
        profileService.addCompany(companyObj)
            .then(function(response) {
                $scope.companies.push(response.data);
            });
    };

});
