<?php
	
	/*
		file có nhiệm vụ hiện các phiếu cho dvlk xác nhận đã được kế toán xác nhận và gửi sang
	*/

	session_start();
	
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$con = connectSql();

	// select các phiếu quyết toán đã được tạo, và được kế toán nhấn gửi sang cho dvlk
	if ($_SESSION['MaDP'] == "All") {

		$sql = "select * 
	
		from link_unit_accounting";

	} else {

		$sql = "select * 

		from link_unit_accounting 
		
		where unit = '" . $_SESSION['MaDP'] . "'";
	}
	
	$query = mysqli_query($con, $sql);

	$data = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];

			$temp = [	
				"MaDP" => $r['unit'],
				"MaLop" => $r['id_class'],
				"NhomTo" => $r['id_group'],
				"TenLop" => $r['class_name'],
				"SoHD" => $r['id_contract'],
				"NamHD" => $r['year_contract'],
				"HeDT" => $r['full_tier'],
				"PhanTram" => $r['percent_accounting']
			];
			
			array_push($data, $temp);
		}
	}

	echo json_encode(['data' => $data]);
	
?>