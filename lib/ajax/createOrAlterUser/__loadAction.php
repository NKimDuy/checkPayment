<?php
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$sql = "select action, descript, group_action from action";
	
	$query = mysqli_query($con, $sql);
	
	$arrResultPage = [];
	
	$arrResultDvlk = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['action']);
			
			array_push($temp, $r['descript']);
			
			if($r['group_action'] == "1")
			{
				array_push($arrResultPage, $temp);
			}
			else
			{
				array_push($arrResultDvlk, $temp);
			}
		}
	}
	
	echo json_encode(['action' => $arrResultPage, 'dvlk' => $arrResultDvlk]);
?>