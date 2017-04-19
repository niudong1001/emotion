var loginArea="http://115.159.145.109/emotion/php/login.php";
angular.module('log', ['ionic'])
.controller('logCtrl', function($scope,$timeout,$http,$rootScope) {
	$rootScope.isBack=false;
	$rootScope.proAni="prompt";
	$rootScope.alertNow=false;
	$rootScope.ensureFun=function(){}
	$scope.login=function(){
		var user=$scope.user;
		var pasw=$scope.pasw;
		if(user&&pasw){
			$http({
			method:'POST',
			url:loginArea,
			data:{user:user,pasw:pasw},
			headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
			}
			}).success(function(data){
				if(data.indexOf("success")==-1)
				{	
					$rootScope.prompt("登陆错误","用户名或密码错误",0);
					$scope.alertInit();
				}
				else{
					if(window.sessionStorage){
						sessionStorage.user=user;
						sessionStorage.nickname=data.substring(7);
						$rootScope.prompt("登陆成功","点击返回主页面",0);
						$rootScope.ensureFun=function(){window.location.href="main.html";}
					}
				}
			}).error(function(data, status, headers, config) {
			console.log(data);
			});
		}
		else{
			$rootScope.prompt("密码错误","用户名密码都不可以为空",0);
			//$scope.alert="用户名与密码都不可以为空.";
			$scope.alertInit();
		}
	}
	$scope.backMain=function(){
		window.location.href="main.html";
	}
	$scope.alertInit=function(){
		$timeout(function(){$scope.alert=""},1000);
	}
	$scope.regGo=function(){
		window.location.href="reg.html";
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
     
});