

/* 
	hiện danh sách các môn học đã đăng kí của sinh viên (khi thống kê danh sách sinh viên đăng kí môn học) 
*/
function getSubjectByRegister(mssv) {
	$.ajax({
		url: "./lib/ajax/statisticalByRegister/getSubjectByRegister.php",
		data: {
			path: $("#semester").val(),
			mssv: mssv
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {

			$("#sumAllDvlk").css("display", "none");
			$("#sumAllSubject").css("display", "none");
			
			let table = "<table id='tbListSubjectByRegister' class='table table-hover'>";
		  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã môn học</th>";
				header += "<th>Tên môn học</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>";
					body += "<td>"  + value[1] + "</td>";
					body += "</tr>";
				}
				//});
			body += "</tbody>";
			
			$("#dialog").html(table + header + body  + "</table>"); 
			
			$("#tbListSubjectByRegister").DataTable({
				dom: 'Bfrtip',
				buttons: [
					'excelHtml5',
					'pdfHtml5'
				],
				pageLength: 5,
				"language": {
					"info": "Hiển thị trang _PAGE_ of _PAGES_",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});

			$('#modal-dialog').modal('show'); 
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}


/* 
	hiện danh sách sinh viên tương ứng với môn học thống kê theo môn học*
*/
function getStudentBySubject(group, subject) {
	$.ajax({
		url: "./lib/ajax/statisticalBySubject/getStudentBySubject.php",
		data: {
			group: group,
			subject: subject,
			path: $("#semester").val(),
			idDvlk: $("#dvlk").val()
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let div =	"<div class='box-header with-border'><h3 class='box-title'>Bảng thống kê đóng tiền theo môn học</h3></div>" +
						"<div class='box-body'>" 

			let table = "<table id='tbListStudentBySubject' class='table table-hover'>";
		  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>Địa phương</th>";
				header += "<th>Ghi chú</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
			
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					if (value[5] == "out") {

						body += "<td style='color:red;'>"  + value[0] + "</td>"; // mssv
						body += "<td style='color:red;'>"  + value[1] + "</td>"; // họ
						body += "<td style='color:red;'>"  + value[2] + "</td>"; // tên
						body += "<td style='color:red;'>"  + value[3] + "</td>"; // ngày sinh
						body += "<td style='color:red;'>"  + value[4] + "</td>"; // địa phương
						body += "<td style='color:red;'>"  + 'Không thuộc ĐVLK' + "</td>";
						body += "</tr>";
	
					} else {
						body += "<td>"  + value[0] + "</td>"; // mssv
						body += "<td>"  + value[1] + "</td>"; // họ
						body += "<td>"  + value[2] + "</td>"; // tên
						body += "<td>"  + value[3] + "</td>"; // ngày sinh
						body += "<td>"  + value[4] + "</td>"; // địa phương
						body += "<td>"  + 'Thuộc ĐVLK' + "</td>";
						body += "</tr>";	
					}
				}
				//});
				
			body += "</tbody>";
			
			$("#dialog").html(table + header + body + "</table>");
						
			$("#tbListStudentBySubject").DataTable({
				dom: 'Bfrtip',
				buttons: [
					'excelHtml5',
					'pdfHtml5'
				],
				"language": {
					"info": "Hiển thị trang _PAGE_ of _PAGES_",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});

			$('#modal-dialog').modal('show'); 
			
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});	
}


/* 
	hiện danh sách sinh viên đã đóng tiền, hoặc chưa đóng tiền (khi thống kê theo đơn vị liên kết) *
*/
function getListStudent(idClass, semester) {
	$.ajax({
		url: "./lib/ajax/statisticalByDvlk/getStatisticalPayOrNotPay.php",
		data: {
			idClass: idClass,
			path: semester
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let table = "<table id='tbListStudentPayOrnot' class='table table-hover'>";
		  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Phiếu đóng tiền</th>";
				header += "<th>Số tiền của phiếu</th>";
				header += "<th>Tình trạng đóng tiền</th>";
				header += "<th>Chi tiết</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>"; // mã số sinh viên
					body += "<td>"  + value[1] + "</td>"; // họ
					body += "<td>"  + value[2] + "</td>"; // tên
					body += "<td>"  + value[3] + "</td>"; // phiếu đóng tiền
					body += "<td>"  + formatCurrency(value[5]) + "</td>"; // số tiền của phiếu
					body += "<td>"  + value[6] + "</td>"; // tình trạng của phiêu
					body += '<td><a href="javascript:getSubjectPerStudentDvlk(' + "'" + $("#semester").val() + "', '" + value[4] + "'" + ')">' + 
					'<button type="button" class="btn btn-block btn-info">'+
					'Xem <i class="fa  fa-info-circle"></i>'+
					'</button>'+
					'</a></td>';

					body += "</tr>";
				}
				//});
			body += "</tbody>";
			
			$("#dialog").html(table + header + body  + "</table>"); 
			
			$("#tbListStudentPayOrnot").DataTable({
				dom: 'Bfrtip',
				buttons: [
					'excelHtml5',
					'pdfHtml5',
				],
				pageLength: 5,
				"language": {
					"info": "Hiển thị trang _PAGE_ of _PAGES_",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});

			$('#modal-dialog').modal('show'); 
			
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}


/* 
	hiện các môn học của sinh viên trong học kì khi thống kê theo đươn vị liên kết*
*/
function getSubjectPerStudentDvlk(path, billPayment) {
	$.ajax({
		url: "./lib/ajax/statisticalByDvlk/getSubjectPerStudentDvlk.php",
		data: {
			path: path,
			billPayment: billPayment
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let table = "<table id='tbSubject' class='table table-hover'>";

			let header = "<thead>";
			header += "<tr>";
			header += "<th>Mã môn học</th>";
			header += "<th>Tên môn học</th>";
			header += "<th>Mã nhóm</th>";
			header += "<th>Số tiền</th>";
			header += "</tr>";
			header += "</thead>";

			let body = "<tbody>";
			//$.each(result['data'], (index, value) => {
			for(value of result['data']) {
				body += "<tr>";
				body += "<td>"  + value[0] + "</td>"; // mã môn học
				body += "<td>"  + value[1] + "</td>"; // tên môn học
				body += "<td>"  + value[2] + "</td>"; // mã nhóm
				body += "<td>"  + formatCurrency(value[3]) + "</td>"; // số tiền của từng môn
				body += "</tr>";
			}
			//});
			body += "</tbody>";

			$("#dialog2").html(table + header + body +  "</table>");

			$("#tbSubject").DataTable({
				dom: 'Bfrtip',
				buttons: [
					'excelHtml5',
					'pdfHtml5',
				],
				"language": {
					"info": "Hiển thị trang _PAGE_ of _PAGES_",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});

			$('#modal-dialog2').modal('show'); 
			
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}


/*
	Xem danh sách sinh viên lúc mới vào hay danh sách sinh viên đăng kí môn học (thống kê theo dvlk)
*/
function getStudentOriginalOrDkmh(idClass, path, checkAll) {
	$.ajax({
		url: "./lib/ajax/statisticalByDvlk/getStudentOriginalOrDkmh.php",
		data: {
			idClass: idClass,
			path: path,
			checkAll: checkAll
			
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let div = "<div class='box-header'><h3 class='box-title'>Danh sách sinh viên </h3></div><div class='box-body'>" 

			let table = "<table id='tbStudentOriginal' class='table table-hover'>";
	  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>Mã lớp</th>";
				header += "<th>Tên lớp</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>"; // mã số sinh viên
					body += "<td>"  + value[1] + "</td>"; // họ
					body += "<td>"  + value[2] + "</td>"; // tên
					body += "<td>"  + value[3] + "</td>"; // ngày sinh
					body += "<td>"  + value[4] + "</td>"; // mã lớp
					body += "<td>"  + value[5] + "</td>"; // tên lớp
					body += "</tr>";
				}
				//});
			body += "</tbody>";

			$("#dialog").html(div + table + header + body  + "</table></div>"); 

			$("#tbStudentOriginal").DataTable({
				dom: 'Bfrtip',
				buttons: [
					'excelHtml5',
					'pdfHtml5',
				],
				pageLength: 5,
				"language": {
					"info": "Hiển thị trang _PAGE_ of _PAGES_",
					"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
			});

			$('#modal-dialog').modal('show'); 
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

(function() {
	
	/*
		Chọn THỐNG KÊ THEO LỚP
	*/
	$("#staticByClass").click(() => {
		$(".showstatistical").html("").prop('id', 'showStaticByClass').css("display", "none"); //xóa và tắt cái khung kết quả thống kê
		
		//$(".showstatistical").html("").attr('id', 'showStaticBySubject').css("display", "none");
		
		/*
			Đóng mở phần select và picktime, gán ID cho button
		*/
		$("#static").css("display", "block");
		$("#select").css("display", "block");
		$("#pickTime").css("display", "none");
		
		/*
			Custom 
		*/
		$("#titleStatic").html("").append( "BẢNG KẾT QUẢ - THỐNG KÊ THEO LỚP" );
		$(".getResult").css("display", "block").prop('id', 'getStatisticalByDvlk');

		/*
			xem thống kê theo đơn vị liên kết (hiện danh sách các lớp của đơn vị liên kết tương ứng)
		*/
		$("#getStatisticalByDvlk").click(function() { 
			$.ajax({
				url: "./lib/ajax/statisticalByDvlk/getStatisticalByDvlk.php",
				data: {
					path: $("#semester").val(),
					idDvlk: $("#dvlk").val()
				},
				dataType: "JSON",
				beforeSend: function() {
					$('#loading').modal({backdrop: false}); 
				},
				success: function(result) { 
											
					let table = "<div class='box-header with-border'><table id='tbClass' class='table table-hover'>";
			
					let numberStudentOfClass = 0;
					
					let numberStudentHasPayOfClass = 0;
					
					let sumMoneyOfDvlk = 0;
			
					let header = "<thead>";
						header += "<tr>";
						header += "<th>Mã lớp</th>";
						header += "<th>Khối</th>";
						header += "<th>Ghi chú</th>";
						header += "<th>Số sinh viên đăng kí môn học của lớp</th>";
						header += "<th>Tổng số tiền đã đóng</th>";
						header += "<th>Danh sách sinh viên ban đầu</th>";
						header += "<th>Danh sách sinh viên đăng kí môn học</th>";
						header += "<th>Tình trạng đóng học phí của lớp</th>";
						header += "</tr>";
						header += "</thead>";
		
					let body = "<tbody>";
						//$.each(result['data'], (index, value) => {
							
						for(value of result['data']) {
							
							numberStudentOfClass += value[3];
													
							sumMoneyOfDvlk += parseFloat(value[4]);
							
							body += "<tr>";
							body += "<td>"  + value[0] + "</td>"; // mã lớp
							body += "<td>"  + value[1] + "</td>"; // khối
							body += "<td>"  + value[2] + "</td>"; // ghi chú
							body += "<td>"  + value[3] + "</td>"; // số sinh viên đăng kí môn học của lớp
							body += "<td>"  + formatCurrency(value[4]) + " VND" + "</td>"; //tổng số tiền đã đóng
		
							body += '<td><a href="javascript:getStudentOriginalOrDkmh(' + "'" + value[0].trim() + "', '" + $("#semester").val() + "', '" + "yes" + "'" + ');">'+
									'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
										'Xem <i class="fa fa-users"></i>'+
									'</button>'+
									'</a></td>';		
		
							
							body += '<td><a href="javascript:getStudentOriginalOrDkmh(' + "'" + value[0].trim() + "', '" + $("#semester").val() + "', '" + "no" + "'" + ');">'+
									'<button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-default">'+
										'Xem <i class="fa fa-registered"></i>'+
									'</button>'+
									'</a></td>';		
		
							body += '<td><a href="javascript:getListStudent(' + "'" + value[0].trim() + "', '" + $("#semester").val() + "'" + ');">'+
									'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default">'+
										'Xem <i class="fa fa-file-text-o"></i>'+
									'</button>'+
									'</a></td>';		
		
							body += "</tr>";
						}
						//});
		
					body += "</tbody></table></div>";
		
					$showStatisticalByDvlk = (table + header + body); // Hiện Bảng thống kê đóng tiền theo lớp
					
					let table1 = '<div class="box-header with-border"><table class="table table-bordered">';
		
					let body1 = '<tr style="background-color: #efff0061;">'
						body1 += "<td><h5><b>Tổng sinh viên của đơn vị liên kết: </b>" + formatCurrency(numberStudentOfClass) + " Sinh viên</h5></td>";
						body1 += "<td><h5><b>Tổng số tiền đã đóng của đơn vị liên kết: </b>" + formatCurrency(sumMoneyOfDvlk) + " VND</h5></td>";
						body1 += "</tr>";
		
						body1 += "</table></div>";
		
					$sumAllDvlk = (table1 + body1); //Tổng các dữ liệu của bảng thống kê
		
					$("#showStaticByClass").css("display", "block").html( $sumAllDvlk + $showStatisticalByDvlk );
										
					$("#tbClass").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
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
				},
			});
		});
	});

	/*
		Chọn THỐNG KÊ THEO MÔN HỌC
	*/
	$("#staticBySubject").click(() => {
		
		$(".showstatistical").html("").prop('id', 'showStaticBySubject').css("display", "none"); //xóa và tắt cái khung kết quả thống kê
		
		/*
			Đóng mở phần select và picktime, gán ID cho button
		*/
		$("#static").css("display", "block");
		$("#select").css("display", "block");
		$("#pickTime").css("display", "none");

		/*
			custom
		*/
		$("#titleStatic").html("").append( "BẢNG KẾT QUẢ - THỐNG KÊ THEO MÔN HỌC" );
		$(".getResult").css("display", "block").prop('id', 'getStatisticalBySubject');

		/*
			xem thống kê theo danh sách các môn học
		*/
		$("#getStatisticalBySubject").click(function() { 
			$.ajax({
				url: "./lib/ajax/statisticalBySubject/getStatisticalBySubject.php",
				data: {
					path: $("#semester").val(),
					idDvlk: $("#dvlk").val()
				},
				dataType: "JSON",
				beforeSend: function() {
					$('#loading').modal({backdrop: false}); 
				},
				success: function(result) {
					
					/*______________________________________________________________________________________________________*/
					let sumSubject = 0;

					let div = 	'<div class="box-header with-border">';
						div +=		'<label class="box-title">BẢNG THỐNG KÊ ĐÓNG TIỀN THEO MÔN HỌC</label>';
						div += 	'</div>';

						div += 	'<div class="box-body"><div class="nav-tabs-custom">'
						div += 		'<ul class="nav nav-tabs">'
						div += 			'<li class="active"><a href="#tab_1" data-toggle="tab">Thống kê theo môn học</a></li>'
						div += 			'<li><a href="#tab_2" data-toggle="tab">DSSV tại đơn vị liên kết</a></li>'
						div +=			'<li><a href="#tab_3" data-toggle="tab">DSSV ngoài đơn vị liên kết</a></li>'
						div +=		'</ul>'
						div += 		'<div class="tab-content">'
						
						div +=			'<div class="tab-pane active" id="tab_1">'
						div += 				'<div id="showStudentbySubject" class="box-body no-padding"></div>'
						div += 			'</div>'
						
						div += 			'<div class="tab-pane" id="tab_2">'
						div +=				'<div id="showStudentInDvlk" class="box-body no-padding"></div>'
						div +=			'</div>'

						div += 			'<div class="tab-pane" id="tab_3">'
						div +=				'<div id="showStudentOutDvlk" class="box-body no-padding"></div>'
						div +=			'</div>'

						div +=		'</div>'
						div += 	'</div></div>'

					$("#showStaticBySubject").css("display", "block").html(div);
					
					let table = "<table id='tbSubject' class='table table-hover'>";
					
					let header = "<thead>";
						header += "<tr>";
						header += "<th>Mã nhóm</th>";
						header += "<th>Mã môn học</th>";
						header += "<th>Tên môn học</th>";
						header += "<th>Chi tiết</th>";
						header += "</tr>";
						header += "</thead>";

					let body = "<tbody>";
						//$.each(result['data'], (index, value) => {
						for(value of result['data']) {
							body += "<tr>";
							body += "<td>"  + value[0] + "</td>"; // mã nhóm
							body += "<td>"  + value[1] + "</td>"; // mã môn học
							body += "<td>"  + value[2] + "</td>"; // tên môn học
							body += '<td><a href="javascript:getStudentBySubject(' + "'" + value[0].trim() + "', '" + value[1].trim() +  "'" + ');">'+
									'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
										'Xem <i class="fa  fa-file-text-o"></i>'+
									'</button>'+
									'</a></td>';		
							body += "</tr>";
						}
						//});

					body += "</tbody></table>";
					
					$("#showStudentbySubject").html(table + header + body);

					
					$("#tbSubject").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
							"search": "Tìm kiếm:",
							"paginate": {
								"first": "Đầu tiên",
								"last": "Cuối cùng",
								"next": "Tiếp theo",
								"previous": "Trước đó"
							},
						}
					});
					
					/*--------------------------------------------------------------------------------------*/
					
					
					/*__________________________________________________________________________*/
					let tableIndvlk = "<table id='tbStudentInDvlk' class='table table-hover'>";
					
					let headerInDvlk = "<thead>";
						headerInDvlk += "<tr>";
						headerInDvlk += "<th>Mã số sinh viên</th>";
						headerInDvlk += "<th>Họ</th>";
						headerInDvlk += "<th>Tên</th>";
						headerInDvlk += "<th>Ngày sinh</th>";
						headerInDvlk += "<th>Địa phương</th>";
						
						headerInDvlk += "</tr>";
						headerInDvlk += "</thead>";
					
					let bodyInDvlk = "<tbody>";
						$.each(result['studentInDvlk'], (index, value) => {
						//for(value of result['studentInDvlk']) {
							bodyInDvlk += "<tr>";
							bodyInDvlk += "<td>"  + value[0] + "</td>"; // mssv
							bodyInDvlk += "<td>"  + value[1] + "</td>"; // họ
							bodyInDvlk += "<td>"  + value[2] + "</td>"; // tên
							bodyInDvlk += "<td>"  + value[3] + "</td>"; // ngày sinh
							bodyInDvlk += "<td>"  + value[4] + "</td>"; // địa phương
							body += "</tr>";
						//}
						});
						
					bodyInDvlk += "</tbody>";
					
					$("#showStudentInDvlk").html(tableIndvlk + headerInDvlk + bodyInDvlk + "</table>"); 

					
					$("#tbStudentInDvlk").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
							"search": "Tìm kiếm:",
							"paginate": {
								"first": "Đầu tiên",
								"last": "Cuối cùng",
								"next": "Tiếp theo",
								"previous": "Trước đó"
							},
						}
					});
					
					/*-------------------------------------------------------------------------------*/
					
					/*__________________________________________________________________________*/
					// theem vaof cho nay
					let tableNotIndvlk = "<table id='tbStudentOutDvlk' class='table table-hover'>";
					
					let headerNotInDvlk = "<thead>";
						headerNotInDvlk += "<tr>";
						headerNotInDvlk += "<th>Mã số sinh viên</th>";
						headerNotInDvlk += "<th>Họ</th>";
						headerNotInDvlk += "<th>Tên</th>";
						headerNotInDvlk += "<th>Ngày sinh</th>";
						headerNotInDvlk += "<th>Đơn vị</th>";
						headerNotInDvlk += "</tr>";
						headerNotInDvlk += "</thead>";
					
					let bodyNotInDvlk = "<tbody>";
					
						$.each(result['studentNotInDvlk'], (index, value) => {
						//for(value of result['studentNotInDvlk']) {
							bodyNotInDvlk += "<tr>";
							bodyNotInDvlk += "<td>"  + value[0] + "</td>"; //mssv
							bodyNotInDvlk += "<td>"  + value[1] + "</td>"; // họ
							bodyNotInDvlk += "<td>"  + value[2] + "</td>"; // tên
							bodyNotInDvlk += "<td>"  + value[3] + "</td>"; // ngày sinh
							bodyNotInDvlk += "<td>"  + value[4] + "</td>"; // địa phương
							body += "</tr>";
						//}
						});

					bodyNotInDvlk += "</tbody>";
					
					$("#showStudentOutDvlk").html(tableNotIndvlk + headerNotInDvlk + bodyNotInDvlk + "</table>"); 

					
					$("#tbStudentOutDvlk").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
							"search": "Tìm kiếm:",
							"paginate": {
								"first": "Đầu tiên",
								"last": "Cuối cùng",
								"next": "Tiếp theo",
								"previous": "Trước đó"
							},
						}
					});
					
					/*-------------------------------------------------------------------------------*/
				},
				complete: function() {
					
					
					
					$('#loading').modal('hide'); 
				}
			});
		});
	});

	/*
		Chọn THỐNG KÊ THEO THỜI GIAN
	*/
	$("#staticByTime").click(() => {
		
		$(".showstatistical").html("").prop('id', 'showStaticByTime').css("display", "none"); //xóa và tắt cái khung kết quả thống kê
		
		/*
			Đóng mở phần select và picktime, gán ID cho button
		*/
		$("#static").css("display", "block");
		$("#select").css("display", "block");
		$("#pickTime").css("display", "block");

		/*
			custom
		*/
		$("#titleStatic").html("").append( "BẢNG KẾT QUẢ - THỐNG KÊ THEO THỜI GIAN" );
		$(".getResult").css("display", "block").prop('id', 'showStatisticalByDay');

		/*
			thống kê theo danh sách đăng kí môn học
		*/
		$("#showStatisticalByDay").click(() => {

			$.ajax({
				url: "./lib/ajax/statisticalByDay/getStatisticalByDay.php",
				data: {
					path: $("#semester").val(),
					idDvlk: $("#dvlk").val(),
					fromDay: $("#from").val(),
					toDay: $("#to").val()
				},
				dataType: "JSON",
				beforeSend: function() {
					$('#loading').modal({backdrop: false}); 
				},
				success: function(result) {
											
					let stt = 1;
		
					let table = "<table id='tbStudentRegister' class='table table-hover'>";
			
					let header = "<thead>";
						header += "<tr>";
						header += "<th>STT</th>";
						header += "<th>Mã số sinh viên</th>";
						header += "<th>Họ</th>";
						header += "<th>Tên</th>";
						header += "<th>Số tiền</th>";
						header += "<th>Ngày đóng</th>";
						header += "</tr>";
						header += "</thead>";

					let body = "<tbody>";
						//$.each(result['data'], (index, value) => {
						for(value of result['data']) {
							body += "<tr>";
							body += "<td>"  + stt++ + "</td>";
							body += "<td>"  + value[0] + "</td>";
							body += "<td>"  + value[1] + "</td>";
							body += "<td>"  + value[2] + "</td>";
							body += "<td>"  + formatCurrency(value[3]) + " VND" + "</td>";
							body += "<td>"  + value[4] + "</td>";
							body += "</tr>";
						}
						//});
					body += "</tbody>";
					
					$("#showStaticByTime").css("display", "block").html(table + header + body  + "</table>"); 
					
					$("#tbStudentRegister").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
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

		});

	});

	/*
		Chọn LỊCH SỬ QUYẾT TOÁN
	*/
	$("#staticByAccounting").click(() => {
		
		$(".showstatistical").html("").prop('id', 'showStaticByAccounting').css("display", "none"); //xóa và tắt cái khung kết quả thống kê
		
		/*
			Đóng mở phần select và picktime, gán ID cho button
		*/
		$("#static").css("display", "block");
		$("#select").css("display", "block");
		$("#pickTime").css("display", "none");

		/*
			custom
		*/
		$("#titleStatic").html("").append( "BẢNG KẾT QUẢ - LỊCH SỬ QUYẾT TOÁN" );
		$(".getResult").css("display", "block").prop('id', 'showHistoryAccounting'); 

		/*
			thống kê lịch sử quyết toán *
		*/
		$("#showHistoryAccounting").click(() => {

			$.ajax({
				url: "./lib/ajax/accounting/getHistoryAccounting.php",
				data: {
					path: $("#semester").val(),
					idDvlk: $("#dvlk").val()
				},
				dataType: "JSON",
				beforeSend: function() {
					$('#loading').modal({backdrop: false}); 
				},
				success: function(result) {
									
					let div = 	'<div class="box-header with-border">';
						div +=		'<label class="box-title">Danh sách các phiếu đã quyết toán</label>';
						div += 	'</div>';
						div +=	'<div class="box-body">';
		
					let table = "<table id='tbHistoryAccounting' class='table table-hover'>";
			
					let stt = 1;
			
					let header = "<thead>";
						header += "<tr>";
						header += "<th>Mã phiếu</th>";
						header += "<th>Ngày bắt đầu</th>";
						header += "<th>Ngày kết thúc</th>";
						header += "<th>Ngày quyết toán</th>";
						header += "<th>Tổng tiền</th>";
						header += "<th>Phần trăm</th>";
						header += "<th>Chiết khấu</th>";
						header += "</tr>";
						header += "</thead>";

					let body = "<tbody>";
						//$.each(result['data'], (index, value) => {
						for(value of result['data']) {
							body += "<tr>";
							body += "<td>" + value[0] + "</td>";
							body += "<td>" + value[1] + "</td>";
							body += "<td>" + value[2] + "</td>";
							body += "<td>" + value[3] + "</td>";
							body += "<td>" + value[5] + "</td>";
							body += "<td>" + value[4] + "</td>";
							body += "<td>" + value[6] + "</td>";
							body += "</tr>";
						}
						//});
					body += "</tbody>";

					$("#showStaticByAccounting").css("display", "block").html(div + table + header + body  + "</table></div>"); 
					
					$("#tbHistoryAccounting").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'excelHtml5',
							'pdfHtml5'
						],
						"language": {
							"info": "Hiển thị trang _PAGE_ of _PAGES_",
							"lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
							"zeroRecords": "Không tìm thấy dữ liệu",
							"infoEmpty": "Không có dòng nào được trả về",
							"infoFiltered": "(lọc từ _MAX_ tổng số dòng)",
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
		});
	});
})();
