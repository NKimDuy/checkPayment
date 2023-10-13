<?php

	/*
		file có nhiệm vụ trả về hướng dẫn của các chức năng
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	global $conf;
	
	$con = connectSql();
	
	$sql = "select * from guide";
	
	$query = mysqli_query($con, $sql);
	
	$arrResult = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['idGuide']);
			
			array_push($temp, $r['tieuDe']);

			array_push($temp, $r['conTent']);

			array_push($temp, $r['urlVideo']);

			array_push($temp, $r['urlHinh']);
			
			array_push($arrResult, $temp);
		}
	}
	
	echo json_encode(['data' => $arrResult]);
?>