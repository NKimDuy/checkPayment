<?php
	
	/*
		tạo action (các view của web)
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|SET|set|ORDER|order|ROOT|root/i";
	
	$con = connectSql();
	
	$dataForm = $_POST["dataForm"];
	
	//$dataForm[0]['value']: Lưu ID của action muốn thêm mới
	
	//$dataForm[1]['value']: Lưu mô tả của action muốn thêm mới
	
	//$dataForm[2]['value']: lưu các permission mà sẽ được gán với action chuẩn bị thêm mới
	
	/*_________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) );
	
	$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) );
	
	$dataForm[2]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[2]['value'] ) );
	/*-----------------------------------------------------------------------------------------*/
	
	
	/* kiểm tra action đã tồn tại trong csdl*/
	
	$sqlCheckAction = "select action 
					from action 
					where action = '" . $dataForm[0]['value'] . "'"; 
	
	$checkAction = mysqli_query($con, $sqlCheckAction);
	
	if($checkAction)
	{
		$numberRowActions = mysqli_num_rows($checkAction);
		
		if($numberRowActions > 0) // nếu đã tồn tại action
		{
			echo json_encode(['confirm' => "actionExisted"]);
		}
		else
		{
			$flag = true;
			
			// insert action mới vào bảng action 
			//strtoupper($dataForm[0]['value']) . "', '" . 
			$sqlInsertAction = "insert into action(action, descript) 
								values('" .
									$dataForm[0]['value'] . "', '" . 
									$dataForm[1]['value'] . "')";
			
			if(!mysqli_query($con, $sqlInsertAction))
			{
				$flag = false;
			}
			
			$permission = explode(', ', rtrim($dataForm[2]['value'], ", "));
			
			if(count($permission) != 0 && count($permission) != 1)
			{
				foreach($permission as $per)
				{
					if($per == "checkAll")
						continue;
					
					$sqlInsertPermissionAction = "insert into permission_action(permission, action) values('" . $per . "', '" . $dataForm[0]['value'] . "')";
					
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