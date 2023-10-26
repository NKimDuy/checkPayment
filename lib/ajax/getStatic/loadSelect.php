<?php

	/*
		file có nhiệm vụ trả về các học kì đang có trong csdl, và thêm vào dropdownlist
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");

	include_once ("../../../db/api.php");
	
	global $conf;
	
	$con = connectSql();

	$curl = connectCurl();

	//DP

		// Lấy thông tin Địa phương để user chọn

		$arrSelectDP = [];
		
		$queryDP = thongTinDiaPhuong($curl);
		
		foreach($_SESSION['dvlk'] as $dvlk)
		{
			foreach($queryDP['data'] as $r)
			{
				if($dvlk[0] == $r['MaDP'])
				{
					$temp = [];
					
					array_push($temp, $r['MaDP']);
					
					array_push($temp, $r['TenDP']);
					
					array_push($arrSelectDP, $temp);
					
					break;
				}
			}
		}

		//Lưu thông tin địa phương đã chọn

		$arrResultDP = [];

		if ($_SESSION['MaDP'] != null) {

			$temp = [];

			array_push($temp, $_SESSION['MaDP']);

			array_push($temp, $_SESSION['descriptMaDP']);

			array_push($arrResultDP, $temp);

		} else {

			$arrResultDP = null;

		}

	//SEMESTER

		// Lấy thông tin HỌC KỲ để user chọn

		$sql_NHHK = "select * from choice 
						where type = 'semester' or type = 'schoolyear'";
		
		$queryNHHK = mysqli_query($con, $sql_NHHK);
		
		$arrSelectNHHK= [];
		
		if($queryNHHK)
		{
			while($r = mysqli_fetch_assoc($queryNHHK))
			{
				$temp = [];
				
				array_push($temp, $r['value']);
				
				array_push($temp, $r['descript']);

				array_push($temp, $r['type']);
				
				array_push($arrSelectNHHK, $temp);
			}
		}

		//Lưu thông tin HỌC KỲ đã chọn

		$arrResultNHHK = [];

		if ($_SESSION['NHHK'] != null) {

			$temp = [];

			array_push($temp, $_SESSION['nk']);

			array_push($temp, $_SESSION['descriptNK']);

			array_push($temp, $_SESSION['hk']);

			array_push($temp, $_SESSION['descriptHK']);

			array_push($arrResultNHHK, $temp);

		} else {

			$arrResultNHHK = null;

		}



	echo json_encode(

		[
			'selectDP' => $arrSelectDP, 'resultDP' => $arrResultDP, 
		
			'selcetNHHK' => $arrSelectNHHK, 'resultNHHK' => $arrResultNHHK

		]
	
	);
?>