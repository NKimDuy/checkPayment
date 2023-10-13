function showDialogforCourseWare(content) {
	let header = 	'<div class="modal-header">'
		header +=		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
		header +=		'<span aria-hidden="true">&times;</span></button>'
		header +=		'<h4 class="modal-title">Xác minh</h4>'
		header +=	'</div>'

	let body = '<div class="modal-body">' + content + '</div>' 

	let footer =  '<div class="modal-footer">'
		footer += 	"<button type='button' class='btn btn-primary' id='yesdoIt' data-dismiss='modal'>Đồng ý</button>";
		footer += '</div>'

	$("#dialog").html(header + body + footer); 
	$('#modal-dialog').modal('show'); 
	

	//return header + body + footer;
}

/*
	tạo phiếu học liệu
*/
function createReceiptBook(idDvlk, nameDvlk, idSemester, semester, fromDay, toDay, data) {
	
	showDialogforCourseWare("Đồng ý tạo phiếu học liệu ?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/courseWare/addToCourseWareDb.php",
			data: {
				idDvlk: idDvlk,
				nameDvlk: nameDvlk,
				idSemester: idSemester,
				semester: semester,
				fromDay: fromDay,
				toDay: toDay,
				data: data
			},
			dataType: "JSON",
			success: function(result) {
				alert("Đã tạo thành công danh sách sinh viên nhận sách ");
				location.reload();
			}
		});
	});
}

/*
	tick chọn tất cả, hoặc bỏ tick tất cả
*/
function checkAll() { // chọn hoặc bỏ chọn tất cả các checkbox
	if($("#chkAll").is(':checked')) {
		$("#showStatisticalByReceiveBook table input:checkbox").prop("checked","checked");
	}
	else {
		$("#showStatisticalByReceiveBook table input:checkbox").prop("checked",false);
	}
}

/*
	kiểm tra tất cả các checkbox, chỉ cần 1 checkbox không được check thì checkbox checkAll sẽ không được check
*/
function unCheckAllCourseWare(id) {
	if( $("#" + id).is(":checked") ) {
		let flag = true;
		
		$("#showStatisticalByReceiveBook table input:checkbox").each((index, element) => {
			if( $(element).prop("checked") != true ) {
				flag = false;
				return false;
			}
		});
		
		
		if(flag) {
			$("#chkAll").prop("checked","checked");
		}
		
	}
	else {
		$("#chkAll").prop("checked", false);
	}
}

/*
	trích xuất danh sách sinh viên chưa nhận sách ra excel
*/
function exportExcelNotReceiveBook(id) {
	$.ajax({
		url: "./lib/ajax/courseWare/getStudentToCheckRecieveBook.php",
		data: {
			idReceipt: id
		},
		dataType: "JSON",
		success: function(result) {
			let data = [];
			
			data.push(['Mã sinh viên', 'Họ', 'Tên', 'Ngày sinh', 'Mail', 'Số điện thoại', 'Mã lớp', 'Địa chỉ', 'Tên môn học', 'Ngày đóng tiền', 'Khóa học', 'Hệ đào tạo', 'Mã phiếu']);
			
			$.each(result['data'], (index, value) => {
				
				let temp = [];
				
				temp.push(value[0]);
				temp.push(value[1]);
				temp.push(value[2]);
				temp.push(value[3]);
				temp.push(value[4]);
				temp.push(value[5]);
				temp.push(value[6]);
				temp.push(value[7]);
				temp.push(value[8]);
				temp.push(value[9]);
				temp.push(value[10]);
				temp.push(value[11]);
				temp.push(value[12]);
				
				data.push(temp);
				
			});
			saveAs(new Blob([s2ab(getDataForExcelCourseWare(data))],{type:"application/octet-stream"}), 'test.xlsx');
		}
	});
}

