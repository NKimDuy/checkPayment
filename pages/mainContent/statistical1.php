<?php
	include_once ("./db/config.php");
	
	global $conf;

	session_start();
	 
	$checkLogin = $_SESSION['full_name']; // kiểm tra nếu đăng nhập thành công, và cố tồn tại session full name
	
	if (isset($checkLogin)){
?>
<!DOCTYPE html>
<html>
  <head>
    <?php include_once "pages/head.php"?>
    <style>
    .modal-dialog {
      width: fit-content;
      margin: 100px auto;
      background: rgb(0 0 0 / 0%);
      min-width: 700px;
    }
    </style>
  </head>

  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
		
      <header class="main-header"><?php include_once "pages/header.php"?></header>

      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar"><?php include_once "pages/aside.php"?></aside>
		
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>Thống kê</h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Thống kê</a></li>
          </ol>
        </section>

        <!-- Main content -->
        <section class="content">
		
		<!-- Show Search, hiện thanh tìm kiếm, cho phép tìm kiếm sinh viên -->
		<div id="search-div" class="box box-default" style="display:none;">
			<div class="box-header">
				<div class="col-xs-12">
					<!--------------------------------------------------->
					<div id="getStudentBySearch" class="box box-primary" ></div> <!-- chứa thông tin của sinh viên khi tìm trên thanh search -->
					<!--------------------------------------------------->
				</div>     
			</div>
			<!-- show dialog các môn học tương ứng với các phiếu đóng tiền của sinh viên khi thực hiện chức năng tìm kiếm-->
			<div class="modal fade" id="modal-dialog1">
			  <div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Thông tin sinh viên</h4>
				  </div>
				  <!-------------------------------------------------------->
				 
				  <div id="getSubjectBySearch" class="modal-body"></div> <!-- chứa thông tin môn học tương ứng với các phiếu đóng tiền của sinh viên (khi thực hiện chức năng search)-->
				  <!-------------------------------------------------------->
				  
				  <div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
				  </div>
				</div>
				<!-- /.modal-content -->
			  </div>
			  <!-- /.modal-dialog -->
			</div>
			<!-- /.modal -->
		</div>

		<div id="main" class="box box-default">
              
            <div class="box-header with-border">
              <div class="row"> <!-- giao diện chọn học kì và đơn vị liên kết -->
                <div class="col-xs-12">
                  <div class="col-xs-6">
                    <p><label>Học kì cần thống kê</label></p>
                    <select id="semester" class="form-control select2" aria-label="Default select example">
                      <option value="none" selected>Chọn học kì</option>
                      <?php foreach($conf['semester'] as $key => $value) { ?>
                        <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                      <?php } ?>
                    </select>
                  </div>
                  <!-- /.form-group -->

                  <div class="col-xs-6">
                    <p><label>Đơn vị liên kết</label></p>
                    <select id="dvlk" class="form-control select2" aria-label="Default select example">
                      <option value="none" selected>Chọn đơn vị liên kết</option>
                      <?php foreach($_SESSION['name_action'] as $item){ 
                        if (in_array($item[0], ['create_user', 'statistical']))
                          continue;
                      ?>
                      <option value="<?php echo $item[0]; ?>"><?php echo $item[1]; ?></option>
                      <?php } ?>
                    </select>
                  </div>
                  <!-- /.form-group -->
                </div>
                <!-- /.col -->
                  
                <div class="col-xs-12" style="margin-top:15px;"><div class="col-md-6"><label>Chọn chức năng thống kê</label></div></div>
                <div class="col-xs-12" style="margin-top:15px;">
                  <div class="col-xs-4">
                    <button id="showStatisticalByDvlk" class="btn btn-block btn-primary btn-lg">Theo lớp</button>
                  </div>  
                  <div class="col-xs-4">
                    <button id="showStatisticalBySubject" class="btn btn-block btn-info btn-lg">Theo môn học</button>
                  </div>  
                  <div class="col-xs-4">
                    <button id="showStatisticalByDay" class="btn btn-block btn-default btn-lg">Theo ngày</button>
                  </div>  
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- /.box-header -->

              <!-- pick time chọn khung thời gian để tiến hành tìm kiếm -->            
              <div id="showDay" class="box-header" style="display:none;">
                <div class="col-xs-12">
                  <p><label>Chọn khoản thời gian:</label></p>
                  <div class="col-xs-4">
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"> From</i>
                      </div>
                      <input type="text" class="form-control pull-right" id="from" name="from">
                    </div>
                  </div>
                  <div class="col-xs-4">
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"> To</i>
                      </div>
                      <input type="text" class="form-control pull-right" id="to" name="to">
                    </div>
                  </div>
                  <div class="col-xs-2">
                    <button id="seeStatisticalByDay" class="btn btn-block btn-default">Học phí</button>
                  </div>
                  <div class="col-xs-2">
                    <button id="showStatisticalByRegister" class="btn btn-block btn-default">Đăng kí môn học</button>
                  </div>
                </div>
              </div>			  
			  
            <!-- Show Thông kê theo môn học --> 
            <div class="box-header">
			
				<!---------------------------------------------------------->
				<div id="sumAllSubject" class="box box-body" style="display:none;"></div> <!-- tổng tiền của tất cả môn học --> 
				<!---------------------------------------------------------->
				
				<!---------------------------------------------------------->
				<!-- hiện thanh quá trình -->
				<div id="progress1" class="progress progress-sm active" style="display:none;" >
					<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 99%"></div>
				</div>
				<!---------------------------------------------------------->
				
				<div class="col-xs-12">
					<div class="col-xs-5" style="border-right: 3px solid black;" >
						<div id="content-subject" class="box box-primary" style="display:none;"></div> 
					</div>
					<div class="col-xs-7">
						<div id="dialogClassByGroup" class="box box-primary" style="display:none;"></div>
					</div>
				</div>     
            </div>   

            <!-- Show Thống kê còn lại -->             
            <div class="box-header">
				<div class="col-xs-12">
				
					<!---------------------------------------------------------->
					<div id="sumAllStudentByDay" class="box box-body" style="display:none;"></div> <!-- tổng tiền của tất cả sinh viên, thống kê theo ngày --> 
					<!---------------------------------------------------------->
					
					<!---------------------------------------------------------->
					<div id="sumAllDvlk" class="box box-body" style="display:none;"></div> <!-- tổng số tiền của dvlk (thống kê theo đơn vị liên kết) -->
					<!---------------------------------------------------------->
					
					<div id="content" class="box box-primary" style="display:none;"></div> 
				</div>     
            </div>       
  
            <!-- show dialog -->
            <div class="modal fade" id="modal-dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Thông tin chi tiết</h4>
                  </div>
                  <div id="dialog" class="modal-body"></div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
			<!---------------------------------------------------------->
			
        </div>
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->
      
      <footer class="main-footer"><?php include_once "pages/footer.php"?></footer>

    <!-- Javascript  --> 
      <?php include_once "pages/script.php"?>
      
	<script src="./js/forStatistical.js"></script> 
	<script src="./js/accounting.js"></script> 
	<script src="js/forLogout.js"></script>
	</body>
</html>
<?php
	}
	else
		header("Location:" . $conf['rootUrl'] . "login.php"); // nếu không đăng nhập, sẽ chuyển sang giao diện đăng nhập
?>