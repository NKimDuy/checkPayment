<?php
	session_start();
	
	include_once ("../../../db/config.php");
	
	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	global $conf;
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|SET|set|ORDER|order|ROOT|root/i";
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$mail = $purifier->purify( preg_replace($rexg, "", $_POST['mail']) );
	
	$password = $purifier->purify( preg_replace($rexg, "", $_POST['password']) );
	
	$con = connectSql();
	
	/*_____________________________________________________________-*/
	// select user trong csdl, xem có tồn tại user trong csdl không
	$sql = "select full_name, password1, password2, u.mail, group_user, super_user, p.permission, p.descript 
	
			from user u 
			
			join user_permission up 
			on up.mail = u.mail 
			
			join permission p 
			on p.permission = up.permission 
			
			where  u.mail = '" . $mail . "'";
	
	$queryUser = mysqli_query($con, $sql);
	/*---------------------------------------------------------------------*/
	
	
	if ($queryUser)
	{
		$numberUser = mysqli_num_rows($queryUser);
		
		if ($numberUser > 0) // user có tồn tại trong csdl
		{
			$arrPermission = []; // $arrPermission sẽ lưu tất cả các quyền của user
		
			$arrAction = []; // arrAction sẽ lưu tất cả các trang được hiển thị của user
			
			$arrDvlk = []; // arrAction sẽ lưu tất cả các dvlk hiện có của user
			
			$password1 = '';
			
			$password2 = '';
			
			$fullname = '';
			
			$permissionId = "('"; // chuỗi lưu các quyền của user, nhằm mục đích tìm các action tương ứng với từng quyền
			
			while($r = mysqli_fetch_assoc($queryUser))
			{
				$permissionId .= $r['permission'] . "', '";
				
				$temp = []; 
				
				array_push($temp, $r['permission']);
				
				array_push($temp, $r['descript']);
				
				array_push($arrPermission, $temp); 
				
				$password1 = $r['password1'];
				
				$password2 = $r['password2'];
				
				$fullname = $r['full_name'];
				
				$mail = $r['mail'];
				
				$groupUser = $r['group_user'];
				
				$superUser = $r['super_user'];
			}
			
			$password = hash_hmac("sha256", $password, $mail);
			
			if($password1 == $password || $password2 == $password ) // nếu mật khẩu người dùng nhập khớp với mật khẩu trong csdl
			{
				$_SESSION['full_name'] = $fullname; // lưu lại tên người dùng
				
				//$_SESSION['username'] = $username; // lưu lại tài khoản người dùng
				
				$_SESSION['mail'] = $mail; // lưu lại mail người dùng
				
				$_SESSION['groupUser'] = $groupUser; // lấy user group của người dùng
				
				$_SESSION['superUser'] = $superUser; // kiểm tra user có phải là quyền cao nhất
				
				$_SESSION['permission'] = $arrPermission; // gán mảng $arrPermission, sử dụng trong getClass.php và statistical.php và accounting.php
				
				$permissionId = rtrim($permissionId, "', '");
				
				$permissionId.= "')";
				
				
				/*________________________________________________________________*/
				//select các ation tương ứng của các quyền hạn đang có của user
				$sqlGetAction = "select distinct a.action, a.descript 
				
								from action a 
								
								join permission_action pa 
								on pa.action = a.action 
								
								where pa.permission in " . $permissionId;
				
				$getAction = mysqli_query($con, $sqlGetAction);
				
				while($row = mysqli_fetch_assoc($getAction))
				{
					$temp = [];
					
					array_push($temp, $row['action']);
					
					array_push($temp, $row['descript']);
					
						array_push($arrAction, $temp);
				}
				
				$sqlGetLinkUnit = "select lu.unit, lu.descript 
				
								from link_unit lu 
								
								join user_link_unit ulu 
								on ulu.unit = lu.unit 
								
								where ulu.mail = '" . $mail . "'";
				
				$getLinkUnit = mysqli_query($con, $sqlGetLinkUnit);
				
				while($row = mysqli_fetch_assoc($getLinkUnit))
				{
					$temp = [];
					
					array_push($temp, $row['unit']);
					
					array_push($temp, $row['descript']);
					
						array_push($arrDvlk, $temp);
				}
				
				$_SESSION['action'] = $arrAction;
				
				$_SESSION['dvlk'] = $arrDvlk;
				/*-------------------------------------------------------------------*/
				
				echo json_encode($conf['rootUrl']);
			}
			else
				echo json_encode("failPassword");
				
		}
		else
		{
			echo json_encode("failMail");
		}
		
		disConnect();
	}
?>