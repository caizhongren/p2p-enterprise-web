hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $state, $rootScope, $stateParams, UserCenterService) {

    $scope.status = 9;
    UserCenterService.getProjectByStatus.get({status: $scope.status}, function(response){
    	$scope.projectList = [];
			for (var i = 0; i < response.data.projectList.length; i++) {
				$scope.projectList.push(response.data.projectList[i]);
			}
    })

    $scope.bid = function(){
    	$scope.status = 7;
    	UserCenterService.getProjectByStatus.get({status: $scope.status}, function(response){
    	$scope.projectList = [];
			for (var i = 0; i < response.data.projectList.length; i++) {
				$scope.projectList.push(response.data.projectList[i]);
			}
    	})
    }
    $scope.repayment = function(){
    	$scope.status = 9;
    	UserCenterService.getProjectByStatus.get({status: $scope.status}, function(response){
    	$scope.projectList = [];
			for (var i = 0; i < response.data.projectList.length; i++) {
				$scope.projectList.push(response.data.projectList[i]);
			}
    	})
    }
    $scope.settle = function(){
    	$scope.status = 10;
    	UserCenterService.getProjectByStatus.get({status: $scope.status}, function(response){
    	$scope.projectList = [];
			for (var i = 0; i < response.data.projectList.length; i++) {
				$scope.projectList.push(response.data.projectList[i]);
			}
    	})
    }

}]);
