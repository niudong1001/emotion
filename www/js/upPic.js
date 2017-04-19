var tips=[
	{id:1,use:0,value:"上衣"},
	{id:2,use:0,value:"裤子"},
	{id:3,use:0,value:"其他"},
]
var rate=[
    {use:0,value:10},
    {use:0,value:8},
    {use:0,value:6},
    {use:0,value:4},
    {use:0,value:2}
]
var picUrl="http://115.159.145.109/emotion/php/picDeal.php";
angular.module('up', ['ionic','ngCordova'])
.controller('upCtrl', function($scope, $ionicModal,$ionicPopup,$cordovaFileTransfer,$cordovaCamera,$cordovaImagePicker,$rootScope,$timeout,$ionicBackdrop) {
	$scope.tips=tips;
    $scope.rate=rate;//厚薄度数
	$scope.btn="c1";
	$rootScope.isBack=false;
	$rootScope.proAni="prompt";
	$rootScope.alertNow=false;
    $scope.isLoad=false;
	$ionicModal.fromTemplateUrl('templates/choose.html', {
	    scope: $scope
	  }).then(function(cho) {
	    $scope.cho = cho;
	  });
	 $ionicModal.fromTemplateUrl('templates/put.html', {
	     scope: $scope
	   }).then(function(put) {
	     $scope.put = put;
	   });
	 $ionicModal.fromTemplateUrl('templates/upLoad.html', {
	     scope: $scope
	   }).then(function(upL) {
	     $scope.upL = upL;
	   });
	 $scope.ensureFun=function(){

	 }
	 $scope.upLoad=function(){
	 	var confirmP=$ionicPopup.confirm({
	 		title:"上传图片确认",
	 		template:"你确定要上传本图片吗?"
	 	});

	 	confirmP.then(function(res){
	 		if(res){
                
	 			if(sessionStorage.user==undefined){
	 				$rootScope.prompt("登陆错误","您还未登陆",0);
	 				$rootScope.ensureFun=function(){
	 					window.location.href="login.html";
	 				}
	 				//;
	 			}
	 			else{
                    
                    //alert($scope.tipToStr());
                    if($scope.isLoad==true){
                        //$scope.upL.show();
                        uploadFile($scope.upImg);
                        //$timeout(function(){},1000);   
                    }
	 				
	 			}
	 		}
	 		else{

	 		}
	 	});
	 }
     document.addEventListener("deviceready", onDeviceReady, false);
     function onDeviceReady(){
         $scope.isLoad=true;
         //alert($scope.isLoad);
     }
     function uploadFile(fileURL) {
        if(fileURL=="img/upDemo.png"){
            $rootScope.prompt("上传错误","注意demo照片不可以上传",0);
            return;
        }
        var url = encodeURI(picUrl);
        var options = new FileUploadOptions();
        
        options.fileKey = "pic";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType = "image/jpg";
        var params={};
        params.tips=$scope.tipToStr();
        params.rateValue=$scope.rateValue||0;
        //alert(params.tips);
        options.params=params;

        var ft = new FileTransfer();

        ft.upload(fileURL, url, onSuccess, onError, options);

        function onSuccess(r) {
           $rootScope.prompt("上传成功 ",r.response,0);
        }
        function onError(e) {
           $rootScope.prompt("上传失败","请检查图片源与目标地址",0);
        }
        
     }
     $scope.tipToStr=function(){
        var str=$scope.tips;
        var res="";
        for(var i=0;i<str.length;i++){
            if(str[i].use==1){
                res+=str[i].id;
                res+=",";
            }
        }
        res=res.substring(0,res.length-1);
        return res;
     }
     /*
     $scope.upImage = function (fileURL) {
         //document.addEventListener('deviceready', function () {
            var url="http://115.159.145.109/php/picDeal.php";
            var options = new FileUploadOptions();
            options.fileKey="pic";
            options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
            options.mimeType="image/png";
             var params = {
               facilityIdentify: '217ae60e5bc746f',
               cyberkeyCode: 'AQOhlmsQAAKgCoi',
               tenantId: 1
             };
             options.params = params;

            $cordovaFileTransfer.upload(encodeURI(url), fileURL, options)
              .then(function (result) {
                console.log(JSON.stringify(result.response));
                console.log("success");
              }, function (err) {
                console.log(JSON.stringify(err));
                console.log("fail");
              }, function (progress) {
                // constant progress updates
              });
         //}//, false);
    }
    */
    $scope.getRate=function(r){
        for(var i=0;i<5;i++)
            $scope.rate[i].use=0;
        r.use=r.use==0?1:0;
        $scope.rateValue=r.value;
    }
	 $scope.getTip=function(){
	 	$scope.tips[this.$index].use=$scope.tips[this.$index].use==0?1:0;
	 }
	 $scope.pickImage=function () {
        var options = {
            maximumImagesCount: 1,
            width: 650,
            height: 350,
            quality: 80
        };
        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
               $scope.upImg=results[0];
            }, function (error) {
                // error getting photos
        });
	 };
	 $scope.takePhoto = function () {
         var options = {
             //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
             quality: 100,                                            //相片质量0-100
             destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
             sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
             allowEdit: false,                                        //在选择之前允许修改截图
             encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
             targetWidth: 720,                                        //照片宽度
             targetHeight: 400,                                       //照片高度
             mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
             cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
             popoverOptions: CameraPopoverOptions,
             saveToPhotoAlbum: true                                   //保存进手机相册
         };
         $cordovaCamera.getPicture(options).then(function(imageData){
         　　　　$scope.upImg=imageData;
         　　},function(err){
         　　　　//error
         　　});
     }
     $ionicModal.fromTemplateUrl('templates/pro.html', {
         scope: $scope
       }).then(function(pro) {
         $scope.pro = pro;
       });
     $rootScope.prompt=function(text,subText,flag){
		$rootScope.proAni="prompt";
		$rootScope.isBack=true;
     	$rootScope.proTitle=text;
     	$rootScope.proText=subText;
     	$rootScope.alertNow=true;
     	if(flag==1){
     		$rootScope.ensure();
     	}
     	$scope.put.hide();
     	/*
     	var elem=document.createElement("div");
     	elem.className="prompt";
     	elem.innerText=text;
     	document.body.appendChild(elem);
     	*/
     	//$timeout(function() {elem.style.display="none";}, 900);
     }
     $rootScope.ensure=function(){
     	$rootScope.proAni="pro-cancel";
     	$timeout(function(){
     		$rootScope.isBack=false;
     		$rootScope.alertNow=false;
     		$rootScope.ensureFun();
     	},800);
     }
    $scope.drop=function(){
        $rootScope.proAni="pro-cancel";
        $timeout(function(){
            $rootScope.isBack=false;
            $rootScope.alertNow=false;
            
        },800);
     }
});