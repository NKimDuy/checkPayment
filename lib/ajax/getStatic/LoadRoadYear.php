<?php

	/*
		file có nhiệm vụ trả về các học kì đang có trong csdl, và thêm vào dropdownlist
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");

	include_once ("../../../db/api.php");
	
	global $conf;

	$curl = connectCurl();

	$con = connectSql();

	//ACCOUNTING

		// Lấy thông tin Đợt quyết toán để user chọn

		$sql_RY = "select * from choice 
					where type = 'year' or type = 'round' or type = 'tier'";
		
		$queryRY = mysqli_query($con, $sql_RY);
		
		$arrSelectRY= [];
		
		if($queryRY)
		{
			while($r = mysqli_fetch_assoc($queryRY))
			{
				$temp = [];
				
				array_push($temp, $r['value']);
				
				array_push($temp, $r['descript']);

				array_push($temp, $r['type']);
				
				array_push($arrSelectRY, $temp);
			}
		}


	
		echo json_encode(

			[
				'selectRY' => $arrSelectRY, 'resultRY' => $arrResultRY
	
			]
		
		);
	?>