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

	$arrResultDVLK = [];
	
	$queryDVLK = thongTinDiaPhuong($curl);
	
	foreach($_SESSION['dvlk'] as $dvlk)
	{
		foreach($queryDVLK['data'] as $r)
		{
			if($dvlk[0] == $r['MaDP'])
			{
				$temp = [];
				
				array_push($temp, $r['MaDP']);
				
				array_push($temp, $r['TenDP']);
				
				array_push($arrResultDVLK, $temp);
				
				break;
			}
		}
	}

	$sql = "select * from choice";
	
	$querySemster = mysqli_query($con, $sql);
	
	$arrResultSemester = [];
	
	if($querySemster)
	{
		while($r = mysqli_fetch_assoc($querySemster))
		{
			$temp = [];
			
			array_push($temp, $r['value']);
			
			array_push($temp, $r['descript']);

			array_push($temp, $r['type']);
			
			array_push($arrResultSemester, $temp);
		}
	}

	$arrResultSelect = [];

	if ($_SESSION['MaDP'] != null) {

		$temp = [];

		array_push($temp, $_SESSION['nk']);

		array_push($temp, $_SESSION['descriptNK']);

		array_push($temp, $_SESSION['hk']);

		array_push($temp, $_SESSION['descriptHK']);

		array_push($temp, $_SESSION['MaDP']);

		array_push($temp, $_SESSION['descriptMaDP']);

		array_push($arrResultSelect, $temp);
		
	} else {
		$arrResultSelect = null;
	}
	
	echo json_encode(['dataSemester' => $arrResultSemester, 'dataDVLK' => $arrResultDVLK, 'dataSelect' => $arrResultSelect]);
?>