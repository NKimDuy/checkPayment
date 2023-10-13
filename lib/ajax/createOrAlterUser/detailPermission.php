<?php

	/*
		hiện các view và các dvlk và các permission được phép truy cập
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$permission = $_GET['permission'];
	
	$con = connectSql();
	
	$sql = "select * 
	
			from action 
			
			join permission_action 
			on permission_action.action = action.action 
			
			where permission_action.permission = '" . $permission . "'";
	
	$query = mysqli_query($con, $sql);
	
	$arrResultAction = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['action']);
			
			array_push($temp, $r['descript']);
			
			array_push($arrResultAction, $temp);
			
			/*
			if($r['group_action'] == "1")
			{
				array_push($arrResultAction, $temp);
			}
			else
			{
				array_push($arrResultDvlk, $temp);
			}
			*/
		}
	}
	
	echo json_encode(['action' => $arrResultAction/*, 'dvlk' => $arrResultDvlk*/]);
	
?>