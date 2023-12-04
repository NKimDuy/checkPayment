<?php
	
	/*
		file có nhiệm vụ để cho ou xác nhận đã hoàn thành quyết toán
		
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
	
			set luong_confirm = '1', status = '2' ,accounting_day = '" . date("Y-m-d") . "'
			
			where ID_accounting = '" . $idAccounting . "'";
	
	$query = mysqli_query($con, $sql);

	//Lấy các user có quyền kế toán ở DVLK
					
	$sql_userDP = "SELECT user.mail 
					FROM user_permission 
					join user on user_permission.mail = user.mail
					join user_link_unit on user_link_unit.mail = user.mail 
					WHERE permission = 'account' and group_user = '2' and unit = '" . $_SESSION['MaDP'] . "';";

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

						<p>Phòng kế toán trường Đại học Mở - TPHCM đã hoàn thành việc quyết toán cho Phiếu quyết toán có ID: <b>" 
						
						. $idAccounting . "</b></p>

						<p>Đơn vị liên kết có thắc mắc gì, vui lòng liên hệ qua địa chỉ email:" . $_SESSION['mail'] . "</p>

						<p>Trân trọng</p>";

	$sent = sentMail($arr_toMail, $_SESSION['mail'], $content_Mail);
	
	echo json_encode(['confirm' => 'Đã cập nhật và gửi mail thông báo thành công']);
?>