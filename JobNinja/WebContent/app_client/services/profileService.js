var app = angular.module('ninja');

app.factory('profileService', function($http) {

    var service = {};

    service.getCompanies = function() {
        return $http({
            method : 'GET',
            url : '/JobNinja/api/user/1'  // HARD CODED USER ID CHANGE LATER
        });
    };

    service.addCompany = function(companyObj) {
        return $http({
            method : 'POST',
            url : '/JobNinja/api/user/1/company', // HARD CODED USER ID
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify(companyObj)
        });
    };

    service.deleteCompany = function(companyObj) {
        return $http({
            method : 'DELETE',
            url : '/JobNinja/api/user/1/company/'+companyObj.companyid  // HARD CODED USER ID
        });
    };

    return service;

});

// WHEN AUTHENTICATION IS WORKING
// headers : {
//     'x-access-token' : authenticationService.getToken()
// }
