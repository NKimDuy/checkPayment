<?php

	/*
		file có nhiệm vụ trả về danh sách các sinh viên đã nhận sách
	*/

	session_start();
	
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$idReceipt = $_GET['idReceipt'];
	
	//global $conf;
	
	$con = connectSql();

	$sql = "select * 
	
			from student_receipt_book 
			
			join receipt_book 
			on receipt_book.ID_receipt = student_receipt_book.ID_receipt
			
			where receipt_book.ID_receipt = '" . $idReceipt . "' 
			
			and receive_day is not null";
	
	$query = mysqli_query($con, $sql);
	
	$data = [];
	
	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['mssv']);
			
			array_push($temp, $r['last_name']);
			
			array_push($temp, $r['first_name']);
			
			array_push($temp, $r['birth_day']);
			
			array_push($temp, $r['class']);
			
			array_push($temp, $r['ID_subject']);
			
			array_push($temp, $r['subject']);
			
			array_push($temp, $r['day_pay']);
			
			array_push($temp, $r['email']);
			
			array_push($temp, $r['phone1']);
			
			array_push($temp, $r['phone2']);
			
			array_push($temp, $r['receiver']);
			
			array_push($temp, $r['room']);
			
			array_push($temp, $r['building']);
			
			array_push($temp, $r['house_number']);
			
			array_push($temp, $r['street_name']);
			
			array_push($temp, $r['town']);
			
			array_push($temp, $r['ward']);
			
			array_push($temp, $r['district']);
			
			array_push($temp, $r['city']);
			
			array_push($temp, $r['ID_receipt']);
			
			array_push($temp, $r['receive_day']);
			
			array_push($data, $temp);
		}
	}
	
	echo json_encode(['data' => $data]);
?>