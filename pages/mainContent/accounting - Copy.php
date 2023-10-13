

<!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Quyết toán</h1>
        <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Quyết toán</a></li>
        </ol>
    </section>
<!-- /.Content Header (Page header) -->

<!-- Main content -->

	<div id="numberStudentHasFound" style="display:none;"></div> <!-- thẻ div sẽ hứng số lượng sinh viên tìm thấy, khi tìm kiếm theo ngày, đã lọc trùng trong csdl -->

    <section class="content">

        <div id="main" class="box box-body">
            <div class="row">
                <div class="col-xs-12">

				<!-- open php here -->
				<!-- chỉ có quyền kế toán và quyền admin mới hiện thông tin nhập thống kê -->
                <?php if($_SESSION['groupUser'] == "1" || $_SESSION['groupUser'] == "5" ) {?>
                <!-- Not DVLK -->

                    <!-- Select -->
                        <div class="box-header with-border">

                            <!-- Select Semester -->
                                <div class="col-xs-12 col-lg-6">
                                    <p><label>Học kì cần quyết toán</label></p>
                                    <select id="semester" class="form-control select2" aria-label="Default select example"></select>
                                </div>
                            <!-- /.Select Semester -->

                            <!-- Select DVLK -->
                                <div class="col-xs-12 col-lg-6">
                                    <p><label>Đơn vị liên kết</label></p>
                                    <select id="dvlk" class="form-control select2" aria-label="Default select example">
                                        <option value="none" selected>Chọn đơn vị liên kết</option>
                                        <?php foreach($_SESSION['dvlk'] as $item){ ?>
											<option value="<?php echo $item[0]; ?>"><?php echo $item[1]; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            <!-- /.Select DVLK -->

                        </div>
                    <!-- /.Select  -->

                    <!-- Pick Choice  -->
                        <div class="box-header with-border">

                            <!-- Button -->            
                                <div class="col-xs-12 col-lg-6" style="margin-bottom:5px;">
                                    <button id="doAcounting" class="btn btn-block btn-default btn-lg">TIẾN HÀNH QUYẾT TOÁN</button>
                                </div>
                                <div class="col-xs-12 col-lg-6" style="margin-bottom:5px;">
                                    <button id="seeBill" class="btn btn-block btn-default btn-lg">XEM PHIẾU QUYẾT TOÁN</button>
                                </div>
                            <!-- /.Button -->

                        </div>
                    <!-- /.Pick Choice -->

                    <!-- do Acounting -->
                        <div id="showDoAcounting" class="box-header with-border"  style="display:none;">
                            <div class="col-xs-12">

                                <!-- Pick time -->
                                    <p><label>Chọn khoảng thời gian:</label></p>

                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"> Từ ngày</i>
                                            </div>
                                            <input type="text" class="form-control pull-right" id="from" name="from">
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"> Đến ngày</i>
                                            </div>
                                            <input type="text" class="form-control pull-right" id="to" name="to">
                                        </div>
                                    </div>
                                <!-- /.Pick time -->

                                <!-- Button -->
                                    <div class="col-xs-12 col-lg-2" style="margin-bottom:5px;">
                                        <button id="seeStudentToAccounting" class="btn btn-block btn-default">Tạo phiếu quyết toán</button>
                                    </div>
                                <!-- /.Button -->

                            </div>
                            
                        </div>			  
                    <!-- /.do Acounting   -->

                    <!-- See Bill -->
                        <div id="showSeeBill" class="box-header with-border"  style="display:none;">
                            <div class="col-xs-12">
                                <p><label>Chọn trạng thái các phiếu quyết toán:</label></p>
                                <!-- Button -->
                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <button id="accountingHasCreated" class="btn btn-block btn-warning">Các phiếu đã Tạo <i class="fa fa-long-arrow-right"></i></button>
                                    </div>
                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <button id="accountingHasSend" class="btn btn-block btn-primary">Các phiếu đã Gửi <i class="fa fa-long-arrow-right"></i></button>
                                    </div>
                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <button id="accountingHasConfirm" class="btn btn-block btn-info">Các phiếu đã Xác nhận <i class="fa fa-long-arrow-right"></i></button>
                                    </div>
                                    <div class="col-xs-12 col-lg-3" style="margin-bottom:5px;">
                                        <button id="accountingHasDone" class="btn btn-block btn-success">Các phiếu đã Quyết toán <i class="fa fa-check"></i></button>
                                    </div>
                                <!-- /.Button -->

                            </div>
                            
                        </div>			  
                    <!-- /.See Bill   -->
                            
                    <!-- Show listBill -->                    
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id="showListBill" class="box box-primary box-solid" style="display:none;"></div>
                            </div>
                        </div>
                    <!-- /.Show listBill -->
                        
                    <!-- Show createAccounting -->
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id="showCreateAccounting" class="box box-primary box-solid" style="display:none;">

                                    <div class="box-header with-border">
                                        <label class="box-title">Chi tiết phiếu quyết toán</label>
                                    </div>

                                    <div class="box-body">
                                        
                                        <div class="col-xs-12 col-lg-6"><div id="buttonToCreateAccounting" class="box-header with-border"></div></div>

                                        <div class="col-xs-12 col-lg-12">
                                            
                                            <!-- Custom Tabs -->
                                            <div class="nav-tabs-custom">
                                                <ul class="nav nav-tabs">
                                                    <li class="active"><a href="#tab_1" data-toggle="tab">Danh sách đống tiền</a></li>
                                                    <li><a href="#tab_2" data-toggle="tab">Bảng quyết toán</a></li>
                                                </ul>
                                                <div class="tab-content">

                                                    <div class="tab-pane active" id="tab_1">
                                                        <div id='contentListStudent' class="box-body no-padding"></div>
                                                    </div>
                                                    <!-- /.tab-pane -->

                                                    <div class="tab-pane" id="tab_2">
                                                        <div id='contentDeduct' class="box-body no-padding" style="width:600px;"></div>
                                                    </div>
                                                    <!-- /.tab-pane -->

                                                </div>
                                                <!-- /.tab-content -->
                                            </div>
                                            <!-- nav-tabs-custom -->

                                        </div>
                                        <!-- /.col -->
                                        
                                    </div>     
                                </div> 
                            </div>
                        </div>
						
						<div id="duy"></div>
						<div id="sang"></div>
						
                    <!-- /.Show createAccounting -->    

                <!-- /.Not DVLK -->
				<?php } else if($_SESSION['groupUser'] == "2") { ?>
				
               <!-- close php here -->
				
                <!-- DVLK -->

                    <button id="seeBillAccounting" class="btn btn-block btn-default">Các phiếu đang chờ đơn vị liên kết xác nhận</button>                    
				
                    <!-- Show listBill -->                    
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id="showListBill" class="box box-primary box-solid" style="display:none;"></div>
                            </div>
                        </div>
                    <!-- /.Show listBill -->

                    <!-- Show SeeAccountingForDvlk -->
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id="showSeeAccountingForDvlk" class="box box-primary box-solid" style="display:none;">

                                    <div class="box-header with-border">
                                        <label class="box-title">Chi tiết phiếu quyết toán</label>
                                    </div>

                                    <div class="box-body">
                                        
                                        <div class="col-xs-12 col-lg-6"><div id="buttonToCreateAccounting" class="box-header with-border"></div></div>

                                        <div class="col-xs-12 col-lg-12">
                                            
                                            <!-- Custom Tabs -->
                                            <div class="nav-tabs-custom">
                                                <ul class="nav nav-tabs">
                                                    <li class="active"><a href="#tab_1" data-toggle="tab">Danh sách đống tiền</a></li>
                                                    <li><a href="#tab_2" data-toggle="tab">Bảng quyết toán</a></li>
                                                </ul>
                                                <div class="tab-content">

                                                    <div class="tab-pane active" id="tab_1">
                                                        <div id='contentListStudent' class="box-body no-padding"></div>
                                                    </div>
                                                    <!-- /.tab-pane -->

                                                    <div class="tab-pane" id="tab_2">
                                                        <div id='contentDeduct' class="box-body no-padding" style="width:600px;"></div>
                                                    </div>
                                                    <!-- /.tab-pane -->

                                                </div>
                                                <!-- /.tab-content -->
                                            </div>
                                            <!-- nav-tabs-custom -->

                                        </div>
                                        <!-- /.col -->
                                        
                                    </div>     
                                </div> 
                            </div>
                        </div>
                    <!-- /.Show SeeAccountingForDvlk -->    


                <!-- /.DVLK -->

				<?php } ?>
                
                <!-- Show Modal -->
                    <div class="modal fade" id="modal-dialog">
                        <div class="modal-dialogSubject">
                            <div id="dialog" class="modal-content" style="width:400px;"></div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                <!-- /.Show Modal -->
                           
				
				
				
                </div>
                
            </div>
        </div>

    </section>
	
	
	
<!-- /.Main content -->

