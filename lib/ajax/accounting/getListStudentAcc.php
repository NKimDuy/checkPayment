<?php
	
	/*
		file có nhiệm vụ hiện các phiếu cho dvlk xác nhận đã được kế toán xác nhận và gửi sang
	*/

	session_start();
	
	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	include_once ("../../../db/connectSql.php");

	$curl = connectCurl();

	$con = connectSql();

	$NhomTo = $_GET['NhomTo'];

	$arrInfoClass = [$_GET['MaLop'], $_GET['TenLop'], $_SESSION['descriptMaDP']];

	$arr_ListSV = [];

	foreach($_SESSION['arrResult_DSSV'] as $r) {

		$temp = [];

		if ($r['NhomTo'] == $NhomTo) {

			$temp = [	
				"MaSV" => $r['MaSV'], 
				"HoLotSV" => $r['HoLotSV'],
				"TenSV" => $r['TenSV'],
				"PhaiThu" => $r['PhaiThu'],
				"NgayDong" => $r['NgayDong'],
				"GhiChu" => $r['GhiChu']
			];

		}

		if ($temp != []) array_push($arr_ListSV, $temp);

	}

	echo json_encode(['info' => $arrInfoClass, 'dssv' => $arr_ListSV]);
	
?>