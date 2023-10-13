<?php
	
	/*
		file có nhiệm vụ hiện các phiếu cho dvlk xác nhận đã được kế toán xác nhận và gửi sang
	*/

	session_start();
	
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$con = connectSql();

	// select các phiếu quyết toán đã được tạo, và được kế toán nhấn gửi sang cho dvlk
	$sql = "select * 
	
			from accounting 
			
			where ma_dvlk = '" . $_SESSION['MaDP'] . "'";
	
	$query = mysqli_query($con, $sql);

	$data = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['ID_accounting']);
			
			array_push($temp, $r['ma_dvlk']);
			
			array_push($temp, $r['dvlk']);
			
			array_push($temp, date_format(date_create_from_format("Y-m-d",$r['create_day']),"d/m/Y"));
			
			array_push($temp, date_format(date_create_from_format("Y-m-d",$r['start_day']),"d/m/Y"));
			
			array_push($temp, date_format(date_create_from_format("Y-m-d",$r['end_day']),"d/m/Y"));
			
			array_push($temp, $r['total']);
			
			array_push($temp, $r['percent']);

			array_push($temp, $r['total_discount']);

			array_push($temp, $r['dvlk_confirm']);

			array_push($temp, $r['luong_confirm']);

			array_push($temp, $r['accounting_day']);

			array_push($temp, $r['status']);
			
			array_push($data, $temp);
		}
	}

	echo json_encode(['data' => $data]);
	
?>