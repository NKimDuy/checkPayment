<section class="content-header">
      <!-- Select  -->
            <div class="box-header with-border">

                  <!-- Schoolyear  -->
                        <?php
                              if ($p != "accounting") { 
                        ?>
                              <div class="col-xs-12 col-md-3">
                                    <select id="selectSchoolyear" class="form-control select2" aria-label="Default select example"></select>
                              </div>
                        <?php } ?>
                  <!-- /.Schoolyear  -->

                  <!-- Semester  -->
                        <?php
                              if ($p != "accounting") { 
                        ?>
                        <div class="col-xs-12 col-md-3">
                              <select id="selectSemester" class="form-control select2" aria-label="Default select example"></select>
                        </div>
                        <?php } ?>
                  <!-- /.Semester  -->

                  <!-- Đơn vị liên kết  -->
                        <?php
                              if ($p != "one_student") { 
                        ?>
                              <div class="col-xs-12 col-md-3">
                                    <select id="selectDVLK" class="form-control select2" aria-label="Default select example"></select>
                              </div>
                        <?php } ?>
                  <!-- ./Đơn vị liên kết  -->
                  

                  <!-- submit  -->
                        <div class="col-xs-12 col-md-3">
                              <button id="getSelect" type="button" onClick="window.location.reload();" class="btn btn-block btn-info">
                                    Chọn  <i class="fa fa-check-circle"></i>
                              </button>
                        </div>
                  <!-- ./submit  -->

            </div>
      <!-- /.Select  -->
</section>