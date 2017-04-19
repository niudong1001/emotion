var regArea="http://127.0.0.1/emotion/php/reg.php";
angular.module('reg', ['ionic'])
.controller('regCtrl', function($scope,$timeout,$http) {
	$scope.loginBack=function(){
		window.location.href="login.html";
	}
});