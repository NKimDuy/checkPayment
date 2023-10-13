<?php

	/*
		file có nhiệm vụ trả về các học kì đang có trong csdl, và thêm vào dropdownlist
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");

	include_once ("../../../db/api.php");
	
	global $conf;

	$curl = connectCurl();

	$con = connectSql();

	$_SESSION['Bill_DVLK'] = NULL;

	$_SESSION['nk'] =  $_GET['nk'];

	$_SESSION['hk'] = $_GET['hk'];

	$_SESSION['MaDP'] = $_GET['madp'];

	$_SESSION['NHHK'] = $_GET['nk'].$_GET['hk'];

	// lấy thông tin học kì và niên khóa lưu vào session

	$sql = "select * from theodoihocphi.choice where value = ".$_SESSION['nk']." or value = ".$_SESSION['hk'];

	$querySemester = mysqli_query($con, $sql);
	
	if($querySemester)
	{
		while($r = mysqli_fetch_assoc($querySemester))
		{
			if ($r['type'] == 'schoolyear') {

				$_SESSION['descriptNK'] = $r['descript'];

			} else {
				$_SESSION['descriptHK'] = $r['descript'];

			}
			
		}
	}

	// lấy thông tin học kì và niên khóa lưu vào session

	$queryDVLK = thongTinDiaPhuong($curl, $madp = $_SESSION['MaDP']);

	$_SESSION['descriptMaDP'] = $queryDVLK['data'][0]['TenDP'];
	
	echo json_encode(['rootUrl' => $conf['rootUrl']]);
?>