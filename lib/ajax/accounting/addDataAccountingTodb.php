<?php

	session_start();

	include_once ("../../../db/config.php");

	include_once("../../../db/connectSql.php");

	$con = connectSql();

	// thiết lập ID của phiếu quyết toán
	$idAccounting = $_SESSION['MaDP']
					.date("ymd")
					.substr($_SESSION['year'],5,4)
					.$_SESSION['round']; 
	
	/* thêm phiếu quyết toán vào bảng accounting  */

	//Tạo % trả thêm
	$percent_another = 0;
	$total_real = 0;

	$SQL_accounting = "insert into accounting (ID_accounting, ma_dvlk, dvlk, tier, create_day, year, round, ou_confirm, dvlk_confirm, total, total_discount, user_create, dateRange, status, percent_another, total_real) values('" .
									$idAccounting . "', '" .  //ID_accounting
									$_SESSION['MaDP'] . "', '" . //ma_dvlk
									$_SESSION['descriptMaDP'] . "', '" . //dvlk
									$_SESSION['tier'] . "', '" . //tier
									date("Y-m-d") . "', '" . //create_day	
									$_SESSION['year'] . "', '" . //year
									$_SESSION['round'] . "', '" . //round
									0 . "', '" . //ou_confirm
									0 . "', '" . //dvlk_confirm
									$_SESSION['paid_DVLK'] . "', '" . //total
									$_SESSION['accounting_DVLK'] . "', '" . //total_discount
									$_SESSION['mail'] . "', '" . //user_create
									$_SESSION['dateRange'] . "', '" . //user_create
									0 . "', '" . //status
									$percent_another . "', '" . 
									$total_real ."')"; 						
	
	$insert_SQL_accounting = mysqli_query($con, $SQL_accounting);	

	/* thêm SV student_accounting  */

	if ($insert_SQL_accounting) {

		foreach($_SESSION['arrResult_DSSV'] as $r) {

			$SQL_student_accounting = "insert into student_accounting values('" 
																				. trim($r['MaSV']) . "', '" 
																				. trim($r['HoLotSV']) . "', '" 
																				. trim($r['TenSV']) . "', '" 
																				. trim($r['NhomTo']) . "', '"	
																				. trim($r['IDPThu']) . "', '"	
																				. trim($r['PhaiThu']) . "', '" 
																				. trim($r['NgayDong']) . "', '" 
																				. trim($r['GhiChu']) . "', '" 
																				. $idAccounting 
																			. "')";
			
			$insert_SQL_student_accounting = mysqli_query($con, $SQL_student_accounting);

		}

	}

	if ($insert_SQL_student_accounting) {

		$confirm =  "Đã cập nhật thành công";

	} else {

		$sql_DEL = "delete from accounting where ID_accounting = '" . $idAccounting . "'";

		$query_DEL = mysqli_query($con, $sql_DEL);

		$confirm =  "Cập nhật không thành công";

	}

	echo json_encode(['test' => $SQL_student_accounting ,'confirm' => $confirm, 'rootUrl' => $conf['rootUrl']]);

?>