<?php

	/*
		file có nhiệm vụ hiện các môn học cụ thể của từng phiếu đóng tiền của sinh viên
	*/

	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$MaSV = $_GET['masv'];

	$curl = connectCurl();
	
	$query = thongTin1SinhVien($curl, $masv = $MaSV);
	
	$arrResult = $query['data'];
	
	echo json_encode(['data' => $arrResult]);
?>