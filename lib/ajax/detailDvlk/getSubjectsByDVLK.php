<?php

	/*
		file có chức năng hiện các lớp tương ứng của các dvlk mà user được phép thấy
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();
	
	$query = TKBtheoDiaPhuong($curl, $nhhk = $_SESSION['NHHK'], $madp = $_SESSION['MaDP'], $malop, $type);

	$arrResult = $query['data'];
	
	echo json_encode(['data' => $arrResult, 'rootUrl' => $conf['rootUrl']]);
	
?>