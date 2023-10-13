<section class="content-header">
    <h1>Thông tin 1 sinh viên</h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Thông tin 1 sinh viên</a></li>
    </ol>
</section>

    <!-- Main content -->
    <section class="content">

      <div class="row">

        <!-- SHOW INFO STUDENT -->
            <div class="col-md-4">

                <!-- Profile Image --><div id="showInfoStudent" class="box box-primary"></div>
                
            </div>
        <!-- /.SHOW INFO STUDENT -->


        <!-- SHOW TAB -->
            <div class="col-md-8">

                <div class="nav-tabs-custom">

                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#infoPayment" data-toggle="tab">DANH SÁCH PHIẾU NỘP TIỀN</a></li>
                        <li><a href="#subject" data-toggle="tab">MÔN HỌC SINH VIÊN ĐK TRONG HỌC KỲ</a></li>
                    </ul>

                    <div class="tab-content">

                        <!-- Show Payment Bill -->
                            <div class="active tab-pane" id="infoPayment">
                                <div id="showPaymentBill" class='box-body'></div>
                            </div>
                        <!-- /.Show Payment Bill -->

                        <!-- Show Subject -->
                            <div class="tab-pane" id="subject">
                                <div id="showSubjectsByStudent" class='box-body'></div>
                            </div>
                        <!-- /.Show Subject -->

                    </div>

                </div>

            </div>
        <!-- /.SHOW TAB -->
      </div>
      <!-- /.row -->

    </section>
    <!-- /.content -->