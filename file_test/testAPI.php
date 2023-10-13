<?php
	$client = new SoapClient("http://dttx.ou.edu.vn/thanhtoanhocphi/tthp.php?wsdl");
	
	//var_dump($client->__getFunctions());
	
	//var_dump($client->__getTypes()); 
	
	
	$params = array(
		"nganhang" => "NN",
		"masv" => "81202007TPE1",
		"sophieu" => "1059255",
		"nhhk" => "202",
		"sotien" => 7200000,
		"ws_user" => "0uUs3rN@m3TtHp",
		"ws_pwd" => "1l0vey0u3v3ry0n3"
	);
	
	$response = $client->__soapCall("ws_kt_dadonghp", $params);
	//$response = $client->__soapCall("ws_kt_danhsach_hd", $params);
	
	var_dump($response);
	
?>
