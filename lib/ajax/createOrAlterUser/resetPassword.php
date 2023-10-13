<?php
	
	/*
		thay đổi mật khẩu ở giao diện người dùng, và giao diện admin
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|SET|set|ORDER|order|ROOT|root/i";
	
	global $conf;
	
	$dataForm = $_POST['dataForm'];
	
	
	/*_________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	
	$role = $purifier->purify( preg_replace( $rexg, "", $dataForm[3]['value'] ) );
	
	/*-----------------------------------------------------------------------------------------*/
	
	
	$con = connectSql();
	
	$sql = '';
	
	if($role == "user")
	{
		$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) ); // mật khẩu mới
		
		$newPassword = hash_hmac("sha256", $dataForm[1]['value'], $_SESSION['mail']);
		
		$sql = "update user set password1 = '" . $newPassword . "' where mail = '" . $_SESSION['mail'] . "'";
	}
	else if($role == "admin")
	{
		$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) ); // mật khẩu mới
		
		$dataForm[2]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[2]['value'] ) ); // chứa giá trị user mà admin muốn thay đổi mật khẩu
		
		$newPassword = hash_hmac("sha256", $dataForm[0]['value'], $dataForm[2]['value']);
		
		$sql = "update user set password1 = '" . $newPassword . "' where mail = '" . $dataForm[2]['value'] . "'";
	}
	
	$query = mysqli_query($con, $sql);
	
	if($query)
	{
		echo json_encode(['confirm' => true]);
	}
	else
	{
		echo json_encode(['confirm' => false]);
	}
	
?>