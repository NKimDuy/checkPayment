
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Doanh Thu</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Doanh Thu</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                <!-- CHỌN CHỨC KẾT QUẢ ĐĂNG KÍ -->
                    <div class="box-header">

                        <div class="callout callout-warning">
                            <h5><i class="icon fa fa-info-circle"></i><b> 
                                LƯU Ý <br><br>
                                <i>
                                - Chức năng này cần truy xuất một lượng dữ liệu lớn, hệ thống sẽ tốn thời gian để xử lý <br><br>
                                - Trong lúc hệ thống xử lý, người dùng vui lòng đợi đến khi kết thúc và không thoát hệ thống bất chợt <br><br>
                                Xin cảm ơn<br>
                                </i>                                   
                            </b></h5>
                        </div>  

                        <div class="col-xs-12" style="padding: 10px;">
                              <button id="getBill" type="button" class="btn btn-block btn-info">
                                    Xem doanh thu <i class="fa  fa-info-circle"></i>
                              </button>
                        </div>

                        <div id="resultRevenue" class="nav-tabs-custom" style="display:none;">

                            <ul class="nav nav-tabs">
                                <li id="getReDVLK" class=""><a href="#byDVLK" data-toggle="tab" aria-expanded="true"><h4>DOANH THU ĐƠN VỊ LIÊN KẾT</h4></a></li>
                                <li id="getReClass" class=""><a href="#byCLass" data-toggle="tab" aria-expanded="true"><h4>DOANH THU THEO LỚP</h4></a></li>
                                <li id="getReSubject" class=""><a href="#bySubject" data-toggle="tab" aria-expanded="false"><h4>DOANH THU THEO MÔN HỌC</h4></a></li>
                            </ul>
                            
                            <div class="tab-content">

                                <!-- /.TK THEO DVLK -->
                                    <div class="tab-pane" id="byDVLK">

                                        <div class='box-body'>

                                            <div id="showRevenueByDVLK" class='box-body'></div>
                                        
                                            <div id="showListStudent" class="col-xs-12"></div>

                                        </div>
                                    
                                    </div>
                                <!-- /.TK THEO DVLK -->

                                <!-- TK THEO LỚP -->
                                    <div class="tab-pane" id="byCLass">

                                        <div class='box-body'>

                                            <div id="showRevenueByClass" class='box-body'></div>
                                        
                                            <div id="showListStudentByClass" class="col-xs-12"></div>

                                        </div>
                                    
                                    </div>
                                <!-- /.TK THEO LỚP -->

                                <!-- /.TK THEO MÔN HỌC -->
                                    <div class="tab-pane" id="bySubject">

                                        <div class='box-body'>

                                            <div id="showRevenueBySubjects" class='box-body'></div>

                                            <div id="showListStudentBySubject" class="col-xs-12"></div>

                                        </div>

                                    </div>
                                <!-- /.TK THEO MÔN HỌC -->
                            </div>
                            <!-- /.tab-content -->

                        </div>

                    </div>
                <!-- /.CHỌN CHỨC KẾT QUẢ ĐĂNG KÍ -->  
                

                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->

