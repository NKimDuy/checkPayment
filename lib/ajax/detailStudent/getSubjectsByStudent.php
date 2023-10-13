<?php

	/*
		file có nhiệm vụ hiện các môn học cụ thể của từng phiếu đóng tiền của sinh viên
	*/

	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$MaSV = $_GET['masv'];

	$curl = connectCurl();
	
	$query = DSMHSinhVienDangKy($curl, $masv = $MaSV, $nhhk = $_SESSION['NHHK']);
	
	$arrResult = $query['data'];

	$TenSV = $query['data'][0]['TenDayDu'];

	echo json_encode(['data' => $arrResult, 'TenSV' => $TenSV, 'MaSV' => $MaSV]);
?>