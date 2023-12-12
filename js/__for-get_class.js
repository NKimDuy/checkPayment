(function() {
	
	$(window).load(() => {
		$.ajax({
			url: "./lib/ajax/detailDvlk/getClass.php",
			dataType: "JSON",
			beforeSend: function() {
				$('#loading').modal({backdrop: false}); 
			},
			success: function(result) {
				
				$("#showClassDvlk").css("display", "block").html(""); // hủy bỏ danh sách cũ	  
		
				let div = "<div class='box-body'>" 
		
				let table = "<table id='tbGetClass' class='table table-hover' style='width:100%'>";
				
				let header = "<thead>";
					header += "<tr>";
					header += "<th>Mã lớp</th>";
					header += "<th>Tên lớp</th>";
					header += "<th>Hệ đào tạo</th>";
					header += "<th>Ngành</th>";
					header += "<th>Niên khóa</th>";
					header += "<th>Xem chi tiết</th>";
					header += "</tr>";
					header += "</thead>";
				  
				let body = "<tbody>";
				
				//$.each(result['data'], (index, value) => {
				for(value of result['data']) {
					body += "<tr>";
					body += "<td>"  + value['MaLop'] + "</td>"; // Mã lớp
					body += "<td>"  + value['TenLop'] + "</td>"; // Tên lớp
					body += "<td>"  + value['TenHe'] + "</td>";  // Hệ đào tạo
					body += "<td>"  + value['TenNgChng'] + "</td>"; // Ngành
					body += "<td>"  + value['NienKhoa'] + "</td>"; // Niên khóa
					body += '<td><a style="color:white;"' + 
									'href="' + result['rootUrl'] +'index.php?p=list_student&idClass=' + value['MaLop'].trim() + '"">' + 
								'<button type="button" class="btn btn-block btn-info">'+
									'Xem <i class="fa fa-info-circle"></i>'+
								'</button>'+
							'</a></td>';
					body += "</tr>";
				}
				//});
				
				body += "</tbody>";
				 
				$("#showClassDvlk").html(div + table + header + body + "</table></div>");
				
				$('#tbGetClass').DataTable({
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
	});
	
})();	