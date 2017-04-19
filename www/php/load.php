<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: "OPTIONS, GET, POST"');
header('Access-Control-Allow-Credentials: true');
$server="localhost";
$username="root";
$password="729499";
$db="emotion";
$user=$_GET["user"];
//echo $user;
//$response=array();//存放关联的tips;
$conn=new mysqli($server,$username,$password,$db);
if(!$conn->connect_error){
	//echo "fuck1";
	$conn->query("set names utf8");
	$sql="select * from imgs where user='$user'";
	$res1=$conn->query($sql);
	if($res1->num_rows>0){
		//echo "fuck2";
		//echo $res->num_rows;
		//echo $res->num_rows;
		while($row=$res1->fetch_assoc()){
			$temp=$row["src"];
			$t_id=$row["id"];
			$uTime=$row["time"];
			$id=$row["id"];
			$rate=$row["rate"];
			echo $rate.",";
			echo $id.",";
			echo $uTime.",";
			echo $temp;
			//echo "fuck3";
			$sql="select * from tipImg,tips where iId='$t_id' and tId=id";
			$res=$conn->query($sql);
			if($res->num_rows>0){
				while($row=$res->fetch_assoc()){
					echo ",";
					echo $row["value"];
				}
				echo "/";
			}

		}
	}
}
?>