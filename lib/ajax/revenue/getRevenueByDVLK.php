<?php

	/*
		file có chức năng hiện các lớp tương ứng của các dvlk mà user được phép thấy
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();

	$arrResult_DSSV = [];

	$arrResult_Revenue = [];

	$revenue_DVLK = 0; //doanh thu ĐVLK

	$revenue_paid = 0; //doanh thu đã đóng tiền

	$revenue_notPaid = 0; //doanh thu đã đóng tiền

	foreach($_SESSION['Bill_DVLK'] as $r1){

		$temp = [];

		$revenue_SV = 0;
	
		//tính số tiền cần phải đóng từng sinh viên
		foreach($r1['DSMH'] as $r2){

			$revenue_SV += (int)$r2['PhaiThuMH'];

		}

		// tình trạng đóng tiền
		if ($r1['IDPThu'] != null) {

			$check_paid = 'đã đóng';

			$date = $r1['TTPThu']["NgayTChi"];

			$revenue_paid += $revenue_SV;

		} else {

			$check_paid = 'chưa đóng';

			$date = ' ';

			$revenue_notPaid += $revenue_SV;

		}

		$revenue_DVLK += $revenue_SV;

		array_push($temp, $r1['MaSV'], $r1['HoLotSV'], $r1['TenSV'], $r1['MaLop'], $r1['TenLop'], $revenue_SV, $check_paid, $date);

		array_push($arrResult_DSSV, $temp);

	}

	array_push($arrResult_Revenue, $revenue_DVLK, $revenue_paid, $revenue_notPaid);

	echo json_encode(['dssv' => $arrResult_DSSV, 'revenue' => $arrResult_Revenue, 'rootUrl' => $conf['rootUrl']]);

?>