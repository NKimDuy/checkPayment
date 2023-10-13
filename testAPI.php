<?php
	
	/*
		file có chức năng hiện các phiếu đóng tiền cụ thể của sinh viên tương ứng
	*/

	session_start();

	// foreach($_SESSION['percent'] as $r1){

	// 	foreach($_SESSION['BillPaid_DVLK'] as $r2){

	// 		$SoCTu = trim($r2['TTPThu']["SoCTu"]);

	// 		$check = substr(trim($SoCTu),0,2);

	// 		if ($check != "TX") {

	// 			$temp = [];

	// 			$paid_SV = 0;

	// 			//tính quyết toán theo Lớp
	// 			foreach($r2['DSMH'] as $r3){

	// 				if ($r1['NhomTo'] == $r3['NhomTo']){

	// 					$r1['TongTien'] += (int)$r3['PhaiThuMH'];

	// 					$paid_SV += (int)$r3['PhaiThuMH'];

	// 				}

	// 			}

	// 			$date = $r2['TTPThu']["NgayTChi"];

	// 			$ghiChu = $r2['TTPThu']["GHICHUPT"];

	// 			if ($paid_SV != 0) {

	// 				$temp = [	
	// 					"MaSV" => $r2['MaSV'], 
	// 					"HoLotSV" => $r2['HoLotSV'],
	// 					"TenSV" => $r2['TenSV'],
	// 					"NhomTo" => $r1['NhomTo'],
	// 					"PhaiThu" => $paid_SV,
	// 					"NgayDong" => $date,
	// 					"GhiChu" => $ghiChu
	// 				];
		
	// 			}

	// 			//DSSV đóng học phí phân theo lớp

	// 			if ($temp != []) array_push($_SESSION['arrResult_DSSV'], $temp);

	// 		}

	// 	}

	// 	$r1['QuyetToan'] = ($r1['TongTien']*$r1['PhanTram'])/100;

	// 	if ($r1['TongTien'] != 0) array_push($_SESSION['arrList_Class'], $r1); //Danh sách các lớp có quyết toán

	// 	$_SESSION['paid_DVLK'] += $r1['TongTien']; //tổng số tiền SV đã đóng

	// 	$_SESSION['accounting_DVLK'] += $r1['QuyetToan']; //Số tiền quyết toán cho ĐVLk
	
	// }

	// echo var_dump($_SESSION['arrResult_DSSV']);

	$arr_ListSV = [];

	foreach($_SESSION['arrResult_DSSV'] as $r) {

		$temp = [];

		if ($r['NhomTo'] == 'TM003') {

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

	echo var_dump($arr_ListSV);

	?>

