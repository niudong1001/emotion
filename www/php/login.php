<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: "OPTIONS, GET, POST"');
header('Access-Control-Allow-Credentials: true');
$postJson = file_get_contents('php://input');
$_POST = json_decode($postJson, true);
if(isset($_POST["user"])){
	$user=$_POST['user'];
	$pasw=$_POST["pasw"];
}
//链接数据库
$server="localhost";
$username="root";
$password="729499";
$db="emotion";
$conn=new mysqli($server,$username,$password,$db);
if(!$conn->connect_error){
	$sql="select * from users where user='$user' and pasw='$pasw'";
	$res=$conn->query($sql);
	if($res->num_rows>0){
		$row=$res->fetch_assoc();
		$_SESSION["user"]=$user;
		echo "success".$row["nickname"];
	}
	else echo "密码或用户名错误";
}
else{
	echo "链接数据库错误，请联系管理员";
}
?>
