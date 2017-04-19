<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: "OPTIONS, GET, POST"');
header('Access-Control-Allow-Credentials: true');	
$server="localhost";
$username="root";
$password="729499";
$db="emotion";
$tem=$_GET["tem"];
$user=$_GET["user"];
//echo $user;
$conn=new mysqli($server,$username,$password,$db);
if(!$conn->connect_error){
	//echo "fuck1";
	$conn->query("set names utf8");
	$sql="select * from imgs where user='$user'";
	$res1=$conn->query($sql);
	if($res1->num_rows>0){
		//echo $res->num_rows;
		//echo $res->num_rows;
		$row=$res1->fetch_assoc();
		echo $row["src"].",";
		echo $row["rate"];
	}
}
?>