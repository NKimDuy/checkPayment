function logout() {
	$.ajax({
		url: "./lib/ajax/loginAndLogout/logout.php",
		dataType: "JSON",
		success: function(result) {
			//window.location= "/check/login.php";
			window.location = result + "login.php";
		}
	});
}