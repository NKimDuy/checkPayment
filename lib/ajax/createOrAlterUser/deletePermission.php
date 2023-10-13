<?php
	
	/*
		Xóa Permission hiện có
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$permission = $_GET['permissionOrDvlk'];
	
	$sqlDeletePermision = "delete from permission where permission = '" . $permission . "'";
	
	$CheckDeleteSuccess = mysqli_query($con, $sqlDeletePermision);
	
	echo json_encode(['confirm' => $CheckDeleteSuccess]);
	
?>