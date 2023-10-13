
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Danh sách sinh viên đầu vào</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="<?= $conf['rootUrl'] ?>index.php?p=get_class">Danh sách lớp</a></li>
            <li><a href="#">Danh sách sinh viên đầu vào</a></li>
            <li class="active"><?php echo $_GET['idClass'] ?></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                    <div class="box-header">
                        <div class="col-xs-12">

                            <!-- Show ListStudent -->
                                <div id='showListStudent' class="box box-primary"></div>
                            <!-- /.Show ListStudent -->

                        </div>     
                    </div> 
                
                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->


