var url = "http://115.159.145.109/emotion/pics/";
var tips=[
	{id:0,use:0,value:"全部"},
	{id:1,use:0,value:"上衣"},
	{id:2,use:0,value:"裤子"},
	{id:3,use:0,value:"其他"}
];
var info_init;//解析前信息
//var info_analy=[];//解析后信息
var pic_src;
var init_num=0;
var url_temp;
angular.module('show', ['ionic','ngCordova'])
.controller('showCtrl', function($http,$scope, $ionicModal,$ionicPopup,$cordovaFileTransfer,$cordovaCamera,$cordovaImagePicker,$rootScope,$timeout,$ionicBackdrop) {
	$scope.tips=tips;
	$scope.isLoad=false;
	$rootScope.isBack=false;
	$rootScope.alertNow=false;
	$scope.isGetPic=false;
	$scope.info=[];
	$scope.cache=[];//cache用来存info
	//$scope.analyze();
	$scope.show=function(tip){
		if(tip.id==0){
			//alert(tip.id);
			$scope.info=$scope.cache.slice();
		}
		else if(tip.id==1){
			//清空数组
			$scope.info.splice(0,$scope.info.length);
			//alert($scope.cache.length);
			for(var i=0;i<$scope.cache.length;i++){
				if(!$scope.cache[i].tips.indexOf("上衣")){
					$scope.info.push($scope.cache[i]);
				}
			}
		}
		else if(tip.id==2){
			//清空数组
			$scope.info.splice(0,$scope.info.length);
			//alert($scope.cache.length);
			for(var i=0;i<$scope.cache.length;i++){
				if(!$scope.cache[i].tips.indexOf("裤子")){
					$scope.info.push($scope.cache[i]);
				}
			}
		}
		else {
			//清空数组
			$scope.info.splice(0,$scope.info.length);
			//alert($scope.cache.length);
			for(var i=0;i<$scope.cache.length;i++){
				if(!$scope.cache[i].tips.indexOf("其他")){
					$scope.info.push($scope.cache[i]);
				}
			}
		}
	}
	$scope.download=function(){
		//alert("fuck");
		//alert(info_analy.length);
		
		
		for(var i=0;i<$scope.info.length;i++){
			//$scope.isGetPic=false;
			//alert(i);
			//alert(info_analy[i].src);
			//src1="";
			var src1;
			src1=url+$scope.info[i].src;
			$scope.info[i].src=src1;
			//alert($scope.info[i].src);
		}
		//alert($scope.info[0].time);
		$scope.cache=$scope.info.slice();
	}

     $rootScope.refresh=function(text){
		$rootScope.isBack=true;
		$rootScope.alertNow=true;
     	$rootScope.reText=text;
     }	
     $rootScope.closeRef=function(text){
     	$rootScope.reText=text;
     	$timeout(function() {
     		$rootScope.alertNow=false;
     		$rootScope.isBack=false;
     		
     	}, 1400);
     }
     $scope.analyze=function(){
     	//alert(info_init);
     	var t1=info_init.split('/');
     	//info_analy
     	//alert(t1[1]);
     	var t2=Array();
     	
     	//t3.tips=Array();
     	//alert(t1.length);
     	for(var i=t1.length-2,k=0;i>=0;i--,k++){
     		//t3.src="";
     		var t3={};
     		t3.tips=new Array();
     		t2=t1[i].split(",");
     		//alert(t2);
     		for(var j=0;j<t2.length;j++){
     			if(j==0){
     				t3.rate=t2[j];
     				//alert(t3.src);
     			}
     			else if(j==1){
     				t3.id=t2[j];
     				//alert(t3.src);
     			}
     			else if(j==2){
     				t3.time=t2[j];
     				//alert(t3.src);
     			}
     			else if(j==3){
     				t3.src=t2[j];
     			}
     			else{
     				t3.tips.push(t2[j]);
     			}
     		}
     		//alert(t3.tips);
     		$scope.info[k]=t3;
     		//alert($scope.info[i].src);
     	}
     	/*
     	for(var i=0;i<3;i++)
     		alert($scope.info[i].src);
     	*/

     }

	$scope.load=function(){
		//alert("fuck");
		if(sessionStorage.user!=undefined){
			var temp=sessionStorage.user;
			$http.get("http://115.159.145.109/emotion/php/load.php?user="+temp+"").success(function(res){
				info_init=res;
				//alert(info_init);
				//$scope.isLoad=true;
				$rootScope.closeRef("更新中");
				$scope.analyze();
				//if($scope.isLoad==true){
				$scope.download();
				//}
			}).error(function(){
				alert("更新失败");
			});
		}
		else{
			$rootScope.refresh("需要登陆");
			$timeout(function(){window.location.href="login.html";},1000);
			
		}
	}
	 //function onDeviceReady(){
	     $scope.isLoad=true;
	     $rootScope.refresh("正在更新");
	     $scope.load();
	     
	     //alert($scope.isLoad);
	 //}
	 //document.addEventListener("deviceready", onDeviceReady, false);

	/*
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
	    $scope.isLoad=true;
	    //alert($scope.isLoad);
	    $scope.load();
	}
	*/
	$scope.toDetail=function(res){
		localStorage.id=res.id;
		localStorage.src=res.src;
		localStorage.time=res.time;
		localStorage.tips=res.tips;
		localStorage.rate=res.rate;
		window.location.href="details.html";
	}

});