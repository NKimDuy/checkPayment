<!-- jQuery 3 -->
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- DataTables -->
<script src="bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.5/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/fixedheader/3.2.3/js/dataTables.fixedHeader.min.js"></script>
<!-- SlimScroll -->
<script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- InputMask -->
<script src="plugins/input-mask/jquery.inputmask.js"></script>
<script src="plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="plugins/input-mask/jquery.inputmask.extensions.js"></script>
<!-- date-range-picker -->
<script src="bower_components/moment/min/moment.min.js"></script>
<script src="bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- bootstrap datepicker -->
<script src="bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- bootstrap color picker -->
<script src="bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>
<!-- bootstrap time picker -->
<script src="plugins/timepicker/bootstrap-timepicker.min.js"></script>
<!-- SlimScroll -->
<script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- iCheck 1.0.1 -->
<script src="plugins/iCheck/icheck.min.js"></script>
<!-- FastClick -->
<script src="bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- Select2 -->
<script src="bower_components/select2/dist/js/select2.full.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<!-- js Plugins -->
<script src="dist/js/forPlugins.js"></script>
<script src="dist/js/accounting.js"></script> 

<!-- js checkPayment for Page-->

<?php if ( $p == "list_student" && in_array("list_student", $action)) : ?>
    <script src="js/forPage/__for-list_student.js"></script> <!-- js for list_student.php -->
<?php elseif( $p == "get_class" && in_array("get_class", $action) ) : ?>
    <script src="js/forPage/__for-get_class.js"></script> <!-- js for get_class.php -->
<?php elseif( $p == "one_student" && in_array("one_student", $action) ) : ?>
    <script src="js/forPage/__for-one_student.js"></script> <!-- js for one_student.php -->
<?php elseif( $p == "subject_register" && in_array("subject_register", $action) ) : ?>
    <script src="js/forPage/__for-subject_register.js"></script> <!-- js for subject_register.php -->
<?php elseif( $p == "revenue" && in_array("revenue", $action) ) : ?>
    <script src="js/forPage/__for-revenue.js"></script> <!-- js for revenue.php -->
<?php elseif( $p == "accounting" && in_array("accounting", $action) ) : ?>
    <script src="js/forPage/__for-accounting.js"></script> <!-- js for accounting.php -->
<?php elseif( $p == "guide" && in_array("guide", $action) ) : ?>
    <script src="js/forPage/__for-guide.js"></script> <!-- js for accounting.php -->
<?php endif; ?>

<!-- js checkPayment general-->
<script src="js/general/__getSelect.js"></script> <!-- js chọn học kì và đơn vị liên kết-->
<script src="js/general/__getOneStudent.js"></script> <!-- js for thông tin thuộc về 1 sinh viên -->
<script src="js/general/__logout.js"></script> <!-- js for đăng xuất tài khoản -->
<script src="js/general/__validate.js"></script> <!-- js for validate input -->


<script src="js/__forCourseWare.js"></script> <!-- js for accounting.php -->
<script src="js/__forExcelAndMail.js"></script> <!-- js for excel and mail -->
<script src="js/forPage/__for-register.js"></script> 


<script src="https://smtpjs.com/v3/smtp.js"></script>
<!-- SHEETJS -->
<script lang="javascript" src="./lib/sheetjs/dist/xlsx.full.min.js"></script>
<!-- FileSaver -->
<script lang="javascript" src="./lib/FileSaver/dist/FileSaver.min.js"></script>



