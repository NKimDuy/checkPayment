/*
	Hiển thị DSSV theo lớp quyết toán
*/
function seeListSV(NhomTo, MaLop, TenLop)
{
	$.ajax({
		url: "./lib/ajax/accounting/getListStudentAcc.php",
		data: {
			'NhomTo': NhomTo,
			'MaLop': MaLop, 
			'TenLop': TenLop
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {	

			//alert(result['dssv']);

			let title =  '[ ' + result['info'][0] + '] ' + result['info'][1] ;
			
			let table = "<table id='tbShowListStudentAcc' class='table table-bordered table-striped'>";

			var stt = 1;

			let header = "<thead>";
			header += "<tr>";
			header += "<th>STT</th>";
			header += "<th>MÃ SỐ SV</th>";
			header += "<th>HỌ</th>";
			header += "<th>TÊN</th>";
			header += "<th>HỌC PHÍ ĐÃ THU</th>";
			header += "<th>NGÀY ĐÓNG</th>";
			header += "<th>NỘI DUNG</th>";
			header += "<th>GHI CHÚ</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";
			for(value of result['dssv']) {
				body += "<tr>";
				body += "<td>"  + stt + "</td>"; 
				body += "<td>"  + value['MaSV'] + "</td>"; 
				body += "<td>"  + value['HoLotSV'] + "</td>"; 
				body += "<td>"  + value['TenSV'] + "</td>";  
				body += "<td>"  + value['PhaiThu'] + "</td>"; 
				body += "<td>"  + value['NgayDong'] + "</td>"; 
				body += "<td>"  + value['GhiChu'] + "</td>";
				body += "<td>"  + '' + "</td>";   
				body += "</tr>";
				
				stt += 1;
			}

			body += "</tbody>";

			$("#bodyModal-4").html(table + header + body +  "</table>"); //custom cái body của Modal1

			$("#titleModal-4").html(title); //Đôi title của Modal1
			
			$('#Modal-4').modal('show')

			formatTable('tbShowListStudentAcc',5);
            
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}


/* 
	Custom modal xác nhận
*/
function showDialogForAccounting(content) {

	let title =  'Xác minh';

	$("#titleModal-3").html(title); //Đôi title của Modal1

	$("#bodyModal-3").html(content); //custom cái body của Modal1

	let footer = 	'<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Không</button>' +
	
					'<button type="button" class="btn btn-primary" id="yesdoIt" data-dismiss="modal">Đồng ý</button>';

	$("#footerModal-3").html(footer); //custom cái body của Modal
	
	$('#Modal-3').modal('show');

}


/* 
	tạo phiếu quyết toán *
*/
function createAccounting() {

	showDialogForAccounting("Đồng ý tạo phiếu quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/addDataAccountingTodb.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide'); 
				alert(result['confirm']);
				location.reload();
			}
		});
	});
	
}

