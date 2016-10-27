var app = angular.module('ninja');

app.factory('profileService', function($http, authenticationService) {

    var service = {};

    // Get full user object as long as user is logged in
    service.getUser = function() {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'GET',
                url : '/JobNinja/api/user/'+user.id,
                headers : {
                    'x-access-token' : authenticationService.getToken()
                }
            });
        } else {
            return $http({
                method : 'GET',
                url : '/JobNinja/api/auth/unauthorized'
            });
        }
    };

    service.addCompany = function(companyObj) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'POST',
                url : '/JobNinja/api/user/'+user.id+'/company',
                headers : {
                    'Content-Type' : 'application/json',
                    'x-access-token' : authenticationService.getToken()
                },
                data : JSON.stringify(companyObj)
            });
        }
    };

    service.deleteCompany = function(companyObj) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'DELETE',
                url : '/JobNinja/api/user/'+user.id+'/company/'+companyObj.companyid,
                headers : {
                    'x-access-token' : authenticationService.getToken()
                }
            });
        }
    };

    return service;

});
