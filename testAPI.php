<?php
	
	/*
		file có chức năng hiện các phiếu đóng tiền cụ thể của sinh viên tương ứng
	*/

	session_start();

	include_once ("./db/config.php");
	
	include_once("./db/connectSql.php");

	include_once ("./db/api.php");
	
	global $conf;
	
	$con = connectSql();

	$curl = connectCurl();

	$year = '2022-2023';

	$round = 'r1';

	$date = '01/12/'.substr($year,0,4).' - 31/03/'.substr($year,5,4);

	echo $date;

	?>