/* 
	Xem chi tiết PQT
*/
function seePQT(IdAccounting) {
		
	$.ajax({
		url: "./lib/ajax/accounting/getDataFromStudent_Accounting.php",
		data: {
			IdAccounting: IdAccounting
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			//alert(result['arrList_Class']);

			$("#viewDataAccounting").css("display", "block");

			let headerdata = 	'<h3 class="box-title">[' + IdAccounting + '] CHI TIẾT PHIẾU</h3>' +
								'<div class="pull-right box-tools">' +
									'<a href="javascript:hideDIV(' + "'viewDataAccounting'" + ');">' + 
									'<button type="button" class="btn btn-default btn-sm">' + 
									'<i class="fa fa-times"></i></button>' +
								'</div>';

			$("#headerData").html(headerdata);

			let table1 = '<div class="box-header with-border"><table class="table table-bordered">';

			let body1 = '<tr style="background-color: #00a65a; color: white;">' +
									 
							'<td><label for="confirm">Đơn vị liên kết: </label></td>' +

							'<td><label>[' + result['accounting'][0]  + '] ' + result['accounting'][1] + '</label></td>' +
							
							'<td></td><td></td>' +
		
						'</tr>';

			body1 += 	'<tr>'+

							"<td><h5><b>Tổng số tiền SV đã đóng: </b></h5></td>" +

							'<td><h5>' + formatCurrency(result['accounting'][4]) + ' VND</h5></td>' +

							"<td><h5><b>Đợt quyết toán: </b></h5></td>" +

							'<td><h5>' + result['accounting'][2] + "-" + result['accounting'][3] + '</h5></td>' +

						'</tr>';

			body1 += 	'<tr>'+

							"<td><h5><b>Tổng số tiền quyết toán: </b></h5></td>" +

							'<td><h5>' + formatCurrency(result['accounting'][5]) + ' VND</h5></td>' +

							"<td><h5><b>Ngày quyết toán: </b></h5></td>" +

							'<td><h5>' +result['accounting'][6] + '</h5></td>' +

						'</tr>';


			$("#showDataAccounting").html(table1 + body1);

			let div =	"<div class='box-header'><h3 class='box-title'>DANH SÁCH PHẦN TRĂM QUYẾT TOÁN THEO LỚP</h3></div>" +
			"<div class='box-body'>" 
					
			let table = "<table id='tbShowListClass' class='table table-hover'>";

			var stt = 1;

			let header = "<thead>";
				header += "<tr class='filters'>";
				header += "<th>STT</th>";
				header += "<th>Mã Lớp</th>";
				header += "<th>Tên Lớp</th>";
				header += "<th>Mã nhóm</th>";
				header += "<th>Tổng tiền</th>";
				header += "<th>Phân trăm</th>";
				header += "<th>Quyết toán</th>";
				header += "<th>Xem DSSV</th>";
				header += "<th>Xuất Excel</th>";
				header += "<th>Xuất PDF</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['arrList_Class']) {
				body += "<tr>";
				body += "<td>"  + stt + "</td>"; 
				body += "<td>"  + value['MaLop'] + "</td>"; 
				body += "<td>"  + value['TenLop'] + "</td>"; 
				body += "<td>"  + value['NhomTo'] + "</td>"; 
				body += "<td>"  + formatCurrency(value['TongTien']) + "</td>"; 
				body += "<td>"  + value['PhanTram'] + "%</td>"; 
				body += "<td>"  + formatCurrency(value['QuyetToan']) + "</td>"; 

				//Xem chi DSSV
				body += '<td>' +
						'<a href="javascript:seeListSV(' + "'" + value['NhomTo'].trim() + "', '" + value['MaLop'].trim() + "', '" + value['TenLop'].trim() +  "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				//Xem chi DSSV
				body += '<td>' +
				'<a href="javascript:Excel(' + "'" + value['NhomTo'].trim() + "', '" + value['MaLop'].trim() + "', '" + value['TenLop'].trim() +  "'" + ');">' + 
					'<button type="button" class="btn btn-block btn-success">'+
						'Excel <i class="fa fa-file-excel-o"></i>'+
					'</button>'+
				'</a></td>';

				//Xem chi DSSV
				body += '<td>' +
				'<a href="javascript:btnPDF(' + "'" + value['NhomTo'].trim() + "', '" + value['MaLop'].trim() + "', '" + value['TenLop'].trim() +  "'" + ');">' + 
					'<button type="button" class="btn btn-block btn-danger">'+
						'PDF <i class="fa fa-file-pdf-o"></i>'+
					'</button>'+
				'</a></td>';

				stt += 1;
			}

			body += "</tbody>";
		
			$("#showListClass").html(div + table + header + body  + "</table></div>"); 

			formatTableExport('tbShowListClass',5);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
	
}

/* 
	Custom content mail
*/
function sentMailPQT(IdAccounting) {

	showDialogForAccounting("Gửi mail yếu cầu xác nhận PQT đến ĐVLK?");

	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/sentMailPQT.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide');
				alert(result['confirm']);
				location.reload();
			}
		});
	});

}

/* 
	Xóa phiếu quyết toán *
*/
function deleteAccounting(IdAccounting) {
	
	showDialogForAccounting("Đồng ý xóa phiếu quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/deleteAccounting.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide');
				alert(result['confirm']);
				location.reload();
			}
		});
	});
	
}

/* 
	ĐVLK xác nhận
*/
function DPconfirm(IdAccounting) {
	
	showDialogForAccounting("Đồng ý với phiếu quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/confirmOfDP.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide');
				alert(result['confirm']);
				location.reload();
			}
		});
	});
	
}

/* 
	OU xác nhận
*/
function OUconfirm(IdAccounting) {
	
	showDialogForAccounting("Xác nhận phiếu đã được quyết toán thành công");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/confirmOfOU.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide');
				alert(result['confirm']);
				location.reload();
			}
		});
	});
	
}

