<?php
	include_once ("./db/connectAPI.php");
	
	function thongTinDiaPhuong($curl, $madp = null)
	{
		$url = '';
		if($madp == '' || $madp == null)
			$url = 'https://api.ou.edu.vn/api/v1/hdmdp';
		else
			$url = 'https://api.ou.edu.vn/api/v1/hdmdp?madp=' . $madp;
		
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		//disConnectCurl($curl);
		return $ketQua;
		
	}	

	$curl = connectCurl();
	
	$data = thongTinDiaPhuong($curl);
	
	echo var_dump($data);
	
?>
