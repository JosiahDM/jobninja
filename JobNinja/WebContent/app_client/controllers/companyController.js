var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, profileService, companyService) {

    $scope.show = false;

    $scope.company = profileService.getCompany();
    
    console.log($scope.company);
    
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
        });
    };

    $scope.updateCompanyWords = function(wordArray, company) {
        companyService.addWordsToCompany(wordArray, company)
        .then(function(response){
            console.log("Updated company with words: ");
            console.log(response);
        });
    };
    
    $scope.getMatchRating = function(companyId, userId){
    	companyService.getMatchRating(companyId, userId)
    	.then(function(response){
    		$scope.company = response.data;
    	});
    }

});
