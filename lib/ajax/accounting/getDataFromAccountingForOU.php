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
	
		from accounting";

	} else {

		$sql = "select * 

		from accounting 
		
		where ma_dvlk = '" . $_SESSION['MaDP'] . "'";
	}
	
	

	
	$query = mysqli_query($con, $sql);

	$data = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];

			if ($r['round'] == "r1") {

				$round = "Đợt 1";
	
			} elseif ($r['round'] == "r2") {
	
				$round = "Đợt 2";
	
			} else {
				
				$round = "Đợt 3";
	
			}

			if ($r['tier'] == "tx") {

				$tier = "Đào tạo từ xa (Truyền thống)";
	
			} elseif ($r['round'] == "vl") {
	
				$tier = "Vừa làm vừa học";
	
			} elseif ($r['round'] == "tt") {
				
				$tier = "Đào tạo từ xa (Trực tuyến)";
	
			}

			$temp = [	
				"ID_accounting" => $r['ID_accounting'], 
				"MaDP" => $r['ma_dvlk'],
				"TenDP" => $r['dvlk'],
				"HeDT" => $tier,
				"createDay" => date_format(date_create_from_format("Y-m-d",$r['create_day']),"d/m/Y"),
				"Year" => substr($r['year'],5,4),
				"Round" => $round,
				"PhaiThu" => $r['total'],
				"QuyetToan" => $r['total_discount'],
				"DPXacNhan" => $r['dvlk_confirm'],
				"OUXacNhan" => $r['ou_confirm'],
				"NgayQT" => $r['accounting_day'],
				"dateRange" => $r['dateRange'],
				"TrangThai" => $r['status'],
				"Khac" => $r['note']
			];
			
			array_push($data, $temp);
		}
	}

	echo json_encode(['data' => $data]);
	
?>