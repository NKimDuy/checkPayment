<?php
    require "PHPMailer-master/src/PHPMailer.php";  //nhúng thư viện vào để dùng, sửa lại đường dẫn cho đúng nếu bạn lưu vào chỗ khác
    require "PHPMailer-master/src/SMTP.php"; //nhúng thư viện vào để dùng
    require 'PHPMailer-master/src/Exception.php'; //nhúng thư viện vào để dùng
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);  //true: enables exceptions
    try {
        $mail->SMTPDebug = 2;  // 0,1,2: chế độ debug. khi mọi cấu hình đều tớt thì chỉnh lại 0 nhé
        $mail->isSMTP();  
        $mail->CharSet  = "utf-8";
        $mail->Host = 'smtp.gmail.com';  //SMTP servers
        $mail->SMTPAuth = true; // Enable authentication
        
    $nguoigui = 'sang.pham@oude.edu.vn';
    $matkhau = 'mapuz1226041995';

    $tennguoigui = 'Trường Đại học Mở TPHCM';
        $mail->Username = $nguoigui; // SMTP username
        $mail->Password = $matkhau;   // SMTP password
        $mail->SMTPSecure = 'ssl';  // encryption TLS/SSL 
        $mail->Port = 465;  // port to connect to                
        $mail->setFrom($nguoigui, $tennguoigui ); 

        $a = ["sang.pdp@ou.edu.vn","sangpham122604@gmail.com"];
        
        for ($i=0; $i < 2 ; $i++) { 
            $mail->addAddress($a[$i]);
        }
        //$mail->addAddress($to1);
        //$mail->addAddress($to2); //mail và tên người nhận  
        $mail->addCC('sangpham122604@gmail.com');
        $mail->isHTML(true);  // Set email format to HTML

        $mail->Subject = '[OU] [TT ĐTTX] THÔNG BÁO TỪ HỆ THỐNG THEO DÕI HỌC PHÍ';      
        
        $noidungthu = "<b>Chào bạn!</b><br>Chúc an lành!" ;

        $mail->Body = $noidungthu;
        
        $mail->smtpConnect( array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
                "allow_self_signed" => true
            )
        ));
        $mail->send();
        echo 'Đã gửi mail xong';
    } catch (Exception $e) {
        echo 'Mail không gửi được. Lỗi: ', $mail->ErrorInfo;
    }
?>