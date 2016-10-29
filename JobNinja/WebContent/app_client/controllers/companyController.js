var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, profileService, companyService) {

    $scope.show = false;

    $scope.company = profileService.getCompany();


    console.log($scope.company);

    $scope.inputButton = function() {
        $scope.show = true;
    };

    $scope.submitCompanyUrl = function(url) {
        console.log(url);
        console.log($scope.company);
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
            console.log(response);
            console.log("ASDF");
        });
    };

});
