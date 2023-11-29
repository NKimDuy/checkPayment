<?php
	
	/*
		file có nhiệm vụ hiện các phiếu cho dvlk xác nhận đã được kế toán xác nhận và gửi sang
	*/

	session_start();
	
	include_once ("../../../db/config.php");

	include_once ("../../../db/connectSql.php");

	$con = connectSql();

	$idAccounting = $_GET['IdAccounting'];

	// Lất dữ liệu phiếu quyết toán
	$arrResult_Accounting = [];

	$sql_data = "select * 
	
				from accounting 
				
				where ID_accounting = '" . $idAccounting . "'";
	
	$query_data = mysqli_query($con, $sql_data);

	if($query_data)
	{
		while($r = mysqli_fetch_assoc($query_data))
		{
			$temp = [];

			if ($r['round'] == "r1") {

				$round = "Đợt 1";
	
			} elseif ($r['round'] == "r2") {
	
				$round = "Đợt 2";
	
			} else {
				
				$round = "Đợt 3";
	
			}

			if ($r['tier'] == "tx") {

				$tier = "Đào tạo từ xa (Truyền thống)";
	
			} elseif ($r['round'] == "vl") {
	
				$tier = "Vừa làm vừa học";
	
			} elseif ($r['round'] == "tt") {
				
				$tier = "Đào tạo từ xa (Trực tuyến)";
	
			}

			$temp = [	
				"ID_accounting" => $r['ID_accounting'], 
				"MaDP" => $r['ma_dvlk'],
				"TenDP" => $r['dvlk'],
				"HeDT" => $tier,
				"createDay" => date_format(date_create_from_format("Y-m-d",$r['create_day']),"d/m/Y"),
				"Year" => substr($r['year'],5,4),
				"Round" => $round,
				"PhaiThu" => $r['total'],
				"QuyetToan" => $r['total_discount'],
				"DPXacNhan" => $r['dvlk_confirm'],
				"OUXacNhan" => $r['ou_confirm'],
				"NgayQT" => $r['accounting_day'],
				"dateRange" => $r['dateRange'],
				"TrangThai" => $r['status']
			];
			
			array_push($arrResult_Accounting, $temp);
			
		}
	}

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
						"PhanTram" => $r['percent_accounting'],
						"TongTien" => 0
					];
			
			array_push($_SESSION['percent'], $temp);
		}
	}

	// Lấy dữ liệu sinh viên theo phiếu quyết toán

	$sql_DSSV = "select * 
	
				from student_accounting 
				
				where ID_accounting = '" . $idAccounting . "'";

	$query_DSSV = mysqli_query($con, $sql_DSSV);

	$_SESSION['arrResult_DSSV'] = [];

	if($query_DSSV)
	{
		while($r = mysqli_fetch_assoc($query_DSSV))
		{
			$temp = [];

			$temp = [	
				"MaSV" => $r['mssv'], 
				"HoLotSV" => $r['first_name'],
				"TenSV" => $r['last_name'],
				"NhomTo" => $r['id_group'],
				"PhaiThu" => $r['fee_bill'],
				"NgayDong" => $r['pay_date'],
				"GhiChu" => $r['ghiChu']

			];
			
			array_push($_SESSION['arrResult_DSSV'], $temp);
		}
	}

	//Tạo dữ liệu hiển thi Chi tiết phiếu

	$_SESSION['arrList_Class'] = [];

	foreach($_SESSION['percent'] as $r1){

		$temp = [];

		foreach($_SESSION['arrResult_DSSV'] as $r2){

			if ($r1['NhomTo'] == $r2['NhomTo']){

				$r1['TongTien'] += (int)$r2['PhaiThu'];

			}

		}

		$r1['QuyetToan'] = ($r1['TongTien']*$r1['PhanTram'])/100;

		if ($r1['TongTien'] != 0) array_push($_SESSION['arrList_Class'], $r1); //Danh sách các lớp có quyết toán

	}

	echo json_encode(['accounting' => $arrResult_Accounting, 'arrList_Class' => $_SESSION['arrList_Class'], 'arrResult_DSSV' => $_SESSION['arrResult_DSSV'], 'rootUrl' => $conf['rootUrl']]);
	
?>