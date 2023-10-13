<?php
	
	/*
		Xóa đvlk hiện có (xóa ở 2 bảng permission và action)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$dvlk = $_GET['permissionOrDvlk'];
	
	$users = $_GET['users'];
	
	$flag = true;
	
	
	$sqlDeleteDvlk = "delete from permission where permission = '" . $dvlk . "'";
	
	$CheckDeleteDvlkSuccess = mysqli_query($con, $sqlDeleteDvlk);
	
	$sqlDeleteDvlkInAction = "delete from action where action = '" . $dvlk . "'";
	
	$CheckDeleteActionSuccess = mysqli_query($con, $sqlDeleteDvlkInAction);
	
	if(!$CheckDeleteDvlkSuccess || !$CheckDeleteActionSuccess)
	{
		$flag = false;
	}
	
	
	
	
	$arrUser = explode(', ', rtrim($users, ", "));
	
	foreach($arrUser as $u)
	{
		$sqlDeleteUser = "delete from user where username = '" . $u . "'";
				
		$checkDeleteUser = mysqli_query($con, $sqlDeleteUser);
		
		if(!$checkDeleteUser)
		{
			$flag = false;
		}
	}
	
	
	echo json_encode(['confirm' => $flag]);
	
?>