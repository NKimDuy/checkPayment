<?php

	/*
		hiện các user hiện có trong csdl
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$sql = "select * from user";
	
	$query = mysqli_query($con, $sql);
	
	$arrUser = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			array_push($arrUser, $r);
		}
	}
	
	echo json_encode(['data' => $arrUser, 'superUser' => $_SESSION['superUser']]);
?>