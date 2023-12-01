<?php

	/*
		file có nhiệm vụ xóa phiếu tạo quyết toán (chỉ xóa được lúc trạng thái là đã tạo)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$idAccounting = $_GET['IdAccounting'];

	$PhanTramKhac = $_GET['PhanTramKhac'];

	$GhiChu = $_GET['GhiChu'];
	
	$con = connectSql();

	$sql = "select total_real, total, total_discount from accounting where ID_accounting = '" . $idAccounting . "'";

	$query = mysqli_query($con, $sql);

	// if($query)
	// {
	// 	while($r = mysqli_fetch_assoc($query))
	// 	{
	// 		$ThucChi = ((int)$r['total']*((int)$PhanTramKhac/100)) + (int)$r['total_discount'];
	// 	}
	// }

	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$ThucChi = (int)$PhanTramKhac + (int)$r['total_discount'];
		}
	}


	$sql_UP = "	UPDATE accounting 
	
				set note = '" .$GhiChu. "', total_real = '" . $ThucChi. "', percent_another = '" .$PhanTramKhac. "' 
				
				where ID_accounting = '" . $idAccounting . "'";
	
	$query_UP = mysqli_query($con, $sql_UP);
	
	echo json_encode(['confirm' => 'Đã cập nhật thành công']);
?>