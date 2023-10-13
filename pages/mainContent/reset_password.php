<!-- form đăng kí mới action -->
<section class="content">
  <div class="row" style="justify-content: center;" >
    <div class="col-xs-12">

      <div class="box box-primary">
        <div class="box-header with-border">
        <h3 class="box-title">Reset password</h3>
      </div>

      <div class="box-body" id="showAdd">
            <form method="post" id="formResetPassword">
              <div class="box-body">
                <div class="form-group">
                  <label>Mật khẩu cũ</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-font"></i></div>
                    <input type="password" class="form-control" id="oldPassword" name="oldPassword" placeholder="Nhập mật khẩu cũ"> <!-- 0 -->
                    <span id="erorrOldPassword" style="color:red;"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Mật khẩu mơi</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa  fa-user"></i></div>
                    <input type="password" class="form-control" id="newPasswordByUser" name="newPasswordByUser" placeholder="Nhập mật khẩu mới"> <!-- 1 -->    
                    <span id="erorrNewPasswordbyUser" style="color:red;"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Nhập lại mật khẩu</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa  fa-user"></i></div>
                    <input type="password" class="form-control" id="confirmPasswordByUser" name="confirmPasswordByUser" placeholder="Nhập lại mật khẩu"> <!-- 2 -->                  
                    <span id="erorrConfirmPasswordByUser" style="color:red;"></span>
                  </div>
                </div>
              <!-- /.box-body -->
              <div class="col-xs-12" style="margin-top: 15px;">
                <input type="hidden" id="statusReset" name="statusReset" value="user" /> <!-- 3 -->   
                <input type="submit" class="btn btn-block btn-primary btn-lg" value="Reset" id="resetPassword">
              </div>
            </form>
      </div>
      <!-- /.box-body -->
    </div>
    <!-- /.col -->
  </div>
  <!-- /.row -->
</section>
