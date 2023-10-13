<?php
	
	/*
		hiện các permission, dvlk, action hiện có trong csdl
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$arrResultPerMission = [];
	
	$arrResultAction = [];
	
	$arrResultDvlk = [];
	
	$con = connectSql();
	
	$sqlGetPerMission = "select permission, descript from permission";
	
	$getPerMission = mysqli_query($con, $sqlGetPerMission);
	
	if($getPerMission)
	{
		while($r = mysqli_fetch_assoc($getPerMission))
		{
			$temp = [];
			
			array_push($temp, $r['permission']);
			
			array_push($temp, $r['descript']);
			
			array_push($arrResultPerMission, $temp);
		}
	}
	
	$sqlGetAction = "select action, descript from action";
	
	$getAction = mysqli_query($con, $sqlGetAction);
	
	if($getAction)
	{
		while($r = mysqli_fetch_assoc($getAction))
		{
			$temp = [];
			
			array_push($temp, $r['action']);
		
			array_push($temp, $r['descript']);
			
			array_push($arrResultAction, $temp);
		}
	}
	
	$sqlGetLinkUnit = "select unit, descript from link_unit";
	
	$getLinkUnit = mysqli_query($con, $sqlGetLinkUnit);
	
	if($getLinkUnit)
	{
		while($r = mysqli_fetch_assoc($getLinkUnit))
		{
			$temp = [];
			
			array_push($temp, $r['unit']);
		
			array_push($temp, $r['descript']);
			
			array_push($arrResultDvlk, $temp);
		}
	}
	
	echo json_encode(['permission' => $arrResultPerMission, 'action' => $arrResultAction, 'dvlk' => $arrResultDvlk]);
?>