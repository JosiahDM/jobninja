var app = angular.module('ninja');

app.controller('companyController', function($scope, $location, companyService, $routeParams, authenticationService) {

    $scope.company = null;
    $scope.flip = false;

    // Load the correct company based on the url parameter passed in
    if ($routeParams) {
        companyService.getCompany($routeParams.id)
        .then(function(response){
            $scope.company = companyService.getCurrentCompany();
        })
        .catch(function() {
            $location.path("/");
        });
    }

    $scope.error = null;
    $scope.show = false;

    // Toggles view of add data button
    $scope.inputButton = function() {
        $scope.show = true;
    };

    /* submits the URL to be sent as a meaningcloud request, which pulls out the
     * primary keywords within the page at that URL. Then loads all of those
     * keywords into the company database and displays them in view.
     * Finally, calls the getMatchRating to request the rating calculation.
     */
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
            	var user = authenticationService.currentUser();
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

    // Sends array of words to be added to company entity in database
    $scope.updateCompanyWords = function(wordArray, company) {
        return companyService.addWordsToCompany(wordArray, company)
        .then(function(response){
            $scope.company = response.data;
        })
        .catch(function(response) {
            $scope.error = response.data.error;
        });
    };

    /* Company words and user words should all be loaded at this point, so
    *  send request to calculate the match rating of those keywords.
    */
    $scope.getMatchRating = function(companyId, userId){
        $scope.flip = true;
    	return companyService.getMatchRating(companyId, userId)
    	.then(function(response){
            $scope.flip = false;
    		$scope.company = response.data;
    	})
        .catch(function(response) {
            if (response.data.error) {
                console.log("IN CATCH 84");
                console.log(response);
                $scope.error = response.data.error;
            }
            $scope.flip = false;
        });
    }

    // Delete all words associated with company
    $scope.clearWords = function(companyObj) {
        companyService.clearWords(companyObj)
        .then(function(response) {
            $scope.company = response.data;
        });
    };

});
