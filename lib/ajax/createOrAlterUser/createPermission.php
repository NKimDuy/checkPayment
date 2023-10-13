<?php
	
	/*
		tạo mới 1 permission
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|updateORDER|order|ROOT|root/i";
	
	$con = connectSql();
	
	$dataForm = $_POST["dataForm"];
	
	//$dataForm[0]['value']: chứa ID permission sắp tạo
	
	//$dataForm[1]['value']: chứa thông tin mô tả permission sắp tạo
	
	//$dataForm[2]['value']: chứa các action mà permission này được phép truy cập
	
	/*_________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) );
	
	$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) );
	
	$dataForm[2]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[2]['value'] ) );
	/*-----------------------------------------------------------------------------------------*/
	
	
	/* kiểm tra permission đã tồn tại trong csdl*/
	
	$sqlCheckPermission = "select permission 
					from permission 
					where permission = '" . $dataForm[0]['value'] . "'"; 
	
	$checkPermission = mysqli_query($con, $sqlCheckPermission);
	
	if($checkPermission)
	{
		$numberRowPermissions = mysqli_num_rows($checkPermission);
		
		if($numberRowPermissions > 0) // nếu đã tồn tại user
		{
			echo json_encode(['confirm' => "permissionExisted"]);
		}
		else
		{
			$flag = true;
			
			// insert permission mới vào bảng permission 
			$sqlInsertToPermission = "insert into permission(permission, descript) 
								values('" .
									strtoupper($dataForm[0]['value']) . "', '" . 
									$dataForm[1]['value'] . "')";
			
			if(!mysqli_query($con, $sqlInsertToPermission))
			{
				$flag = false;
			}
			
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
?>