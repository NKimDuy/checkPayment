

	<!-- Show Modal -->
		<div class="modal fade" id="modal-dialog">
			<div class="modal-dialogSubject">
				<div id="dialog" class="modal-content" style="width:400px;"></div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
	<!-- /.Show Modal -->


    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Đại học Mở thành phố Hồ Chí Minh</h1>
        <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Danh sách lớp</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
	
        <div id="main" class="box box-body">
            <div class="row">
                <div class="col-xs-12">
                
                    <!-- Pick Choice -->
                        <div class="box-header with-border">

                            <!-- Select Semester -->
                                <div class="col-xs-12 col-lg-3">
                                    <select id="semester" class="form-control select2" aria-label="Default select example"></select>
                                </div>
                            <!-- /.Select Semester -->

                            <!-- Select DVLK -->
                                <div class="col-xs-12 col-lg-3">
                                    <select id="dvlk" class="form-control select2" aria-label="Default select example">
                                        <option value="none" selected>Chọn đơn vị liên kết</option>
                                        <?php foreach($_SESSION['dvlk'] as $item){ ?>
                                        <option value="<?php echo $item[0]; ?>"><?php echo $item[1]; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            <!-- /.Select DVLK -->

                            <!-- Button -->            
                                <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                    <button id="seeReceipt" class="btn btn-block btn-danger">DSSV chưa nhận sách <i class="fa fa-times-circle"></i></button>
                                </div>
                                <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                    <button id="seeReceiptHasReceiveBook" class="btn btn-block btn-success">DSSV đã nhận sách <i class="fa fa-check-circle"></i></button>
                                </div>
                            <!-- /.Button -->


                        </div>
                    <!-- /.Pick Choice  -->

                   <!-- start php here -->
				   <!-- dvlk có group_user là 2, nên sẽ không được phép tạo phiếu quyết toán -->
				   <?php if($_SESSION['groupUser'] != "2") { ?>
                    <!-- Cô Phước  -->
                        <div class="box-header with-border">

                            <!-- Time  -->     
                                <!-- From date -->    
                                    <div class="col-xs-12 col-lg-3">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"> Từ ngày</i>
                                            </div>
                                            <input type="text" class="form-control pull-right" id="from" name="from">
                                        </div>                                    
                                    </div>
                                <!-- /.From date -->

                                <!-- TO date -->
                                    <div class="col-xs-12 col-lg-3">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"> Đến ngày</i>
                                            </div>
                                            <input type="text" class="form-control pull-right" id="to" name="to" >
                                        </div>
                                    </div>
                                <!-- /.TO date -->
                            <!-- /.Time -->

                            <!-- Button -->            
                                <div class="col-xs-12 col-lg-2" style="margin-bottom:5px;">
                                    <button id="seeStudent" class="btn btn-block btn-default">Xem <i class="fa fa-file-text-o"></i></button>
                                </div>
                            <!-- /.Button -->

                        </div>
                    <!-- /.Cô Phước -->
					<?php } ?>
                    <!-- end php here -->


                    <!-- Show showReceipt -->
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id="showReceipt" class="box box-primary box-solid" style="display:none;"></div>
                            </div>
                        </div>
                    <!-- /.Show showReceipt -->

                    <!-- Show table -->
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id='showStatisticalByReceiveBook' class="box box-primary" style="display:none;"></div>
                            </div>     
                        </div> 
                    <!-- /.Show table -->

                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->


