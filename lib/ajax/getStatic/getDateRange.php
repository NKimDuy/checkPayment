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

	$_SESSION['dateRange'] = $_GET['DateRange'];

	$_SESSION['fromDate'] =  substr($_GET['DateRange'],0,10);

	$_SESSION['toDate'] = substr($_GET['DateRange'],13,10);
	
	echo json_encode(['rootUrl' => $conf['rootUrl']]);
?>