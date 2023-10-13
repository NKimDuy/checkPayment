<!-- Logo -->
<a href="<?= $conf['rootUrl']?>" class="logo">
  <!-- mini logo for sidebar mini 50x50 pixels -->
  <span class="logo-mini"><img src="dist/img/logo/logo-mini.png" class="img" alt="User Image"></span>
  <!-- logo for regular state and mobile devices -->
  <span class="logo-lg"><img src="dist/img/logo/logo-lg.png" class="img" alt="User Image"></span>
</a>

<!-- Header Navbar: style can be found in header.less -->
<nav class="navbar navbar-static-top">
  <!-- Sidebar toggle button-->
  <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
    <span class="sr-only">Toggle navigation</span>
  </a>

  <div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      <!-- User Account: style can be found in dropdown.less -->
      <li class="dropdown user user-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <img src="dist/img/avatar/ava_user.png" class="user-image" alt="User Image">
          <span class="hidden-xs"><?= $_SESSION['mail'];?></span>
        </a>
      </li>
      <!-- Logout -->
      <li>
        <a href="<?= $conf['rootUrl'] ?>index.php?p=reset_password"><i class="fa fa-key"></i></a>
      </li>
      <li>
        <a href="javascript:logout();"><i class="fa fa-sign-out"></i></a>
      </li>
    </ul>
  </div>
</nav>