/*
	trích xuất danh sách sinh viên đã nhận sách ra excel
*/
function exportExcelReceiveBook(id) {
	$.ajax({
		url: "./lib/ajax/courseWare/getStudentHasReceiveBook.php",
		data: {
			idReceipt: id
		},
		dataType: "JSON",
		success: function(result) {
			let data = [];
			
			data.push(['Mã sinh viên', 'Họ', 'Tên', 'Ngày sinh', 'Mail', 'Số điện thoại', 'Mã lớp', 'Địa chỉ', 'Tên môn học', 'Ngày đóng tiền', 'Khóa học', 'Hệ đào tạo', 'Mã phiếu']);
			
			$.each(result['data'], (index, value) => {
				
				let temp = [];
				
				temp.push(value[0]);
				temp.push(value[1]);
				temp.push(value[2]);
				temp.push(value[3]);
				temp.push(value[4]);
				temp.push(value[5]);
				temp.push(value[6]);
				temp.push(value[7]);
				temp.push(value[8]);
				temp.push(value[9]);
				temp.push(value[10]);
				temp.push(value[11]);
				temp.push(value[12]);
				
				data.push(temp);
				
			});
			saveAs(new Blob([s2ab(getDataForExcelCourseWare(data))],{type:"application/octet-stream"}), 'test.xlsx');
		}
	});
}

/*
	hiện danh sách sinh viên đã lưu cụ thể của phiếu, thêm những dấu tick ở đầu, (không sử dụng dataTable, vì sẽ làm mất các dấu tick)
*/
function getStudentToCheckRecieveBook(id) {
	$.ajax({
		url: "./lib/ajax/courseWare/getStudentToCheckRecieveBook.php",
		data: {
			idReceipt: id 
		},
		dataType: "JSON",
		success: function(result) {
			$("#showStatisticalByReceiveBook").css("display", "block").html("");
			
			let input = "<input id='chkAll' type='checkbox' onclick='checkAll()' />";
			
			let table = "<table id='tbStudentCheckReceiveBook' class='table table-hover'>";
				 
			let header = "<thead>";
				header += "<tr>";
				header += "<th></th>";
				header += "<th>Mã sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Mã môn học</th>";
				header += "<th>Tên môn học</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Mail</th>";
				header += "<th>Số điện thoại gia đình</th>";
				header += "<th>Số điện thoại cá nhân</th>";
				header += "<th>Người nhận</th>";
				header += "<th>Phòng</th>";
				header += "<th>Tòa nhà</th>";
				header += "<th>Số nhà</th>";
				header += "<th>Tên đường</th>";
				header += "<th>Khu phố</th>";
				header += "<th>Phường</th>";
				header += "<th>Quận</th>";
				header += "<th>Thành phố</th>";
				header += "<th>ID phiếu học liệu</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				$.each(result['data'], (index, value) => {
					//body += "<tr id=" + value[0] + value[5] + "t" + ">";
					body += "<tr>";
					body += "<td id=" + value[0] + value[5] + "t" + "><input type='checkbox' id=" + value[0] + value[5] + " onclick='unCheckAllCourseWare(" + '"' + value[0] + value[5] + '"' + ")' value='" + value[0] + " " + value[5] + " " + value[20] + "' /></td>";
					body += "<td>"  + value[0] + "</td>"; // mssv 
					body += "<td>"  + value[1] + "</td>"; // họ 
					body += "<td>"  + value[2] + "</td>"; // tên
					body += "<td>"  + value[3] + "</td>"; // ngày sinh 
					body += "<td>"  + value[4] + "</td>"; // lớp 
					body += "<td>"  + value[5] + "</td>"; // mã môn học
					body += "<td>"  + value[6] + "</td>"; // tên môn học
					body += "<td>"  + value[7] + "</td>"; // ngày đóng
					body += "<td>"  + value[8] + "</td>"; // mail
					body += "<td>"  + value[9] + "</td>"; // dt gia đình
					body += "<td>"  + value[10] + "</td>"; // dt cá nhân
					body += "<td>"  + value[11] + "</td>"; // người nhận
					body += "<td>"  + value[12] + "</td>"; // phòng 
					body += "<td>"  + value[13] + "</td>"; // tòa nhà 
					body += "<td>"  + value[14] + "</td>"; // số nhà 
					body += "<td>"  + value[15] + "</td>"; // tên đường 
					body += "<td>"  + value[16] + "</td>"; // khu phố
					body += "<td>"  + value[17] + "</td>"; // phường
					body += "<td>"  + value[18] + "</td>"; // quận 
					body += "<td>"  + value[19] + "</td>"; // thành phố
					body += "<td>"  + value[20] + "</td>"; // ID_phiếu
					body += "</tr>";
				});
			body += "</tbody>";
			
			let div =	"<div class='box-header with-border'>" +
							"<h3 class='box-title'>Danh sách sinh viên nhận sách</h3>" +
							"<div class='box-tools pull-right'>" +
								'<button onclick="confirmReceive(' + "'" + "tbStudentCheckReceiveBook" + "'" + ')" id="confirm" class="btn btn-block btn-info">Xác nhận</button>' +
							"</div>" + 	
						"</div>" + 
						"<div class='box-body'>";
			
			$("#showStatisticalByReceiveBook").html(div + input + table + header + body + "</table></div></div>"); 
			
			let dataTable = $("#tbStudentCheckReceiveBook").DataTable({
				"scrollY": true,
				"scrollX": true,
				"autoWidth": false,
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
				/*
				"paging": false,
				"lengthChange": false,
				"info": false
				*/
			});
			
			// khi bấm sang trang khác, thì các checkbox cũ sẽ không được tick 
			$("#tbStudentCheckReceiveBook").on("page.dt", () => {
				$("#chkAll").prop("checked", false);
				
				$("#showStatisticalByReceiveBook table input:checked:not(#chkAll)").each(function(index, item) {
					$(item).prop("checked", false);
				});
				
			});
		}
	});
}

