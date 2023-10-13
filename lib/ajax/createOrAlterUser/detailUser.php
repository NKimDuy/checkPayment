<?php

	/*
		hiện thông tin chi tiết của sinh viên tương ứng (bao gồm permission mà User được gán quyền)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$mail = $_GET['mail'];
	
	$con = connectSql();
	
	$sqlUser = "select full_name, phone, mail, group_user 
	
			from user 
			
			where user.mail = '" . $mail . "'";
	
	$queryUser = mysqli_query($con, $sqlUser);
	
	$arrUser = [];
	
	if($queryUser)
	{
		while($r = mysqli_fetch_assoc($queryUser))
		{
			array_push($arrUser, $r['mail']);
			
			array_push($arrUser, $r['full_name']);
			
			array_push($arrUser, $r['phone']);
			
			array_push($arrUser, $r['group_user']);
		}
	}
	
	$sqlPermission = "select permission 
	
						from user_permission 
						
						join user 
						on user_permission.mail = user.mail 
						
						where user.mail = '" . $mail . "'";
	
	$queryPermission = mysqli_query($con, $sqlPermission);
	
	$arrResultPermission = [];
	
	if($queryPermission)
	{
		while($r = mysqli_fetch_assoc($queryPermission))
		{
			$temp = [];
			
			array_push($temp, $r['permission']);
			
			array_push($arrResultPermission, $temp);
			
		}
	}
	
	$sqlLinkUnit = "select unit 
	
						from user_link_unit 
						
						join user 
						on user.mail = user_link_unit.mail 
						
						where user.mail = '" . $mail . "'";
	
	$queryLinkUnit = mysqli_query($con, $sqlLinkUnit);
	
	$arrResultLinkUnit = [];
	
	if($queryLinkUnit)
	{
		while($r = mysqli_fetch_assoc($queryLinkUnit))
		{
			$temp = [];
			
			array_push($temp, $r['unit']);
			
			array_push($arrResultLinkUnit, $temp);
			
		}
	}
	
	echo json_encode(['user' => $arrUser, 'permission' => $arrResultPermission, 'linkUnit' => $arrResultLinkUnit]);
?>