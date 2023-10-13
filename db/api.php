<?php

	include_once ("connectAPI.php");

	function thongTinDiaPhuong($curl, $madp = null)
	{
		$url = '';
		if($madp == '' || $madp == null)
			$url = 'https://api.ou.edu.vn/api/v1/hdmdp';
		else
			$url = 'https://api.ou.edu.vn/api/v1/hdmdp?madp=' . $madp;
		
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}

	function thongTin1SinhVien($curl, $masv)
	{
		$url = 'https://api.ou.edu.vn/api/v1/student/basicinfo?masv=' . $masv;
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}

	function TKBtheoDiaPhuong($curl, $nhhk, $madp, $malop, $type)
	{
		$url = 'https://api.ou.edu.vn/api/v1/tkblopdp?nhhk=' . $nhhk . '&madp=' . $madp . '&malop=' . $malop . '&type=' . $type;
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}

	function DSMHSinhVienDangKy($curl, $masv, $nhhk)
	{
		$url = 'https://api.ou.edu.vn/api/v1/student/gettkb?nhhk=' . $nhhk . '&masv=' . $masv;
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}

	function DSSVTheoMonHoc($curl, $madvpc = 'TX', $nhhk, $mamh, $manh)
	{
		$url = 'https://api.ou.edu.vn/api/v1/dkmh/dssv_mh_nh?madvpc=' . $madvpc . '&nhhk=' . $nhhk . '&mamh=' . $mamh . '&manh=' . $manh;
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}


	function thongTinLopTheoDiaPhuong($curl, $malop = null, $madp = null)
	{
		$url = '';
		if($madp == '' || $madp == null)
			$url = 'https://api.ou.edu.vn/api/v1/dslopdp';
		else
			$url = 'https://api.ou.edu.vn/api/v1/dslopdp?malop=' . $malop . '&madp=' . $madp;
		
		setParams($curl, $url);
		$ketQua = json_decode(curl_exec($curl), true);
		return $ketQua;
		disConnectCurl($curl);
	}

	function thongTinSinhVienTheolopTheoHocKy($curl, $madvpc = 'TX', $nhhk, $malop, $type = NULL) /* mặc định trả về danh sách sinh viên của lớp */
	{
		if($nhhk != '' && $malop != '')
		{
			$url = 'https://api.ou.edu.vn/api/v1/com/getdssvhkbylop?madvpc=' . $madvpc . '&nhhk=' . $nhhk . '&malop=' . $malop . '&type=' . $type;
		
			setParams($curl, $url);
			$ketQua = json_decode(curl_exec($curl), true);
			return $ketQua;
			disConnectCurl($curl);
		}
		else
			return [];
		
	}

	function thongTinMonHocSinhVienDangKy($curl, $masv, $nhhk)
	{
		if($masv != '' && $nhhk != '')
		{
			$url = 'https://api.ou.edu.vn/api/v1/com/getdssvhkbylop?masv=' . $masv . '&nhhk=' . $nhhk;
		
			setParams($curl, $url);
			$ketQua = json_decode(curl_exec($curl), true);
			return $ketQua;
			disConnectCurl($curl);
		}
		else
			return [];
		
	}

	function thongTinHoaDonHocPhiSinhVien($curl, $masv, $all = 1, $nhhk, $ttmh = 1, $sogbhp)
	{
		if($masv != '')
		{
			$url = 'https://api.ou.edu.vn/api/v1/student/hoadonhp?masv=' . $masv . '&all=' . $all . '&nhhk=' . $nhhk . '&ttmh=' . $ttmh . '&sogbhp=' . $sogbhp;
		
			setParams($curl, $url);
			$ketQua = json_decode(curl_exec($curl), true);
			return $ketQua;
			disConnectCurl($curl);
		}
		else
			return [];
		
	}

	function thongTinHocPhiDiaPhuong($curl, $nhhk, $madp)
	{
		if($nhhk != '' && $madp != '')
		{
			$url = 'https://api.ou.edu.vn/api/v1/qltv/hptheodp?nhhk=' . $nhhk . '&madp=' . $madp;
		
			setParams($curl, $url);
			$ketQua = json_decode(curl_exec($curl), true);
			return $ketQua;
			disConnectCurl($curl);
		}
		else
			return [];
		
	}

	function thongTinDongHocPhiDiaPhuong($curl, $madvpc = 'TX', $fromdate, $todate, $madp)
	{
		if($madp != '')
		{
			$url = 'https://api.ou.edu.vn/api/v1/qltv/hptheodpdaterange?madvpc=' . $madvpc . '&fromdate=' . $fromdate . '&todate=' . $todate . '&madp=' . $madp;
		
			setParams($curl, $url);
			$ketQua = json_decode(curl_exec($curl), true);
			return $ketQua;
			disConnectCurl($curl);
		}
		else
			return [];
		
	}

?>