(function() {
	
	/*
		Tạo dữ liệu quyết toán theo thời gian đã chọn
	*/
	$("#getDateRange").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/createDataAccounting.php",
			data: {
				DateRange: $("#selectDateRange").val()
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				$("#viewCreateDataAccounting").css("display", "block");

				let table1 = '<div class="box-header with-border"><table class="table table-bordered">';

				let body1 = '<tr style="background-color: #00a65a; color: white;">' +
									 
								'<td><label for="confirm">Đơn vị liên kết: </label></td>' +

								'<td><label>[' + result['accounting'][0]  + '] ' + result['accounting'][1] + '</label></td>' +
								
								'<td></td><td></td>' +
							
							'</tr>';

				body1 += 	'<tr>'+

								"<td><h5><b>Tổng số tiền SV đã đóng: </b></h5></td>" +

								'<td><h5>' + formatCurrency(result['accounting'][3]) + ' VND</h5></td>' +

								"<td><h5><b>Đợt quyết toán: </b></h5></td>" +

								'<td><h5>' + result['accounting'][2] + '</h5></td>' +

							'</tr>';

				body1 += 	'<tr>'+

								"<td><h5><b>Tổng số tiền quyết toán: </b></h5></td>" +

								'<td><h5>' + formatCurrency(result['accounting'][4]) + ' VND</h5></td>' +

								"<td><h5><b>Tạo phiếu quyết toán: </b></h5></td>" +

								'<td>' +

									'<a href="javascript:createAccounting();">' + 
										'<button type="button" class="btn btn-block btn-primary">'+
											'Tạo <i class="fa fa-info-circle"></i>'+
										'</button>'+
									'</a></td>';
											
								'</td>' + 

							'</tr>';

				$("#showCreateAccounting").html(table1 + body1);

				let div =	"<div class='box-header'><h3 class='box-title'>DANH SÁCH PHẦN TRĂM QUYẾT TOÁN THEO LỚP</h3></div>" +
				"<div class='box-body'>" 
						
				let table = "<table id='tbshowCreateListClass' class='table table-hover'>";

				var stt = 1;

				let header = "<thead>";
					header += "<tr class='filters'>";
					header += "<th>STT</th>";
					header += "<th>Mã Lớp</th>";
					header += "<th>Tên Lớp</th>";
					header += "<th>Mã nhóm</th>";
					header += "<th>Tổng tiền</th>";
					header += "<th>Phân trăm</th>";
					header += "<th>Quyết toán</th>";
					header += "<th>Xem DSSV</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
				for(value of result['arrList_Class']) {
					body += "<tr>";
					body += "<td>"  + stt + "</td>"; 
					body += "<td>"  + value['MaLop'] + "</td>"; 
					body += "<td>"  + value['TenLop'] + "</td>"; 
					body += "<td>"  + value['NhomTo'] + "</td>"; 
					body += "<td>"  + formatCurrency(value['TongTien']) + "</td>"; 
					body += "<td>"  + value['PhanTram'] + "%</td>"; 
					body += "<td>"  + formatCurrency(value['QuyetToan']) + "</td>"; 

					//Xem chi DSSV
					body += '<td>' +
							'<a href="javascript:seeListSV(' + "'" + value['NhomTo'].trim() + "', '" + value['MaLop'].trim() + "', '" + value['TenLop'].trim() +  "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-info">'+
									'Xem <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';

					stt += 1;
				}

				body += "</tbody>";
				
				$("#showCreateListClass").html(div + table + header + body  + "</table></div>"); 

				formatTableExport('tbshowCreateListClass',10);

			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});

	/*
		Hiển thị danh sách PQT OU
	*/
	$.ajax({
		url: "./lib/ajax/accounting/getDataFromAccountingForOU.php",
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			//alert(result['data']['total_discount']);
					
			let table = "<table id='tbListPQTbyOU' class='table table-bordered table-striped dataTable'>";

			let header = "<thead>";
				header += "<tr>";
				header += "<th>ID</th>";
				header += "<th>ĐVLK</th>";
				header += "<th>Ngày tạo</th>";
				header += "<th>Khoảng thời gian</th>";
				header += "<th>Tổng tiền SV nộp</th>";
				header += "<th>Phần trăm</th>";
				header += "<th>Tổng tiền QT</th>";
				header += "<th>ĐVLK xác nhận</th>";
				header += "<th>Kế toán xác nhận</th>";
				header += "<th>Chi tiết</th>";
				header += "<th>Trạng thái</th>";
				header += "<th>Xóa phiểu</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; //ID
				body += "<td>"  + value[2] + "</td>"; //TenDP
				body += "<td>"  + value[3] + "</td>"; //Ngày tạo
				body += "<td>"  + value[4] + ' - ' + value[5] + "</td>"; //Khoảng thời gian
				body += "<td>"  + formatCurrency(value[6]) + ' VND' + "</td>"; //total
				body += "<td>"  + value[7] + " %</td>"; //percent
				body += "<td>"  + formatCurrency(value[8]) + ' VND' + "</td>"; //total_discount
				
				//DVLK xác nhận
				if (value[9] == '0') {
					body += "<td>Chưa</td>"; 
				} else {
					body += '<td><i class="fa fa-check"></i></td>';
				}
				
				//Kế toán xác nhận
				if ((value[9] == '1') && (value[10] == '0')) {
					body += '<td>' +
								'<a href="javascript:OUconfirm(' + "'" + value[0].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Xác nhận QT <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>'; 
				} else if (value[10] == '0') {
					body += "<td>Chờ ĐVLK xác nhận</td>"; 
				} else {
					body += '<td><i class="fa fa-check"></i></td>';
				}

				//Xem chi tiết phiếu
				body += '<td>' +
							'<a href="javascript:seePQT(' + "'" + value[0].trim() + "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				//Trạng thái
				if (value[12] == '0') {
					body += '<td>' +
								'<a href="javascript:sentMailPQT(' + "'" + value[0].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-primary">'+
									'Gửi mail <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';
				} else if (value[11] == null) {
					body += "<td>Đã gửi mail</td>"; 
				} else {
					body += "<td>Đã QT (" + value[11] + ")</td>";
				}

				//Xóa phiếu	

				if (value[11] == null) {
					body += '<td>' +
								'<a href="javascript:deleteAccounting(' + "'" + value[0].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-danger">'+
									'<i class="fa fa-trash"></i>'+
								'</button>'+
							'</a></td>';
				} else {
					body += '<td>' + 
								'<button type="button" class="btn btn-danger disabled">'+
									'<i class="fa fa-trash"></i>'+
								'</button>'+
							'</td>';
				}

			}

			body += "</tbody>";
			
			$("#showListPQTbyOU").html(table + header + body  + "</table></div>"); 

			formatTable('tbListPQTbyOU',5);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});

	/*
		Hiển thị danh sách PQT DP
	*/
	$.ajax({
		url: "./lib/ajax/accounting/getDataFromAccountingForDP.php",
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			//alert(result['data']['total_discount']);
					
			let table = "<table id='tbListPQTbyDP' class='table table-bordered table-striped dataTable'>";

			let header = "<thead>";
				header += "<tr>";
				header += "<th>ID</th>";
				header += "<th>ĐVLK</th>";
				header += "<th>Ngày tạo</th>";
				header += "<th>Khoảng thời gian</th>";
				header += "<th>Tổng tiền SV nộp</th>";
				header += "<th>Phần trăm</th>";
				header += "<th>Tổng tiền QT</th>";
				header += "<th>ĐVLK xác nhận</th>";
				header += "<th>Chi tiết</th>";
				header += "<th>Trạng thái</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; //ID
				body += "<td>"  + value[2] + "</td>"; //TenDP
				body += "<td>"  + value[3] + "</td>"; //Ngày tạo
				body += "<td>"  + value[4] + ' - ' + value[5] + "</td>"; //Khoảng thời gian
				body += "<td>"  + formatCurrency(value[6]) + ' VND' + "</td>"; //total
				body += "<td>"  + value[7] + " %</td>"; //percent
				body += "<td>"  + formatCurrency(value[8]) + ' VND' + "</td>"; //total_discount
				
				//DVLK xác nhận
				if (value[9] == '0') {
					body += '<td>' +
								'<a href="javascript:DPconfirm(' + "'" + value[0].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Đồng ý <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>'; 
				} else {
					body += '<td><i class="fa fa-check"></i></td>';
				}

				//Xem chi tiết phiếu
				body += '<td>' +
							'<a href="javascript:seePQT(' + "'" + value[0].trim() + "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				//Trạng thái
				if (value[0] == null) {
					body += '<td>Chờ xác nhận</td>';
				} else if (value[11] == null) {
					body += "<td>Chờ quyết toán</td>";
				} else {
					body += "<td>Đã quyết toán (" + value[11] + ")</td>";
				}

			}

			body += "</tbody>";
			
			$("#showListPQTbyDVLK").html(table + header + body  + "</table></div>");

			formatTable('tbListPQTbyDP',5);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
	
})();	