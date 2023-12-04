<?php

	/*
		tạo mới hoặc sửa một User
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|SET|set|ORDER|order|ROOT|root/i";
	
	$con = connectSql();
	
	$dataForm = $_POST["dataForm"];
	
	// dataForm[0]['value']: hiển thị tình trạng là đang chỉnh sửa hoặc thêm mới
	
	// dataForm[1]['value']: hiển thị tên đầy đủ
	
	// dataForm[2]['value']: hiển thị sdt
	
	// dataForm[3]['value']: hiển thị tên mail
	
	// dataForm[4]['value']: hiển thị mật khẩu
	
	// dataForm[5]['value']: hiển thị mật khẩu nhaạp lại
	
	// dataForm[6]['value']: hiển thị group user
	
	// dataForm[7]['value']: hiển thị các permission mà người dùng chọn
	
	// dataForm[8]['value']: hiển thị các link unit mà người dùng chọn
	
	/*___________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) );
	
	$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) );
	
	$dataForm[2]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[2]['value'] ) );
	
	$dataForm[3]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[3]['value'] ) );
	
	$dataForm[4]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[4]['value'] ) );
	
	$dataForm[5]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[5]['value'] ) );
	
	$dataForm[6]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[6]['value'] ) );
	
	$dataForm[7]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[7]['value'] ) );
	
	$dataForm[8]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[8]['value'] ) );
	/*------------------------------------------------------------------------------------------*/
	
	
	if($dataForm[0]['value'] == "edit")
	{
		$flag = true;
		
		$arrPermissionOfUser = [];
		
		$arrPermissionDelete = [];
		
		$arrPermissionAdd = [];
		
		$arrLinkUnitOfUser = [];
		
		$arrLinkUnitDelete = [];
		
		$arrLinkUnitAdd = [];
		
		$sqlUpdateUser = "update user 
							set 
								full_name = '" . $dataForm[1]['value'] . "', 
								phone = '" . $dataForm[2]['value'] . "', 
								group_user = '" . $dataForm[6]['value'] . "' 
							where mail = '" . $dataForm[3]['value'] . "'";
		
		$updateUser = mysqli_query($con, $sqlUpdateUser);
		
		if(!$updateUser)
			
			$flag = false;
			
		$arrPermissionHasChoice = explode(', ', rtrim($dataForm[7]['value'], ", "));
		
		$sqlGetPermission = "select permission 
	
							from user_permission 
							
							join user 
							on user.mail = user_permission.mail 
							
							where user.mail = '" . $dataForm[3]['value'] . "'";
							
		$getPermission = mysqli_query($con, $sqlGetPermission);
		
		if($getPermission)
		{
			while($r = mysqli_fetch_assoc($getPermission))
			{
				array_push($arrPermissionOfUser, $r['permission']);
			}
		}
		
		foreach($arrPermissionOfUser as $per)
		{
			$flagPermission = true;
			
			foreach($arrPermissionHasChoice as $choice)
			{
				if($choice == "checkAll")
					continue;
				
				if($per == $choice)
				{
					$flagPermission = false;
					
					break;
				}
			}
			
			if($flagPermission)
			{
				array_push($arrPermissionDelete, $per);
			}
			
		}
		
		foreach($arrPermissionHasChoice as $choice)
		{
			if($choice == "checkAll" || $choice == "")
				continue;
			
			$flagPermission = true;
			
			foreach($arrPermissionOfUser as $per)
			{
				if($choice == $per)
				{
					$flagPermission = false;
					
					break;
				}
			}
			
			if($flagPermission)
			{
				array_push($arrPermissionAdd, $choice);
			}
		}
		
		if(count($arrPermissionDelete) != 0)
		{
			foreach($arrPermissionDelete as $perDelete)
			{
				$sqlDeletePermission = "delete from user_permission where permission = '" . $perDelete . "' and mail = '" . $dataForm[3]['value'] . "'";
				
				if(!mysqli_query($con, $sqlDeletePermission))
				{
					$flag = false;
				}
			}
		}
		
		if(count($arrPermissionAdd) != 0 )
		{
			foreach($arrPermissionAdd as $perAdd)
			{	
				$sqlAddPermisison = "insert into user_permission(mail, permission) values('" . $dataForm[3]['value'] . "', '" . $perAdd . "')";
				
				if(!mysqli_query($con, $sqlAddPermisison))
				{
					$flag = false;
				}
			}
		}
		
		//
		$arrLinkUnitHasChoice = explode(', ', rtrim($dataForm[8]['value'], ", "));
		
		$sqlGetLinkUnit = "select unit 
	
							from user_link_unit 
							
							join user 
							on user.mail = user_link_unit.mail 
							
							where user.mail = '" . $dataForm[3]['value'] . "'";
							
		$getLinkUnit = mysqli_query($con, $sqlGetLinkUnit);
		
		if($getLinkUnit)
		{
			while($r = mysqli_fetch_assoc($getLinkUnit))
			{
				array_push($arrLinkUnitOfUser, $r['unit']);
			}
		}
		
		foreach($arrLinkUnitOfUser as $lu)
		{
			$flagLinkUnit = true;
			
			foreach($arrLinkUnitHasChoice as $choice)
			{
				if($choice == "checkAll")
					continue;
				
				if($lu == $choice)
				{
					$flagLinkUnit = false;
					
					break;
				}
			}
			
			if($flagLinkUnit)
			{
				array_push($arrLinkUnitDelete, $lu);
			}
			
		}
		
		foreach($arrLinkUnitHasChoice as $choice)
		{
			if($choice == "checkAll" || $choice == "")
				continue;
			
			$flagLinkUnit = true;
			
			foreach($arrLinkUnitOfUser as $lu)
			{
				if($choice == $lu)
				{
					$flagLinkUnit = false;
					
					break;
				}
			}
			
			if($flagLinkUnit)
			{
				array_push($arrLinkUnitAdd, $choice);
			}
		}
		
		if(count($arrLinkUnitDelete) != 0)
		{
			foreach($arrLinkUnitDelete as $luDelete)
			{
				$sqlDeleteLinkUnit = "delete from user_link_unit where unit = '" . $luDelete . "' and mail = '" . $dataForm[3]['value'] . "'";
				
				if(!mysqli_query($con, $sqlDeleteLinkUnit))
				{
					$flag = false;
				}
			}
		}
		
		if(count($arrLinkUnitAdd) != 0 )
		{
			foreach($arrLinkUnitAdd as $luAdd)
			{	
				$sqlAddLinkUnit = "insert into user_link_unit(mail, unit) values('" . $dataForm[3]['value'] . "', '" . $luAdd . "')";
				
				if(!mysqli_query($con, $sqlAddLinkUnit))
				{
					$flag = false;
				}
			}
		}
		
		echo json_encode(['confirm' => $flag]);
	}
	
	else
	{
		/* kiểm tra user đã tồn tại trong csdl*/
		
		$sqlCheckUser = "select mail 
						from user 
						where mail = '" . $dataForm[3]['value'] . "'"; 
		
		$checkUser = mysqli_query($con, $sqlCheckUser);
		
		if($checkUser)
		{
			$numberRowUsernames = mysqli_num_rows($checkUser);
			
			if($numberRowUsernames > 0) // nếu đã tồn tại user
			{
				echo json_encode(['confirm' => "Đã tốn tại tài khoản"]);
			}
			else
			{
				$flag = true;
				
				// insert user mới vào bảng user 
				
				$dataForm[4]['value'] = hash_hmac("sha256", $dataForm[4]['value'], $dataForm[3]['value']);
				
				$backUpPassword = hash_hmac("sha256", "1TtDttx!", $dataForm[3]['value']);
				
				$sqlInsertToUser = "insert into user(mail, password1, password2, full_name, phone, group_user) 
									values('" .
										$dataForm[3]['value'] . "', '" . 
										$dataForm[4]['value'] . "', '" . 
										$backUpPassword . "', '" . 
										$dataForm[1]['value'] . "', '" . 
										$dataForm[2]['value'] . "', '" . 
										$dataForm[6]['value'] . "')";
				
				$insertToUser = mysqli_query($con, $sqlInsertToUser);
				
				if(!$insertToUser)
				{
					$flag = false;
				}
				
				if($dataForm[7]['value'] != "")
				{
					$permission = explode(', ', rtrim($dataForm[7]['value'], ", "));
					
					if(count($permission) != 0)
					{
						foreach($permission as $per)
						{
							if($per == "checkAll")
								continue;
							
							$sqlInsertUserPermission = "insert into user_permission(mail, permission) values('" . $dataForm[3]['value'] . "', '" . $per . "')";
							
							$insertUserPermission =  mysqli_query($con, $sqlInsertUserPermission);
							
							if(!$insertUserPermission)
							{
								$flag = false;
							}
						}
					}
				}
				
				if($dataForm[8]['value'] != "")
				{
					$linkUnit = explode(', ', rtrim($dataForm[8]['value'], ", "));
					
					if(count($linkUnit) != 0)
					{
						foreach($linkUnit as $lu)
						{
							if($lu == "checkAll")
								continue;
							
							$sqlInsertUserLinkUnit = "insert into user_link_unit(mail, unit) values('" . $dataForm[3]['value'] . "', '" . $lu . "')";
							
							$insertUserLinkUnit =  mysqli_query($con, $sqlInsertUserLinkUnit);
							
							if(!$insertUserLinkUnit)
							{
								$flag = false;
							}
						}
					}
				}
				
				echo json_encode(['confirm' => $flag]);
			}
		}
		
	}
?>