/*
	hiện danh sách sinh viên đã được xác nhận đã nhận sách
*/
function getStudentHasReceiveBook(id) {
	$.ajax({
		url: "./lib/ajax/courseWare/getStudentHasReceiveBook.php",
		data: {
			idReceipt: id 
		},
		dataType: "JSON",
		success: function(result) {

			$("#showStatisticalByReceiveBook").css("display", "block").html("");
			
			let div =	"<div class='box-header with-border'>" +
								"<h3 class='box-title'>Danh sách sinh viên nhận sách</h3>" +
								"<div class='box-tools pull-right'>" +
									'<a href="javascript:exportExcelReceiveBook(' + "'" + id + "'" + ')">Excel <i class="fa fa-file-excel-o"></i></a>' +
								"</div>" +
							"</div><div class='box-body'>";
			
			
			let table = "<table id='tbStudentHasReceiveBook' class='table table-hover'>";
				 
			let header = "<thead>";
				header += "<tr>";
				header += "<th>Ngày nhận sách</th>";
				header += "<th>Mã sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Ngày sinh</th>";
				header += "<th>Tên lớp</th>";
				header += "<th>Mã môn học</th>";
				header += "<th>Tên môn học</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Mail</th>";
				header += "<th>Số điện thoại gia đình</th>";
				header += "<th>Số điện thoại cá nhân</th>";
				header += "<th>Người nhận</th>";
				header += "<th>Phòng</th>";
				header += "<th>Tòa nhà</th>";
				header += "<th>Số nhà</th>";
				header += "<th>Tên đường</th>";
				header += "<th>Khu phố</th>";
				header += "<th>Phường</th>";
				header += "<th>Quận</th>";
				header += "<th>Thành phố</th>";
				header += "<th>ID phiếu học liệu</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				$.each(result['data'], (index, value) => {
					body += "<tr>";
					body += "<td>"  + value[21] + "</td>"; // Ngày nhận sách
					body += "<td>"  + value[0] + "</td>"; // mssv 
					body += "<td>"  + value[1] + "</td>"; // họ 
					body += "<td>"  + value[2] + "</td>"; // tên
					body += "<td>"  + value[3] + "</td>"; // ngày sinh 
					body += "<td>"  + value[4] + "</td>"; // lớp 
					body += "<td>"  + value[5] + "</td>"; // mã môn học
					body += "<td>"  + value[6] + "</td>"; // tên môn học
					body += "<td>"  + value[7] + "</td>"; // ngày đóng
					body += "<td>"  + value[8] + "</td>"; // mail
					body += "<td>"  + value[9] + "</td>"; // dt gia đình
					body += "<td>"  + value[10] + "</td>"; // dt cá nhân
					body += "<td>"  + value[11] + "</td>"; // người nhận
					body += "<td>"  + value[12] + "</td>"; // phòng 
					body += "<td>"  + value[13] + "</td>"; // tòa nhà 
					body += "<td>"  + value[14] + "</td>"; // số nhà 
					body += "<td>"  + value[15] + "</td>"; // tên đường 
					body += "<td>"  + value[16] + "</td>"; // khu phố
					body += "<td>"  + value[17] + "</td>"; // phường
					body += "<td>"  + value[18] + "</td>"; // quận 
					body += "<td>"  + value[19] + "</td>"; // thành phố
					body += "<td>"  + value[20] + "</td>"; // ID_phiếu
					body += "</tr>";
				});

			body += "</tbody>";
			
			$("#showStatisticalByReceiveBook").html(div + table + header + body + "</table></div></div>"); 
			
			$("#tbStudentHasReceiveBook").DataTable({
				"scrollY": true,
				"scrollX": true,
				"autoWidth": false,
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
			
		}
	});
}

