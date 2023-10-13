<?php

	/*
		file có chức năng hiện các lớp tương ứng của các dvlk mà user được phép thấy
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();
	
	$query = TKBtheoDiaPhuong($curl, $nhhk = $_SESSION['NHHK'], $madp = $_SESSION['MaDP'], $malop, $type);

	$arrResult = [];

	$check = [];

	foreach($query['data'] as $r){

		$temp = [];

		if( !in_array($r['MaLop'], $check, true) && (substr($r['MaLop'], 0, 2) == $_SESSION['MaDP']) ){

			// mảng check để loại bỏ phần tử trùng
			array_push($check, $r['MaLop']);

			// dem so luong sinh vien dau vao
			$Student = thongTinSinhVienTheolopTheoHocKy($curl, $madvpc = 'TX', $nhhk = $_SESSION['NHHK'], $malop = $r['MaLop'], $type = null);

			$Count_Student = count($Student['data']);

			//dem so luong sinh vien co dang ki mon hoc
			$StudentRegister = thongTinSinhVienTheolopTheoHocKy($curl, $madvpc = 'TX', $nhhk = $_SESSION['NHHK'], $malop = $r['MaLop'], $type = 'kqdkmh');

			$Count_StudentRegister = count($StudentRegister['data']);

			array_push($temp, $r['MaLop'], $r['TenLop'], $Count_Student, $Count_StudentRegister);

			array_push($arrResult, $temp);

		}
	}
	
	echo json_encode(['data' => $arrResult, 'rootUrl' => $conf['rootUrl']]);
	
?>