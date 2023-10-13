<?php
	
	/*
		kiểm tra mật khẩu nhập lại có khớp với mật khẩu trong csdl hay không
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$oldPassword = $_POST["oldPassword"];
	
	$con = connectSql();
	
	$sql = "select password1 from user where mail = '" . $_SESSION['mail'] . "'";
	
	$query = mysqli_query($con, $sql);
	
	$oldPassword = hash_hmac("sha256", $oldPassword, $_SESSION['mail']);
	
	if($query)
	{
		
		$r = mysqli_fetch_assoc($query);
		
		if($oldPassword == $r["password1"])
		
			echo json_encode(["confirm" => "correct"]);
		
		else
			
			echo json_encode(["confirm" => "incorrect"]);
	}
	
?>