hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $state, $rootScope, $stateParams, UserCenterService) {

    $scope.status = 9;
    UserCenterService.getProjectByStatus.get({status: $scope.status}, function(response){
    	$scope.projectList = [];
			for (var i = 0; i < response.data.projectList.length; i++) {
				$scope.projectList.push(response.data.projectList[i]);
			}
    })

		    $scope.capital = response.data;
		    if(totalAssets == 0 && receivedProfit == 0 && balance == 0) {
 				$scope.doughnutAccountData = [{
	    			value: 30,
	    			label: '账户总资产',
					//highlight: '#FF5A5E',
					color:"#e94828"
				},
				{
					value : 30,
					label: '累计净收益',
					color : "#f9b81e"
				},
				{
					value : 30,
					label: '账户余额',
					color : "#62cbc6"
				}]
		    } else {
		    	$scope.doughnutAccountData = [{
	    			value: response.data.totalAssets,
	    			label: '账户总资产',
					//highlight: '#FF5A5E',
					color:"#e94828"
				},
				{
					value : response.data.userCapital.receivedProfit,
					label: '累计净收益',
					color : "#f9b81e"
				},
				{
					value : response.data.userCapital.balance,
					label: '账户余额',
					color : "#62cbc6"
				}]
		    }

		} else {
            //toaster.pop('warning', "提示", response.msg);
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            $state.go('root.login');
        }
    });

    if(totalAssets > 0 && receivedProfit > 0 && balance > 0) {
    	$scope.doughnutOptions = {
	        segmentShowStroke : false,
	        segmentStrokeColor : "#fff",
	        segmentStrokeWidth : 2,
	        percentageInnerCutout : 65,
	        animation : true,
	        animationSteps : 100,
	        animationEasing : "easeOutQuart",
	        animateRotate : true,
	        animateScale : false
	    };
    } else {
    	$scope.doughnutOptions = {
	        segmentShowStroke : false,
	        segmentStrokeColor : "#fff",
	        segmentStrokeWidth : 2,
	        percentageInnerCutout : 65,
	        animation : true,
	        animationSteps : 100,
	        animationEasing : "easeOutQuart",
	        animateRotate : true,
	        animateScale : false, 
	        showTooltips: false
	    };
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
