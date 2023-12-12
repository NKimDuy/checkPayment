/* 
	hiện danh sách sinh viên có đăng kí môn học
*/
function getListStudentRegister(idClass, type) {
	$.ajax({
		url: "./lib/ajax/detailDvlk/getStudent.php",
		data: {
			idClass: idClass,
			type: type
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			var stt = 1;

			$("#showListStudentRegister").html(""); // xóa tất cả danh sách sinh viên cũ, để tạo danh sách sinh viên mới
			
			let div = 	'<div  class="box box-primary box-solid">' + 
							'<div class="box-header">' +
								'<h3 class="box-title">' + '[' + result['MaLop'] + '] DSSV CÓ ĐĂNG KÍ MÔN HỌC' + '</h3>' +
							'</div>' +
							'<div class="box-body">';


			let table = "<table id='tbStudent' class='table table-bordered table-striped'>";
	
			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>giới tính</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Xem môn học SV đăng kí</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				$.each(result['data'], (index, value) => {
				body += "<tr>";
				body += "<td>"  + stt + "</td>";		
				body += "<td>"  + value[0] + "</td>"; // mã số sinh viên
				body += "<td>"  + value[1] + "</td>"; // họ
				body += "<td>"  + value[2] + "</td>"; // tên
				body += "<td>"  + value[3] + "</td>"; // ngày sinh
				if (value[4] == 1) {
					body += "<td>"  + 'Nữ' + "</td>"; // giới tính
				} else {
					body += "<td>"  + 'Nam' + "</td>"; // giới tính
				}
				body += "<td>"  + value[5] + "</td>"; // tên lớp

				body += '<td>' + 
						'<a href="javascript:getSubjectByStudent(' + "'" + value[0].trim() + "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-success">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				body += "</tr>";
				stt += 1;
				});
			body += "</tbody>";
			
			$("#showListStudentRegister").html(div + table + header + body  + "</table></div></div>"); 

			$("#tbStudent").DataTable({
				scrollY: '60vh',
				scrollCollapse: true,
				"language": {
					"info": "Danh sách tổng cộng _TOTAL_ dòng",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/* 
	hiện danh sách sinh viên theo môn học
*/
function getListStudentSubject(MaMH, MaNH, TenMH) {
	$.ajax({
		url: "./lib/ajax/detailDvlk/getStudentBySubject.php",
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

			var stt = 1;

			$("#showListStudentBySubject").html(""); // xóa tất cả danh sách sinh viên cũ, để tạo danh sách sinh viên mới
			
			let div = 	'<div  class="box box-primary box-solid">' + 
							'<div class="box-header">' +
								'<h3 class="box-title">' + '[' + result['MaMH'] + ' - ' + result['TenMH']  + '] DANH SÁCH SINH VIÊN' + '</h3>' +
							'</div>' +
							'<div class="box-body">';


			let table = "<table id='tbStudent' class='table table-bordered table-striped'>";
	
			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>giới tính</th>";
				header += "<th>Email</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				$.each(result['data'], (index, value) => {
				body += "<tr>";
				body += "<td>"  + stt + "</td>";		
				body += "<td>"  + value['MaSV'] + "</td>"; // mã số sinh viên
				body += "<td>"  + value['HoLotSV'] + "</td>"; // họ
				body += "<td>"  + value['TenSV'] + "</td>"; // tên
				body += "<td>"  + value['NgaySinhC'] + "</td>"; // ngày sinh
				body += "<td>"  + value['Phai'] + "</td>"; // tên lớp
				body += "<td>"  + value['DC_EML1LLSV'] + "</td>"; // tên lớp
				body += "</tr>";
				stt += 1;
				});
			body += "</tbody>";
			
			$("#showListStudentBySubject").html(div + table + header + body  + "</table></div></div>"); 

			$("#tbStudent").DataTable({
				scrollY: '60vh',
				scrollCollapse: true,
				"language": {
					"info": "Danh sách tổng cộng _TOTAL_ dòng",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/*
	trả về tất cả các môn học sinh viên có đăng kí trong học kì
*/
function getSubjectByStudent(masv)
{
	$.ajax({
		url: "./lib/ajax/detailStudent/getSubjectsByStudent.php",
		data: {
			'masv': masv
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {	

			let title =  '['+ result['MaSV'] + ' - '+ result['TenSV'] + "] Danh sách môn học";
			
			let table = "<table class='table table-hover'>";

			let header = "<thead>";
			header += "<tr>";
			header += "<th>Mã Môn học</th>";
			header += "<th>Tên Môn học</th>";
			header += "<th>Mã Nhóm</th>";
			header += "<th>Số tín chỉ</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value['MaMH'] + "</td>"; // mã môn học
				body += "<td>"  + value['TenMH'] + "</td>";  // tên môn học
				body += "<td>"  + value['C2'] + "</td>";  // mã nhóm
				body += "<td>"  + value['SoTinChi'] + "</td>";  // mã nhóm
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

(function() {

	//Trả về danh sách lớp có tổ chức môn học
	$.ajax({
		url: "./lib/ajax/detailDvlk/getClassInSemester.php",
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			$("#showListClassInSemester").html("");

			let div =	"<div class='box-header'><h3 class='box-title'>DANH SÁCH LỚP CÓ TỔ CHỨC MÔN HỌC</h3></div>" +
						"<div class='box-body'>" 
								
			let table = "<table id='tbResultByClass' class='table table-bordered table-striped'>";
		
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã lớp</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Số lượng sinh viên đâu vào</th>";
				header += "<th>Số lượng sinh viên ĐKMH</th>";
				header += "<th>Xem DSSV đầu vào</th>";
				header += "<th>Xem DSSV có ĐKMH</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // Mã lớp
				body += "<td>"  + value[1] + "</td>"; // Tên lớp
				body += "<td>"  + value[2] + "</td>"; // Số lượng sinh viên đâu vào
				body += "<td>"  + value[3] + "</td>"; // Số lượng sinh viên ĐKMH
				body += '<td><a style="color:white;"' + 
						'href="' + result['rootUrl'] +'index.php?p=list_student&idClass=' + value[0].trim() + '"">' + 
							'<button type="button" class="btn btn-block btn-info">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';
				body += '<td>' + 
						'<a href="javascript:getListStudentRegister(' + "'" + value[0].trim() + "', '" + "kqdkmh" +  "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-success">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';
				body += "</tr>";
				
			}

			body += "</tbody>";
			
			$("#showListClassInSemester").html(div + table + header + body  + "</table></div>"); 
			
			$("#tbResultByClass").DataTable({
				scrollY: '40vh',
				scrollCollapse: true,
				"language": {
					"info": "Danh sách tổng cộng _TOTAL_ dòng",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});
		}
	});

	//Trả về danh sách môn học tổ chức tại DVLK trong học kì

	$.ajax({
		url: "./lib/ajax/detailDvlk/getSubjectsByDVLK.php",
		dataType: "JSON",
		success: function(result) {
			
			$("#showListSubjectsInDVLK").html("");

			let div =	"<div class='box-header'><h3 class='box-title'>DANH MÔN HỌC TỔ CHỨC TẠI ĐVLK</h3></div>" +
						"<div class='box-body'>" 
								
			let table = "<table id='tbResultBySubjects' class='table table-bordered table-striped'>";
		
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã môn học</th>";
				header += "<th>Tên môn học</th>";
				header += "<th>Mã nhóm</th>";
				//header += "<th>Sô lượng sinh viên</th>";
				header += "<th>Lịch học</th>";
				header += "<th>Ngày bắt học</th>";
				header += "<th>Ngày kết thúc</th>";
				header += "<th>Ngày Thi</th>";
				header += "<th>Ca Thi</th>";
				header += "<th>Xem DSSV</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value['MaMH'] + "</td>"; 
				body += "<td>"  + value['TenMH'] + "</td>"; 
				body += "<td>"  + value['NhomTo'] + "</td>"; 
				//body += "<td>"  + value['SiSoTKB'] + "</td>";
				body += "<td>"  + value['TENDNTGHOC'] + "</td>"; 
				body += "<td>"  + value['TUNGAYTKB'] + "</td>"; 
				body += "<td>"  + value['DENNGAYTKB'] + "</td>";

				if (value['NGAYTHI'] == null) {
					body += "<td>"  + 'Giảng viên thông báo' + "</td>";
				} else {
					body += "<td>"  + value['NGAYTHI'].substring(0, 10) + "</td>";
				} 

				if (value['NGAYTHI'] == null) {
					body += "<td>"  + '' + "</td>";
				} else {
					body += "<td>"  + value['TIETBD'] + "</td>"; 
				}

				body += '<td>' + 
						'<a href="javascript:getListStudentSubject(' + "'" + value['MaMH'].trim() + "', '" + value['NhomTo'].trim() + "', '" + value['TenMH'].trim() +  "'" + ');">' + 
							'<button type="button" class="btn btn-block btn-success">'+
								'Xem <i class="fa fa-info-circle"></i>'+
							'</button>'+
						'</a></td>';

				body += "</tr>";
				
			}

			body += "</tbody>";
			
			$("#showListSubjectsInDVLK").html(div + table + header + body  + "</table></div>"); 
			
			$("#tbResultBySubjects").DataTable({
				scrollY: '40vh',
				scrollCollapse: true,
				"language": {
					"info": "Danh sách tổng cộng _TOTAL_ dòng",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});
			
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});

})();
