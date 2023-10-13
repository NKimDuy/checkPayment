<?php

	/*
		file có nhiệm vụ xóa phiếu tạo quyết toán (chỉ xóa được lúc trạng thái là đã tạo)
	*/

	session_start();

	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");

	include_once("../../../db/sentMail.php");
	
	$con = connectSql();

	$idAccounting = $_GET['IdAccounting'];

	//Lấy các user có quyền kế toán ở DVLK
	$sql_userDP = "select mail FROM user_link_unit 
					
					where unit = '" . $_SESSION['MaDP'] . "'
					
					and EXISTS (SELECT mail FROM user_permission WHERE permission = 'account')";

	$query_userDP = mysqli_query($con, $sql_userDP);

	$arr_toMail = [];

	if($query_userDP)
	{
		while($r = mysqli_fetch_assoc($query_userDP))
		{
			array_push($arr_toMail, $r['mail']);
		}
	} 

	//Tạo nội dung gửi mail
	$content_Mail = "	<p><b>Hệ thống THEO DÕI HỌC PHÍ thông báo:</b></p>

						<p>Phòng kế toán trường Đại học Mở - TPHCM đã tạo phiếu quyết toán có ID:" . $idAccounting . "</p>

						<p>Kính nhờ Thầy/Cô phụ trách kế toán tại 
						
						<b>". $_SESSION['descriptMaDP'] ."</b> 
						
						xem qua.</p> 

						<p>Nếu đồng ý với PQT, Thầy/Cô nhấn vào nút <b>'Đồng ý'</b> tương ứng trên danh sách PQT.</p>

						<p>Trân trọng</p>";			

	//Gửi mail					
	$sent = sentMail($arr_toMail, $_SESSION['mail'], $content_Mail);

	if ($sent == "Đã gửi mail thành công") {

		$sql = "update accounting 
	
				set status = '1' 
				
				where ID_accounting = '" . $idAccounting . "'";

		$query = mysqli_query($con, $sql);
	}

	echo json_encode(['confirm' => $sent]);

?>