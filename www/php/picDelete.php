<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: "OPTIONS, GET, POST"');
header('Access-Control-Allow-Credentials: true');
$id=$_GET["id"];
//链接数据库
$server="localhost";
$username="root";
$password="729499";
$db="emotion";
$conn=new mysqli($server,$username,$password,$db);
if(!$conn->connect_error){
	$sql="delete from imgs where id='$id'";
	try{
		$res=$conn->query($sql);
		echo "success";
	}
	catch(Exception $e) {   
		echo $e->getMessage();   
		exit();   
	}   
}
else{
	echo "链接数据库错误，请联系管理员";
}
?>