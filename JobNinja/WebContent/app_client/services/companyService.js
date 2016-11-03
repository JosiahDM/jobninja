var app = angular.module('ninja');

app.factory('companyService', function($http, authenticationService) {

    var service = {};
    var currentCompany = null;

    // Submits the URL to the run a server side request to Meaningcloud
    service.meaningCloudRequest = function(urlIn) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'POST',
                url : '/JobNinja/api/external/mc',
                data : urlIn
            });
        }
    };

    service.addWordsToCompany = function(wordArray, company) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'POST',
                url : '/JobNinja/api/company/'+company.companyid+'/words',
                data : wordArray
            });
        }
    };

    service.getMatchRating = function(companyId, userId){
    	return $http({
  	      method : 'GET',
  	      url : '/JobNinja/api/company/' + companyId + '/rating/' + userId
  	    });
    }

    /* Gets a company by id. Validates that the current user is actually
     * the user of this company, so someone can't just navigate to any company
     * page via the URL.
     */
    service.getCompany = function(id) {
        var user = authenticationService.currentUser();
        return service.getCompanyRaw(id)
        .then(function(response) {
            var company = response.data;
            if (user && service.companyHasUser(user.id, company)) {
                currentCompany = company;
            } else {
                return $http({
                    method : 'GET',
                    url : '/JobNinja/api/auth/unauthorized'
                });
            }
        });


    };

    service.getCurrentCompany = function() {
        return currentCompany;
    };

    service.setCurrentCompany = function(company) {
        currentCompany = company;
    };

    // Needed this to pull company data prior to validating that it is a valid
    // company for the user
    service.getCompanyRaw = function(companyId) {
        return $http({
            method : 'GET',
            url : '/JobNinja/api/company/'+companyId
        })
    };

    service.companyHasUser = function(userId, company) {
        return company.userId == userId;
    };

    service.clearWords = function(company) {
        var user = authenticationService.currentUser();
        if (user && user.id == company.userId) {
            return $http({
                method : 'DELETE',
                url : '/JobNinja/api/company/'+company.companyid+'/words'
            });
        }
    };

    return service;

});
