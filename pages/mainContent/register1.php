
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

        <div id="main" class="box box-default">
            <div class="box-body">
                <div class="row">
                    <div class="col-xs-12">

                        <!-- SHOW FORM -->
                            <div class="box-header with-border">
                                <div class="box box-primary box-solid" id="showForm" style="display:none;"></div>
                                <div class="box box-solid">
                                    <div class="col-xs-4" id="showtbPermission" style="display:none;"></div>
                                    <div class="col-xs-4" id="showtbDvlk" style="display:none;"></div>
                                    <div class="col-xs-4" id="showtbAction" style="display:none;"></div>
                                </div>
                            </div>  
                        <!-- /. SHOW FORM -->

						 <!-- Show Modal -->
							<div class="modal fade" id="modal-dialog">
								<div class="modal-dialogSubject">
									<div id="dialog" class="modal-content" style="width:400px;"></div>
									<!-- /.modal-content -->
								</div>
								<!-- /.modal-dialog -->
							</div>
						<!-- /.Show Modal -->

                        <!-- Hiện dialog xác nhận -->
                            <!--<div id="dialog" style="display:none;"></div>-->
                        <!-- /. Hiện dialog xác nhận -->

                        <!-- SHOW TABLES -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li onclick="closeForm()" class=""><a href="#tab_1" data-toggle="tab" aria-expanded="true">TABLE PERMISSSION</a></li>
                                    <li onclick="closeForm()" class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">TABLES ACTION</a></li>
                                    <li onclick="closeForm()" class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">TABLES DVLK</a></li>
                                    <li onclick="closeForm()" class=""><a href="#tab_4" data-toggle="tab" aria-expanded="true">TABLES USER</a></li>
                                </ul>
                                <div class="tab-content">

                                <!-- PERMISSION -->    
                                    <div class="tab-pane" id="tab_1">                                        

                                        <!-- Table Permission -->                
                                            <div id="showtbPermissionEdit" class="box box-primary"></div>
                                        <!-- /. Table Permission -->                

                                    </div>
                                <!-- /. PERMISSION -->

                                <!-- ACTION -->
                                    <div class="tab-pane" id="tab_2">
                                        <!-- Table user -->                
                                            <div id="showtbActionEdit" class="box box-primary"></div>
                                        <!-- /. Table user -->                
                                    </div>
                                <!-- /. ACTION -->

                                <!-- DVLK -->
                                    <div class="tab-pane" id="tab_3">
                                        <!-- Table user -->                
                                            <div id="showtbDvlkEdit" class="box box-primary"></div>
                                        <!-- /. Table user -->                
                                    </div>
                                <!-- /. DVLK -->

                                <!-- USER -->
                                    <div class="tab-pane" id="tab_4">

                                        <!-- Reset Pasword -->
                                            <div class="box-header with-border">
                                                <div class="box box-primary box-solid" id="groupResetUserByAdmin" style="display:none;"></div>
                                            </div>  
                                        <!-- /. Reset Pasword -->

                                        <!-- Table user -->                
                                            <div id="showtbUser" class="box box-primary"></div>
                                        <!-- /. Table user -->      

                                    </div>
                                <!-- /. USER -->
                                
                            </div>
                        <!-- /. SHOW TABLES -->
                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->


