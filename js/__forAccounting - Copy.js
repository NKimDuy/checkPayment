/*
	hiện dialog xác nhận mỗi khi thực hiện 
*/
function showDialogForAccounting(content) {
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
	tạo phiếu quyết toán *
*/
function createAccountingBill(e) {
	
	e = e || window.event;
	
    e.preventDefault();

	showDialogForAccounting("Đồng ý tạo phiếu quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			method: 'POST',
			url: "./lib/ajax/accounting/addToAccountingdb.php",
			data: {
				dataForm: $("#formConfirmAccounting").serializeArray()
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide'); 
				alert('Đã tạo thành công');
				location.reload();
			}
		});
	});
	
}

/* 
	Xóa phiếu quyết toán *
*/
function confirmDeleteAccounting(IdAccounting) {
	
	showDialogForAccounting("Đồng ý xóa phiếu quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/confirmDeleteAccounting.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				$('#loading').modal('hide');
				alert('Đã xóa thành công');
				location.reload();
			}
		});
	});
	
}

/* 
	kế toán xác nhận phiếu, và gửi mail cho dvlk *
*/
function confirmAndSentMail(IdAccounting) {
	showDialogForAccounting("Bạn muốn gửi phiếu quyết toán đến ĐVLK xác nhận ?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/confirmAndSentMail.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				//alert(result['mail']);
				
				let subject = "Quyết toán cho đơn vị liên kết" + result['data'][0];
				
				let bodyMail = "<p>Phòng kế toán trường đại học Mở đã tạo phiếu quyết toán có ID: "  + IdAccounting + "</p>";
					bodyMail += "<p> từ ngày " + result['data'][2] + " đến ngày " + result['data'][3] + "</p>";
					bodyMail += "<p>" + result['data'][1] + "</p>";
					bodyMail += "<p>Kính mong đơn vị liên kết xem và dồng ý quyết toán sớm để thuận tiện cho việc thanh toán</p>";
					bodyMail += "<p>Trân trọng</p>";
				
				sendEmail(subject, bodyMail, result['mail']);
			}
		});
	});
}

/* 
	dvlk xác nhận phiếu quyết toán *
*/
function confirmOfDvlk(e) {
	e = e || window.event;
	
    e.preventDefault();
	
	showDialogForAccounting("đồng ý với phiếu quyết toán ?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			method: 'POST',
			url: "./lib/ajax/accounting/confirmOfDvlk.php",
			data: {
				dataForm: $("#formConfirmAccounting").serializeArray()
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false});
			},
			success: function(result) {
				let subject = "Phản hồi từ đơn vị liên kết " + result['data'][0];
				
				let bodyMail = "<p>Đơn vị liên kết đã nhận được phiếu quyết toán có ID: "  + result['data'][4] + "</p>";
					bodyMail += "<p> từ ngày " + result['data'][2] + " đến ngày " + result['data'][3] + "</p>";
					bodyMail += "<p>" + result['data'][1] + "</p>";
					bodyMail += "<p>Và đã đồng ý với thông tin trong phiếu quyết toán</p>";
					bodyMail += "<p>Đề nghị phòng kế toán tiến hành quyết toán</p>";
				
				sendEmail(subject, bodyMail, result['mail']);
			}
		});
	});
}

/* 
	kế toán xác nhận phiếu đã được quyết toán thành công *
*/
function confirmHasAccounting(IdAccounting) {
	
	showDialogForAccounting("Xác nhận phiếu đã được quyết toán?");
	
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/accounting/confirmHasAccounting.php",
			data: {
				IdAccounting: IdAccounting
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				if(result['confirm'] == true){
					$('#loading').modal('hide');
					alert('Đã quyết toán thành công');
					location.reload();
				}
			}
		});
	});
}

