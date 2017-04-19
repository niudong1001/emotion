angular.module('main', ['ionic'])
.controller('mainCtrl', function($scope,$timeout,$rootScope) {
	$rootScope.isBack=false;
	$rootScope.proAni="prompt";
	$rootScope.alertNow=false;
	$rootScope.ensureFun=function(){
          sessionStorage.clear();
          window.location.href="main.html";
     }
    $scope.recommend=function(){
        window.location.href="recommend.html";
    }
	$scope.up=function(){
		window.location.href="upPic.html";
	}
     $scope.show=function(){
          window.location.href="showPic.html";
     }
     $scope.aboutUs=function(){
          window.location.href="aboutUs.html";
     }
     $scope.contactUs=function(){
          window.location.href="contactUs.html";
     }
	$scope.login=function(){
		window.location.href="login.html";
	}
	$scope.isLogin=sessionStorage.nickname==undefined?false:true;
	$scope.loginInfo="欢迎您,"+sessionStorage.nickname+" ";
	$scope.logout=function(){
		$rootScope.prompt("注销账户","您确定要注销吗?",0);
	}
     $rootScope.prompt=function(text,subText,flag){
     	$rootScope.proAni="prompt";
		$rootScope.isBack=true;
     	$rootScope.proTitle=text;
     	$rootScope.proText=subText;
     	$rootScope.alertNow=true;
     	if(flag==1){
     		$rootScope.ensure();
     	}
     	//$scope.put.hide();
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