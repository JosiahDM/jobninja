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



    //Get results of test taken for comparison use
    service.getUserPersonality = function() {
    	 var testId;
    	 return service.getUser()
    	 .then(function(response) {
    		 testId = response.data.testId;
    	 })
    	 .then(function(response){
    		 return $http({
    		 	method : 'GET',
    		 	url : 'https://api.traitify.com/v1/assessments/' + testId + '?data=types',
    		 	headers : {
    			 	'Authorization': 'Basic v7ippc8rj0hu7tev7pi8tr2iid:x',
    			 	'Content-Type' : 'application/json'
    		 	}
    	 	});
    	 });
    }

    // Update users keywords that were pulled from the personality test
    service.postUserWords = function(words){
    	var user = authenticationService.currentUser();

    	return $http({
            method : 'POST',
            url : '/JobNinja/api/user/' + user.id + '/words',
            headers : {
                'Content-Type' : 'application/json',
                'x-access-token' : authenticationService.getToken()
            },
            data : JSON.stringify(words)
        });
    }

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
