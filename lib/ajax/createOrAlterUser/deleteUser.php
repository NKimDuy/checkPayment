<?php

	/*
		Xóa user hiện có
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$mail = $_GET['mail'];
	
	$flag = true;
	
	$sqlDeleteUser = "delete from user where mail = '" . $mail . "'";
	
	
	$CheckDeleteUserSuccess = mysqli_query($con, $sqlDeleteUser);
	
	if(!$CheckDeleteUserSuccess)
	{
		$flag = false;
	}
	
	echo json_encode(['confirm' => $flag]);
	
?>