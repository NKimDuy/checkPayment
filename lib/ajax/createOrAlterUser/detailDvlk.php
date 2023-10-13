<?php

	/*
		hiện các view được phép truy cập của dvlk 
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$dvlk = $_GET['dvlk'];
	
	$con = connectSql();
	
	$sql = "select action.action, group_action 
	
			from action 
			
			join permission_action 
			on permission_action.action = action.action 
			
			where permission_action.permission = '" . $dvlk . "'";
	
	$query = mysqli_query($con, $sql);
	
	$arrResultAction = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['action']);
			
			array_push($temp, $r['act']);
			
			array_push($temp, $r['descr']);
			
			if($r['group_action'] == "1")
			{
				array_push($arrResultAction, $temp);
			}
		}
	}
	
	echo json_encode(['action' => $arrResultAction]);
	
?>