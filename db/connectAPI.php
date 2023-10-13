<?php

	function connectCurl()
	{
		$curl = curl_init();
		return $curl;
	}


	function setParams($curl, $url)
	{
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
			'Authorization: Bearer 52C4E470AF3AE6C56276FAE8666788291F7AEA1667FE67C9DF743FF49FD5C74B',
			'Content-Type: application/json',
			),
			CURLOPT_SSL_VERIFYPEER => false,
		));
	}

	function disConnectCurl($curl) 
	{
		curl_close($curl);
	}

?>