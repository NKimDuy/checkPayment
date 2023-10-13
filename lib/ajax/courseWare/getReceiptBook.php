<?php

	/*
		file có nhiệm vụ lấy các phiếu học liệu chứa các sinh viên vẫn chưa nhận học liệu, hoặc đã nhận đầy đủ
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$idDvlk = $_GET['idDvlk'];
	
	$idSemester = $_GET['idSemester'];
	
	$statusReceipt = $_GET['statusReceipt'];
	
	$con = connectSql();
	
	$sql = "select ID_receipt, ID_dvlk, dvlk, ID_semester, semester, start_day, end_day, create_day 
			
			from receipt_book 
			
			where ID_dvlk = '" . $idDvlk  ."' 
			
			and ID_semester = '" . $idSemester . "'";
		
			
	
	$query = mysqli_query($con, $sql);
	
	$dataReceiptNotFull = [];
	
	$dataReceiptFull = [];
	
	$countSumStudent = 0;

	$numberStudentHasReceive = 0;

	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$temp = [];
			
			array_push($temp, $r['ID_receipt']);
			
			array_push($temp, $r['ID_dvlk']);
			
			array_push($temp, $r['dvlk']);
			
			array_push($temp, $r['ID_semester']);
			
			array_push($temp, $r['semester']);
			
			array_push($temp, $r['start_day']);
			
			array_push($temp, $r['end_day']);
			
			array_push($temp, $r['create_day']);
			
			array_push($dataReceiptFull, $temp);
			
			/*_________________________________________________-*/
			// tìm tổng số lượng sinh viên hiện có của phiếu 
			$sqlCountSumStudent = "select count(*) as c
			
									from student_receipt_book 
									
									join receipt_book 
									on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
									
									where receipt_book.ID_receipt = '" . $r['ID_receipt'] . "'";
									
			$queryCountSumStudent = mysqli_query($con, $sqlCountSumStudent);

			$countSumStudent = mysqli_fetch_assoc($queryCountSumStudent);
			/*-----------------------------------------------*/
			
			
			/*__________________________________________________________*/
			// chọn tất cả sinh viên đã nhận sách của phiếu
			$sqlCountStudentHasReceive = "select receive_day 
			
									from student_receipt_book 
									
									join receipt_book 
									on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
									
									where receive_day is not null 
									and receipt_book.ID_receipt = '" . $r['ID_receipt'] . "'";
									
			$queryCountStudentHasReceive = mysqli_query($con, $sqlCountStudentHasReceive);
			
			$numberStudentHasReceive = mysqli_num_rows($queryCountStudentHasReceive);
			/*---------------------------------------------------------*/
			
			
			if($countSumStudent['c'] != $numberStudentHasReceive)
			{
				$temp1 = [];

				array_push($temp1, $r['ID_receipt']);
			
				array_push($temp1, $r['ID_dvlk']);
				
				array_push($temp1, $r['dvlk']);
				
				array_push($temp1, $r['ID_semester']);
				
				array_push($temp1, $r['semester']);
				
				array_push($temp1, $r['start_day']);
				
				array_push($temp1, $r['end_day']);
				
				array_push($temp1, $r['create_day']);
				
				array_push($dataReceiptNotFull, $temp);
			}
		}
	}
	
	if($statusReceipt == "notYet")
		
		echo json_encode(['data' => $dataReceiptNotFull, 'test' => 'count ' . $countSumStudent['c'] . ' sum ' . $numberStudentHasReceive]);
		
	else 
		
		echo json_encode(['data' => $dataReceiptFull]);
?>