<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
    <div class="pull-left image">
        <img src="dist/img/avatar/ava_user.png" class="img-circle" alt="User Image">
    </div>
    <div class="pull-left info">
        <p><i><?= $_SESSION['mail'];?></i></p>
        <a href="#"><i class="fa fa-circle text-success"></i><?= $_SESSION['full_name'];?></a>
    </div>
    </div>
    <!-- search form -->
    <form action="<?= $conf['rootUrl'] ?>index.php" method="get" class="sidebar-form" target="_blank">
        <div class="input-group">
            <input type="hidden" name="p" value="one_student">
            <input type="text" name="masv" class="form-control" placeholder="Nhập MSSV...">
            <span class="input-group-btn">
                <button class="btn btn-flat"><i class="fa fa-search"></i></button>
            </span>
        </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu" data-widget="tree">
        <li class="header">Chọn chức năng</li>
        
        <li <?php if ( $_SERVER['REQUEST_URI'] == $conf['rootUrl'] ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>">
            <i class="fa fa-dashboard"></i> <span>Home</span>
            </a>
        </li>

        <?php
            if (in_array("list_student", $action)) { 
        ?>
        <li <?php if ( $p=="get_class" || $p == "list_student" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=get_class">
            <i class="fa fa-user"></i> <span>Thông tin lớp và sinh viên</span>
            </a>
        </li>
		<?php } ?>

        <?php
            if (in_array("subject_register", $action)) { 
        ?>
        <li <?php if ( $p=="subject_register") { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=subject_register">
            <i class="fa fa-list-alt"></i> <span>Kết quả đăng kí môn học</span>
            </a>
        </li>
		<?php } ?>

        <?php
            if (in_array("revenue", $action)) { 
        ?>
        <li <?php if ( $p=="revenue" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=revenue">
            <i class="fa fa-bar-chart"></i> <span>Doanh Thu</span>
            </a>
        </li>
		<?php } ?>       

        <?php
            if (in_array("guide", $action)) { 
        ?>
        <li <?php if ( $p=="guide" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=guide">
            <i class="fa fa-file-video-o"></i> <span>Hướng dẫn sử dụng</span>
            </a>
        </li>
		<?php } ?>


		<?php
            if (in_array("statistical", $action)) { 
        ?>
        <li <?php if ( $p=="statistical" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=statistical">
            <i class="fa fa-bar-chart"></i> <span>Thống kê</span>
            </a>
        </li>
		<?php } ?>

		<?php
            if (in_array("accounting", $action)) { 
        ?>
        <li <?php if ( $p=="accounting" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=accounting">
            <i class="fa fa-credit-card"></i> <span>Quyết toán</span>
            </a>
        </li>
		<?php } ?>

		<?php
            if (in_array("course_ware", $action)) { 
        ?>
        <li <?php if ( $p=="course_ware" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=course_ware">
            <i class="fa fa fa-book"></i> <span>Học liệu</span>
            </a>
        </li>
		<?php } ?>
		
		<?php
            if (in_array("reset_password", $action)) { 
        ?>
        <li <?php if ( $p=="reset_password") { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=reset_password">
            <i class="fa fa-key"></i> <span>Thay đổi mật khẩu</span>
            </a>
        </li>
		<?php } ?>
		
		<?php
            if (in_array("register", $action)) { 
        ?>
        <li <?php if ( $p=="register" ) { echo 'class="active"'; } ?> >
            <a href="<?= $conf['rootUrl'] ?>index.php?p=register">
            <i class="fa fa-database"></i> <span>Backend</span>
            </a>
        </li>
		<?php } ?>
		
    </ul>
</section>
<!-- /.sidebar -->
