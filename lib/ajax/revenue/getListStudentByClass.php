<?php

	/*
		file có chức năng hiện các sinh viên của lớp tương ứng
	*/
	session_start();
	
	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$MaLop = $_GET['MaLop'];

	$curl = connectCurl();

	$arrResult_SV = [];

	foreach($_SESSION['Bill_DVLK'] as $r1){

		if ($r1['MaLop'] == $MaLop) {

			$temp = [];

			$revenue_SV = 0;

			foreach($r1['DSMH'] as $r2){ 

				if ($r1['IDPThu'] != null) {

					$check_paid = 'đã đóng';
		
					$date = $r1['TTPThu']["NgayTChi"];
		
				} else {
		
					$check_paid ='chưa đóng';
		
					$date = ' ';
		
				}  

				$revenue_SV += (int)$r2['PhaiThuMH'];
	
			}

			array_push($temp, $r1['MaSV'], $r1['HoLotSV'], $r1['TenSV'], $r1['MaLop'], $r1['TenLop'], $revenue_SV, $check_paid, $date);

			array_push($arrResult_SV, $temp);

		}

	}
	
	echo json_encode(['dssv' => $arrResult_SV, 'url' => $conf['rootUrl'], 'MaLop' => $MaLop]);
?>