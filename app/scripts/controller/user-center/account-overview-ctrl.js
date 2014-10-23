hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $state, $rootScope, $stateParams, UserCenterService) {


	$rootScope.selectSide = 'account-overview';
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    UserCenterService.getUserCapital.get(function(response) {
    	if(response.ret == 1) {
    		totalAssets = response.data.totalAssets
    		receivedProfit = response.data.userCapital.receivedProfit;
    		balance = response.data.userCapital.balance;

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
	        percentageInnerCutout : 80,
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
	        percentageInnerCutout : 80,
	        animation : true,
	        animationSteps : 100,
	        animationEasing : "easeOutQuart",
	        animateRotate : true,
	        animateScale : false, 
	        showTooltips: false
	    };
    }


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


   

    UserCenterService.statisticsByUser.get(function(response) {
    	if (response.ret == 1){
    		var orderNum = response.data.orderNum;
    		if(orderNum){
    			$scope.investingNum = orderNum.isInve;
    			$scope.investedNum = orderNum.overInve;
    			$scope.investNum = orderNum.allInve;
    		};
    		
    	};
    });


    function new_form(){
		var f = document.createElement("form");
		document.body.appendChild(f);
		f.method = "post";
        //f.target = "_blank";
        return f;
    }

    function create_elements(eForm,eName,eValue){
    	var e=document.createElement("input");
    	eForm.appendChild(e);
    	e.type='text';
    	e.name=eName;
    	if(!document.all){
    		e.style.display='none';
    	}else{
    		e.style.display='block';
    		e.style.width='0px';
    		e.style.height='0px';
    	}
    	e.value=eValue;
    	return e;
    }
    $scope.repayment = function(projectId){

    	UserCenterService.repayment.get({projectId: projectId}, function(response){
			if(response.ret == 1) {
				var req = response.data.req;
				var sign = response.data.sign;
	            var _f=new_form();
	            create_elements(_f,"req",req);
	            create_elements(_f,"sign",sign);
	            _f.action="http://qa.yeepay.com/member/bha/toRepayment";
	            _f.submit();

	        } else {

	        }
    	});

    };
    

}]);
