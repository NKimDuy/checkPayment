<?php

	/*
		file có chức năng hiện các sinh viên của lớp tương ứng
	*/
	session_start();
	
	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$idClass = $_GET['idClass'];

	$type = $_GET['type'];

	$curl = connectCurl();
	
	$query = thongTinSinhVienTheolopTheoHocKy($curl, $madvpc = 'TX', $nhhk = $_SESSION['NHHK'], $malop = $idClass, $type = $type);

	$arrResult = [];

	foreach($query['data'] as $r){
		$temp = [];
			
		array_push($temp, $r['MaSV']);
		
		array_push($temp, $r['HoLotSV']);

		array_push($temp, $r['TenSV']);

		array_push($temp, $r['NgaySinhC']);

		array_push($temp, $r['PHAI']);

		array_push($temp, $r['TenLop']);
		
		array_push($arrResult, $temp);
	}
	
	
	echo json_encode(['data' => $arrResult, 'url' => $conf['rootUrl'], 'MaLop' => $idClass]);
?>