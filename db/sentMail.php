<?php

    function sentMail($arr_toMail, $ccMail, $contetn_Mail){ 
        require "PHPMailer-master/src/PHPMailer.php";  //nhúng thư viện vào để dùng, sửa lại đường dẫn cho đúng nếu bạn lưu vào chỗ khác
        require "PHPMailer-master/src/SMTP.php"; //nhúng thư viện vào để dùng
        require 'PHPMailer-master/src/Exception.php'; //nhúng thư viện vào để dùng

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);  //true: enables exceptions
        try {
            $mail->SMTPDebug = 0;  // 0,1,2: chế độ debug. khi mọi cấu hình đều tớt thì chỉnh lại 0 nhé
            $mail->isSMTP();  
            $mail->CharSet  = "utf-8";
            $mail->Host = 'smtp.gmail.com';  //SMTP servers
            $mail->SMTPAuth = true; // Enable authentication
            
            $nguoigui = 'theodoihocphi@oude.edu.vn'; //mặc định email của hệ thống
            $matkhau = '11111111';
            $tennguoigui = 'Trường Đại học Mở TPHCM';

            $mail->Username = $nguoigui; // SMTP username
            $mail->Password = $matkhau;   // SMTP password
            $mail->SMTPSecure = 'ssl';  // encryption TLS/SSL 
            $mail->Port = 465;  // port to connect to                
            $mail->setFrom($nguoigui, $tennguoigui ); 

            foreach($arr_toMail as $toMail) {
                $mail->addAddress($toMail); //mail người nhận  
            } 
            
            $mail->addCC($ccMail);

            $mail->isHTML(true);  // Set email format to HTML

            $mail->Subject = '[OU][TT ĐTTX]['. $_SESSION['MaDP'] .'] THÔNG BÁO TỪ HỆ THỐNG THEO DÕI HỌC PHÍ';      
            
            //$noidungthu = "<b>Chào bạn!</b><br>Chúc an lành!" ;

            $mail->Body = $contetn_Mail;
            
            $mail->smtpConnect( array(
                "ssl" => array(
                    "verify_peer" => false,
                    "verify_peer_name" => false,
                    "allow_self_signed" => true
                )
            ));

            $mail->send();

            return "Đã gửi mail thành công";

        } catch (Exception $e) {

            return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

        }

    }
?>