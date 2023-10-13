(function() {
	$("#loginForm").submit(function(e) {
		e.preventDefault();
		$.ajax({
			method: "POST",
			url:"./lib/ajax/loginAndLogout/validateLogin.php",
			data: {
				"mail": $("#mail").val(),
				"password": $("#password").val()
			},
			dataType: "json",
			success: function(result) {
				if (result == "failMail")
					$("#notification").html("Mail không chính xác");
				else if (result == "failPassword")
					$("#notification").html("Mật khẩu không chính xác");
				else {
					$("#notification").html("");
					window.location= result + "index.php";
				}
				
			}
		});
		
	});
})();