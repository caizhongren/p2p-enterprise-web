hongcaiApp.controller("PerfectInformationCtrl", function ($scope, $rootScope, $state, $stateParams, $alert, $location, $upload, DEFAULT_DOMAIN, $window, EnterpriseService, md5) {
    $scope.enterprise = {};
    $rootScope.selectSide = 'perfect-information';
    /*
     * 查询上传的文件
    */
    EnterpriseService.getEnterpriseFiles.get({enterpriseId : $stateParams.enterpriseId}, function(response) {
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
                 + '?categoryId='+ $stateParams.enterpriseId  
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
                 categoryId: $stateParams.enterpriseId,
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

     $scope.submitEnterprise = function(enterprise, status) {
     	var registerDate = new Date($scope.registDate).getTime().toString();
         enterprise.registerDate = registerDate;
         enterprise.infoStatus = status;
         enterprise.type = $scope.type;

         // if($scope.type === 2){
         //     enterprise.publicUserName = 'public' + enterprise.contactName;
         //     enterprise.userName = 'private' + enterprise.contactName;
         //     enterprise.password = md5.createHash('888888');
         //     enterprise.publicUserPassword = md5.createHash('888888');
         //     enterprise.infoStatus = 2;
         // }else{
             // var password = enterprise.password;
             // var publicUserPassword = enterprise.publicUserPassword; 
             // enterprise.password = md5.createHash(password);
             // enterprise.publicUserPassword = md5.createHash(publicUserPassword);
         // }

     	EnterpriseService.saveEnterprise.save($.param(enterprise), function(response) {
           if(response.msg == "success") {
                 // if($scope.type === 3){
                 //     $location.path("/enterprise/credit-enterprise-list");

                 // }else{
                 //     $location.path("/enterprise/enterprise-list");
                 // }
                 alert('ok');
               } else {
                 alert(response.msg);
               }
          });
 	};


    
});
