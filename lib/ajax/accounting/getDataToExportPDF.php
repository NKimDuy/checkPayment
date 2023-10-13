<?php

	/*
		file có nhiệm vụ lấy dữ liệu sinh viên đã lưu vào database của từng phiếu, để trích xuất file excel
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$con = connectSql();
	
	$idAccounting = $_GET['id'];
	
	// select thông tin các sinh viên tương ứng với phiếu quyết toán
	$sql = "select accounting.ID_accounting, mssv, first_name, last_name, fee_bill, pay_date, semester, dvlk, start_day, end_day, percent, total, total_discount  
	
			from student_accounting 
			
			join accounting 
			on accounting.ID_accounting = student_accounting.ID_accounting
			
			where accounting.ID_accounting = '" . $idAccounting . "'";
	
	$query = mysqli_query($con, $sql);
	
	$data = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['ID_accounting']);
			
			array_push($temp, $r['mssv']);
			
			array_push($temp, $r['first_name']);
			
			array_push($temp, $r['last_name']);
			
			array_push($temp, $r['fee_bill']);
			
			array_push($temp, $r['pay_date']);
			
			array_push($temp, $r['semester']);
			
			array_push($temp, $r['dvlk']);
			
			array_push($temp, $r['start_day']);
			
			array_push($temp, $r['end_day']);
			
			array_push($temp, $r['percent']);
			
			array_push($temp, $r['total']);
			
			array_push($temp, $r['total_discount']);
			
			array_push($data, $temp);
		}
	}
	
	echo json_encode(['data' => $data]);
?>