<?php

	/*
		file có chức năng hiện các lớp tương ứng của các dvlk mà user được phép thấy
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();

	// Lay danh sach mon hoc to chuc tai don vi
	
	$query_Subject = TKBtheoDiaPhuong($curl, $nhhk = $_SESSION['NHHK'], $madp = $_SESSION['MaDP'], $malop, $type);

	$arrResult_Subject = [];

	foreach($query_Subject['data'] as $r){

		$temp = [];

		array_push($temp, $r['NhomTo'], $r['MaMH'], $r['TenMH']);

		array_push($arrResult_Subject, $temp);

	}
	
	$arrResult_Subject = array_unique($arrResult_Subject, SORT_REGULAR);
	
	// ---------------------------

	// Lay doanh thu theo mon hoc

	$arrResult_Revenue = [];

	foreach($arrResult_Subject as $r1){

		$temp = $r1;

		$count_student = 0;

		$revenue_Subject = 0;

		foreach($_SESSION['Bill_DVLK'] as $r2){
				
			foreach($r2['DSMH'] as $r3){

				//lay mon hoc sinh vien dang ki, chi tinh doanh cac mon hoc dang ki tai don vi
				if ($r3['NhomTo'] == $r1[0] && $r3['MaMH'] == $r1[1]) {

					if ((int)$r3['PhaiThuMH'] > 0) {

						$count_student += 1;
			
					} else {
			
						$count_student -= 1;
			
					}

					$revenue_Subject += (int)$r3['PhaiThuMH'];

				}
			}

		}

		array_push($temp, $count_student, $revenue_Subject);

		array_push($arrResult_Revenue, $temp);

	}

	echo json_encode(['data' => $arrResult_Revenue, 'rootUrl' => $conf['rootUrl']]);
	
?>