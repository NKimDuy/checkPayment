<?php

	/*
		file có chức năng hiện các lớp tương ứng của các dvlk mà user được phép thấy
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();

	// Lay danh sach lop to chuc tai don vi trong hoc ki
	$query_Class = TKBtheoDiaPhuong($curl, $nhhk = $_SESSION['NHHK'], $madp = $_SESSION['MaDP'], $malop, $type);

	$arrResult_Class = [];

	foreach($query_Class['data'] as $r){

		if (!in_array($r['MaLop'], $arrResult_Class, true) && (substr($r['MaLop'], 0, 2) == $_SESSION['MaDP'])) {

			array_push($arrResult_Class, $r['MaLop']);

		}

	}
	
	// ---------------------------

	// Lay doanh thu theo mon hoc

	$arrResult_Revenue = [];

	foreach($arrResult_Class as $r1){

		$revenue_Class = 0;

		$query = thongTinSinhVienTheolopTheoHocKy($curl, $madvpc = 'TX', $nhhk = $_SESSION['NHHK'], $malop = $r1, $type = 'kqdkmh');

		$count_student = count($query['data']);

		foreach($_SESSION['Bill_DVLK'] as $r2){

			if ($r1 == $r2['MaLop']) {

				$temp = [];

				array_push($temp, $r2['MaLop'], $r2['TenLop']);
				
				foreach($r2['DSMH'] as $r3){

					$revenue_Class += (int)$r3['PhaiThuMH'];
				}

			}

		}

		array_push($temp, $count_student, $revenue_Class);

		array_push($arrResult_Revenue, $temp);

	}

	echo json_encode(['data' => $arrResult_Revenue, 'rootUrl' => $conf['rootUrl']]);
	
?>