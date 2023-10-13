<?php 
	
	include_once("D:/website/checkPayment/lib/adodb5/adodb.inc.php"); 
	
	include_once("./db/config.php"); 
	
	global $conf;
	
	$db = NewADOConnection('ado');
	
	$db->debug = true; 	
	
	$path = "202";
	
	$str = str_replace('db', '', $conf['rootPath']);
	
	
	$con_str = "Provider=vfpoledb.1;Data Source='" .  $str  . "';Collating Sequence=machine;";
	
	$db->connect($con_str);
	
	if($db->isConnected())
	{
	
	
	
		$sql = "select year(F_NGAYDONG)
		
		
			from " . $conf['QLTV'] . $path . "\\" . "Vhocphi";
	
		
		$data = $db->getAll($sql);

		echo var_dump($data);
	}
	
	
	
 ?>