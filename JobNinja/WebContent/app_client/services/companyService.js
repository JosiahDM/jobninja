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
