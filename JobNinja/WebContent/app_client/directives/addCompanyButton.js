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
                                `<li>
                                <textarea id="inputArea" ng-model="data"></textarea>
                                <button ng-click="save(data)">Submit</button>
                                <button ng-click="cancel()">Cancel</button>
                                </li>`;
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
            };
            // Cancel input, remove input area from DOM.
            $scope.cancel = function() {
                if (compiledInput != null) {
                    compiledInput.remove();
                    compiledInput = null;
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
