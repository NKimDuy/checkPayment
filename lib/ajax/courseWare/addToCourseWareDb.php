<?php

	/*
		file có nhiệm vụ thêm sinh viên vào database
		
		bước 1: sẽ lấy tất cả sinh viên hiện có trong database theo điều kiện
		
		bước 2: lấy tất cả sinh viên theo ngày bằng file dbf
		
		bước 3: nếu không có sinh viên nào bị trùng, thì thêm tất cả, nếu có sinh viên bị trùng, chỉ thêm những sinh viên không trùng
	*/

	include_once ("../../../db/config.php");

	include_once ("../../../db/connectAdodb.php");
	
	include_once("../../../db/connectSql.php");
	
	include_once ("../../../lib/u-convert/autoload.php");
	
	use Anhskohbo\UConvert\UConvert;
	
	$idDvlk = $_GET['idDvlk'];
	
	$nameDvlk = $_GET['nameDvlk'];
	
	$idSemester = $_GET['idSemester'];
	
	$semester = $_GET['semester'];
	
	$fromDay = $_GET['fromDay'];
	
	$toDay = $_GET['toDay'];
	
	$db = connectAdodb();
	
	$con = connectSql();
	
	global $conf;
	
	date_default_timezone_set('Asia/Ho_Chi_Minh');
	
	$idReceiptBook = $idDvlk . "_" . $idSemester . "_" . date("Y_m_d(h:i:sa)"); // tạo ID cho phiếu học liệu
	
	
	/*________________________________________________________________________________*/
	/* tìm tất cả sinh viên trong học kì tương ứng của đơn vị liên kết tương ứng */
	
	$arrStudentHasExit = [];
	
	$sqlCheckStudentHasExist = "select mssv, ID_subject 
										from student_receipt_book 
										
										join receipt_book 
										on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
										
										where ID_dvlk = '" . $idDvlk . "' and ID_semester = '" . $idSemester . "'";
										
	$queryStudentHasExist = mysqli_query($con, $sqlCheckStudentHasExist);
	
	if($queryStudentHasExist)
	{
		$numberStudentHasExist = mysqli_num_rows($queryStudentHasExist);
		
		if($numberStudentHasExist > 0)
		{
			while($r = mysqli_fetch_assoc($queryStudentHasExist))
			{
				$temp = [];
				
				array_push($temp, $r['mssv']);
				
				array_push($temp, $r['ID_subject']);
				
				array_push($arrStudentHasExit, $temp);
			}
		}
	}
	/*----------------------------------------------------------------*/
	
	
	/*_______________________________________________________________________________________-*/
	/* thêm phiếu quyết toán vào bảng receipt_book  */
	
	$sqlInsertToReceiptBook = "insert into receipt_book(ID_receipt, ID_dvlk, dvlk, ID_semester, semester, start_day, end_day, create_day) values('" .
									$idReceiptBook . "', '" . 
									$idDvlk . "', '" . 
									$nameDvlk . "', '" . 
									$idSemester . "', '" . 
									$semester . "', '" . 
									date_format(date_create($fromDay),"Y/m/d") . "', '" . 
									date_format(date_create($toDay),"Y/m/d") . "', '" . 
									date("Y/m/d") . "')"; 						
	
	$insertToReceiptBook = mysqli_query($con, $sqlInsertToReceiptBook);
	/*----------------------------------------------------------------*/
	
	
	/*____________________________________________________________________________________*/
	/* lọc sinh viên, nếu đã tồn tại trong csdl thì không xuất hiện nữa */
	$sql = "select distinct diem.F_MASV, stdsv.F_HOLOTVN, stdsv.F_TENVN, stdsv.F_NGAYSINH, 
				stdlop.F_TENLOP, 
				Mdonghocphi.F_MAMH, 
				TDMH.F_TENMHVN, 
				DTOC(Vhocphi.F_NGAYDONG), 
				shssv.F_EMAIL1 as email, shssv.F_DIENTHGD as dt1, shssv.F_DIENTHLL as dt2, shssv.F_GCHSSV as nguoinhan, 
				shssv.F_XLTNCD as phong, shssv.F_DTVC as toanha, shssv.F_NGDTTR as sonha, shssv.F_TRUONGCH as duong, 
				shssv.F_DCVC as khupho, shssv.F_TENVC as phuong, shssv.F_NGHEVC as quan, shssv.F_DCCQCT as tinh 
		
		
			from " . $conf['DIEM'] . $idSemester . "\\" . "diem
			
			join " . $conf['QLTV'] . $idSemester . "\\" . "Vhocphi 
			on Vhocphi.F_MASV = diem.F_MASV
			
			join " . $conf['QLSV'] . $conf['root'] . "shssv 
			on shssv.F_MASV = Vhocphi.F_MASV 
			
			join " . $conf['QLSV'] . $conf['root'] . "stdsv 
			on stdsv.F_MASV = shssv.F_MASV 
			
			join " . $conf['QLSV'] . $conf['root'] . "stdlop 
			on stdlop.F_TENLOP = stdsv.F_TENLOP 
			
			join " . $conf['QLSV'] . $conf['root'] . "stddp 
			on stddp.F_MADP = stdlop.F_MADP

			join " . $conf['DKMH'] . $idSemester . "\\" . "Mdonghocphi0 
			on Mdonghocphi0.F_MASV = diem.F_MASV
			
			join " . $conf['DKMH'] . $idSemester . "\\" . "Mdonghocphi 
			on Mdonghocphi.F_GUIDGBH = Mdonghocphi0.F_GUIDGBH
			
			join " . $conf['EXPORT'] . "TDMH 
			on TDMH.F_MAMH = Mdonghocphi.F_MAMH
			
			where F_NGAYDONG 
			
			between CTOD('" . $fromDay . "') 
			
			and CTOD('" . $toDay . "') 
			
			and stddp.F_MADP = '" . $idDvlk . "'";
	
	$data = $db->getAll($sql);
	
	$arrStudentByDay = []; // danh sách sinh viên đã được lọc trùng
	
	$sqlInsertIntoStudentReceiveBook = '';
	
	if(count($arrStudentHasExit) > 0)
	{
		foreach($data as $studentByDay)
		{	
			$flag = true;
			
			foreach($arrStudentHasExit as $studentHasExist)
			{
				if(trim($studentByDay[0]) == $studentHasExist[0] && trim($studentByDay[5]) == $studentHasExist[1])
				{
					$flag = false;
					
					break;
				}
			}
			
			if($flag)
			{
				array_push($arrStudentByDay, $studentByDay);
			}
		}
		
		foreach($arrStudentByDay as $studentByDay)
		{
			$sqlInsertIntoStudentReceiveBook = "insert into student_receipt_book(mssv, first_name, last_name, birth_day, class, ID_subject, subject, day_pay, 
																				email, phone1, phone2, receiver, room, building, house_number, street_name, 
																				town, ward, district, city, ID_receipt) values('" 
																					. trim($studentByDay[0]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[1]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[2]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim($studentByDay[3]) . "', '" 
																					. trim($studentByDay[4]) . "', '" 
																					. trim($studentByDay[5]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[6]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim($studentByDay[7]) . "', '" 
																					. trim($studentByDay[8]) . "', '" 
																					. trim($studentByDay[9]) . "', '" 
																					. trim($studentByDay[10]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[11]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[12]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[13]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[14]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[15]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[16]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[17]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[18]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[19]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. $idReceiptBook 
																				. "')";
			mysqli_query($con, $sqlInsertIntoStudentReceiveBook);
		}
	}
	else
	{
		foreach($data as $studentByDay)
		{
			$sqlInsertIntoStudentReceiveBook = "insert into student_receipt_book(mssv, first_name, last_name, birth_day, class, ID_subject, subject, day_pay, 
																				email, phone1, phone2, receiver, room, building, house_number, street_name, 
																				town, ward, district, city, ID_receipt) values('" 
																					. trim($studentByDay[0]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[1]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[2]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim($studentByDay[3]) . "', '" 
																					. trim($studentByDay[4]) . "', '" 
																					. trim($studentByDay[5]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[6]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim($studentByDay[7]) . "', '" 
																					. trim($studentByDay[8]) . "', '" 
																					. trim($studentByDay[9]) . "', '" 
																					. trim($studentByDay[10]) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[11]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[12]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[13]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[14]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[15]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[16]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[17]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[18]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. trim( (new UConvert(utf8_encode($studentByDay[19]), UConvert::TCVN3))->transform(UConvert::UNICODE) ) . "', '" 
																					. $idReceiptBook 
																				. "')";
			mysqli_query($con, $sqlInsertIntoStudentReceiveBook);
			
		}
	}
	/*-----------------------------------------------------------------------------------------------------------------------------*/
	
	
	echo json_encode([
		'confirm' => $sqlInsertIntoStudentReceiveBook,
		'test' => count($c)/*,
		'confirm' => $insertToReceiptBook
		/*, 
		'whoSentMail' => $dataForm[0]['value'], 
		'dvlk' => $dataForm[2]['value'], 
		'from' => date_format(date_create($dataForm[5]['value']),"d/m/Y"), 
		'to' => date_format(date_create($dataForm[6]['value']),"d/m/Y")*/
	]);
?>