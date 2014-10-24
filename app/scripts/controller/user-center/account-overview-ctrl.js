hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $state, $rootScope, $stateParams, UserCenterService) {


	
    UserCenterService.getEnterpriseUserInfo.get(function(response){
    	if(response.ret == 1) {
    		$scope.totalAssets = response.data.totalAssets;
    		$scope.totalFundRaising = response.data.enterpriseCapitalVo.totalFundRaising;
    		$scope.unPrincipal = response.data.enterpriseCapitalVo.unPrincipal;
    		$scope.accruedInterest = response.data.enterpriseCapitalVo.accruedInterest;
    		$scope.unInterest = response.data.enterpriseCapitalVo.unInterest;
    		$scope.receivedProfit = response.data.userCapital.receivedProfit;
    		$scope.balance = response.data.userCapital.balance;

            if($scope.totalFundRaising == 0 && $scope.accruedInterest == 0 && $scope.balance == 0) {
                $scope.doughnutAccountData = [{
                    value: 30,
                    label: '累计募资',
                    //highlight: '#FF5A5E',
                    color:"#e94828"
                },
                {
                    value : 30,
                    label: '累计利息',
                    color : "#f9b81e"
                },
                {
                    value : 30,
                    label: '账户余额',
                    color : "#62cbc6"
                }]
            } else {
                $scope.doughnutAccountData = [{
                    value: $scope.totalFundRaising,
                    label: '累计募资',
                    //highlight: '#FF5A5E',
                    color:"#e94828"
                },
                {
                    value : $scope.accruedInterest,
                    label: '累计利息',
                    color : "#f9b81e"
                },
                {
                    value : $scope.balance,
                    label: '账户余额',
                    color : "#62cbc6"
                }]
            }

        } 
		  
    });
if($scope.totalFundRaising > 0 && $scope.accruedInterest > 0 && $scope.balance > 0) {
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
    }

    $scope.statusx = 9;
    UserCenterService.getProjectByStatus.get({status: $scope.statusx}, function(response){
        $scope.projectList = [];
            for (var i = 0; i < response.data.projectList.length; i++) {
                $scope.projectList.push(response.data.projectList[i]);
                $scope.projectList[i].repaymentTimeStr = new Date($scope.projectList[i].repaymentTime * 1000);
            }
        if(response.data.projectList.length != 0){
            $scope.status = 9;
        }
        var timestamp = Date.parse(new Date());
    })
    $scope.bidPro = function(){
        $scope.statusx = 7;
        UserCenterService.getProjectByStatus.get({status: $scope.statusx}, function(response){
            $scope.projectList = [];
            for (var i = 0; i < response.data.projectList.length; i++) {
                $scope.projectList.push(response.data.projectList[i]);
                $scope.projectList[i].releaseEndTimeStr = new Date($scope.projectList[i].releaseEndTime * 1000);
            }
            if(response.data.projectList.length != 0){
                $scope.status = 7;
            }
        })
    }
    $scope.repaymentPro = function(){
        $scope.statusx = 9;
        UserCenterService.getProjectByStatus.get({status: $scope.statusx}, function(response){
            $scope.projectList = [];
            for (var i = 0; i < response.data.projectList.length; i++) {
                $scope.projectList.push(response.data.projectList[i]);
                $scope.projectList[i].repaymentTimeStr = new Date($scope.projectList[i].repaymentTime * 1000);
            }
            if(response.data.projectList.length != 0){
                $scope.status = 9;
            }
        })
    }
    $scope.settlePro = function(){
        $scope.statusx = 10;
        UserCenterService.getProjectByStatus.get({status: $scope.statusx}, function(response){
            $scope.projectList = [];
            for (var i = 0; i < response.data.projectList.length; i++) {
                $scope.projectList.push(response.data.projectList[i]);
                $scope.projectList[i].releaseEndTimeStr = new Date($scope.projectList[i].releaseEndTime * 1000);
            }
            if(response.data.projectList.length != 0){
                $scope.status = 10;
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
