(function() {
	
	/*
		hiển thị thông tin cho Select
	*/
	$(window).load(() => {
		$.ajax({
			url: "./lib/ajax/getStatic/loadSelect.php",
			dataType: "JSON",
			success: function(result) {

				//Hiển thị thông tin lựa chọn ĐỊA PHƯƠNG

				let optionDVLK = "";

				if (result['resultDP'] == null) {

					optionDVLK = "<option value='All' selected>Chọn Đơn vị liên kết</option>";	
					
				} else {
					
					$.each(result['resultDP'], (index, value) => {

						optionDVLK = "<option value='" + value[0] + "'selected>" + "("+ value[0] + ") " + value[1] + "</option>";
	
					});	

				}

				$.each(result['selectDP'], (index, value) => {

					optionDVLK += "<option value='" + value[0] + "'>" + "("+ value[0] + ") " + value[1] + "</option>";		

				});

				$("#selectDVLK").html(optionDVLK);

				//Hiển thi thông tin lựa chọn HỌC KỲ

				let optionSchoolyear = "";
				
				let optionSemester = "";

				if (result['resultNHHK'] == null) {

					optionSchoolyear = "<option value='null' selected>Chọn năm học</option>";
				
					optionSemester = "<option value='null' selected>Chọn học kì</option>";
					
				} else {
					
					$.each(result['resultNHHK'], (index, value) => {
	
						optionSchoolyear = "<option value='" + value[0] + "'selected>" + value[1] + "</option>";		
							
						optionSemester = "<option value='" + value[2] + "'selected>" + value[3] + "</option>";
	
					});	

				}
				
				$.each(result['selcetNHHK'], (index, value) => {

					if (value[2] == 'schoolyear') {

						optionSchoolyear += "<option value='" + value[0] + "'>" + value[1] + "</option>";		
						
					} else if (value[2] == 'semester') {
						
						optionSemester += "<option value='" + value[0] + "'>" + value[1] + "</option>";

					}	

				});
				
				$("#selectSchoolyear").html(optionSchoolyear);

				$("#selectSemester").html(optionSemester);
			}
		});
		
	});
	
	/*
		lấy thông tin cho Select
	*/
	$("#getSelect").click(() => {
		$.ajax({
			url: "./lib/ajax/getStatic/getSelect.php",
			data: {
				madp: $("#selectDVLK").val(),
				nk: $("#selectSchoolyear").val(),
				hk: $("#selectSemester").val()
			},
			dataType: "JSON",
			success: function(result) {}
		});
	});

})();	