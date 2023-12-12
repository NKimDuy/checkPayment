(function() {
	
	/*
		hiển thị thông tin cho Select
	*/
	$(window).load(() => {
		$.ajax({
			url: "./lib/ajax/getStatic/loadSelect.php",
			dataType: "JSON",
			success: function(result) {

				let optionSchoolyear = "";
				
				let optionSemester = "";

				let optionDVLK = "";

				if (result['dataSelect'] == null) {

					optionSchoolyear = "<option value='none' selected>Chọn năm học</option>";
				
					optionSemester = "<option value='none' selected>Chọn học kì</option>";

					optionDVLK = "<option value='none' selected>Chọn Đơn vị liên kết</option>";	
					
				} else {
					
					$.each(result['dataSelect'], (index, value) => {
	
						optionSchoolyear = "<option value='" + value[0] + "'selected>" + value[1] + "</option>";		
							
						optionSemester = "<option value='" + value[2] + "'selected>" + value[3] + "</option>";

						optionDVLK = "<option value='" + value[4] + "'selected>" + "("+ value[4] + ") " + value[5] + "</option>";
	
					});	


				}
				
				$.each(result['dataSemester'], (index, value) => {

					if (value[2] == 'schoolyear') {

						optionSchoolyear += "<option value='" + value[0] + "'>" + value[1] + "</option>";		
						
					} else {
						
						optionSemester += "<option value='" + value[0] + "'>" + value[1] + "</option>";

					}	

				});

				$.each(result['dataDVLK'], (index, value) => {

					optionDVLK += "<option value='" + value[0] + "'>" + "("+ value[0] + ") " + value[1] + "</option>";		

				});

				$("#selectDVLK").html(optionDVLK);
				
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