<?php

	/*
		file có nhiệm vụ trả về các học kì đang có trong csdl, và thêm vào dropdownlist
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$sql = "select * from choice";
	
	$query = mysqli_query($con, $sql);
	
	$arrResult = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['value']);
			
			array_push($temp, $r['descript']);

			array_push($temp, $r['type']);
			
			array_push($arrResult, $temp);
		}
	}
	
	echo json_encode(['data' => $arrResult, 'NHHK' => $_SESSION['NHHK'], 'MaDP' => $_SESSION['MaDP']]);
?>