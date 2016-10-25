var myApp = angular.module('myApp',[]);

myApp.directive('numbersOnly', function(){
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                  
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9.]/g, '');
                    if (transformedInput!=inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });

myApp.controller("myController", ["$scope", function($scope){
    $scope.master = {};
    $scope.tasks = [];
    $scope.addTask = function(task){
        if($scope.taskForm.$valid){
            $scope.master = angular.copy(task);
            var taskObj = {
                "taskId": $scope.taskId,
                "taskSubject": $scope.taskSubject,
                "isCompleted": $scope.taskCompleted
            }
            $scope.tasks.push($scope.master);
        }
        $scope.taskForm.$setPristine();
        $scope.task = angular.copy({});
    };
    $scope.removeTask = function(index){
        if (index > -1)
            $scope.tasks.splice(index, 1);
    };
    
}]);
