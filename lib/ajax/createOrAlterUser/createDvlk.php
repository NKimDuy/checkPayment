<?php
	
	/*
		tạo mới các đvlk, dvlk sẽ được tạo ở 2 bảng permission và action
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|updateORDER|order|ROOT|root/i";
	
	$con = connectSql();
	
	$dataForm = $_POST["dataForm"];
	
	//$dataForm[0]['value']: Chứa ID dvlk muốn tạo mới
	
	//$dataForm[1]['value']: Chứa thông tin mô tả của dvlk muốn tạo mới
	
	//$dataForm[2]['value']: Chứa các action mà người dùng chọn
	
	/*_________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) );
	
	$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) );
	
	$dataForm[2]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[2]['value'] ) );
	/*-----------------------------------------------------------------------------------------*/
	
	
	/* kiểm tra user đã tồn tại trong csdl*/
	
	$sqlCheckPermission = "select permission 
					from permission 
					where permission = '" . $dataForm[0]['value'] . "'"; 
	
	$checkPermission = mysqli_query($con, $sqlCheckPermission);
	
	if($checkPermission)
	{
		$numberRowPermissions = mysqli_num_rows($checkPermission);
		
		if($numberRowPermissions > 0) // nếu đã tồn tại user
		{
			echo json_encode(['confirm' => "dvlkExisted"]);
		}
		else
		{
			$flag = true;
			
			// insert permission mới vào bảng permission 
			$sqlInsertToPermission = "insert into permission(permission, descript, group_permission) 
								values('" .
									strtoupper($dataForm[0]['value']) . "', '" . 
									$dataForm[1]['value'] . "', '" . 
									"2" . "')";
			
			$insertToPermission = mysqli_query($con, $sqlInsertToPermission);
			
			if(!$insertToPermission)
			{
				$flag = false;
			}
			// insert action mới vào bảng action 
			$sqlInsertToAction = "insert into action(action, descript, group_action) 
								values('" .
									strtoupper($dataForm[0]['value']) . "', '" . 
									$dataForm[1]['value'] . "', '" . 
									"2" . "')";	
			
			if(!mysqli_query($con, $sqlInsertToAction))
			{
				$flag = false;
			}
			
			// insert permission(dvlk) mới vào bảng permission_action 
			$sqlInsertDvlkToDvlk = "insert into permission_action(permission, action) values('" . strtoupper($dataForm[0]['value']) . "', '" . strtoupper($dataForm[0]['value']) . "')";
				
			if(!mysqli_query($con, $sqlInsertDvlkToDvlk))
				
				$flag = false;
			
			$action = explode(', ', rtrim($dataForm[2]['value'], ", "));
			
			if(count($action) != 0 && count($action) != 1)
			{
				foreach($action as $act)
				{
					if($act == "checkAll")
						continue;
					
					$sqlInsertPermissionAction = "insert into permission_action(permission, action) values('" . strtoupper($dataForm[0]['value']) . "', '" . $act . "')";
					
					if(!mysqli_query($con, $sqlInsertPermissionAction))
					{
						$flag = false;
					}
				}
			}
			
			echo json_encode(['confirm' => $flag]);
		}
		
	}
	//echo json_encode(['data' => $number]);
?>