<?php
	
	/*
		file có chức năng hiện các phiếu đóng tiền cụ thể của sinh viên tương ứng
	*/

	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");
	
	$MaSV = $_GET['masv'];

	$curl = connectCurl();

	$query = thongTinHoaDonHocPhiSinhVien($curl, $masv = $MaSV, $all = 1, $nhhk = null , $ttmh = 1, $sogbhp);

	$arrResult = [];

	foreach($query['data'] as $r){
		$temp = [];

		array_push($temp, $r['NHHK']);
			
		array_push($temp, $r['SoGBHP']);
		
		array_push($temp, $r['TongTien']);

		if ($r['IDPThu'] == null) {
			array_push($temp, 'chưa đóng');
		} else {
			array_push($temp, 'đã đóng');
		}

		array_push($temp, $r['TTTChi']['NgayTChi']);
		
		array_push($arrResult, $temp);
	}

	echo json_encode(['data' => $arrResult, 'MaSV' => $MaSV]);
?>