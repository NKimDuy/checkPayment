<?php
	
	/*
		Chỉnh sửa Dvlk (xem dvlk có xóa hoặc thêm mới action nào không)
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../lib/htmlpurifier/library/HTMLPurifier.auto.php");
	
	$config = HTMLPurifier_Config::createDefault();
	
	$purifier = new HTMLPurifier($config);
	
	$rexg = "/SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|ORDER|order|ROOT|root/i";
	
	$con = connectSql();
	
	$dataForm = $_POST["dataForm"];
	
	//$dataForm[0]['value']: Chứa các action mà người dùng chọn
	
	//$dataForm[1]['value']: Chứa tên dvlk đang cần chỉnh sửa
	
	/*___________________________________________________________________________________________*/
	// thực hiện bảo mật cho các input được truyền từ javasript
	$dataForm[0]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[0]['value'] ) );
	
	$dataForm[1]['value'] = $purifier->purify( preg_replace( $rexg, "", $dataForm[1]['value'] ) );
	/*------------------------------------------------------------------------------------------*/
	
	
	$flag = true;
	
	$arrActionOfPermission = [];
	
	$arrActionChoice = [];
	
	$arrActionDelete = [];
	
	$arrActionAdd = [];
		
	$arrActionChoice = explode(', ', rtrim($dataForm[0]['value'], ", "));
	
	$sqlGetAction = "select action.action 

						from action 
						
						join permission_action 
						on permission_action.action = action.action 
						
						where permission_action.permission = '" . $dataForm[1]['value'] . "'";
						
	$getAction = mysqli_query($con, $sqlGetAction);
	
	if($getAction)
	{
		while($r = mysqli_fetch_assoc($getAction))
		{
			array_push($arrActionOfPermission, $r['action']);
		}
	}
	
	foreach($arrActionOfPermission as $act)
	{
		$flagAction = true;
		
		foreach($arrActionChoice as $choice)
		{
			if($choice == "checkAll")
				continue;
			
			if($act == $choice)
			{
				$flagAction = false;
				
				break;
			}
		}
		
		if($flagAction)
		{
			array_push($arrActionDelete, $act);
		}
	}
	
	foreach($arrActionChoice as $choice)
	{
		if($choice == "checkAll" || $choice == "")
			continue;
		
		$flagAction = true;
		
		foreach($arrActionOfPermission as $act)
		{
			if($choice == $act)
			{
				$flagAction = false;
				
				break;
			}
		}
		
		if($flagAction)
		{
			array_push($arrActionAdd, $choice);
		}
	}
	
	if(count($arrActionDelete) != 0)
	{
		foreach($arrActionDelete as $actDelete)
		{
			if($actDelete == $dataForm[1]['value'])
				continue;
			
			$sqlDeleteAction = "delete from permission_action where permission = '" . $dataForm[1]['value'] . "' and action = '" . $actDelete . "'";
			
			if(!mysqli_query($con, $sqlDeleteAction))
			{
				$flag = false;
			}
		}
	}
	
	if(count($arrActionAdd) != 0)
	{
		foreach($arrActionAdd as $actAdd)
		{
			$sqlAddAction = "insert into permission_action(permission, action) values('" . $dataForm[1]['value'] . "', '" . $actAdd . "')";
			
			if(!mysqli_query($con, $sqlAddAction))
			{
				$flag = false;
			}
		}
	}
	
	echo json_encode(['confirm' => $flag]);
?>