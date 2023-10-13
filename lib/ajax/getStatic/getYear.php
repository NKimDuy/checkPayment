<?php

	/*
		file có nhiệm vụ trả về các học kì đang có trong csdl, và thêm vào dropdownlist
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$sql = "select * from choice where type = 'year'";
	
	$query = mysqli_query($con, $sql);
	
	$arrResult = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['value']);
			
			array_push($temp, $r['descript']);
			
			array_push($arrResult, $temp);
		}
	}
	
	echo json_encode(['data' => $arrResult]);
?>