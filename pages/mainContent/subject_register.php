
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>Kết quả đăng kí môn học</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Kết quả đăng kí môn học</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <div id="main" class="box box-default">
            <div class="row">
                <div class="col-xs-12">

                <!-- CHỌN KẾT QUẢ ĐĂNG KÍ -->
                    <div class="box-header">

                        <div class="nav-tabs-custom">

                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#byCLass" data-toggle="tab" aria-expanded="true"><h4>THEO LỚP</h4></a></li>
                                <li class=""><a href="#bySubject" data-toggle="tab" aria-expanded="false"><h4>THEO MÔN HỌC</h4></a></li>
                            </ul>
                            
                            <div class="tab-content">

                                <!-- THEO LỚP -->
                                    <div class="active tab-pane" id="byCLass">

                                        <ul class="timeline">
                                            
                                            <li>
                                                <i class="fa fa-list-ul bg-blue"></i>

                                                <div id="showListClassInSemester" class="timeline-item"></div>

                                            </li>

                                            <li id="listStudentClass" style="display:none;">
                                            
                                                <i class="fa fa-users bg-yellow"></i>

                                                <div id="showListStudentRegister" class="timeline-item"></div>
                                            </li>

                                        </ul>

                                    
                                    </div>
                                <!-- /.THEO LỚP -->

                                <!-- THEO MÔN HỌC -->
                                    <div class="tab-pane" id="bySubject">

                                        <ul class="timeline">
                                            
                                            <li>
                                                <i class="fa fa-list-ul bg-blue"></i>

                                                <div id="showListSubjectsInDVLK" class="timeline-item"></div>

                                            </li>

                                            <li id="listStudentSub" style="display:none;">
                                            
                                                <i class="fa fa-users bg-yellow"></i>

                                                <div id="showListStudentBySubject" class="timeline-item"></div>
                                            </li>

                                        </ul>

                                    </div>
                                <!-- /.THEO MÔN HỌC -->
                                
                            </div>
                            

                        </div>

                    </div>
                <!-- /.CHỌN KẾT QUẢ ĐĂNG KÍ -->  
                

                </div>
            </div>
        </div>

    </section>
    <!-- /.Main content -->

