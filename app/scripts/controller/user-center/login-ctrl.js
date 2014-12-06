hongcaiApp.controller("LoginCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "LoginService", "SessionService", 'ipCookie', function ($scope, $state, $rootScope, $stateParams, LoginService, SessionService, ipCookie) {

  // b端登录后没有首页展示，当判断用户已经登录，自动跳转个人中心
  if($rootScope.isLogged === true) {
    $state.go('root.userCenter.account-overview');
  }

  /**
   * 从cookie中读取用户名
   */
  if (ipCookie('bUserName')){
      $scope.user = [];
      $scope.user.account = ipCookie('bUserName');
  }

  $scope.login = function(user){

    //记住用户名处理
    if ($scope.rememberUserName){
        ipCookie('bUserName', user.account, { expires: 60 })
    }

    LoginService.userLogin.get({account: user.account, password: user.password, type: 1 }, function(response) {
      if(response.ret == 1) {
        SessionService.set("user", response.data.user.name);
        $state.go('root.userCenter.account-overview');
        $rootScope.loginName = response.data.user.name;
        $rootScope.isLogged = true;
      } else {
         if (response.code == -1009){
            $scope.isPasswordError = true;
        }
        // toaster.pop('warning', "提示", response.msg);
        //$scope.errorMessage = response.msg;
        //$scope.warning = true;
        //$state.go('root.login');
      }
    });
  };

  $scope.$watch('user.password', function(){
    $scope.isPasswordError = false;
  });

  $scope.$watch('user.account', function(){
    $scope.isPasswordError = false;
  });

  $scope.logout = function() {
    SessionService.destory("user");
    $rootScope.loginName = '';
    $rootScope.isLogged = false;
    $state.go('root.login');
  }
  $scope.islogged = function() {
    if(SessionService.get("user")) return true;
  };
}]);
