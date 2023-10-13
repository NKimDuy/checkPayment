<?php

	/*
		file có chứng năng get tất cả các Phiếu nộp tiền của DVLK theo học kỳ đã chọn
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	include_once ("../../../db/connectSql.php");

	$curl = connectCurl();

	$con = connectSql();

	//Lây dữ liệu đóng học phí để quyết toán

	// $_SESSION['BillPaid_DVLK'] = [];

	// $_SESSION['dateRange'] = $_GET['DateRange'];

	// $_SESSION['fromDate'] =  substr($_SESSION['dateRange'],0,10);

	// $_SESSION['toDate'] = substr($_SESSION['dateRange'],13,10);

	// $query = thongTinDongHocPhiDiaPhuong($curl, $madvpc = 'TX', $fromdate = $_SESSION['fromDate'], $todate = $_SESSION['toDate'], $madp = $_SESSION['MaDP']);

	// $_SESSION['BillPaid_DVLK'] = json_decode(bzdecompress(base64_decode($query['data'])), true);

	// Lất dữ liệu phần trăm từ  sql

	$sql = "select * 
	
			from link_unit_accounting
				
			where unit = '" . $_SESSION['MaDP'] . "'";
	
	$query_Percent = mysqli_query($con, $sql);

	$_SESSION['percent'] = []; //mảng chứa các lớp và phần trăm thuộc ĐVLK

	if($query_Percent)
	{
		while($r = mysqli_fetch_assoc($query_Percent))
		{
			$temp = [];

			$temp = [	
						"MaLop" => $r['id_class'], 
						"NhomTo" => $r['id_group'],
						"TenLop" => $r['class_name'],
						"PhanTram" => $r['percent_accounting']
					];
			
			array_push($_SESSION['percent'], $temp);
		}
	}

	//Chuẩn bị dữ liệu để tạo Phiếu Quyết tóan

	$_SESSION['arrList_Class'] = [];

	$_SESSION['arrResult_DSSV'] = [];

	$arrResult_Accounting = [];

	$_SESSION['paid_DVLK'] = 0;

	$_SESSION['accounting_DVLK'] = 0;

	foreach($_SESSION['percent'] as $r1){

		foreach($_SESSION['BillPaid_DVLK'] as $r2){

			$SoCTu = trim($r2['TTPThu']["SoCTu"]);

			$check = substr(trim($SoCTu),0,2);

			if ($check != "TX") {

				$temp = [];

				$paid_SV = 0;

				//tính quyết toán theo Lớp
				foreach($r2['DSMH'] as $r3){

					if ($r1['NhomTo'] == $r3['NhomTo']){

						$r1['TongTien'] += (int)$r3['PhaiThuMH'];

						$paid_SV += (int)$r3['PhaiThuMH'];

					}

				}

				$date = $r2['TTPThu']["NgayTChi"];

				$ghiChu = $r2['TTPThu']["GHICHUPT"];

				if ($paid_SV != 0) array_push($temp, $r2['MaSV'], $r2['HoLotSV'], $r2['TenSV'], $paid_SV, $date, $ghiChu, $r1['NhomTo'],$r1['MaLop'],$r1['TenLop']);

				//DSSV đóng học phí phân theo lớp

				if ($temp != []) array_push($_SESSION['arrResult_DSSV'], $temp);

			}

		}

		$r1['QuyetToan'] = ($r1['TongTien']*$r1['PhanTram'])/100;

		if ($r1['TongTien'] != 0) array_push($_SESSION['arrList_Class'], $r1); //Danh sách các lớp có quyết toán

		$_SESSION['paid_DVLK'] += $r1['TongTien']; //tổng số tiền SV đã đóng

		$_SESSION['accounting_DVLK'] += $r1['QuyetToan']; //Số tiền quyết toán cho ĐVLk
	
	}

	array_push($arrResult_Accounting, $_SESSION['MaDP'], $_SESSION['descriptMaDP'], $_SESSION['dateRange'], $_SESSION['paid_DVLK'], $_SESSION['accounting_DVLK']);
	
	echo json_encode(['accounting' => $arrResult_Accounting, 'arrList_Class' => $_SESSION['arrList_Class'], 'arrResult_DSSV' => $_SESSION['arrResult_DSSV'], 'rootUrl' => $conf['rootUrl']]);
	
?>