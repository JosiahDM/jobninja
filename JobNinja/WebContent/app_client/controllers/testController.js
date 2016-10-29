var app = angular.module('ninja');

app.controller('testController', function($window, registrationService, $location, authenticationService, profileService, $scope, $location, profileService) {


    // Returns undefined if no valid user logged in
    profileService.getUser()
        .then(function(response) {
            $scope.user = response.data;
            
            $scope.loadTest = function() {
            	console.log("inside loadTest " + $scope.user.tookTest);
            	if (!$scope.user.tookTest) {
            		$window.Traitify.setPublicKey("v7ippc8rj0hu7tev7pi8tr2iid");
                	$window.Traitify.setHost("https://api-sandbox.traitify.com");
                	$window.Traitify.setVersion("v1");
                	var assessmentId = $scope.user.testId;
                	var traitify = $window.Traitify.ui.load(assessmentId, ".assessment",{slideDeck: {showResults: true}});
                	
                	traitify.slideDeck.onFinished(function() {
                        console.log("FINISHED!!!!!!!!!!!!!!!");
                        var userId = authenticationService.currentUser().id;
                        var user = {
                        			id : userId,
                        			tookTest : "true"
                        		}
                        profileService.getUserPersonality()
                        .then(function(response) {
                        	
                        	var keywords = response.data.personality_types[0].personality_type.keywords;
                        	keywords = keywords + ', ' + response.data.personality_types[1].personality_type.keywords;
                        	keywords = keywords + ', ' + response.data.personality_types[2].personality_type.keywords;
                    
                        	profileService.postUserWords(keywords);
                        	registrationService.editUser(user);
                        });
                        var somestuff = traitify.personalityTypes.data.store
                        console.log(somestuff["PersonalityTypes"]);
                        console.log(traitify);
                	});
                	
            	}
            	else {
            		console.log("TAKEN!!!!!!!!!!!!!!!");
            		console.log($scope.user.tookTest);
            		$window.Traitify.setPublicKey("v7ippc8rj0hu7tev7pi8tr2iid");
                	$window.Traitify.setHost("https://api-sandbox.traitify.com");
                	$window.Traitify.setVersion("v1");
                	var assessmentId = $scope.user.testId;
                	var traitify = $window.Traitify.ui.load(assessmentId, ".assessment",{slideDeck: {showResults: true}});
            	}
            }
            $scope.loadTest();

        })
        .catch(function(e) {
            $location.path('/login');
        });

});
