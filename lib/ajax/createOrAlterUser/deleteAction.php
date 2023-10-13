<?php
	
	/*
		xóa một action hiện có (xóa các views)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$action = $_GET['action'];
	
	$flag = true;
	
	$sqlDeleteAction = "delete from action where action = '" . $action . "'";
	
	
	$CheckDeleteActionSuccess = mysqli_query($con, $sqlDeleteAction);
	
	if(!$CheckDeleteActionSuccess)
	{
		$flag = false;
	}
	
	echo json_encode(['confirm' => $flag]);
	
?>