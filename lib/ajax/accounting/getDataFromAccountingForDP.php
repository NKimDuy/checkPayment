<?php
	
	/*
		file có nhiệm vụ hiện các phiếu cho dvlk xác nhận đã được kế toán xác nhận và gửi sang
	*/

	session_start();
	
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$con = connectSql();

	// select các phiếu quyết toán đã được tạo, và được kế toán nhấn gửi sang cho dvlk
	$sql = "select * 
	
			from accounting 
			
			where ma_dvlk = '" . $_SESSION['MaDP'] . "' and status = 1";
	
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

			$temp = [	
				"ID_accounting" => $r['ID_accounting'], 
				"MaDP" => $r['ma_dvlk'],
				"TenDP" => $r['dvlk'],
				"createDay" => date_format(date_create_from_format("Y-m-d",$r['create_day']),"d/m/Y"),
				"Year" => substr($r['year'],5,4),
				"Round" => $round,
				"PhaiThu" => $r['total'],
				"QuyetToan" => $r['total_discount'],
				"DPXacNhan" => $r['dvlk_confirm'],
				"OUXacNhan" => $r['ou_confirm'],
				"NgayQT" => $r['accounting_day'],
				"dateRange" => $r['dateRange'],
				"TrangThai" => $r['status']
			];
			
			array_push($data, $temp);
		}
	}
	echo json_encode(['data' => $data]);
	
?>