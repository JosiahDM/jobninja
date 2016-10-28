var app = angular.module('ninja');

app.factory('profileService', function($http, authenticationService) {

    var service = {};
    var company = {};

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
    		 console.log("in response:" + testId);
    	 })
    	 .then(function(response){
    		 console.log("in next then:" + testId);
    		 return $http({
    		 	method : 'GET',
    		 	url : 'https://api-sandbox.traitify.com/v1/assessments/' + testId + '?data=types',
    		 	headers : {
    			 	'Authorization': 'Basic v7ippc8rj0hu7tev7pi8tr2iid:x',
    			 	'Content-Type' : 'application/json'
    		 	}
    	 	});
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

    service.viewCompany = function(companyObj) {
        var user = authenticationService.currentUser();
        if (user) {
            return $http({
                method : 'GET',
                url : '/JobNinja/api/company/'+companyObj.companyid,
                headers : {
                    'x-access-token' : authenticationService.getToken()
                }
            })
            .then(function(response){
                console.log("IN THEN");
                console.log(response);
                company = response.data;
            });
        }
    };

    service.getCompany = function() {
        return company;
    }

    service.setCompany = function(companyObj) {
        company = companyObj;
    }

    return service;

});
