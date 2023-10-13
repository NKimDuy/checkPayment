<?php

	/*
		file có chứng năng get tất cả các Phiếu nộp tiền của DVLK theo học kỳ đã chọn
	*/
	session_start();

	include_once ("../../../db/config.php");

	include_once ("../../../db/api.php");

	$curl = connectCurl();

	$query = thongTinHocPhiDiaPhuong($curl, $nhhk = $_SESSION['NHHK'], $madp = $_SESSION['MaDP']);

	$_SESSION['Bill_DVLK'] = json_decode(bzdecompress(base64_decode($query['data'])), true);

	echo json_encode(['rootUrl' => $conf['rootUrl']]);
	
?>