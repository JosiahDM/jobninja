var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, companyService, $routeParams, authenticationService) {

    $scope.company = null;
    $scope.flip = false;

    if ($routeParams) {
        companyService.getCompany($routeParams.id)
        .then(function(response){
            $scope.company = companyService.getCurrentCompany();
        });
    }

    $scope.error = null;
    $scope.show = false;

    $scope.inputButton = function() {
        $scope.show = true;
    };

    $scope.submitCompanyUrl = function(url) {
        $scope.flip = true;
        companyService.meaningCloudRequest(url)
        .then(function(response) {
            var concepts = [];
            var results = response.data.concept_list;
            for (var i = 0; i < results.length; i++) {
                concepts.push(results[i].form);
            }
            $scope.updateCompanyWords(concepts, $scope.company)
            .then(function(response) {
            	console.log(response);
            	console.log($scope.company);
            	var user = authenticationService.currentUser();
            	console.log($scope.company.companyid + " " + user.id);
            	$scope.getMatchRating($scope.company.companyid, user.id);
            })
            .catch(function(response) {
                $scope.error = response.data.error;
            });
        });
    };

    $scope.updateCompanyWords = function(wordArray, company) {
        return companyService.addWordsToCompany(wordArray, company)
        .then(function(response){
            $scope.company = response.data;
        })
        .catch(function(response) {
            $scope.error = response.data.error;
        });
    };

    $scope.getMatchRating = function(companyId, userId){
        $scope.flip = true;
    	companyService.getMatchRating(companyId, userId)
    	.then(function(response){
    		console.log(response.data)
            $scope.flip = false;
    		$scope.company = response.data;
    	})
        .catch(function(response) {
            $scope.error = response.data.error;
            $scope.flip = false;
        });
    }

    $scope.clearWords = function(companyObj) {
        companyService.clearWords(companyObj)
        .then(function(response) {
            $scope.company = response.data;
        });
    };

});
