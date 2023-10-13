
    <!-- Main content -->
    <section class="content">
        <div id="main">

            <!-- LIST CHỨC NĂNG -->
                <div class="row">
                    
                    <div class="col-xs-2"></div>
                    <div class="col-xs-8">

                        <?php
                            if (in_array("get_class", $action) && in_array("list_student", $action)) { 
                        ?>
                        <!-- THÔNG TIN SINH VIÊN -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-aqua">
                                    <div class="inner">
                                        <h4><b>THÔNG TIN LỚP VÀ SINH VIÊN</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                    <i class="fa fa-user"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=get_class" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.THÔNG TIN SINH VIÊN -->
                        <?php } ?>

                        <?php
                            if (in_array("get_class", $action) && in_array("list_student", $action)) { 
                        ?>
                        <!-- KẾT QUẢ ĐĂNG KÍ MÔN HỌC -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-green">
                                    <div class="inner">
                                        <h4><b>KẾT QUẢ ĐĂNG KÍ MÔN HỌC</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                    <i class="fa fa-list-alt"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=subject_register" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.KẾT QUẢ ĐĂNG KÍ MÔN HỌC -->
                        <?php } ?>

                        <!-- THỐNG KÊ -->
                            <?php
                                if (in_array("revenue", $action)) { 
                            ?>
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-yellow">
                                    <div class="inner">
                                        <h4><b>DOANH THU</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa fa-bar-chart"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=revenue" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                            <?php } ?>
                        <!-- /.THỐNG KÊ -->

                        <?php
                            if (in_array("accounting", $action)) { 
                        ?>
                        <!-- QUYẾT TOÁN -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-red">
                                    <div class="inner">
                                        <h4><b>QUYẾT TOÁN</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa-credit-card"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=accounting" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.QUYẾT TOÁN -->
                        <?php } ?>

                        <?php
                            if (in_array("course_ware", $action)) { 
                        ?>
                        <!-- HỌC LIỆU -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-purple">
                                    <div class="inner">
                                        <h4><b>HỌC LIỆU</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa-book"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=course_ware" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.HỌC LIỆU -->
                        <?php } ?>

                        <?php
                            if (in_array("reset_password", $action)) { 
                        ?>
                        <!-- THAY ĐỔI MẬT KHẨU -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-primary">
                                    <div class="inner">
                                        <h4><b>THAY ĐỔI MẬT KHẨU</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa-key"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=reset_password" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.HỌC LIỆU -->
                        <?php } ?>
                        
                        <?php
                            if (in_array("guide", $action)) { 
                        ?>
                        <!-- HƯỚNG DẪN SỬ DỤNG -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-maroon">
                                    <div class="inner">
                                        <h4><b>HƯỚNG DẪN SỬ DỤNG</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa-file-video-o"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=guide" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.HƯỚNG DẪN SỬ DỤNG -->
                        <?php } ?>

                        <?php
                            if (in_array("register", $action)) { 
                        ?>
                        <!-- ADMIN -->
                            <div class="col-xs-12 col-md-6">
                                <!-- small box -->
                                <div class="small-box bg-gray ">
                                    <div class="inner">
                                        <h4><b>BACKEND</b></h4>

                                        <p><i class="fa fa-reception-0"></i></p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa fa-database"></i>
                                    </div>
                                    <a href="<?= $conf['rootUrl'] ?>index.php?p=register" class="small-box-footer">
                                    CHỌN <i class="fa fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        <!-- /.ADMIN -->
                        <?php } ?>

                    </div>
                    <div class="col-xs-2"></div>

                </div>
            <!-- /.LIST CHỨC NĂNG --> 
            
        </div>
    </section>
    <!-- /.Main content -->


