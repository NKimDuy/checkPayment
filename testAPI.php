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

	echo var_dump($_SESSION['arrResult_DSSV']);


?>


