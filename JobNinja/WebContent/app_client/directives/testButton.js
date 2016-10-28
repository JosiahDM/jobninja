// Directive for button that allows user to take test if they haven't,
// and view results if they have already taken it.

// ***** CURRENTLY DISABLED EXTERNAL API CALLS, YOU CAN UNCOMMENT BELOW IF YOU NEED ******

var app = angular.module('ninja');

app.directive('takeTest', function($compile, $window, registrationService, $location, authenticationService, profileService) { // Going to need authenticationServivce here
    return {
        restrict: 'E',
        scope : {
            user : '='
        },
        link : function($scope, $element, $attr) {
            var compiledBtn = null;

            // If user is logged in
            if ($scope.user) {
                // Function to load the Traitify test view or results
                $scope.loadTest = function() {
                	
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
                            	console.log(keywords);
                            });
//                            registrationService.editUser(user);
                            var somestuff = traitify.personalityTypes.data.store
                            console.log(somestuff["PersonalityTypes"]);
                            console.log(traitify);
                    	});

                    	if (compiledBtn) {
                        	compiledBtn.remove();
                        	compiledBtn = null;
                    	}
                    	
                	}
                	else {
                		console.log("TAKEN!!!!!!!!!!!!!!!")
                	}
                }

                // If user hasn't taken the test, display a button for them to start
                // Otherwise, just load the test to display results.
                if (!$scope.user.tookTest) {
                    var $button = `<button ng-click="loadTest()">Take Test</button>`;
                    if (compiledBtn === null) {
                        compiledBtn = $compile($button)($scope);
                        $element.after(compiledBtn);
                    }
                } else {
                    $scope.loadTest();
                }
            }
        }
    };
});
