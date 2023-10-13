<?php

	/*
		hiện các User sẽ bị ảnh hưởng khi xóa permission
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$permissionOrDvlk = $_GET['permissionOrDvlk'];
	
	$arrUser = [];
	
	$sqlCheckUserHasPermission = "select user.mail  
				from user 
				
				join user_permission 
				on user_permission.mail = user.mail 
				
				join permission 
				on permission.permission = user_permission.permission 
				
				where permission.permission = '" . $permissionOrDvlk . "'";
				
	$checkUserHasPermission = mysqli_query($con, $sqlCheckUserHasPermission);
	
	if($checkUserHasPermission)
	{
		$numberUsers = mysqli_num_rows($checkUserHasPermission);
		
		if($numberUsers > 0)
		{
			while($r = mysqli_fetch_assoc($checkUserHasPermission))
			{
				array_push($arrUser, $r['mail']);
			}
			
			echo json_encode(['data' => $arrUser]);
		}
		else
		{
			echo json_encode(['confirm' => 0]);
		}
		
	}
	
?>