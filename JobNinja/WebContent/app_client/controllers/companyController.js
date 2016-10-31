var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, companyService, $routeParams, authenticationService) {

    $scope.company = null;

    if ($routeParams) {
        companyService.getCompany($routeParams.id)
        .then(function(response){
            $scope.company = response.data;
        });
    }

    $scope.error = null;
    $scope.show = false;

    $scope.inputButton = function() {
        $scope.show = true;
    };

    $scope.submitCompanyUrl = function(url) {
        companyService.meaningCloudRequest(url)
        .then(function(response) {
            var concepts = [];
            var results = response.data.concept_list;
            for (var i = 0; i < results.length; i++) {
                concepts.push(results[i].form);
            }
            $scope.updateCompanyWords(concepts, $scope.company);
            console.log($scope.company);
            var user = authenticationService.currentUser();
            $scope.getMatchRating($scope.company.companyid, user.id);
        });
    };

    $scope.updateCompanyWords = function(wordArray, company) {
        companyService.addWordsToCompany(wordArray, company)
        .then(function(response){
            $scope.company = response.data;
        })
        .catch(function(response) {
            $scope.error = response.data.error;
        });
    };

    $scope.getMatchRating = function(companyId, userId){
    	companyService.getMatchRating(companyId, userId)
    	.then(function(response){
    		console.log(response.data)
    		$scope.company = response.data;
    	});
    }

});
