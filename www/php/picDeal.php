<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: "OPTIONS, GET, POST"');
header('Access-Control-Allow-Credentials: true');
if(isset($_FILES['pic']['name'])){
	//echo $_FILES['pic']['name'].$_FILES["pic"]["size"].$_POST['tips'];
	//echo realpath($_FILES["pic"]["tmp_name"]); 
	//echo basename($_FILES["pic"]["name"]);
	 if(move_uploaded_file($_FILES["pic"]["tmp_name"],
	 '/var/www/html/emotion/pics/'.basename($_FILES["pic"]["name"]))){
	 	$src=basename($_FILES["pic"]["name"]);
	 	$tips=$_POST["tips"];
	 	$rate=$_POST["rateValue"];
		$server="localhost";
		$username="root";
		$password="729499";
		$db="emotion";
		$user="";
		if(isset($_SESSION["user"])){
			$user=$_SESSION["user"];
		}
		else{
			echo "需要登陆";
			return;
		}
		if(count($tips)!=0)
			$tipsNew=explode(',',$tips);
		//echo $tipsNew;
		$conn=new mysqli($server,$username,$password,$db);
		if(!$conn->connect_error){
			
			$sql00="select * from imgs where user='$user' and src='$src'";//看图片是否已经上传过
			$sql01="insert into imgs(user,src,rate) value('$user','$src','$rate')";//上传新的
			$sql1="insert into tipImg(tId,iId) values(?,?)";
			$flag=true;
			$res00=$conn->query($sql00);
			if($res00->num_rows==0){//新的选项
				if(!$conn->query($sql01)==true) echo "服务器处理错误.(1)";
				$flag=false;
			}
			if($flag){
				$id=$res00->fetch_assoc()['id'];
			}
			else{
				$id=$conn->query($sql00)->fetch_assoc()['id'];
			}
			
			$sql2="delete from tipImg where iId='$id' ";//删除原有的
			if(!$conn->query($sql2)==true) echo "服务器处理错误.(2)";

			$stmt = mysqli_stmt_init($conn);
			if (mysqli_stmt_prepare($stmt, $sql1)) {
				 mysqli_stmt_bind_param($stmt, 'ii', $tid, $iid);
				 for($i=0;$i<count($tipsNew);$i++){
				 	$tid = $tipsNew[$i];
				 	$iid = $id;
				 	mysqli_stmt_execute($stmt);
				 }
				 echo "上传成功";
			}
			
		
		}
		else{
			echo "链接数据库错误，请联系管理员";
		}
	 }
	 else echo "上传失败，请检查上传的目录是否正确.";
	 //链接数据库
	 
}
else{
	echo "发生了奇怪的错误.";
}
?>