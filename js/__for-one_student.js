(function() {

	//Trả về thông tin chi tiết của sinh viên
	$.ajax({
		url: "./lib/ajax/detailStudent/getInfo.php",
		data: {
			masv: (new URL(window.location)).searchParams.get("masv")
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			$("#showInfoStudent").html("");

			let value =  result['data'];

			let div = '<div class="box-body box-profile">';

				div += '<img class="profile-user-img img-responsive img-circle" src="dist/img/avatar/ava_student.png" alt="User profile picture"></img>';

			 	div += '<h3 class="profile-username text-center">' + value['TenDayDu'] + '</h3>';

				div += '<p class="text-muted text-center">' + value['TenKhoi'] + '</p>';

			let ul = '<ul class="list-group list-group-unbordered">';

				ul += 	'<li class="list-group-item">' +
							'<b>MSSV</b> <a class="pull-right">' + value['MaSV'] + '</a>' +
						'</li>';

				ul += 	'<li class="list-group-item">' +
							'<b>NTNS</b> <a class="pull-right">' + value['NgaySinhC'] + '</a>' +
						'</li>';

				ul += 	'<li class="list-group-item">' +
							'<b>Ngành</b> <a class="pull-right">' + value['TenNgChng'] + '</a>' +
						'</li>';

				ul += 	'<li class="list-group-item">' +
							'<b>Mã Lớp</b> <a class="pull-right">' + value['MaLop'] + '</a>' +
						'</li>';

				ul += 	'<li class="list-group-item">' +
							'<b>Email</b> <a class="pull-right">' + value['DC_EML2LLSV'] + '</a>' +
						'</li>';

				ul += 	'<li class="list-group-item">' +
							'<b>Niên khóa</b> <a class="pull-right">' + value['NienKhoa'] + '</a>' +
						'</li>';

				ul += 	'</ul>';

			div += ul;
			
			div += '<a href="javascript:history.back()" class="btn btn-primary btn-block"><b>Xem sinh viên khác</b></a>' + '</div>';

			$("#showInfoStudent").html(div); 
			
		}
	});

	//Thêm hàm ở đây nhớ bỏ cái before send

	//trả về tất cả các môn học sinh viên có đăng kí trong học kì
	$.ajax({
		url: "./lib/ajax/detailStudent/getSubjectsByStudent.php",
		data: {
			masv: (new URL(window.location)).searchParams.get("masv")
		},
		dataType: "JSON",
		success: function(result) {	

			$("#showSubjectsByStudent").html("");
			
			let table = "<table id='tbSubjectsByStudent' class='table table-bordered table-striped'>";

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
				body += "<td>"  + value['SoTinChi'] + "</td>";  // số tín chỉ
				body += "</tr>";
				
			}

			body += "</tbody>";

			$("#showSubjectsByStudent").html(table + header + body  + "</table>");

			$("#tbSubjectsByStudent").DataTable({
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


	//Trả về tất cả các phiếu nộp tiền của sinh viên
	$.ajax({
		url: "./lib/ajax/detailStudent/getPaymentBillAllSemester.php",
		data: {
			masv: (new URL(window.location)).searchParams.get("masv")
		},
		dataType: "JSON",
		success: function(result) {
			
			$("#showPaymentBill").html("");
								
			let table = "<table id='tbPaymentBill' class='table table-bordered table-striped'>";
		
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Học kỳ</th>";
				header += "<th>Phiếu đóng tiền</th>";
				header += "<th>Số tiền</th>";
				header += "<th>Tình trạng đóng tiền</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Chi tiết</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // học kỳ
				body += "<td>"  + value[1] + "</td>"; // phiếu đóng tiền
				body += "<td>"  + formatCurrency(value[2]) + " VND" + "</td>";  // số tiền đã đóng
				body += "<td>"  + value[3] + "</td>";  // tình trạng phiếu
				if (value[4] != null) {
					body += "<td>"  + value[4] + "</td>";
				} else {
					body += "<td>"  + '' + "</td>";
				}
				
				body += '<td><a href="javascript:getSubjects(' + "'" + value[1].trim() +  "', '" + result['MaSV'].trim() + "'" + ');">'+
								'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
									'Xem <i class="fa fa-file-text-o"></i>'+
								'</button>'+
						'</a></td>';

				body += "</tr>";
				
			}

			body += "</tbody>";
			
			$("#showPaymentBill").html(table + header + body  + "</table>"); 
			
			$("#tbPaymentBill").DataTable({
				scrollY: '70vh',
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
