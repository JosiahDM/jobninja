var app = angular.module('ninja');

app.factory('companyService', function($http, authenticationService) {

    var service = {};

    // This needs updated to a server side request.
    service.meaningCloudRequest = function(urlIn) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'POST',
                url : 'KEYGOESHERE'+urlIn+'&tt=c&uw=y'
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

    return service;

});
