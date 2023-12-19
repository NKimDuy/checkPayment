<?php
	
	/*
		File cập nhật lại dvlk và thêm dvlk vào tài khoản super admin
	*/

	include_once("../../../db/config.php");

	include_once("../../../db/connectSql.php");
	
	include_once("../../../db/api.php");
	
	$con = connectSql();
	
	$curl = connectCurl();
	
	$arrLinkUnitInDatabase = [];
	
	$arrLinkUnitApi = [];
	
	$linkUnitInDatabase = "select * from link_unit";
	
	$queryLinkUnitInDatabase = mysqli_query($con, $linkUnitInDatabase);
	
	if($queryLinkUnitInDatabase)
	{
		while($r = mysqli_fetch_assoc($queryLinkUnitInDatabase))
		{
			$arrLinkUnitInDatabase[$r['unit']] = $r["descript"];
		}
	}	
	
	$queryLinkUnitApi = thongTinDiaPhuong($curl, $madp = NULL);
	
	foreach($queryLinkUnitApi['data'] as $r)
	{
		$arrLinkUnitApi[$r['MaDP']] = $r["TenDP"];
	}
	/*
	$linkUnitHaveUpdate = array_diff($arrLinkUnitApi, $arrLinkUnitInDatabase);
	
	if(count($linkUnitHaveUpdate) != 0)
	{
		foreach($linkUnitHaveUpdate as $key => $value)
		{
			$sqlInsertNewLinkUnit = 'insert into link_unit values("' . $key . '", "' . $value . '")';
			
			mysqli_query($con, $sqlInsertNewLinkUnit);
			
			$updateSuperAdmin = "insert into user_link_unit values('" . "admin@oude.edu.vn" . "', '" . $key . "')";
			
			mysqli_query($con, $updateSuperAdmin);
		}
	}
	*/
	//echo json_encode(['confirm' => "Đã cập nhật " . count($linkUnitHaveUpdate) . " đơn vị liên kết mới"]);
	echo json_encode(['confirm' => $arrLinkUnitApi]);
?>