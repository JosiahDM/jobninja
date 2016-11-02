var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, companyService, $routeParams, authenticationService) {

    $scope.company = null;
    $scope.flip = false;

    if ($routeParams) {
        companyService.getCompany($routeParams.id)
        .then(function(response){
            console.log("IN THE COMPANY CONTROLLER");

            $scope.company = companyService.getCurrentCompany();
            console.log($scope.company);
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
        })
        .catch(function(response){
            $scope.flip = false;
            $scope.error = "Sorry, there was a problem processing this URL."
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
    	return companyService.getMatchRating(companyId, userId)
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

    // $scope.recalc = function(companyId, userId) {
    //     $scope.getMatchRating(companyId, userId)
    //     .then(function(response) {
    //         console.log("ASDF");
    //
    //     });
    // };

    $scope.clearWords = function(companyObj) {
        companyService.clearWords(companyObj)
        .then(function(response) {
            $scope.company = response.data;
        });
    };

});
