<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>
  <?php 
    if ($p == "") echo "checkPayment";
    elseif ( $p == "get_class") echo "checkPayment || Danh sách lớp";
    elseif ( $p == "list_student") echo "checkPayment || Danh sinh viên";
    elseif ($p == "search") echo "checkPayment || Tìm kiếm";
    elseif ( $p == "statistical") echo "checkPayment || Thống kê"; 
    elseif ( $p == "accounting") echo "checkPayment || Quyết toán"; 
    elseif ( $p == "course_ware") echo "checkPayment || Học liệu";
    elseif ( $p == "reset_password") echo "checkPayment || Đổi mật khẩu";
    elseif ( $p == "register") echo "checkPayment || Backend"; 
    elseif ( $p == "guide") echo "checkPayment || Hướng dẫn"; 
    else echo "checkPayment || Home" ; 
  ?>
</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
<!-- daterange picker -->
<link rel="stylesheet" href="bower_components/bootstrap-daterangepicker/daterangepicker.css">
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
<!-- iCheck for checkboxes and radio inputs -->
<link rel="stylesheet" href="plugins/iCheck/all.css">
<!-- Bootstrap Color Picker -->
<link rel="stylesheet" href="bower_components/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css">
<!-- Bootstrap time Picker -->
<link rel="stylesheet" href="plugins/timepicker/bootstrap-timepicker.min.css">
<!-- DataTables -->
<link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
<!-- Select2 -->
<link rel="stylesheet" href="bower_components/select2/dist/css/select2.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
    folder instead of downloading all of them to reduce the load.  -->
<link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
<!-- Google Font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

<style>
  .table-hover>thead {
    background: #337AB7;
    color: #fff;
  }

  .btn {
    border-radius: 25px;  
  }

  .modal-dialog1 {
    min-width: 200px;
    width: fit-content;
    margin: 150px auto;
    background: rgb(0 0 0 / 0%);
  }

  #Modal-1 {
    min-width: 500px;
    width: fit-content;
    margin: 150px auto;
    background: rgb(0 0 0 / 0%);
  }

  #Modal-3 {
    width: fit-content;
    margin:  auto;
    background: rgb(0 0 0 / 0%);
  }


select,
.select2-container { 
  width: 100% !important;
}



</style>
