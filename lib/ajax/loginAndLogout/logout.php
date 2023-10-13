<?php
	session_start();
	
	include_once ("../../../db/config.php");
	
	global $conf;

	session_destroy();
	
	echo json_encode($conf['rootUrl']);
?>