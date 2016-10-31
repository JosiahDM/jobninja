var app = angular.module('ninja');

app.factory('companyService', function($http, authenticationService) {

    var service = {};
    var currentCompany = null;

    // This needs updated to a server side request.
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

    service.getCompany = function(id) {
        var user = authenticationService.currentUser();
        if (user && service.userHasCompany(user, id)) {
            return $http({
                method : 'GET',
                url : '/JobNinja/api/company/'+id
            });
        } else {
            return $http({
                method : 'GET',
                url : '/JobNinja/api/auth/unauthorized'
            });
        }
    };

    service.getCurrentCompany = function() {
        return currentCompany;
    };

    service.setCurrentCompany = function(company) {
        currentCompany = company;
    };

    service.userHasCompany = function(user, companyId) {
        var has = false;
        for (var i = 0; i < user.companies.length; i++) {
            if (user.companies[i] == companyId) {
                has = true;
            }
        }
        return has;
    };

    return service;

});
