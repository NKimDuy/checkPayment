(function() {
	 
		//Trả về danh sách sinh viên của lớp
		$.ajax({
			url: "./lib/ajax/detailDvlk/getStudent.php",
			data: {
				idClass: (new URL(window.location)).searchParams.get("idClass")
			},
			dataType: "JSON",
			success: function(result) {

				var stt = 1;

				$("#showStudent").html(""); // xóa tất cả danh sách sinh viên cũ, để tạo danh sách sinh viên mới
				
				let div =	"<div class='box-header with-border'>" +
							"<div class='col-md-3'>" +
							"<button type='button' onclick='history.back()' class='btn btn-block btn-info'>XEM LỚP KHÁC</button>" + 
							"</div></div>" +
							"<div class='box-body'>";

				let table = "<table id='tbStudent' class='table table-hover'>";
		
				let header = "<thead>";
					header += "<tr>";
					header += "<th>STT</th>";
					header += "<th>Mã số sinh viên</th>";
					header += "<th>Họ</th>";
					header += "<th>Tên</th>";
					header += "<th>Ngày sinh</th>";
					header += "<th>giới tính</th>";
					header += "<th>Tên lớp</th>";
					header += "<th>Chi tiết</th>";
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

					body += '<td><a style="color:white;"' + 
									'href="' + result['url'] +'index.php?p=one_student&masv=' + value[0].trim() + '" >' + 
								'<button type="button" class="btn btn-block btn-info">'+
									'Xem <i class="fa  fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';

					body += "</tr>";
					stt += 1;
					});
				body += "</tbody>";
				
				$("#showListStudent").html(div + table + header + body  + "</table></div>"); 
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
			}
		});

})();