/*
	tick vô xác nhận sinh viên đã nhận sách
*/
function confirmReceive(table) {
	
	var rowCheck = 0;
		
	var rowConfirm = 0;
	
	showDialogforCourseWare("Xác nhận sinh viên nhận sách ?");
	
	$("#yesdoIt").click(() => {
		$("#showStatisticalByReceiveBook table input:checked:not(#chkAll)").each(function(index, item) {
		
			rowCheck += 1;
			
			$.ajax({
				method: "POST",
				url: "./lib/ajax/courseWare/confirmHasReceiveBook.php",
				data: {
					mssv: $(item).val().split(" ")[0],
					idSubject: $(item).val().split(" ")[1],
					idReceipt: $(item).val().split(" ")[2]
				},
				dataType: "JSON",
				success: function(result) {
					
					$("#" + result['confirm']).remove();
					
					$("#" + result['confirm'] + "t").html('<i class="fas fa-check-circle"></i>');
					
					$("#" + result['confirm'] + "t").parents("tr").css("background-color", "#c3e6cb");
					
					rowConfirm += 1;

					if(rowConfirm == rowCheck) {
						
						alert("đã cập nhật " + rowConfirm + " sinh viên nhận sách");
					}
						
				}
			});
		});
	});
}


(function() {
    
	/*
		hiện danh sách các sinh viên đã đóng tiền từ ngày đến ngày
	*/
	$("#seeStudent").click(() => {
		$.ajax({
			url: "./lib/ajax/courseWare/getStudentHasPay.php",
			data: {
				idDvlk: $("#dvlk").val(),
				path: $("#semester").val(),
				fromDay: $("#from").val(),
				toDay: $("#to").val()
			},
			dataType: "JSON",
			success: function(result) {
				
				$("#showStatisticalByReceiveBook").css("display", "block").html("");
				
				let div =	"<div class='box-header with-border'>" +
								"<h3 class='box-title'>Danh sách sinh viên nhận sách</h3>" +
								"<div class='box-tools pull-right'>" +
									'<a class="btn btn-block btn-info" href="javascript:createReceiptBook(' + "'" + $("#dvlk").val() + "', '" + $("#dvlk option:selected").text() + "', '" + $("#semester").val() + "', '" + $("#semester option:selected").text() + "', '" + $("#from").val() + "', '" + $("#to").val() + "'" + ')">Tạo danh sách sinh viên nhận sách <i class="fa fa-file-excel-o"></a>' +
								"</div>" +
							"</div><div class='box-body'>";
				
				let table = "<table id='tbStudentReceiveBook' class='table table-hover'>";
				 
				let header = "<thead>";
					header += "<tr>";
					header += "<th>Mã sinh viên</th>";
					header += "<th>Họ</th>";
					header += "<th>Tên</th>";
					header += "<th>Ngày sinh</th>";
					header += "<th>Tên lớp</th>";
					header += "<th>Mã môn học</th>";
					header += "<th>Tên môn học</th>";
					header += "<th>Ngày đóng tiền</th>";
					header += "<th>Mail</th>";
					header += "<th>Số điện thoại gia đình</th>";
					header += "<th>Số điện thoại cá nhân</th>";
					header += "<th>người nhận</th>";
					header += "<th>Phòng</th>";
					header += "<th>Tòa nhà</th>";
					header += "<th>Số nhà</th>";
					header += "<th>Đường</th>";
					header += "<th>Khu phố</th>";
					header += "<th>phường</th>";
					header += "<th>quận</th>";
					header += "<th>Tỉnh</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
					$.each(result['data'], (index, value) => {
						body += "<tr>";
						body += "<td>"  + value[0] + "</td>"; // mssv
						body += "<td>"  + value[1] + "</td>"; // họ
						body += "<td>"  + value[2] + "</td>"; // tên
						body += "<td>"  + value[3] + "</td>"; // ngày sinh
						body += "<td>"  + value[4] + "</td>"; // tên lớp
						body += "<td>"  + value[5] + "</td>"; // mã môn 
						body += "<td>"  + value[6] + "</td>"; // tên môn 
						body += "<td>"  + value[7] + "</td>"; // ngày đóng 
						body += "<td>"  + value[8] + "</td>"; // mail 
						body += "<td>"  + value[9] + "</td>"; // sdt gia đình 
						body += "<td>"  + value[10] + "</td>"; // sdt cá nhân 
						body += "<td>"  + value[11] + "</td>";  // người nhận 
						body += "<td>"  + value[12] + "</td>"; // phòng 
						body += "<td>"  + value[13] + "</td>"; // tòa nhà 
						body += "<td>"  + value[14] + "</td>"; // số nhà 
						body += "<td>"  + value[15] + "</td>";  // đường 
						body += "<td>"  + value[16] + "</td>"; // khu phố 
						body += "<td>"  + value[17] + "</td>"; // phường 
						body += "<td>"  + value[18] + "</td>"; // quận 
						body += "<td>"  + value[19] + "</td>"; // tỉnh
						body += "</tr>";
					});

				body += "</tbody>";
				
				$("#showStatisticalByReceiveBook").html(div + table + header + body + "</table></div></div>"); 
				
				$("#tbStudentReceiveBook").DataTable({
					"scrollY": 600,
					"scrollX": true,
					"autoWidth": false,
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
			}
		});
	});
	
	/*
		hiện danh sách các phiếu được tạo
	*/
	$("#seeReceipt").click(() => {
		$("#showStatisticalByReceiveBook").css("display", "none").html("");
		$.ajax({
			url: "./lib/ajax/courseWare/getReceiptBook.php",
			data: {
				idDvlk: $("#dvlk").val(),
				idSemester: $("#semester").val(),
				statusReceipt: "notYet"
			},
			dataType: "JSON",
			success: function(result) {

				$("#showReceipt").css("display", "block").html("");

				let div = 	'<div class="box-header with-border">';
					div +=		'<label class="box-title">Danh sách các DSSV chưa nhận sách</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';

				let table = "<table id='tbReceiptBook' class='table table-bordered'>";
				 
				let header = "<thead>";
					header += "<tr>";
					header += "<th>ID</th>";
					header += "<th>Mã đơn vị liên kết</th>";
					header += "<th>Tên đơn vị liên kết</th>";
					header += "<th>Mã học kì</th>";
					header += "<th>Tên học kì</th>";
					header += "<th>Tìm kiếm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Ngày tạo phiếu</th>";
					header += "<th>Chi tiết</th>";
					header += "<th>Excel</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
					$.each(result['data'], (index, value) => {
						body += "<tr>";
						body += "<td>"  + value[0] + "</td>"; // ID
						body += "<td>"  + value[1] + "</td>"; // mã dvlk 
						body += "<td>"  + value[2] + "</td>"; // tên dvlk 
						body += "<td>"  + value[3] + "</td>"; // mã hk 
						body += "<td>"  + value[4] + "</td>"; // tên hk 
						body += "<td>"  + value[5] + "</td>"; // ngày bắt đầu tìm
						body += "<td>"  + value[6] + "</td>"; // ngày kết thúc tìm
						body += "<td>"  + value[7] + "</td>"; // ngày tạo
						body += '<td><a style="color:white;"' + 
										'href="javascript:getStudentToCheckRecieveBook(' + "'" + value[0] + "'" + ')">' + 
									'<button type="button" class="btn btn-block btn-info">'+
										'Xem <i class="fa  fa-info-circle"></i>'+
									'</button>'+
								'</a></td>';

						body += '<td><a style="color:white;"' + 
										'href="javascript:exportExcelNotReceiveBook(' + "'" + value[0] + "'" + ')">' + 
									'<button type="button" class="btn btn-block btn-success">'+
										'Tạo file Excel <i class="fa fa-file-excel-o"></i>'+
									'</button>'+
								'</a></td>';

						body += "</tr>";
					});

				body += "</tbody>";
				
				$("#showReceipt").css("display", "block").html(div + table + header + body + "</table></div>"); 
			}
		});
	});
	
	/*
		hiện danh sách các phiếu học liệu, khi nhấn vào sẽ hiện danh sách các sinh viên đã được nhận sách
	*/
	$("#seeReceiptHasReceiveBook").click(() => {
		$("#showStatisticalByReceiveBook").css("display", "none").html("");
		$.ajax({
			url: "./lib/ajax/courseWare/getReceiptBook.php",
			data: {
				idDvlk: $("#dvlk").val(),
				idSemester: $("#semester").val(),
				statusReceipt: "full"
			},
			dataType: "JSON",
			success: function(result) {

				$("#showReceipt").css("display", "block").html("");

				let div = 	'<div class="box-header with-border">';
					div +=		'<h4 class="box-title">Danh sách các DSSV đã nhận sách</h3>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';


				let table = "<table id='tbReceiptBook' class='table table-bordered'>";
				 
				let header = "<thead>";
					header += "<tr>";
					header += "<th>ID</th>";
					header += "<th>Mã đơn vị liên kết</th>";
					header += "<th>Tên đơn vị liên kết</th>";
					header += "<th>Mã học kì</th>";
					header += "<th>Tên học kì</th>";
					header += "<th>Tìm kiếm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Ngày tạo phiếu</th>";
					header += "<th>Chi tiết</th>";
					header += "<th>Excel</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
					$.each(result['data'], (index, value) => {
						body += "<tr>";
						body += "<td>"  + value[0] + "</td>"; // ID
						body += "<td>"  + value[1] + "</td>"; // mã dvlk 
						body += "<td>"  + value[2] + "</td>"; // tên dvlk 
						body += "<td>"  + value[3] + "</td>"; // mã hk 
						body += "<td>"  + value[4] + "</td>"; // tên hk 
						body += "<td>"  + value[5] + "</td>"; // ngày bắt đầu tìm
						body += "<td>"  + value[6] + "</td>"; // ngày kết thúc tìm
						body += "<td>"  + value[7] + "</td>"; // ngày tạo
						body += '<td><a style="color:white;"' + 
										'href="javascript:getStudentHasReceiveBook(' + "'" + value[0] + "'" + ')">' + 
									'<button type="button" class="btn btn-block btn-info">'+
										'Xem <i class="fa  fa-info-circle"></i>'+
									'</button>'+
								'</a></td>';

					body += '<td><a style="color:white;"' + 
								'href="javascript:exportExcelReceiveBook(' + "'" + value[0] + "'" + ')">' + 
								'<button type="button" class="btn btn-block btn-success">'+
									'Tạo file Excel <i class="fa fa-file-excel-o"></i>'+
								'</button>'+
							'</a></td>';
						
						body += "</tr>";
					});

				body += "</tbody>";
				
				$("#showReceipt").css("display", "block").html(div + table + header + body + "</table></div>"); 
			}
		});
	});
	
	/*
		danh sách các sinh viên đã nhận sách
	*/
	$("#studentToReiceiveBook").click(() => {
		$.ajax({
			url: "./lib/ajax/courseWare/getStudentHasReceiveBook.php",
			dataType: "JSON",
			success: function(result) {

				$("#showStatisticalByReceiveBook").css("display", "block").html("");

				let div = "<div class='box-header with-border'><h3 class='box-title'>Danh sách sinh viên đã nhận sách</h3></div><div class='box-body'>" 

				let table = "<table id='tbReiceiveBook' class='table table-hover' style='width:100%'>";
				
				let header = "<thead>";
				  header += "<tr>";
				  header += "<th>Mã số sinh viên</th>";
				  header += "<th>Ngày xuất</th>";
				  header += "</tr>";
				  header += "</thead>";
				  
				let body = "<tbody>";
				$.each(result, (index, value) => {
					body += "<tr>";
					body += "<td>"  + value[0] + "</td>";
					body += "<td>"  + value[2] + "</td>";
				});
				body += "</tbody>";
				 
				$("#showStatisticalByReceiveBook").html(div + table + header + body + "</table></div>");
				
				$('#tbReiceiveBook').DataTable({
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

				
			}
		});
	});
	
	
//});
})();