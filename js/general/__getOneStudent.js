/*
	trả về các môn học tương ứng của từng phiếu nộp tiền
*/
function getSubjects(SoGBHP, masv)
{
	$.ajax({
		url: "./lib/ajax/detailStudent/getSubjects.php",
		data: {
			'SoGBHP': SoGBHP,
			'masv': masv
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			let title = "[Phiếu: " + result['SoGBHP'] + "] DANH SÁCH MÔN HỌC";

			let table = "<table class='table table-bordered table-striped'>";

			let header = "<thead>";
			header += "<tr>";
			header += "<th>Mã môn học</th>";
			header += "<th>Tên môn</th>";
			header += "<th>Mã nhóm</th>";
			header += "<th>số tiền của môn học</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";
			//$.each(result['data'], (index, value) => {
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>";  // mã môn học
				body += "<td>"  + value[1] + "</td>";  // tên môn
				body += "<td>"  + value[2] + "</td>";  // mã nhóm
				body += "<td>"  + formatCurrency(value[3]) + " VND" + "</td>";  // số tiền của môn
				body += "</tr>";
			}
			//});
			body += "</tbody>";

			$("#bodyModal-1").html(table + header + body +  "</table>"); //custom cái body của Modal1

			$("#titleModal-1").html(title); //Đôi title của Modal1
			
			$('#Modal-1').modal('show');

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/*
	trả về tất cả các phiếu đã đóng và chưa đóng tiền trong 1 học kì đã chọn
*/
function getPaymentBillOneSemester(masv)
{
	$.ajax({
		url: "./lib/ajax/detailStudent/getPaymentBillOneSemester.php",
		data: {
			'masv': masv
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {	

			let title = "DANH SÁCH PHIẾU NỘP TIỀN";
			
			let table = "<table class='table table-hover'>";

			let header = "<thead>";
			header += "<tr>";
			header += "<th>Phiếu đóng tiền</th>";
			header += "<th>Số tiền</th>";
			header += "<th>Tình trạng đóng tiền</th>";
			header += "<th>Chi tiết</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // phiếu đóng tiền
				body += "<td>"  + formatCurrency(value[1]) + " VND" + "</td>";  // số tiền đã đóng
				body += "<td>"  + value[2] + "</td>";  // tình trạng phiếu
				body += '<td><a href="javascript:getSubjects(' + "'" + value[0].trim() +  "', '" + result['MaSV'].trim() + "'" + ');">'+
								'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
									'Xem <i class="fa fa-file-text-o"></i>'+
								'</button>'+
						'</a></td>';

				body += "</tr>";
				
			}

			body += "</tbody>";

			$("#bodyModal-1").html(table + header + body +  "</table>"); //custom cái body của Modal1

			$("#titleModal-1").html(title); //Đôi title của Modal1
			
			$('#Modal-1').modal('show')
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/*
	trả về thông tin của 1 sinh viên
*/
function getInfo(masv)
{
	$.ajax({
		url: "./lib/ajax/detailStudent/getInfo.php",
		data: {
			'masv': masv
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {	

			let title = "Thông tin chi tiết của sinh viên";
			
			let table = "<table class='table table-hover'>";

			let header = "<thead>";
			header += "<tr>";
			header += "<th>MSSV</th>";
			header += "<th>Họ và tên</th>";
			header += "<th>Ngày sinh</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";

			let value =  result['data'];
				body += "<tr>";
				body += "<td>"  + value['MaSV'] + "</td>"; // phiếu đóng tiền
				body += "<td>"  + value['HoLotSV'] + "</td>";  // số tiền đã đóng
				body += "<td>"  + value['TenSV'] + "</td>";  // tình trạng phiếu
				body += "</tr>";
				
			body += "</tbody>";

			$("#bodyModal-1").html(table + header + body +  "</table>"); //custom cái body của Modal1

			$("#titleModal-1").html(title); //Đôi title của Modal1
			
			$('#Modal-1').modal('show')
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

