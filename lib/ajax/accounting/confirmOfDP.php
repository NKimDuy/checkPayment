<?php
	
	/*
		file có nhiệm vụ để cho dvlk xác nhận đồng ý với phiếu quyết toán
		
		bước 1: phiếu quyết toán sẽ cập nhật cột dvlk là đã xác nhận

	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");

	include_once("../../../db/sentMail.php");
	
	$con = connectSql();

	$idAccounting = $_GET['IdAccounting'];

	// chuyển trạng thái từ 0 về 1

	$sql = "update accounting 
	
			set dvlk_confirm = '1' 
			
			where ID_accounting = '" . $idAccounting . "'";
	
	$query = mysqli_query($con, $sql);

	//Lấy mail user tạo phiếu
	$sql_user = "select user_create from accounting where ID_accounting = '" . $idAccounting . "'";

	$query_user = mysqli_query($con, $sql_user);

	$arr_toMail = [];

	if($query_user)
	{
		while($r = mysqli_fetch_assoc($query_user))
		{
			array_push($arr_toMail, $r['user_create']);
		}
	} 

	//Tạo nội dung gửi mail
	$content_Mail = "	<p><b>Hệ thống THEO DÕI HỌC PHÍ thông báo:</b></p>

						<p>Thầy/Cô phụ trách kế toán tại
										
						<b>". $_SESSION['descriptMaDP'] ."</b> 

						vừa xác nhận đồng ý với quyết toán có <b> ID:" . $idAccounting . "</b></p>

						<p>Trân trọng</p>";

	$sent = sentMail($arr_toMail, $_SESSION['mail'], $content_Mail); 

	echo json_encode(['confirm' => 'Đã cập nhật và gửi mail thông báo thành công']);
?>