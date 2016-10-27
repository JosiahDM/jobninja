var app = angular.module('ninja');

app.factory('registrationService', function($http){

  var getUsers = function(){
    return $http({
      method : 'GET',
      url : 'api/users/'
    });
  };
  var removeUser = function(user){
    var id = user.id;
    return $http({
      method : 'DELETE',
      url : 'api/user/' + id + '/'
    });
  }

  var createUser = function(username, password){
    var newUser = { username : username, password : password}
    return $http({
      method : 'POST',
      url : 'api/auth/signup',
      headers : {
        'Content-Type' : 'application/json'
      },
      data : newUser
    });
  }
  
  var createAssessment = function(){
	  return $http({
	      method : 'POST',
	      url : 'https://api-sandbox.traitify.com/v1/assessments',
	      headers : {
	    	 'Authorization': 'Basic {secretKey}:x',
	    	'Content-Type' : 'application/json'
	      },
	      data : {"deck_id": "core"}
	    });
  }

  var editUser = function(user) {
    console.log(user);
    return $http({
      method : 'PUT',
      url : 'api/user/' + user.id + '/',
      headers : {
        'Content-Type' : 'application/json'
      },
      data : user
    });
  }

  return {
    getUsers : getUsers,
    createUser : createUser,
    createAssessment : createAssessment,
    removeUser : removeUser,
    editUser : editUser
  };
});
