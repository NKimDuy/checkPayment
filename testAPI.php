<?php

    session_start();

    include_once ("./db/config.php");

    include_once ("./db/api.php");

    include_once ("./db/connectSql.php");

	$curl = connectCurl();

	$con = connectSql();

	$query = thongTinDongHocPhiDiaPhuong($curl, $madvpc = 'TX', $fromdate = '01/08/2023', $todate = '30/11/2023', $madp = 'CN');
	
	$_SESSION['BillPaid_DVLK'] = json_decode(bzdecompress(base64_decode($query['data'])), true);

    echo var_dump($_SESSION['BillPaid_DVLK']);

?>


