/* 
	hiện danh sách sinh viên theo môn học
*/
function getListStudentSubject(MaMH, MaNH, TenMH) {
	$.ajax({
		url: "./lib/ajax/revenue/getListStudentBySubject.php",
		data: {
			MaMH: MaMH,
			MaNH: MaNH,
			TenMH: TenMH
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let div = 	'<div  class="box box-primary box-solid">' + 
						'<div class="box-header">' +
							'<h3 class="box-title">' + '[' + result['MaMH'] + ' - ' + result['TenMH']  + '] CHI TIẾT DOANH THU' + '</h3>' +
						'</div>' +
						'<div class="box-body">';
					
			let table = "<table id='tbStudentSubject' class='table table-hover'>";

			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã sinh viên</th>";
				header += "<th>Họ và tên </th>";
				header += "<th>Mã Lớp</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Sô tiền phải đóng</th>";
				header += "<th>Tình trạng</th>";
				header += "<th>Ngày đóng</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['dssv']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // MSSV
				body += "<td>"  + value[1] + ' ' + value[2] + "</td>"; // Họ và tên
				body += "<td>"  + value[3] + "</td>"; // Mã lớp
				body += "<td>"  + value[4] + "</td>"; // Tên lớp
				body += "<td>"  + formatCurrency(value[5]) + ' VND' + "</td>"; // Sô tiền
				body += "<td>"  + value[6] + "</td>"; // Tình trạng
				body += "<td>"  + value[7] + "</td>"; // ngày đóng
			}

			body += "</tbody>";
			
			$("#showListStudentBySubject").html(div + table + header + body  + "</table></div>"); 

			formatTableExport('tbStudentSubject',10);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/* 
	hiện danh sách sinh viên theo môn học
*/
function getListStudentClass(MaLop) {
	$.ajax({
		url: "./lib/ajax/revenue/getListStudentByClass.php",
		data: {
			MaLop: MaLop
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let div = 	'<div  class="box box-primary box-solid">' + 
						'<div class="box-header">' +
							'<h3 class="box-title">' + '[' + result['MaLop'] + '] CHI TIẾT DOANH THU' + '</h3>' +
						'</div>' +
						'<div class="box-body">';
					
			let table = "<table id='tbStudentClass' class='table table-hover'>";

			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã sinh viên</th>";
				header += "<th>Họ và tên </th>";
				header += "<th>Mã Lớp</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Sô tiền phải đóng</th>";
				header += "<th>Tình trạng</th>";
				header += "<th>Ngày đóng</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['dssv']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // MSSV
				body += "<td>"  + value[1] + ' ' + value[2] + "</td>"; // Họ và tên
				body += "<td>"  + value[3] + "</td>"; // Mã lớp
				body += "<td>"  + value[4] + "</td>"; // Tên lớp
				body += "<td>"  + formatCurrency(value[5]) + ' VND' + "</td>"; // Sô tiền
				body += "<td>"  + value[6] + "</td>"; // Tình trạng
				body += "<td>"  + value[7] + "</td>"; // ngày đóng
			}

			body += "</tbody>";
			
			$("#showListStudentByClass").html(div + table + header + body  + "</table></div>"); 

			formatTableExport('tbStudentClass',10);

		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

(function() {

	/*
		lấy tất cả hóa đơn DVLK về lưu trong section
	*/
	$("#getBill").click(() => {
		$.ajax({
			url: "./lib/ajax/detailDvlk/getBillByDVLK.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$("#resultRevenue").css("display", "block");
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});

	/*
		trả về doanh thu theo Đơn vị liên kết
	*/
	$("#getReDVLK").click(() => {
		$.ajax({
			url: "./lib/ajax/revenue/getRevenueByDVLK.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				let table1 = '<div class="box-header with-border"><table class="table table-bordered">';

				let body1 = '<tr>'
					body1 += '<td style="background-color: #efff0061;"><h5><b>Doanh thu của đơn vị liên kết: </b>' + formatCurrency(result['revenue'][0]) + ' VND</h5></td>';

					body1 += '<td style="background-color: #94ff0063;"><h5><b>Tổng số tiền sinh viên đã đóng: </b>' + formatCurrency(result['revenue'][1]) + ' VND</h5></td>';

					body1 += '<td style="background-color: #fa000057;"><h5><b>Tổng số tiền sinh viên chưa đóng: </b>' + formatCurrency(result['revenue'][2]) + ' VND</h5></td>';

					body1 += '</tr>';

					body1 += "</table></div>";

				$("#showRevenueByDVLK").html(table1 + body1);

				let div =	"<div class='box-header with-border'><h3 class='box-title'><b>DANH SÁCH CỤ THỂ</b></h3></div>" +
				"<div class='box-body'>" 
						
				let table = "<table id='tbshowListStudent' class='table table-bordered table-striped'>";

				let header = "<thead>";
					header += "<tr class='filters'>";
					header += "<th>Mã sinh viên</th>";
					header += "<th>Họ và tên </th>";
					header += "<th>Mã Lớp</th>";
					header += "<th>Tên lớp</th>";
					header += "<th>Sô tiền phải đóng</th>";
					header += "<th>Tình trạng</th>";
					header += "<th>Ngày đóng</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
				for(value of result['dssv']) {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>"; // MSSV
					body += "<td>"  + value[1] + ' ' + value[2] + "</td>"; // Họ và tên
					body += "<td>"  + value[3] + "</td>"; // Mã lớp
					body += "<td>"  + value[4] + "</td>"; // Tên lớp
					body += "<td>"  + formatCurrency(value[5]) + ' VND' + "</td>"; // Sô tiền
					body += "<td>"  + value[6] + "</td>"; // Tình trạng
					body += "<td>"  + value[7] + "</td>"; // ngày đóng
				}

				body += "</tbody>";
				
				$("#showListStudent").html(div + table + header + body  + "</table></div>"); 

				formatTableExport('tbshowListStudent',10);

			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});

	$("#getReClass").click(() => {
		$.ajax({
			url: "./lib/ajax/revenue/getRevenueByClass.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
	
				let div =	"<div class='box-header with-border'><h3 class='box-title'><b>DOANH THU THEO MÔN HỌC TỔ CHỨC TẠI ĐƠN VỊ LIÊN LẾT</b></h3></div>" +
							"<div class='box-body'>";
									
				let table = "<table id='tbResultByClass' class='table table-bordered table-striped'>";
			
				let header = "<thead>";
					header += "<tr>";
					header += "<th>Mã Lớp</th>";
					header += "<th>Tên Lớp</th>";
					header += "<th>Sô lượng sinh viên</th>";
					header += "<th>Doanh Thu</th>";
					header += "<th>Xem DSSV</th>";
					header += "</tr>";
					header += "</thead>";
	
				let body = "<tbody>";
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>"; 
					body += "<td>"  + value[1] + "</td>"; 
					body += "<td>"  + value[2] + "</td>"; 
					body += "<td>"  + formatCurrency(value[3]) + " VND" +  "</td>";

					body += '<td>' + 
							'<a href="javascript:getListStudentClass(' + "'" + value[0].trim() + "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Xem <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';
	
					body += "</tr>";
					
				}
	
				body += "</tbody>";
				
				$("#showRevenueByClass").html(div + table + header + body  + "</table></div>"); 

				formatTable('tbResultByClass',5);
				
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
	
	$("#getReSubject").click(() => {
		$.ajax({
			url: "./lib/ajax/revenue/getRevenueBySubject.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
	
				let div =	"<div class='box-header with-border'><h3 class='box-title'><b>DOANH THU THEO MÔN HỌC TỔ CHỨC TẠI ĐƠN VỊ LIÊN LẾT</b></h3></div>" +
							"<div class='box-body'>" ;
									
				let table = "<table id='tbResultBySubjects' class='table table-bordered table-striped'>";
			
				let header = "<thead>";
					header += "<tr>";
					header += "<th>Mã môn học</th>";
					header += "<th>Tên môn học</th>";
					header += "<th>Mã nhóm</th>";
					header += "<th>Sô lượng sinh viên</th>";
					header += "<th>Doanh Thu</th>";
					header += "<th>Xem DSSV</th>";
					header += "</tr>";
					header += "</thead>";
	
				let body = "<tbody>";
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value[1] + "</td>"; 
					body += "<td>"  + value[2] + "</td>"; 
					body += "<td>"  + value[0] + "</td>"; 
					body += "<td>"  + value[3] + " Sinh viên" + "</td>";
					body += "<td>"  + formatCurrency(value[4]) + " VND" +  "</td>";
	
					body += '<td>' + 
							'<a href="javascript:getListStudentSubject(' + "'" + value[1].trim() + "', '" + value[0].trim() + "', '" + value[2].trim() +  "'" + ');">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Xem <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';
	
					body += "</tr>";
					
				}
	
				body += "</tbody>";
				
				$("#showRevenueBySubjects").html(div + table + header + body  + "</table></div>"); 

				formatTable('tbResultBySubjects',5);
				
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
})();
