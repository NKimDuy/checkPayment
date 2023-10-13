<?php
	
	/*
		file có nhiệm vụ trả về danh sách sinh viên đã đóng tiền, để tiến hành tạo phiếu học liệu để phát sách
	*/

	include_once ("../../../db/config.php");

	include_once ("../../../db/connectAdodb.php");
	
	include_once("../../../db/connectSql.php");
	
	include_once ("../../../lib/u-convert/autoload.php");
	
	use Anhskohbo\UConvert\UConvert;
	
	$idDvlk = $_GET['idDvlk'];
	
	$path = $_GET['path'];
	
	$fromDay = $_GET['fromDay'];
	
	$toDay = $_GET['toDay'];
	
	$db = connectAdodb();
	
	$con = connectSql();
	
	global $conf;
	
	$arrListStudent = [];
	
	/*--------------------------------------------------*/
	/* tìm tất cả sinh viên trong học kì tương ứng của đơn vị liên kết tương ứng */
	
	$arrStudentHasExit = [];
	
	$sqlCheckStudentHasExist = "select mssv, ID_subject 
	
										from student_receipt_book 
										
										join receipt_book 
										on receipt_book.ID_receipt = student_receipt_book.ID_receipt 
										
										where ID_dvlk = '" . $idDvlk . "'";
										
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
	
	
	/*--------------------------------------------------*/
	/* lọc sinh viên, nếu đã tồn tại trong csdl thì không xuất hiện nữa */
	$sql = "select distinct diem.F_MASV, stdsv.F_HOLOTVN, stdsv.F_TENVN, stdsv.F_NGAYSINH, 
				stdlop.F_TENLOP, 
				Mdonghocphi.F_MAMH, 
				TDMH.F_TENMHVN, 
				DTOC(Vhocphi.F_NGAYDONG), 
				shssv.F_EMAIL1 as email, shssv.F_DIENTHGD as dt1, shssv.F_DIENTHLL as dt2, shssv.F_GCHSSV as nguoinhan, 
				shssv.F_XLTNCD as phong, shssv.F_DTVC as toanha, shssv.F_NGDTTR as sonha, shssv.F_TRUONGCH as duong, 
				shssv.F_DCVC as khupho, shssv.F_TENVC as phuong, shssv.F_NGHEVC as quan, shssv.F_DCCQCT as tinh 
		
		
			from " . $conf['DIEM'] . $path . "\\" . "diem
			
			join " . $conf['QLTV'] . $path . "\\" . "Vhocphi 
			on Vhocphi.F_MASV = diem.F_MASV
			
			join " . $conf['QLSV'] . $conf['root'] . "shssv 
			on shssv.F_MASV = Vhocphi.F_MASV 
			
			join " . $conf['QLSV'] . $conf['root'] . "stdsv 
			on stdsv.F_MASV = shssv.F_MASV 
			
			join " . $conf['QLSV'] . $conf['root'] . "stdlop 
			on stdlop.F_TENLOP = stdsv.F_TENLOP 
			
			join " . $conf['QLSV'] . $conf['root'] . "stddp 
			on stddp.F_MADP = stdlop.F_MADP

			join " . $conf['DKMH'] . $path . "\\" . "Mdonghocphi0 
			on Mdonghocphi0.F_MASV = diem.F_MASV
			
			join " . $conf['DKMH'] . $path . "\\" . "Mdonghocphi 
			on Mdonghocphi.F_GUIDGBH = Mdonghocphi0.F_GUIDGBH
			
			join " . $conf['EXPORT'] . "TDMH 
			on TDMH.F_MAMH = Mdonghocphi.F_MAMH
			
			where F_NGAYDONG 
			
			between CTOD('" . $fromDay . "') 
			
			and CTOD('" . $toDay . "') 
			
			and stddp.F_MADP = '" . $idDvlk . "'";
	
	$data = $db->getAll($sql);
	
	$arrListStudent = [];
	
	$arrStudentByDay = []; // danh sách sinh viên đã được lọc trùng
	
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
			$temp = [];
		
			array_push($temp, $studentByDay[0]); // mssv
		
			array_push($temp, (new UConvert(utf8_encode($studentByDay[1]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // họ
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[2]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tên
			
			array_push($temp, $studentByDay[3]); // ngày sinh
			
			array_push($temp, $studentByDay[4]); // tên lớp
			
			array_push($temp, $studentByDay[5]); // mã môn
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[6]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tên môn
			
			array_push($temp, $studentByDay[7]); // ngày đóng tiền
			
			array_push($temp, $studentByDay[8]); // mail
			
			array_push($temp, $studentByDay[9]); // sdt gia đình
				
			array_push($temp, $studentByDay[10]); // sdt cá nhân
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[11]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // người nhận
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[12]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // phòng
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[13]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tòa nhà
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[14]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // số nhà
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[15]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // đường
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[16]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // khu phố
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[17]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // phường
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[18]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // quận 
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[19]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tỉnh
			
			array_push($arrListStudent, $temp);
		}
	}
	
	else
	{
		foreach($data as $studentByDay)
		{
			$temp = [];
		
			array_push($temp, $studentByDay[0]); // mssv
		
			array_push($temp, (new UConvert(utf8_encode($studentByDay[1]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // họ
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[2]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tên
			
			array_push($temp, $studentByDay[3]); // ngày sinh
			
			array_push($temp, $studentByDay[4]); // tên lớp
			
			array_push($temp, $studentByDay[5]); // mã môn
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[6]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tên môn
			
			array_push($temp, $studentByDay[7]); // ngày đóng tiền
			
			array_push($temp, $studentByDay[8]); // mail
			
			array_push($temp, $studentByDay[9]); // sdt gia đình
				
			array_push($temp, $studentByDay[10]); // sdt cá nhân
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[11]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // người nhận
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[12]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // phòng
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[13]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tòa nhà
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[14]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // số nhà
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[15]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // đường
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[16]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // khu phố
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[17]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // phường
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[18]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // quận 
			
			array_push($temp, (new UConvert(utf8_encode($studentByDay[19]), UConvert::TCVN3))->transform(UConvert::UNICODE)); // tỉnh
			
			array_push($arrListStudent, $temp);
		}
	}
	
	/*----------------------------------------------------------------*/
	
	echo json_encode(['data' => $arrListStudent]);
	//echo json_encode(['data' => $arrListStudent, 'test' => 'số dòng hiện có trong csdl: ' . count($arrStudentHasExit) . ', số dòng bị trùng: ' . count($c) . ', số dòng đã lọc trùng: ' . count($arrStudentByDay)]);
?>