/*
	Xem lại danh sách các sinh viên trong các phiếu quyết toán đã được tạo
*/
function getStudentHasSaveByDvlk(IdAccounting) {
	$("#showCreateAccounting").css("display", "block");
		$.ajax({
		url: "./lib/ajax/accounting/getStudentForDvlkOrAccounting.php",
		data: {
			IdAccounting: IdAccounting
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},

		success: function(result) {
			
			let stt = 1;
				
			let sumByDay = 0;
						
			let table = "<table id='tbDay' class='table table-hover'>";
	  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Số tiền</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Nội dung</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					sumByDay += parseFloat(value[4]);
					
					body += "<tr>";
					body += "<td>"  + stt++ + "</td>";
					body += "<td>"  + value[1] + "</td>";
					body += "<td>"  + value[2] + "</td>";
					body += "<td>"  + value[3] + "</td>";
					body += "<td>"  + formatCurrency(value[4]) + " VND" + "</td>";
					body += "<td>"  + value[5] + "</td>";
					body += "<td>"  + value[6] + "</td>";
					body += "</tr>";
				}
				//});

			body += "</tbody>";
			
			//contentListStudent
			$("#contentListStudent").html(table + header + body  + "</table></div>"); 
				/************************************************************************/
								
				let tableDeduct = "<table class='table table-hover'>";

				let bodyDeduct = "";
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN THU: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][11] + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Từ " + result['data'][0][8] + " đến " + result['data'][0][9] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][7] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td>" + result['data'][0][11] + "</td>";
					bodyDeduct += "</tr>";
				
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN CHI: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][12] + "</b></td>";
					bodyDeduct += "</tr>";
					
					
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Chi </span><span>" + result['data'][0][10] + "</span><span> % theo hợp đồng</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][11] + "</span></td>";
					bodyDeduct += "<td>x</td>";
					bodyDeduct += "<td>" + result['data'][0][10] + "%</td>";
					bodyDeduct += "<td>" + result['data'][0][12] + "</td>";
					bodyDeduct += "</tr>";
				//contentDeduct
				$("#contentDeduct").html(tableDeduct + bodyDeduct  + "</table>"); 
			
			$("#tbDay").DataTable({
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
}

/* 
	dvlk sẽ thấy chi tiết thông tin sinh viên, phần trăm thu chi của đơn vị mình 
*/
function seeAccountingForDvlk(IdAccounting) {

	$("#showSeeAccountingForDvlk").css("display", "block");
	$.ajax({
		url: "./lib/ajax/accounting/getStudentForDvlkOrAccounting.php",
		data: {
			IdAccounting: IdAccounting
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let stt = 1;
				
			let sumByDay = 0;
						
			let table = "<table id='tbDay' class='table table-hover'>";
	  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Số tiền</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Nội dung</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					sumByDay += parseFloat(value[4]);
					
					body += "<tr>";
					body += "<td>"  + stt++ + "</td>";
					body += "<td>"  + value[1] + "</td>";
					body += "<td>"  + value[2] + "</td>";
					body += "<td>"  + value[3] + "</td>";
					body += "<td>"  + formatCurrency(value[4]) + " VND" + "</td>";
					body += "<td>"  + value[5] + "</td>";
					body += "<td>"  + value[6] + "</td>";
					body += "</tr>";
				}
				//});

			body += "</tbody>";
			
			//contentListStudent
			$("#contentListStudent").html(table + header + body  + "</table></div>"); 
				/************************************************************************/
								
				let tableDeduct = "<table class='table table-hover'>";

				let bodyDeduct = "";
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN THU: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][11] + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Từ " + result['data'][0][8] + " đến " + result['data'][0][9] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][7] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td>" + result['data'][0][11] + "</td>";
					bodyDeduct += "</tr>";
				
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN CHI: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][12] + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Chi </span><span>" + result['data'][0][10] + "</span><span> % theo hợp đồng</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][11] + "</span></td>";
					bodyDeduct += "<td>x</td>";
					bodyDeduct += "<td>" + result['data'][0][10] + "%</td>";
					bodyDeduct += "<td>" + result['data'][0][12] + "</td>";
					bodyDeduct += "</tr>";
				//contentDeduct
				$("#contentDeduct").html(tableDeduct + bodyDeduct  + "</table>"); 
			/************************************************************************/
			
			/************************************************************************/
			let table1 = '<div class="box-header with-border"><table class="table table-bordered">';

			let body1 = 	'<tr>'+
								"<td><h5><b>Tổng số tiền đã đóng tại đơn vị liên kết: </b></h5></td>" +

								'<td>' + result['data'][0][11] + 'VND</td>' +

							'</tr>';

				body1 += 	'<tr>' +
									 
							'<td><label for="confirm">Xác nhận quyết toán: </label></td>' +
							
							'<td>' +

								'<form id="formConfirmAccounting" method="post">' +
								
								'<input id="IdConfirm" name="IdConfirm" type="hidden" value="' + IdAccounting + '">' +

								'<input type="submit" onclick="confirmOfDvlk(event)" value="Gửi" id="sentAccounting" class="btn btn-block btn-default"></input>'+
															
								'</form>'+
							'</td>' + 
						
						'</tr>';
			//sumAllStudentByDay
			$("#buttonToCreateAccounting").css("display", "block").html(table1 + body1 + "</table></div>"); 
			/************************************************************************/
			
			$("#tbDay").DataTable({
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
}

/* 
	kế toán trường đại học Mở sẽ thấy được danh sách sinh viên, %thu chi cho dvlk, ở các phiếu đã được xác nhận giữa kế toán và dvlk
*/
function seeStudentInHistory(IdAccounting) {

	$("#showSeeAccountingForDvlk").css("display", "block");
	$.ajax({
		url: "./lib/ajax/accounting/getStudentForDvlkOrAccounting.php",
		data: {
			IdAccounting: IdAccounting
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			
			let stt = 1;
				
			let sumByDay = 0;
						
			let table = "<table id='tbDay' class='table table-hover'>";
	  
			let header = "<thead>";
				header += "<tr>";
				header += "<th>STT</th>";
				header += "<th>Mã số sinh viên</th>";
				header += "<th>Họ</th>";
				header += "<th>Tên</th>";
				header += "<th>Số tiền</th>";
				header += "<th>Ngày đóng</th>";
				header += "<th>Nội dung</th>";
				header += "</tr>";
				header += "</thead>";

			let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					sumByDay += parseFloat(value[4]);
					
					body += "<tr>";
					body += "<td>"  + stt++ + "</td>";
					body += "<td>"  + value[1] + "</td>";
					body += "<td>"  + value[2] + "</td>";
					body += "<td>"  + value[3] + "</td>";
					body += "<td>"  + formatCurrency(value[4]) + " VND" + "</td>";
					body += "<td>"  + value[5] + "</td>";
					body += "<td>"  + value[6] + "</td>";
					body += "</tr>";
				}
				//});
				

			body += "</tbody>";
			
			//contentListStudent
			$("#duy").html(table + header + body  + "</table></div>"); 
				/************************************************************************/
								
				let tableDeduct = "<table class='table table-hover'>";

				let bodyDeduct = "";
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN THU: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][11] + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Từ " + result['data'][0][8] + " đến " + result['data'][0][9] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][7] + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td>" + result['data'][0][11] + "</td>";
					bodyDeduct += "</tr>";
				
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN CHI: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b>" + result['data'][0][12] + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Chi </span><span>" + result['data'][0][10] + "</span><span> % theo hợp đồng</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + result['data'][0][11] + "</span></td>";
					bodyDeduct += "<td>x</td>";
					bodyDeduct += "<td>" + result['data'][0][10] + "%</td>";
					bodyDeduct += "<td>" + result['data'][0][12] + "</td>";
					bodyDeduct += "</tr>";
				//contentDeduct
				$("#sang").html(tableDeduct + bodyDeduct  + "</table>"); 
			/************************************************************************/
			
			$("#tbDay").DataTable({
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
}

/* 
	 trích xuất ra file excel
*/
function exportExcel(idAccounting) {
	$.ajax({
		url: "./lib/ajax/accounting/getDataToExportExcel.php",
		data: {
			id: idAccounting
		},
		dataType: "JSON",
		beforeSend: function() {
			$('#loading').modal({backdrop: false}); 
		},
		success: function(result) {
			//alert(result['data']);
			
			let arrExportStudentExcel = [];
			
			let arrExportDeductExcel = [];
			
			let sum = 0;
			
			let stt = 1;
			
			arrExportStudentExcel.push(['BỘ GIÁO DỤC VÀ ĐÀO TẠO', '', '', 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM']);
			arrExportStudentExcel.push(['TRƯỜNG ĐẠI HỌC MỞ', '', '', 'Độc lập - Tự do - Hạnh phúc']);
			arrExportStudentExcel.push(['THÀNH PHỐ HỒ CHÍ MINH', '', '', '']);
			arrExportStudentExcel.push(['', '', '', 'Tp. Hồ Chí Minh, ngày   tháng  năm    ']);
			arrExportStudentExcel.push(['', '', '', '']);
			arrExportStudentExcel.push(['', '', '', '']);
			arrExportStudentExcel.push(['', '', '', '']);
			
			arrExportStudentExcel.push(['DANH SÁCH ĐÓNG HỌC PHÍ TỪ ' + result['data'][0][8] + ' ĐẾN NGÀY ' + result['data'][0][9]]);
			arrExportStudentExcel.push(['CỦA ' + result['data'][0][7].toUpperCase()]);
			
			//$.each(result['data'], (index, value) => {
			for(value of result['data']) {
				sum += parseFloat(value[4]);
				let temp = [];				
				temp.push(stt++);
				temp.push(value[1]);
				temp.push(value[2]);
				temp.push(value[3]);
				temp.push(formatCurrency(value[4]) + " VND");
				temp.push(value[5]);
				temp.push(value[6]);
				arrExportStudentExcel.push(temp);
			}
			//});
			
			arrExportDeductExcel.push(['BỘ GIÁO DỤC VÀ ĐÀO TẠO', '', '', 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM']);
			arrExportDeductExcel.push(['TRƯỜNG ĐẠI HỌC MỞ', '', '', 'Độc lập - Tự do - Hạnh phúc']);
			arrExportDeductExcel.push(['THÀNH PHỐ HỒ CHÍ MINH', '', '', '']);
			arrExportDeductExcel.push(['', '', '', 'Tp. Hồ Chí Minh, ngày   tháng  năm    ']);
			arrExportDeductExcel.push(['', '', '', '']);
			arrExportDeductExcel.push(['', '', '', '']);
			arrExportDeductExcel.push(['', '', '', '']);
			
			

			arrExportDeductExcel.push(['I PHẦN THU:', '', '', result['data'][0][11]]);
			arrExportDeductExcel.push(["Từ "+ result['data'][0][8] + " đến " + result['data'][0][9]]);
			arrExportDeductExcel.push([result['data'][0][7], '', '', result['data'][0][11]]);
			arrExportDeductExcel.push(["II PHẦN CHI:", '', '', result['data'][0][12]]);
			arrExportDeductExcel.push(['Chi ', result['data'][0][10], '% theo hợp đồng']);
			arrExportDeductExcel.push([result['data'][0][11], 'x', result['data'][0][10], '%', result['data'][0][12]]);
			
			saveAs(new Blob([s2ab(getDataForExcelStatistical(arrExportStudentExcel, arrExportDeductExcel))],{type:"application/octet-stream"}), 'test.xlsx');
			
		},
		complete: function() {
			$('#loading').modal('hide'); 
		}
	});
}

/*
	khi phần trăm thu chi cho dvlk thay đổi, thì cũng đồng thời cập nhật sự thay đổi đó cho các element liên quan
*/
function changePercent(sum) {
	$("#currentPercent").text($("#percent").val());
	$(".moneyForDvlk").text( formatCurrency( sum * parseInt($("#percent").val()) /100)  );
	$("#totalDiscount").val( formatCurrency( sum * parseInt($("#percent").val()) /100)  );
	$(".percentForDvlk").text( $("#percent").val()  );
	
	$("#percentSave").val( $("#percent").val()  );
}


(function() {

	/*
		hiện cái tạo phiếu quyết toán
	*/
	$("#doAcounting").click(() => {

		$("#showSeeBill").css("display", "none");
		$("#showListBill").css("display", "none");

		$("#showDoAcounting").css("display", "block");
	});

	/*
		hiện cái xem phiếu quyết toán
	*/
	$("#seeBill").click(() => {

		$("#showDoAcounting").css("display", "none");
		$("#showCreateAccounting").css("display", "none");

		$("#showSeeBill").css("display", "block");
	});
	
	/*
		khi đăng nhập bằng dvlk, bấm nút xem các phiếu đang chờ quyết toán, sẽ hiện các phiếu quyết toán của dvlk *
	*/
	$("#seeBillAccounting").click(() => {
		$("#showListBill").css("display", "block").html("");
		$.ajax({
			url: "./lib/ajax/accounting/getAccountingForDvlk.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				let div = 	'<div class="box-header with-border">';
					div +=		'<label class="box-title">Danh sách các phiếu quyết toàn chờ xác nhận</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';

				let table = "<table id='tbLis' class='table table-bordered'>";

				let	header = "<thead>";
					header += "<th>ID</th>";
					header += "<th>Đơn vị liên kết</th>";
					header += "<th>Học kì</th>";
					header += "<th>Ngày tạo</th>";
					header += "<th>Tìm kiêm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Xem chi tiết</th>";
					header += "</thead>";
					
				let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += '<tr id=' + value[0] + '>';
					body += '<td>' + value[0] + '</td>';
					body += '<td>' + value[2] + '</td>';
					body += '<td>' + value[4] + '</td>';
					body += '<td>' + value[5] + '</td>';
					body += '<td>' + value[6] + '</td>';
					body += '<td>' + value[7] + '</td>';
					
					body += '<td><a href="javascript:seeAccountingForDvlk(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
									'Xem <i class="fa fa-file-text-o"></i>'+
								'</button>'+
							'</a></td>';

					body += '</tr>';
				}
				//});
				
				body += "</tbody>";
				
				body += "</table></div>";

				$("#showListBill").html( div + table + header + body );
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
	
	/*
		xem thống kê danh sách sinh viên đóng học phí từ ngày đến ngày và hiện nút tạo để tạo phiếu quyết toán *
	*/
	$("#seeStudentToAccounting").click(function() {

		$("#showCreateAccounting").css("display", "block");
		
		$.ajax({
			url: "./lib/ajax/accounting/getStudentToAccounting.php",
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
				
				
				
				/******************************************************************************************/

				let flag = 0;

				let stt = 1;
				
				let sumByDay = 0;
				
				let table = "<table id='tbDay' class='table table-hover'>";
		  
				let header = "<thead>";
					header += "<tr>";
					header += "<th>STT</th>";
					header += "<th>Mã số sinh viên</th>";
					header += "<th>Họ</th>";
					header += "<th>Tên</th>";
					header += "<th>Số tiền</th>";
					header += "<th>Ngày đóng</th>";
					header += "<th>Nội dung</th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
					//$.each(result['data'], (index, value) => {
					for(value of result['data']) {
						
						flag += 1;
						
						sumByDay += parseFloat(value[3]);
						
						body += "<tr>";
						body += "<td>"  + stt++ + "</td>";
						body += "<td>"  + value[0] + "</td>";
						body += "<td>"  + value[1] + "</td>";
						body += "<td>"  + value[2] + "</td>";
						body += "<td>"  + formatCurrency(value[3]) + " VND" + "</td>";
						body += "<td>"  + value[4] + "</td>";
						body += "<td>"  + $("#semester option:selected").text() + "</td>";
						body += "</tr>";
					}
					//});
				body += "</tbody>";
				
				$("#numberStudentHasFound").text(flag);
				
				//contentListStudent
				$("#contentListStudent").html(table + header + body  + "</table></div>"); 
				/**************************************************************************************************/
				
				/************************************************************************/
				
				let tableDeduct = "<table class='table table-hover'>";

				let percentForDvlk = '<input type="range" class="form-range" id="percent" value="1" min="1" max="100" oninput="changePercent(' + "'" + sumByDay + "'" + ')"> <div id="currentPercent">1</div>';

				let bodyDeduct = "";
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN THU: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b id='sumMoneyOfAllStudent'>" + formatCurrency(sumByDay) + "</b></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>Từ " + $("#from").val() + " đến " + $("#to").val() + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + $("#dvlk option:selected").text() + "</span></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td>" + formatCurrency(sumByDay) + "</td>";
					bodyDeduct += "</tr>";
				
					bodyDeduct += "<tr>";
					bodyDeduct += "<td style='color:red;'><b><u>I. PHẦN CHI: </b></u></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td><b class='moneyForDvlk'>0</b></td>";
					bodyDeduct += "</tr>";
					
					//Chi 25
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:20px;'>chi </span><span class='percentForDvlk'>0</span> % theo hợp đồng</td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "<td></td>";
					bodyDeduct += "</tr>";
					
					bodyDeduct += "<tr>";
					bodyDeduct += "<td><span style='margin-left:40px;'>" + formatCurrency(sumByDay) + "</span></td>";
					bodyDeduct += "<td>x</td>";
					bodyDeduct += "<td class='percentForDvlk'>0</td>";
					bodyDeduct += "<td class='moneyForDvlk'>0</td>";
					bodyDeduct += "</tr>";
				
				$("#contentDeduct").html(percentForDvlk + tableDeduct + bodyDeduct  + "</table>"); 
				/************************************************************************/
				
				/************************************************************************/
				
				//formatCurrency(sumByDay)
				
			},
			complete: function(result) {
				/* hiện bảng xác nhận đã đồng ý quyết toán */
				let table1 = '<div class="box-header with-border"><table class="table table-bordered">';

				let body1 = '<tr>'+
								"<td><h5><b>Tổng số tiền đã đóng tại đơn vị liên kết: </b></h5></td>" +

								'<td>' + $("#sumMoneyOfAllStudent").text() + ' VND</td>' +

							'</tr>';

						
					body1 += '<tr>' +
									 
								'<td><label for="confirm">Xác nhận quyết toán: </label></td>' +
								
								'<td>' +

									'<form id="formConfirmAccounting" method="post">' +
									
									'<input id="idDvlkAcc" name="idDvlkAcc" type="hidden" value="' + $("#dvlk option:selected").val() + '">' +
									
									'<input id="nameDvlkAcc" name="nameDvlkAcc" type="hidden" value="' + $("#dvlk option:selected").text() + '">' +
									
									'<input id="idSemesterAcc" name="idSemesterAcc" type="hidden" value="' + $('#semester').val() + '">' +
									
									'<input id="semesterAcc" name="semesterAcc" type="hidden" value="' + $('#semester option:selected').text() + '">' +
																		
									'<input id="startDayAcc" name="startDayAcc" type="hidden" value="' + $("#from").val() + '">' +
									
									'<input id="endDayAcc" name="endDayAcc" type="hidden" value="' + $("#to").val() + '">' +
									
									'<input id="percentSave" name="percentSave" type="hidden" value="0" >' +
									
									'<input id="total" name="total" type="hidden" value="' + $("#sumMoneyOfAllStudent").text() + '" >' +
									
									'<input id="totalDiscount" name="total" type="hidden" >' +
								
									'</form>'+

									'<input type="submit" onclick="createAccountingBill(event)" value="Tạo" id="sentAccounting" class="btn btn-block btn-default"></input>'+

								'</td>' + 
							
							'</tr>';

				//sumAllStudentByDay
				//if(flag.length != 0)
				if(parseInt( $("#numberStudentHasFound").text() ) != 0)
					$("#buttonToCreateAccounting").css("display", "block").html(table1 + body1 + "</table></div>"); 
				else
					$("#buttonToCreateAccounting").css("display", "none");
				/************************************************************************/
				
				$("#tbDay").DataTable({
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
				$('#loading').modal('hide'); 
			}
		});
	});

	/*
		xem danh sách các phiếu quyết toán đã được gửi cho dvlk *
	*/
	$("#accountingHasSend").click(() => {
		$("#showListBill").css("display", "none").html("");

		$("#showListBill").css("display", "block").html("");
		$.ajax({
			url: "./lib/ajax/accounting/getAccountingNotConfirm.php",
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
					div +=		'<label class="box-title">Danh sách các phiếu đã gửi ĐVLK</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';

				let table = "<table id='tbList' class='table table-bordered'>";

				let	header = "<thead>";
					header += "<tr>";
					header += "<th>ID</th>";
					header += "<th>đơn vị liên kết</th>";
					header += "<th>Học kì</th>";
					header += "<th>Ngày tạo</th>";
					header += "<th>Tìm kiếm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Trạng thái</th>";
					header += "</tr>";
					header += "</thead>";
					
				let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += '<tr>';
					body += '<td>' + value[0] + '</td>'; // ID
					body += '<td>' + value[2] + '</td>'; // dvlk
					body += '<td>' + value[4] + '</td>'; // học kì
					body += '<td>' + value[5] + '</td>'; // ngày tạo phiếu
					body += '<td>' + value[6] + '</td>'; // ngày bắt đầu tìm kiếm
					body += '<td>' + value[7] + '</td>'; // ngày kết thúc tìm kiếm
					body += '<td>' + value[8] + '</td>'; // tình trạng của phiếu
					
					body += '</tr>';
				}
				//});

				body += "</tbody>";
				
				body += "</table></div>";

				$("#showListBill").html( div + table + header + body );
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
	
	/*
		xem danh sách các phiếu quyết toán đã tạo chưa được dvlk xác nhận *
	*/
	$("#accountingHasCreated").click(() => {
		$("#showCreateAccounting").css("display", "none");

		$("#showListBill").css("display", "block").html("");
		$.ajax({
			url: "./lib/ajax/accounting/getAccountinghasCreated.php",
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
					div +=		'<label class="box-title">Danh sách các phiếu đã được tạo</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';

				let table = "<table id='tbList' class='table table-bordered'>";

				let	header = "<thead>";
					header += "<tr>";
					header += "<th>ID</th>";
					header += "<th>đơn vị liên kết</th>";
					header += "<th>Học kì</th>";
					header += "<th>Ngày tạo</th>";
					header += "<th>Tìm kiếm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Trạng thái</th>";
					header += "<th>Xác nhận và gửi</th>";
					header += "<th>Xóa phiếu</th>";
					header += "<th>Chi tiết</th>";
					header += "</tr>";
					header += "</thead>";
					
				let body = "<tbody>";
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += '<tr>';
					body += '<td>' + value[0] + '</td>'; // ID
					body += '<td>' + value[2] + '</td>'; // dvlk
					body += '<td>' + value[4] + '</td>'; // hk
					body += '<td>' + value[5] + '</td>'; // ngày tạo
					body += '<td>' + value[6] + '</td>'; // ngày bắt đầu tìm kiếm
					body += '<td>' + value[7] + '</td>'; // ngày kết thúc tìm kiếm
					body += '<td>' + value[8] + '</td>'; // trạng thái của phiếu vừa tạo

					body += '<td><a href="javascript:confirmAndSentMail(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-success">'+
									'Gửi xác nhận <i class="fa fa-send"></i>'+
								'</button>'+
							'</a></td>';	
							
					body += '<td><a href="javascript:confirmDeleteAccounting(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-danger">'+
									'Xóa phiếu <i class="fa fa-trash"></i>'+
								'</button>'+
							'</a></td>';		

					body += '<td><a href="javascript:getStudentHasSaveByDvlk(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-info">'+
									'Xem chi tiết phiêu <i class="fa fa-file-excel-o"></i>'+
								'</button>'+
							'</a></td>';

					body += '</tr>';
				}
				//});

				body += "</tbody>";
				
				body += "</table></div>";

				$("#showListBill").html( div + table + header + body );
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
	
	/*
		Xem danh sách các phiếu quyết toán đã được kế toán và dvlk đồng ý *
	*/
	$("#accountingHasConfirm").click(() => {
		$("#showCreateAccounting").css("display", "none");

		$("#showListBill").css("display", "block").html("");
		$.ajax({
			url: "./lib/ajax/accounting/getAccountingBothConfirm.php",
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
					div +=		'<label class="box-title">Danh sách các phiếu đã được xác nhận</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';

				let table = "<table id='tbList' class='table table-bordered'>";

				let	header = "<thead>";
					header += "<tr>";
					header += "<th>ID</th>";
					header += "<th>đơn vị liên kết</th>";
					header += "<th>Học kì</th>";
					header += "<th>Ngày tạo</th>";
					header += "<th>Tìm kiếm từ ngày</th>";
					header += "<th>Đến ngày</th>";
					header += "<th>Trạng thái</th>";
					header += "<th>Đã quyết toán</th>";
					header += "<th>Xuất excel</th>";
					header += "</tr>";
					header += "</thead>";
					
				let body = "<tbody>";
				
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += '<tr>';
					body += '<td>' + value[0] + '</td>'; // ID
					body += '<td>' + value[2] + '</td>'; // dvlk
					body += '<td>' + value[4] + '</td>'; // học kì
					body += '<td>' + value[5] + '</td>'; // ngày tạo
					body += '<td>' + value[6] + '</td>'; // ngày bắt đầu tìm kiếm
					body += '<td>' + value[7] + '</td>'; // ngày kết thúc tìm kiếm
					body += '<td>' + value[8] + '</td>'; // tình trạng của phiêu

					body += '<td><a href="javascript:confirmHasAccounting(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-success">'+
									'Xác nhận <i class="fa fa-check-circle"></i>'+
								'</button>'+
							'</a></td>';	

					body += '<td><a href="javascript:exportExcel(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-info">'+
									'Excel <i class="fa fa-file-excel-o"></i>'+
								'</button>'+
							'</a></td>';	


					body += '</tr>';
				}
				//});

				body += "</tbody>";

				body += "</table></div>";

				$("#showListBill").html( div + table + header + body );
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});
	
		/*
		thống kê lịch sử quyết toán *
	*/
	$("#accountingHasDone").click(() => {

		$("#showCreateAccounting").css("display", "none");

		$("#showListBill").css("display", "block").html("");

		$.ajax({
			url: "./lib/ajax/accounting/getHistoryAccounting.php",
			data: {
				semester: $("#semester").val(),
				idDvlk: $("#dvlk").val()
			},
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				let div = 	'<div class="box-header with-border">';
					div +=		'<label class="box-title">Danh sách các phiếu đã được quyết toán</label>';
					div +=		'<div class="box-tools pull-right">';
					div +=			'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>';
					div +=		'</div>';
					div += 	'</div>';
					div +=	'<div class="box-body">';
	
				let table = "<table id='tbHistoryAccounting' class='table table-bordered'>";
		  
				let stt = 1;
		  
				let header = "<thead>";
					header += "<tr>";
					header += "<th>STT</th>";
					header += "<th>TÊN ĐƠN VỊ LIÊN KẾT</th>";
					header += "<th>NGÀY QUYẾT TOÁN</th>";
					header += "<th>NỘI DUNG</th>";
					header += "<th></th>";
					header += "<th></th>";
					header += "</tr>";
					header += "</thead>";

				let body = "<tbody>";
					//$.each(result['data'], (index, value) => {
					for(value of result['data']) {
						body += "<tr>";
						body += "<td>"  + stt++ + "</td>";
						body += "<td>"  + value[1] + "</td>"; // tên đvlk
						body += "<td>"  + value[2] + "</td>"; // ngày quyết toán
						body += "<td>"  + value[3] + "</td>"; //nội dung
						
						body += '<td><a href="javascript:seeStudentInHistory(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-success">'+
									'Xem lại phiếu <i class="fa fa-check-circle"></i>'+
								'</button>'+
							'</a></td>';	

						body += '<td><a href="javascript:exportExcel(' + "'" + value[0] + "'" + ')">'+
								'<button type="button" class="btn btn-block btn-info">'+
									'Excel <i class="fa fa-file-excel-o"></i>'+
								'</button>'+
							'</a></td>';	
						
						body += "</tr>";
					}
					//});
				body += "</tbody>";

				$("#showListBill").css("display", "block").html(div + table + header + body  + "</table></div>"); 
								
			},
			complete: function() {
				$('#loading').modal('hide'); 
			}
		});
	});

})();