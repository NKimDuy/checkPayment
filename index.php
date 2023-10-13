<?php
	session_start();
	
	include_once ("./db/config.php");
	
	global $conf;

	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) 
	{
		// last request was more than 30 minutes ago
		session_unset();     // unset $_SESSION variable for the run-time 
		
		session_destroy();   // destroy session data in storage
	}
	$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp

	$p = $_GET['p']; // lấy tên view tương ứng
	
	$checkLogin = $_SESSION['mail']; // kiểm tra nếu đăng nhập thành công, và cố tồn tại session full name

	if (isset($checkLogin)){
		
		$action = [];
		
		foreach($_SESSION['action'] as $act)
	
			array_push($action, $act[0]);
		
?>
<!DOCTYPE html>
<html>
  <!-- Head -->
  <head><?php include_once "pages/general/head.php"?></head>

  <!-- Body -->
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">

      <!-- Header -->
      <header class="main-header"><?php include_once "pages/general/header.php"?></header>

      <!-- Menu -->
      <aside class="main-sidebar"><?php include_once "pages/general/aside.php"?></aside>

      <!-- Page content -->
        <div class="content-wrapper">

          <!-- Show Modal -->
            <?php include_once "pages/general/modals.php"?>
          <!-- /.Show Modal -->
          
          <!-- Select -->
          <?php 
            if ( $p != "reset_password" && $p != "register" && $p != "guide" && $p != "list_student") include_once "pages/general/select.php"; 
          ?>
          <!-- /.Select -->

          <?php 
            if ( $p == "list_student" && in_array("list_student", $action)) include_once "pages/mainContent/list_student.php"; 
            elseif ( $p == "search" && in_array("search", $action)) include_once "pages/mainContent/search.php"; 
            elseif ( $p == "one_student" && in_array("one_student", $action)) include_once "pages/mainContent/one_student.php"; 
            elseif ( $p == "revenue" && in_array("revenue", $action)) include_once "pages/mainContent/revenue.php"; 
            elseif ( $p == "accounting" && in_array("accounting", $action)) include_once "pages/mainContent/accounting.php"; 
            elseif ( $p == "course_ware" && in_array("course_ware", $action)) include_once "pages/mainContent/course_ware.php"; 
            elseif ( $p == "get_class" && in_array("get_class", $action)) include_once "pages/mainContent/get_class.php"; 
            elseif ( $p == "reset_password" && in_array("reset_password", $action)) include_once "pages/mainContent/reset_password.php"; 
            elseif ( $p == "register" && in_array("register", $action)) include_once "pages/mainContent/register.php"; 
            elseif ( $p == "guide" && in_array("guide", $action)) include_once "pages/mainContent/guide.php"; 
            elseif ( $p == "subject_register" && in_array("guide", $action)) include_once "pages/mainContent/subject_register.php"; 
            else include_once "pages/mainContent/listMethods.php"; 
          ?>
          
          <div id="dialogConfirmAction" style="display:none;"></div>

        </div>
	  
      <!-- /.Page content -->
      
      <footer class="main-footer"><?php include_once "pages/general/footer.php"?></footer>

      <!-- Javascript  --> 
      <?php include_once "pages/general/script.php"?>
      
    </div>
  </body>
</html>
<?php
	}
	else
		header("Location:" . $conf['rootUrl'] . "login.php"); // nếu không đăng nhập, sẽ chuyển sang giao diện đăng nhập
?>