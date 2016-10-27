var app = angular.module('ninja');

app.factory('profileService', function($http) {

    var service = {};

    service.getCompanies = function() {
        return $http({
            method : 'GET',
            url : '/JobNinja/api/user/1'  // HARD CODED USER ID CHANGE LATER
        });
    };

    service.addCompany = function() {
        
    };



    return service;

});

// WHEN AUTHENTICATION IS WORKING
// headers : {
//     'x-access-token' : authenticationService.getToken()
// }
