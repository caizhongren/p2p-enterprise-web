hongcaiApp.controller("PerfectInformationCtrl", function ($scope, $rootScope, $state, $stateParams, $alert, $location, $upload, DEFAULT_DOMAIN, $window, EnterpriseService, md5) {
    $scope.enterprise = {};
    $rootScope.selectSide = 'perfect-information';
    /*
     * 查询借款企业信息
    */
    $scope.getEnterpriseInfo = function(){
      EnterpriseService.getEnterprise.get({userId: $rootScope.securityStatus.userId},function(response) {
        $scope.readOnly = true;
        if(response && response.ret !== -1) {
          if(response.id == undefined) {
            $scope.readOnly = false;
          }
          $scope.enterprise = response;
          $scope.enterpriseId = response.id;
          console.log(typeof(response.registerCapital));
          $scope.enterprise.registerCapital = response.registerCapital.toString();
        }
      });
    }
    $scope.getEnterpriseInfo();
    // 隐藏编辑按钮
    $scope.toggleReadOnly = function() {
        // $("[readonly]").removeAttr("readonly");
        $scope.readOnly = !$scope.readOnly;
    }
    /*
     * 查询上传的文件
    */
    EnterpriseService.getEnterpriseFiles.get({enterpriseId : $scope.enterpriseId}, function(response) {
        $scope.thumbnail = response.data.thumbnailFile;
        $scope.original = response.data.originalFile;
        $scope.enterpriseData = [];
        $scope.thumbnailData = [];
        $scope.originalData = [];
        $scope.baseFileUrl = response.data.baseFileUrl;

        for (var i = 0; i < $scope.thumbnail.length; i++) {
            var url = $scope.thumbnail[i].uploadFile.url;
            $scope.thumbnail[i].uploadFile.url = $scope.baseFileUrl + url;
            $scope.thumbnailData.push($scope.thumbnail[i].uploadFile);
        }
        for (var i = 0; i < $scope.original.length; i++) {
            var url = $scope.original[i].uploadFile.url;
            $scope.original[i].uploadFile.url = $scope.baseFileUrl + url;
            $scope.originalData.push($scope.original[i].uploadFile);
            $scope.enterpriseData.push($scope.original[i].enterpriseFile.type);
        }

    });
    $scope.originalFiles = [];
    $scope.thumbnailFiles = [];

    /*
     * category 关联类型 contract guarantee 或 enterprise
     * fileType 上传文件类型 jpg png doc pdf 等 0:image 1:application
     * archiveType 附件类型 1:证件 2:执照 3:抵押 4:其它 5:ICON 6：代表人章  7 企业章
     * description 附件描述
    */
     $scope.onFileSelect = function($files, category, fileType, archiveType, description) {
         for (var i = 0; i < $files.length; i++) {
             var file = $files[i];
             $scope.upload = $upload.upload({
                 url: DEFAULT_DOMAIN + '/adminUploadFile/uploadFile' 
                 + '?categoryId='+ $scope.enterpriseId  
                 + '&category=' + category
                 + '&fileType=' + fileType
                 + '&archiveType=' + archiveType
                 + '&description=' + description, 
                 data: {myObj: $scope.myModelObj},
                 file: file,
             }).progress(function(evt) {
                 console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
             }).success(function(data, status, headers, config) {
                 // $window.location.reload();
             });
         }
     };
     //删除证件
 	$scope.deleteFile = function(category,thumbnailFile,originalFile) {
         if(confirm("确认删除吗？")) {
             EnterpriseService.deleteFile.delete({
                 categoryId:$scope.enterpriseId,
                 category: category, 
                 thumbnailFileId: thumbnailFile.id, 
                 thumbnailFileUrl: thumbnailFile.url,
                 originalFileId: originalFile.id ,
                 originalFileUrl: originalFile.url
             }, function(response) {
                 if(response.msg == "success") {
                     alert("删除成功！");
                     $window.location.reload();
                 } else {
                     alert(response.msg);
                 }
             });
         }
     }

     $scope.submitEnterprise = function(enterprise) {
        var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var regCapital = /[0-9]*[1-9][0-9]*$/;
        var regMobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regIdNo.test(enterprise.legalIdNo) || !regCapital.test(enterprise.registerCapital) || !regMobile.test(enterprise.contactMobile) || !regEmail.test(enterprise.contactEmail)) {
            return;
        }
        enterprise.registerDate = new Date(enterprise.registerDate).getTime();
      //保存信息
     	EnterpriseService.saveEnterprise.update({
        userId: $rootScope.securityStatus.userId,
        name: enterprise.name,
        legalName: enterprise.legalName,
        legalIdNo: enterprise.legalIdNo,
        legalRepresentative: enterprise.legalRepresentative,
        bankLicense: enterprise.bankLicense,
        registrationNo: enterprise.registrationNo,
        orgNo: enterprise.orgNo,
        taxNo: enterprise.taxNo,
        registerCapital: enterprise.registerCapital,
        background: enterprise.background,
        businessScope: enterprise.businessScope,
        businessState: enterprise.businessState,
        address: enterprise.address,
        contactName: enterprise.contactName,
        contactMobile: enterprise.contactMobile,
        contactEmail: enterprise.contactEmail,
        registerDate: enterprise.registerDate
      }, function(response) {
           if(response.msg == "success") {
                 alert('ok');
               } else {
                 // alert(response.msg);
                 console.log(response);
               }
          });
 	};

    
});
