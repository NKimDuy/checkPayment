<?php

	include_once ("./db/config.php");
	global $conf;

	session_start();
	$checkLogin = $_SESSION['mail'];
	if (!isset($checkLogin)){

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Đăng nhập || CheckPayment</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- Font Awesome -->	
	<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">	
<!-- Font iconic -->	
	<link rel="stylesheet" type="text/css" href="bower_components/fonts/iconic/css/material-design-iconic-font.min.css">
<!-- Animate -->	
	<link rel="stylesheet" type="text/css" href="bower_components/animate/animate.css">
<!-- css-hamburgers -->	
	<link rel="stylesheet" type="text/css" href="bower_components/css-hamburgers/hamburgers.min.css">
<!-- Animsition -->	
	<link rel="stylesheet" type="text/css" href="bower_components/animsition/css/animsition.min.css">
<!-- Select2 -->	
	<link rel="stylesheet" type="text/css" href="bower_components/select2-login/select2.min.css">
<!-- Daterangepicker -->	
	<link rel="stylesheet" type="text/css" href="bower_components/daterangepicker/daterangepicker.css">
<!-- css -->	
	<link rel="stylesheet" type="text/css" href="dist/css/util.css">
	<link rel="stylesheet" type="text/css" href="dist/css/main.css">

</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-image: url('dist/img/login/background.jpg');">
			<div class="wrap-login100">
				<form method="POST" class="login100-form validate-form" id="loginForm">
					<span class="login100-form-logo">
						<img src="dist/img/login/logo.png" class="img-circle" style="display: block;">
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter mail">
						<input class="input100" type="text" name="mail" placeholder="mail" required id="mail">
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="pass" placeholder="Password" required id="password">
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>
					<!--
					<div class="contact100-form-checkbox">
						<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
						<label class="label-checkbox100" for="ckb1">
							Remember me
						</label>
						<div id="notification" style="color:red;"></div>
					</div>
					-->
					<div id="notification" style="color:red;"></div>
					<div class="container-login100-form-btn">
						<button type="submit" class="login100-form-btn">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
		
<!--===============================================================================================-->
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!--===============================================================================================-->
	<script src="bower_components/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="bower_components/bootstrap/js/popper.js"></script>
	<script src="bower_components/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="bower_components/select2-login/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="bower_components/daterangepicker/moment.min.js"></script>
	<script src="bower_components/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>
	<script src="js/general/__login.js"></script>

</body>
</html>
<?php

	}
	else
		//header("Location:/check/login.php"); 
		header("Location:" . $conf['rootUrl'] . "index.php"); 

?>