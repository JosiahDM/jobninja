// Directive for button that allows user to add companies in the profile view.

var app = angular.module('ninja');

app.directive('addCompanyButton', function($compile, profileService) {
    return {
        restrict: 'A',
        scope : {
            addcompany : "&"
        },
        link : function($scope, $element, $attr) {
            var compiledInput = null;

            // Click event for this button. On click, add the following to DOM
            $element.bind('click', function(){
                var $inputArea =
                                `
                                <div class ="row">
                                <div class="col-lg-9 col-md-7 col-sm-12 padtb">
                                <input type="text" class="form-control text-center" id="inputArea" ng-model="data"/>
                                </div>
                                <div class="col-lg-3 col-md-5 col-sm-12 padtb text-center">
                                <button class="btn btn-success" ng-click="save(data)"><i class="fa fa-check" aria-hidden="true"></i></button>
                                <button class="btn btn-warning" ng-click="cancel()"><i class="fa fa-times" aria-hidden="true"></i></button>
                                </div>
                                </div>
                                `;
                if (compiledInput === null) {
                    compiledInput = $compile($inputArea)($scope);
                    $element.after(compiledInput);
                }

            });
            // Send company info to controller
            // Calls the method within the addcompany attribute of profile.view.html
            $scope.save = function(data) {
                var company = { companyname:data};
                $scope.addcompany()(company);
                $scope.data = null;
                compiledInput.remove();
                compiledInput = null;
            };
            // Cancel input, remove input area from DOM.
            $scope.cancel = function() {
                if (compiledInput != null) {
                    compiledInput.remove();
                    compiledInput = null;
                    $scope.data = null;
                }
            };

        }
    }
});
