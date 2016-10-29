// Directive for button that allows user to add companies in the profile view.
// Template for the inputArea will need to be changed/styled. - Josiah

var app = angular.module('ninja');

app.directive('addCompanyButton', function($compile, profileService) {
    return {
        restrict: 'A',
        // template:
        //     `<td ng-class="styleTask(data.completed)">{{data.task}}</td>
        //     <td><input ng-model="data.completed" type="checkbox" ng-change="completedChanged(data)" ></td>
        //     <td><a ng-click="editClicked(data)">Edit</a></td>
        //     <td><a ng-click="remove(data)">Delete</a></td>`,
        scope : {
            addcompany : "&"
        },
        link : function($scope, $element, $attr) {
            var compiledInput = null;

            // Click event for this button. On click, add the following to DOM
            $element.bind('click', function(){
                console.log("IN directive");

                var $inputArea =
                                `
                                <div class ="row">
                                <div class="col-md-7 col-sm-12 padtb">
                                <input type="text" class="form-control" id="inputArea" ng-model="data"/>
                                </div>
                                <div class="col-md-5 col-sm-12 padtb">
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

            //
            //
            // $scope.styleTask = function(complete) {
            //     return complete ? 'complete' : 'incomplete';
            // };
            //
            // $scope.completedChanged = function(data) {
            //     todoService.editTodo(data);
            // };
            //

            //

            //

        }
    }
});
