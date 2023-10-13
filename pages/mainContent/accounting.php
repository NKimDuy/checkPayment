<!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Quyết toán</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Quyết toán</a></li>
        </ol>
    </section>

<!-- Main content -->
    <section class="content">

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                <!-- CHỌN CHỨC NĂNG QUYẾT TOÁN -->
                    <div class="box-header">

                        <div class="nav-tabs-custom">

                            <ul class="nav nav-tabs">
                                <?php if($_SESSION['groupUser'] != "2") { ?>
                                <li class=""><a href="#byCreate" data-toggle="tab" aria-expanded="false"><h4>TẠO PHIẾU QUYẾT TOÁN</h4></a></li>
                                <li class=""><a href="#byListOU" data-toggle="tab" aria-expanded="true"><h4>DANH SÁCH PHIẾU QUYẾT TOÁN</h4></a></li> <!-- OU -->
								<?php }else { ?>
                                <li class=""><a href="#byListDVLK" data-toggle="tab" aria-expanded="false"><h4>DANH SÁCH PHIẾU QUYẾT TOÁN</h4></a></li><!-- DP -->
								<?php } ?>
                            </ul>
                            
                            <div class="tab-content">
                                <!-- TẠO PHIẾU QUYẾT TOÁN -->
                                    <div class="tab-pane" id="byCreate">

                                        <div class='box-body'>

                                            <!-- Pick time -->
                                                <div class="col-xs-12 col-lg-4" style="margin-bottom:5px;">
                                                    <div class="input-group">
                                                        <div class="input-group-addon">
                                                            <i class="fa fa-calendar"> Chọn thời gian QT</i>
                                                        </div>
                                                        <input type="text" class="form-control pull-right" id="selectDateRange" >
                                                    </div>
                                                </div>
                                            <!-- /.Pick time -->

                                            <!-- submit  -->
                                                <div class="col-xs-12 col-lg-3">
                                                    <button id="getDateRange" type="button" class="btn btn-block btn-info">
                                                            Chuẩn bị dữ liệu quyết toán <i class="fa  fa-info-circle"></i>
                                                    </button>
                                                </div>
                                            <!-- ./submit  -->

                                        </div>

                                        <div id="viewCreateDataAccounting" class='box-body' style="display:none;">

                                            <div class="box box-primary box-solid">

                                                <div class="box-header"><h3 class="box-title">THÔNG TIN TẠO PHIẾU QUYẾT TOÁN </h3></div>

                                                <div id="showCreateAccounting" class='box-body'></div>

                                                <div id="showCreateListClass" class='box-body'></div>

                                            </div>

                                        </div>
                                    
                                    </div>
                                <!-- /.TẠO PHIẾU QUYẾT TOÁN -->

                                <!-- DS PQT OU -->
                                    <div class="tab-pane" id="byListOU">

                                        <div class='box-body'>

                                            <div id="showListPQTbyOU" class="col-xs-12"></div>

                                        </div>

                                    </div>
                                <!-- /.DS PQT OU -->

                                <!-- DS PQT DVLK -->
                                    <div class="tab-pane" id="byListDVLK">

                                        <div class='box-body'>

                                            <div id="showListPQTbyDVLK" class="col-xs-12">DVLK</div>

                                        </div>

                                    </div>
                                <!-- /.DS PQT DVLK -->

                            </div>
                            <!-- /.tab-content -->

                        </div>

                    </div>
                <!-- /.CHỌN CHỨC KẾT QUẢ ĐĂNG KÍ -->  

                <!-- XEM PHIẾU QUYẾT TOÁN -->
                    <div id="viewDataAccounting" class='box-body' style="display:none;">

                        <div class="box box-primary box-solid">

                            <div id="headerData" class="box-header"></div>

                            <div id="showDataAccounting" class='box-body'></div>

                            <div id="showListClass" class='box-body'></div>

                        </div>

                    </div>
                <!-- XEM PHIẾU QUYẾT TOÁN  -->

                </div>
            </div>
        </div>

    </section>
<!-- /.Main content -->