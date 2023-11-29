	/*
	Hiển thị DSSV theo lớp quyết toán
*/
function seeListSV(NhomTo, MaLop, dateRange, TenLop)
{
	$.ajax({
		url: "./lib/ajax/accounting/getListStudentAcc.php",
		data: {
			'NhomTo': NhomTo,
			'MaLop': MaLop, 
			'dateRange': dateRange,
			'TenLop': TenLop
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {	

			//alert(result['dssv']);

			let title =  '[ ' + result['info'][0] + '] ' + result['info'][1] ;
			
			let table = "<table id='tbShowListStudentAcc' class='table table-bordered'>";

			var stt = 1;
			var SUM = 0;

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
				SUM += parseInt(value['PhaiThu']);
			}

			body += "</tbody>";

			footer = 	'<tfoot><tr>'+

							"<td></td><td></td>" +

							"<td><h5><b>TỔNG CỘNG: </b></h5></td>" + "<td></td>" +

							'<td><h5>' + formatCurrency(SUM) + '</h5></td>' + "<td></td><td></td><td></td>" +

						'</tr></tfoot>';


			$("#bodyModal-4").html(table + header + body + footer +  "</table>"); //custom cái body của Modal1

			$("#titleModal-4").html(title); //Đôi title của Modal1
			
			$('#Modal-4').modal('show')

			formatTableExPDF_DSSV('tbShowListStudentAcc', 5, TenLop, dateRange, result['info'][2]);
            
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

							'<td><label>[' + result['accounting'][0]['MaDP']  + '] ' + result['accounting'][0]['TenDP'] + '</label></td>' +
		
						'</tr>';

			body1 += 	'<tr>'+
									 
							'<td><label for="confirm">Hệ đào tạo: </label></td>' +

							'<td><h5>' + result['accounting'][0]['HeDT'] + '</h5></td>' +
		
						'</tr>';

			body1 += 	'<tr>'+

							"<td><h5><b>Đợt quyết toán: </b></h5></td>" +

							'<td><h5>' + result['accounting'][0]['dateRange'] + '</h5></td>' +

						'</tr>';

			body1 += 	'<tr>'+

							"<td><h5><b>Ngày quyết toán: </b></h5></td>" +

							'<td><h5>' +result['accounting'][0]['NgayQT'] + '</h5></td>' +

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
				//header += "<th>Mã nhóm</th>";
				header += "<th>Tổng thu</th>";
				header += "<th>Phần trăm</th>";
				header += "<th>Tổng chi</th>";
				header += "<th>Xem DSSV</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['arrList_Class']) {
				body += "<tr>";
				body += "<td>"  + stt + "</td>"; 
				body += "<td>"  + value['MaLop'] + "</td>"; 
				body += "<td>"  + value['TenLop'] + "</td>"; 
				//body += "<td>"  + value['NhomTo'] + "</td>"; 
				body += "<td>"  + formatCurrency(value['TongTien']) + "</td>"; 
				body += "<td>"  + value['PhanTram'] + "%</td>"; 
				body += "<td>"  + formatCurrency(value['QuyetToan']) + "</td>"; 

				//Xem chi DSSV
				body += '<td>' +
						'<a href="javascript:seeListSV(' + "'" + value['NhomTo'].trim() + "', '" + value['MaLop'].trim() + "', '" + result['accounting'][0]['dateRange'].trim() + "', '" + value['TenLop'].trim() +  "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				stt += 1;
			}

			body += "</tbody>";

			footer = 	'<tfoot><tr>'+

							"<td></td><td></td>" +

							"<td><h5><b>TỔNG CỘNG: </b></h5></td>"  +

							'<td><h5>' + formatCurrency(result['accounting'][0]['PhaiThu']) + '</h5></td>' + "<td></td>" +

							'<td><h5>' + formatCurrency(result['accounting'][0]['QuyetToan']) + '</h5></td>' + "<td></td>" +

						'</tr></tfoot>';
		
			$("#showListClass").html(div + table + header + body + footer + "</table></div>"); 

			formatTableExPDF_DSL('tbShowListClass',5, result['accounting'][0]['dateRange'], result['accounting'][0]['TenDP'], result['accounting'][0]['HeDT']);

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
	Thêm ghi chú *
*/
function addNote(IdAccounting, PhanTramKhac, GhiChu) {

	content =	'<form>' + 
				'<div class="form-group">' +
					'<label for="formGroupExampleInput">Nhập phần trăm khác</label>' + 
					'<input type="number" id="percentACC" class="form-control" id="formGroupExampleInput" min="0" max="100" value="' + PhanTramKhac + '">' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="formGroupExampleInput2">Thêm ghi chú</label>' +
					//'<input type="textarea" id="noteACC" class="form-control" id="formGroupExampleInput" value="' + GhiChu + '">' +
					'<textarea id="noteACC" class="form-control" id="exampleFormControlTextarea1" rows="3">' + GhiChu + '</textarea>'
				'</div>'
				'</form>'
	
	showDialogForAccounting(content);
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/addNote.php",
			data: {
				IdAccounting: IdAccounting,
				PhanTramKhac: $("#percentACC").val(),
				GhiChu: $("#noteACC").val()
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
		Chọn đợt quyết toán
	*/
	$(window).load(() => {
		$.ajax({
			url: "./lib/ajax/getStatic/LoadRoadYear.php",
			dataType: "JSON",
			success: function(result) {

				//Hiển thi thông tin lựa chọn HỌC KỲ

				let optionYear = "";
				
				let optionRound = "";

				let optionTier = "";

				if (result['resultRY'] == null) {

					optionYear = "<option value='null' selected>Chọn năm quyết toán</option>";
				
					optionRound = "<option value='null' selected>Chọn đợt quyết</option>";

					optionTier = "<option value='null' selected>Chọn hệ đào tạo</option>";
					
				} else {
					
					$.each(result['resultRY'], (index, value) => {
	
						optionYear = "<option value='" + value[0] + "'selected>" + value[1] + "</option>";		
							
						optionRound = "<option value='" + value[2] + "'selected>" + value[3] + "</option>";

						optionTier = "<option value='" + value[5] + "'selected>" + value[6] + "</option>";
	
					});	

				}
				
				$.each(result['selectRY'], (index, value) => {

					if (value[2] == 'year') {

						optionYear += "<option value='" + value[0] + "'>" + value[1] + "</option>";		
						
					} else if (value[2] == 'round') {
						
						optionRound += "<option value='" + value[0] + "'>" + value[1] + "</option>";

					} else {

						optionTier += "<option value='" + value[0] + "'>" + value[1] + "</option>";

					}	


				});
				
				$("#selectYear").html(optionYear);

				$("#selectRound").html(optionRound);

				$("#selectTier").html(optionTier);
			}
		});
		
	});

	
	/*
		Tạo dữ liệu quyết toán theo thời gian đã chọn
	*/
	$("#getDateRange").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/createDataAccounting.php",
			data: {
				Year: $("#selectYear").val(),
				Round: $("#selectRound").val(),
				Tier: $("#selectTier").val()
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
					
			let table = "<table id='tbListPQTbyOU' class='table table-bordered table-striped dataTable'>";

			stt = 1;

			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>ID</th>";
				header += "<th>ĐVLK</th>";
				header += "<th>Hệ Đào tạo</th>";
				header += "<th>Ngày tạo</th>";
				header += "<th>Năm</th>";
				header += "<th>Đợt</th>";
				header += "<th>Tổng thu</th>";
				header += "<th>Tổng Chi</th>";
				header += "<th>ĐVLK xác nhận</th>";
				header += "<th>OU xác nhận</th>";
				header += "<th>Xem chi tiết</th>";
				header += "<th>Trạng thái</th>";
				header += "<th>Xóa phiểu</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + stt + "</td>"; //stt
				body += "<td>"  + value['ID_accounting'] + "</td>"; //ID
				body += "<td>"  + value['TenDP'] + "</td>"; //TenDP
				body += "<td>"  + value['HeDT'] + "</td>"; //HeDT
				body += "<td>"  + value['createDay'] + "</td>"; //Ngày tạo
				body += "<td>"  + value['Year'] + "</td>"; //Năm quyết toán
				body += "<td>"  + value['Round'] + "</td>"; //Đợt quyết toán
				body += "<td>"  + formatCurrency(value['PhaiThu']) + ' VND' + "</td>"; //total
				body += "<td>"  + formatCurrency(value['QuyetToan']) + ' VND' + "</td>"; //total_discount
				
				//DVLK xác nhận (0: chưa - 1: Rồi) 
				if (value['DPXacNhan'] == '0') {
					body += "<td>Chưa</td>"; 
				} else {
					body += '<td><i class="fa fa-check"></i></td>';
				}
				
				//Kế toán xác nhận (0: chưa - 1: Rồi) 
				if ((value['DPXacNhan'] == '1') && (value['OUXacNhan'] == '0')) {
					body += '<td>' +
								'<a href="javascript:OUconfirm(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Xác nhận QT <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>'; 
				} else if (value['DPXacNhan'] == '0') {
					body += "<td>Chờ ĐVLK xác nhận</td>"; 
				} else  if (value['OUXacNhan'] == '1'){
					body += '<td><i class="fa fa-check"></i></td>';
				}

				//Xem chi tiết phiếu
				body += '<td>' +
							'<a href="javascript:seePQT(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				//Trạng thái (0: Gửi mail, 1: Đã gửi, 2: Đã quyết toán)
				if (value['TrangThai'] == '0') {
					body += '<td>' +
								'<a href="javascript:sentMailPQT(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-primary">'+
									'Gửi mail <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';
				} else if (value['TrangThai'] == '1') {
					body += "<td>Đã gửi mail</td>"; 
				} else if (value['TrangThai'] == '2'){
					body += "<td>Đã QT (" + value['NgayQT'] + ")</td>";
				}

				//Xóa phiếu	

				if (value['NgayQT'] == null) {
					body += '<td>' +
								'<a href="javascript:deleteAccounting(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
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


				stt += 1;

			}

			body += "</tbody>";
			
			$("#showListPQTbyOU").html(table + header + body  + "</table></div>"); 

			formatTableExport('tbListPQTbyOU',5);

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
					
			let table = "<table id='tbListPQTbyDP' class='table table-bordered table-striped dataTable'>";

			stt = 1;

			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>ID</th>";
				header += "<th>ĐVLK</th>";
				header += "<th>Hệ</th>";
				header += "<th>Ngày tạo</th>";
				header += "<th>Năm quyết toán</th>";
				header += "<th>Đợt quyết toán</th>";
				header += "<th>Tổng tiền thu</th>";
				header += "<th>Tổng tiền QT</th>";
				header += "<th>ĐVLK xác nhận</th>";
				header += "<th>Xem chi tiết</th>";
				header += "<th>Trạng thái</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";

			for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + stt + "</td>"; //stt
					body += "<td>"  + value['ID_accounting'] + "</td>"; //TenDP
					body += "<td>"  + value['TenDP'] + "</td>"; //TenDP
					body += "<td>"  + value['HeDT'] + "</td>"; //TenDP
					body += "<td>"  + value['createDay'] + "</td>"; //Ngày tạo
					body += "<td>"  + value['Year'] + "</td>"; //Năm quyết toán
					body += "<td>"  + value['Round'] + "</td>"; //Đợt quyết toán
					body += "<td>"  + formatCurrency(value['PhaiThu']) + ' VND' + "</td>"; //total
					body += "<td>"  + formatCurrency(value['QuyetToan']) + ' VND' + "</td>"; //total_discount
					
				//DVLK xác nhận
				if (value['DPXacNhan'] == '0') {
					body += '<td>' +
								'<a href="javascript:DPconfirm(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Đồng ý <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>'; 
				} else {
					body += '<td><i class="fa fa-check"></i></td>';
				}

				//Xem chi tiết phiếu
				body += '<td>' +
							'<a href="javascript:seePQT(' + "'" + value['ID_accounting'].trim() + "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				//Trạng thái
				if (value['DPXacNhan'] == 0) {
					body += '<td>Chờ xác nhận</td>';
				} else if ((value['DPXacNhan'] == '1') && (value['OUXacNhan'] == '0')) {
					body += "<td>Chờ quyết toán</td>";
				} else {
					body += "<td>Đã quyết toán (" + value['NgayQT'] + ")</td>";
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

	/*
		Hiển thị thống kê các đợt quyết toán
	*/
	$.ajax({
		url: "./lib/ajax/accounting/getDataForStatistical.php",
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
					
			let table = "<table id='tbStatis' class='table table-bordered table-striped dataTable'>";

			stt = 1;

			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>ID</th>";
				header += "<th>ĐVLK</th>";
				header += "<th>Hệ Đào tạo</th>";
				header += "<th>Năm</th>";
				header += "<th>Đợt</th>";
				header += "<th>Tổng thu</th>";
				header += "<th>Tổng Chi</th>";
				header += "<th>% Khác</th>";
				header += "<th>Thực Chi</th>";
				header += "<th>Ngày QT</th>";
				header += "<th>Ghi chú</th>";
				header += "<th>Thêm ghi chú</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + stt + "</td>"; //stt
				body += "<td>"  + value['ID_accounting'] + "</td>"; //ID
				body += "<td>"  + value['TenDP'] + "</td>"; //TenDP
				body += "<td>"  + value['HeDT'] + "</td>"; //HeDT
				body += "<td>"  + value['Year'] + "</td>"; //Năm quyết toán
				body += "<td>"  + value['Round'] + "</td>"; //Đợt quyết toán
				body += "<td>"  + formatCurrency(value['PhaiThu']) + "</td>"; //total
				body += "<td>"  + formatCurrency(value['QuyetToan']) + "</td>"; //total_discount
				body += "<td>"  + value['PhanTramKhac'] + " %</td>"; //percent_another
				body += "<td>"  + formatCurrency(value['ThucChi']) + "</td>"; //percent_another
				body += "<td>"  + value['NgayQT'] + "</td>"; //ngay QT
				body += "<td>"  + value['GhiChu'] + "</td>"; //note	

				//Thêm ghi chú
				body += '<td>' +
							'<a href="javascript:addNote(' + "'" + value['ID_accounting'].trim() + "', '" + value['PhanTramKhac'].trim() + "', '" + value['GhiChu'].trim() +  "'" + ');">' + 
							'<button type="button" class="btn btn-grey">'+
								'<i class="fa fa-pencil"></i>'+
							'</button>'+
						'</a></td>';

				stt += 1;

			}

			body += "</tbody>";
			
			$("#showStatis").html(table + header + body  + "</table></div>"); 

			formatTableExport('tbStatis',5);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
	
})();	