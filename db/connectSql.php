<?php
	include_once ("Config.php");
	function connectSql()
	{
		global $conf;
		$con = mysqli_connect($conf['server'], $conf['user'], $conf['password'], $conf["database"]);
		if ($con)
		{
			mysqli_set_charset($con, "utf8");
			return $con;
			
		}
	}

	function disConnect()
	{
		if (connectSql())
		{
			mysqli_close(connectSql());
		}
	}
	
?>