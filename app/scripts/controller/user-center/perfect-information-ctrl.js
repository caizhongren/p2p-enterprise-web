hongcaiApp.controller("PerfectInformationCtrl", function ($scope, $rootScope, $state, $stateParams, $alert, $location, $upload, RESTFUL_DOMAIN, DEFAULT_DOMAIN, $window, EnterpriseService, md5, ipCookie) {

    $scope.enterprise = {};
    $scope.originalFiles = [];
    $scope.thumbnailFiles = [];
    $rootScope.selectSide = 'perfect-information';
    $scope.tab = 0;
    /*
     * 查询借款企业信息
    */
      EnterpriseService.getEnterprise.get({userId: $rootScope.securityStatus.userId},function(response) {
        console.log(response.infoStatus);
        if(response && response.ret !== -1) {
          if(response.infoStatus == 0) {
            $scope.readOnly = false;
            $('.form-control').removeAttr('readonly');
          }else{
            $scope.readOnly = true;
          }
          
          $scope.enterprise = response;
          $scope.enterpriseId = response.id;
          $scope.enterprise.registerCapital = response.registerCapital.toString();
          $scope.getFiles($scope.enterpriseId);
        
        }else {
            $scope.readOnly = false;
            $('.form-control').removeAttr('readonly');
        }
      });
    // 隐藏编辑按钮
    $scope.toggleReadOnly = function() {
        $scope.readOnly = !$scope.readOnly;
        $('.form-control').removeAttr('readonly');
    }
    /*
     * 查询上传的文件
    */
    $scope.getFiles = function(enterpriseId) {
        EnterpriseService.getEnterpriseFiles.get({enterpriseId : enterpriseId}, function(response) {
            $scope.thumbnail = response.thumbnailFile;
            $scope.original = response.originalFile;
            $scope.enterpriseData = [];
            $scope.thumbnailData = [];
            $scope.originalData = [];
            $scope.baseFileUrl = response.baseFileUrl;

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
    }
    

    /*
     * category 关联类型 contract guarantee 或 enterprise
     * categoryId 关联ID contractId guaranteeId 或 enterpriseId
     * fileType 上传文件类型 jpg png doc pdf 等 0:image 1:application
     * archiveType 附件类型 1:证件 2:执照 3:抵押 4:其它 5:ICON 6:代表人章 7:企业公章
     * description 附件描述
    */
     
     $scope.onFileSelect = function($files, category, fileType, archiveType, description) {
         for (var i = 0; i < $files.length; i++) {
             var file = $files[i];
             console.log(file);
             $scope.upload = $upload.upload({
                 url: DEFAULT_DOMAIN + '/enterpriseUser/uploadFile' 
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
                 // alert("上传成功！");
                 $scope.getFiles($scope.enterpriseId);
             });
         }
     };
     //删除证件
 	$scope.deleteFile = function(category, originalFile, thumbnailFile) {
         if($scope.readOnly == true) {
            return;
         }
         if(confirm("确认删除吗？")) {
            console.log(thumbnailFile.url);
             EnterpriseService.deleteFile.update({
                 category: category, 
                 thumbnailFileId: thumbnailFile.id, 
                 thumbnailFileUrl: thumbnailFile.url,
                 originalFileId: originalFile.id ,
                 originalFileUrl: originalFile.url
             }, function(response) {
                 // alert("删除成功！");
                 $scope.getFiles($scope.enterpriseId);
             });
         }
     }

     $scope.submitEnterprise = function(enterprise) {
        var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var regCapital = /[0-9]*[1-9][0-9]*$/;
        var regMobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regIdNo.test(enterprise.legalIdNo) || !regCapital.test(enterprise.registerCapital) || !regMobile.test(enterprise.contactMobile) || !regEmail.test(enterprise.contactEmail) || $scope.readOnly == true) {
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
            if(response && response.ret !== -1) {
                alert('ok');
                if (ipCookie('lendMoney') === 1) {
                    $state.go('root.userCenter.lend-money');
                    ipCookie('lendMoney', null);
                }
            } else {
                alert(response.msg);
            }
        });
 	};

    // alert($scope.readOnly)
});
