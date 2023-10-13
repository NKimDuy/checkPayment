<?php

	/*
		file có nhiệm vụ trả về các đơn vị liên kết
	*/
	
	include_once ("../../../db/api.php");

	$curl = connectCurl();

	$query = thongTinDiaPhuong($curl, $madp = NULL);

	$arrResult = [];

	foreach($query['data'] as $r){
		$temp = [];
			
		array_push($temp, $r['MaDP']);
		
		array_push($temp, $r['TenDP']);
		
		array_push($arrResult, $temp);
	}

	echo json_encode(['data' => $arrResult]);


?>