/*
	hiển thị hướng dẫn theo từng chức năng
*/
function getContentGuide(idGuide)
{
	$.ajax({
		url: "./lib/ajax/guide/getGuide.php",
		data: {
			'idGuide': idGuide
		},
		dataType: "JSON",
		success: function(result) {

			$("#tieuDe").html("");

			let content = ""

			let li = "";

			$.each(result['data'], (index, value) => {
				if (value[0] == idGuide) {
					content += value[2];
					li += "<li class='active' id='" + value[0] + "'><a href='javascript:getContentGuide(" + value[0].trim() + ")'>" + value[1] + "</a></li>";
				} else {
					li += "<li id='" + value[0] + "'><a href='javascript:getContentGuide(" + value[0].trim() + ")'>" + value[1] + "</a></li>";	
				}
					

			});
			
			$("#showContent").html(content);

			$("#tieuDe").html(li);

		}
	});
}



(function() {
	
	/*
		hiển thị hướng dẫn full
	*/
	$(window).load(() => {
		$.ajax({
			url: "./lib/ajax/guide/getGuide.php",
			dataType: "JSON",
			success: function(result) {

				let content = result['data'][7][2];
				
				let li = "";
				
				$.each(result['data'], (index, value) => {
					li += "<li id='" + value[0] + "'><a href='javascript:getContentGuide(" + value[0].trim() + ")'>" + value[1] + "</a></li>";
				});
				
				$("#tieuDe").html(li);

				$("#showContent").html(content);

			}
		});
		
	});
	
})();	