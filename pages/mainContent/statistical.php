
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

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                <!-- CHỌN CHỨC NĂNG THỐNG KÊ -->
                    <div class="box-header">

                        <div class="nav-tabs-custom">

                            <ul class="nav nav-tabs">
                                <li style="display:none;" id="staticByClass" class=""><a href="#byCLass" data-toggle="tab" aria-expanded="true"><h4>THỐNG KÊ THEO LỚP</h4></a></li>
                                <li id="staticBySubject" class=""><a href="#bySubject" data-toggle="tab" aria-expanded="false"><h4>THỐNG KÊ THEO MÔN HỌC</h4></a></li>
                                <li id="staticByTime" class=""><a href="#byTime" data-toggle="tab" aria-expanded="false"><h4>THỐNG KÊ THEO THỜI GIAN</h4></a></li>
                                <li id="staticByAccounting" class=""><a href="#byAccounting" data-toggle="tab" aria-expanded="false"><h4>LỊCH SỬ QUYẾT TOÁN</h4></a></li>
                            </ul>
                            
                            <div class="tab-content">
                                <div class="tab-pane" id="byCLass">
                                    <div class="callout callout-info" style="width:60%;">
                                        <h5><i class="icon fa fa-info-circle"></i><b>
                                        MÔ TẢ <br><br>
                                        <i>
                                        Chức năng trả về kết quả  đóng học phí tại đơn vị liên kết cụ thể theo từng lớp học.
                                        </i>                                   
                                        </b></h5>
                                    </div>                                
                                </div>
                                <!-- /.TK THEO LỚP -->
                                <div class="tab-pane" id="bySubject">
                                    <div class="callout callout-info" style="width:60%;">
                                        <h5><i class="icon fa fa-info-circle"></i><b> 
                                            MÔ TẢ <br><br>
                                            <i>
                                            Chức năng này giúp người dùng theo dõi: <br><br>
                                            - Danh sách sinh viên đóng học phí theo từng môn học <br><br>
                                            - Nhận biết số lượng sinh viên có đóng học phí nhưng không thuộc ĐVLK. <br><br>
                                            - Phân biệt sinh viên thuộc và không thuộc ĐVLK theo từng môn học.
                                            </i>                                   
                                        </b></h5>
                                    </div>                                
                                </div>
                                <!-- /.TK THEO MÔN HỌC -->
                                <div class="tab-pane" id="byTime">
                                    <div class="callout callout-info" style="width:60%;">
                                        <h5><i class="icon fa fa-info-circle"></i><b>
                                            MÔ TẢ <br><br>
                                            <i>
                                            Chức năng này giúp người dùng theo dõi tình hình đóng học phí theo khoảng thời gian cố định, cụ thể:<br><br>
                                            - Số lượng sinh viên đóng học phí.<br><br>
                                            - Số tiền và thời gian đóng học phí của sinh viên.
                                            </i>
                                        </b></h5>
                                    </div>    
                                </div>
                                <!-- /.TK THEO THỜI GIAN -->
                                <div class="tab-pane" id="byAccounting">
                                    <div class="callout callout-info" style="width:60%;">
                                        <h5><i class="icon fa fa-info-circle"></i><b>
                                            MÔ TẢ <br><br>
                                            <i>
                                            Chức năng này giúp người dùng theo dõi lịch sử quyết toán giữa trường và các ĐVLK                                            
                                            </i>
                                        </b></h5>
                                    </div>    
                                </div>
                                <!-- /.LS QUYẾT TOÁN -->
                            </div>
                            <!-- /.tab-content -->

                        </div>

                    </div>
                <!-- /.CHỌN CHỨC NĂNG THỐNG KÊ -->  
                
                
                <!-- BẢNG KẾT QUẢ THỐNG KÊ -->
                    <div id="static" class="box-body" style="display:none;">    
                        <div class="col-xs-12">

                            <div class="box box-primary box-solid">

                                <!-- Tên bảng thống kê -->
                                <div class="box-header with-border" style="text-align:center;">
                                    <label id="titleStatic" class="box-title"></label>
                                </div>
                                <!-- /. Tên bảng thống kê -->


                                <div class="box-body">
                                    
                                    <!-- FORM -->

                                        <!-- Select -->
                                            <div id="select" class="box-body" style="display:none;">

                                                <!-- Select Semester -->
                                                    <div class="col-xs-12 col-lg-6">
                                                        <select id="semester" class="form-control select2" aria-label="Default select example"></select>
                                                    </div>
                                                <!-- /.Select Semester -->

                                                <!-- Select DVLK -->
                                                    <div class="col-xs-12 col-lg-6">
                                                        <select id="dvlk" class="form-control select2" aria-label="Default select example">
                                                            <option value="none" selected>Chọn đơn vị liên kết</option>
                                                            <?php foreach($_SESSION['dvlk'] as $item){ ?>
                                                                <option value="<?php echo $item[0]; ?>"><?php echo $item[1]; ?></option>
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                <!-- /.Select DVLK -->

                                            </div>
                                        <!-- Select -->

                                        <!-- Select Time -->
                                            <div id="pickTime" class="box-body" style="display:none;">
                                                                
                                                    <div class="col-xs-12 col-lg-6">
                                                        <div class="input-group">
                                                            <div class="input-group-addon">
                                                                <i class="fa fa-calendar"> Từ ngày</i>
                                                            </div>
                                                            <input type="text" class="form-control pull-right" id="from" name="from">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-12 col-lg-6">
                                                        <div class="input-group">
                                                            <div class="input-group-addon">
                                                                <i class="fa fa-calendar"> Đến ngày</i>
                                                            </div>
                                                            <input type="text" class="form-control pull-right" id="to" name="to">
                                                        </div>
                                                    </div>

                                            </div>			                      
                                        <!-- /.Select Time -->

                                        <!-- Button -->
                                        <div class="box-body">
                                            <div class="col-xs-12 col-lg-12">
                                                <button class="btn btn-block btn-info getResult" style="display:none;">XEM KẾT QUẢ THỐNG KÊ</button>
                                            </div>
                                        </div>                        
                                        <!-- /.Button -->

                                    <!-- /.FORM  -->

                                    <!-- Show statistical -->
                                        <div class="box-body">

                                            <div class="col-xs-12">
                                                <div class="showstatistical" style="display:none;"></div>
                                            </div>

                                        </div>
                                    <!-- /.Show statistical -->   

                                
                                </div>

                            </div>  
                        </div>  
                    </div>
                <!-- /. BẢNG KẾT QUẢ THỐNG KÊ -->


                <!-- Show Modal -->
                    <div class="modal fade" id="modal-dialog">
                        <div class="modal-dialog">
                            <div class="modal-content" style="width:800px;">
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
                <!-- /.Show Modal -->

                <!-- Show Modal 2 -->
                    <div class="modal fade" id="modal-dialog2">
                        <div class="modal-dialog">
                            <div class="modal-content" style="width:400px;">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Thông tin chi tiết</h4>
                                </div>
                                <div id="dialog2" class="modal-body"></div> 
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog2 -->
                    </div>
                <!-- /.Show Modal2 -->

                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->

