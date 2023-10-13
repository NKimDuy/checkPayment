
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Danh sách lớp tại <?php echo $_SESSION['descriptMaDP'] ?></h1>
        <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="<?= $conf['rootUrl'] ?>index.php?p=get_class">Danh sách lớp</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                    <!-- Show table Class DVLk -->
                        <div class="box-header">
                            <div class="col-xs-12">
                                <div id='showClassDvlk' style="display:none;"></div>
                            </div>     
                        </div> 
                    <!-- /.Show table Class DVLk -->

                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->


