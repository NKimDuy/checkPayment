<?php

    session_start();

    include_once ("./db/config.php");

    include_once ("./db/api.php");

    include_once ("./db/connectSql.php");

	$idAccounting = 'C42311282023r2';

	$PhanTramKhac = '2';

	$GhiChu = 'Thêm 2%';
	
	$con = connectSql();

	$sql = "select total_real, total, total_discount from accounting where ID_accounting = '" . $idAccounting . "'";

	$query = mysqli_query($con, $sql);

	if($query)
	{
		while($r = mysqli_fetch_assoc($query))
		{
			$ThucChi = ((int)$r['total']*((int)$PhanTramKhac/100)) + (int)$r['total_discount'];
            //echo var_dump((int)$r['total']);
		}
	}


	$sql_UP = "	UPDATE accounting 
	
				set note = '" .$noteAcc. "', total_real = '" . $ThucChi. "', percent_another = '" .$PhanTramKhac. "' 
				
				where ID_accounting = '" . $idAccounting . "'";
	
	$query_UP = mysqli_query($con, $sql_DEL);

    echo var_dump($ThucChi);

?>


