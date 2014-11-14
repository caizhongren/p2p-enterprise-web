hongcaiApp.controller("UserCenterCtrl", [ "$location", "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ( $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {

    $scope.selectedDate = "2014-10-16T08:50:36.394Z"; // <- [object Date]
    $scope.selectedDateAsNumber = 509414400000; // <- [object Number]
    $scope.fromDate = "2014-10-07T16:00:00.000Z"; // <- [object Date]
    $scope.untilDate = "2014-10-07T16:00:00.000Z"; // <- [object Date]


    /***************************** sidebar start *************************/
    $rootScope.selectSide = $location.path().substr($location.path().indexOf("/") + 1);

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

    $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?" + Math.random();
    $scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };



    $scope.bindBankCard = function() {
    	UserCenterService.bindBankCard.get({}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toBindBankCard";
                _f.submit();

            } else {

            }
        });
    };

}]);
