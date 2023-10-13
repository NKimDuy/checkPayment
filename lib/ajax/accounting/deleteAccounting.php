<?php

	/*
		file có nhiệm vụ xóa phiếu tạo quyết toán (chỉ xóa được lúc trạng thái là đã tạo)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$idAccounting = $_GET['IdAccounting'];
	
	$con = connectSql();

	$sql_DEL = "delete from accounting where ID_accounting = '" . $idAccounting . "'";
	
	$query_DEL = mysqli_query($con, $sql_DEL);
	
	echo json_encode(['confirm' => 'Đã xóa phiếu thành công']);
?>