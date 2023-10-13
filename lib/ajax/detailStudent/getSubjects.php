<?php

	/*
		file có nhiệm vụ hiện các môn học cụ thể của từng phiếu đóng tiền của sinh viên
	*/

	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");
	
	$SoGBHP = $_GET['SoGBHP'];

	$MaSV = $_GET['masv'];

	$curl = connectCurl();
	
	$query = thongTinHoaDonHocPhiSinhVien($curl, $masv = $MaSV, $all = 1, $nhhk , $ttmh = 1, $sogbhp = $SoGBHP);
	
	$arrResult = [];
	
	foreach($query['data'][0]['DSMH'] as $r) 
	{

			$temp = [];
				
			array_push($temp, $r['MaMH']);
			
			array_push($temp, $r['TenMH']);

			array_push($temp, $r['MaNH']);

			array_push($temp, $r['PhaiThu']);
			
			array_push($arrResult, $temp);
	}
	
	echo json_encode(['data' => $arrResult, 'SoGBHP' => $SoGBHP]);
?>