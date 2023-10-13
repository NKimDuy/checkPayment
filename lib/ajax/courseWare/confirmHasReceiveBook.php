<?php
	
	/*
		file có nhiệm vụ xác nhận sinh viên đã nhận sách (ajax sẽ gửi từng sinh viên qua, để xác nhận là sinh viên đã nhận sách)
	*/

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	$mssv = $_POST['mssv'];
	
	$idReceipt = $_POST['idReceipt'];
	
	$idSubject = $_POST['idSubject'];
	
	$con = connectSql();

	$sql = "update student_receipt_book 
	
			join receipt_book 
			on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
			
			set receive_day = '" . date("Y/m/d") . "' 
			
			where mssv = '" . $mssv . "' 
			and ID_subject = '" . $idSubject . "' 
			and student_receipt_book.ID_receipt = '" . $idReceipt . "'";
	
	$query = mysqli_query($con, $sql);
	
	$sql = "select mssv, ID_subject 
	
			from student_receipt_book 
			
			join receipt_book 
			on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
			
			where mssv = '" . $mssv . "' 
			and ID_subject = '" . $idSubject . "' 
			and student_receipt_book.ID_receipt = '" . $idReceipt . "'";
	
	$query = mysqli_query($con, $sql);
	
	$row = mysqli_fetch_assoc($query);
	
	echo json_encode(['confirm' => $row['mssv'] . $row['ID_subject']]);
?>