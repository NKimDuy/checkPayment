<?php

	/*
		file có chức năng hiện các sinh viên của lớp tương ứng
	*/
	session_start();
	
	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$MaMH = $_GET['MaMH'];

	$MaNH = $_GET['MaNH'];

	$TenMH = $_GET['TenMH'];

	$curl = connectCurl();
	
	$query = DSSVTheoMonHoc($curl, $madvpc = 'TX', $nhhk = $_SESSION['NHHK'], $mamh = $MaMH, $manh = $MaNH);

	$arrResult = $query['data'];
	
	echo json_encode(['data' => $arrResult, 'url' => $conf['rootUrl'], 'MaMH' => $MaMH, 'TenMH' => $TenMH]);
?>