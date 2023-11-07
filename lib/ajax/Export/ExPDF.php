<?php
require('../../../lib/tfpdf/tfpdf.php');

class PDF extends tFPDF
{

    

    function addHeader() 
    {
        $this->Cell(40, 6, 'BỘ GIÁO DỤC VÀ ĐÀO TẠO', 0, 0, 'L');
        $this->Cell(40, 6, 'CỘNG HÒA XÃ HỘI CHŨ NGHĨA VIỆT NAM', 0, 0 ,'R');
        $this->Ln();
        $this->Cell(40, 6, 'TRƯỜNG ĐẠI HỌC MỞ', 0, 0, 'L');
        $this->Cell(40, 6, 'Độc lập - Tự do - Hạnh phúc', 0, 0, 'R');
        $this->Ln();
        $this->Cell(40, 6, 'THÀNH PHỐ HỒ CHÍ MINH', 0, 0, 'L');
        $this->Ln();
        $this->Cell(0, 6, 'DANH SÁCH ĐÓNG HỌC PHÍ KHÓA 2022', 0, 0, 'C');
        $this->Ln();
        $this->Cell(0, 6, 'LỚP KINH TẾ LUẬT - ĐTTX', 0, 0, 'C');
        $this->Ln();
        $this->Cell(0, 6, 'TẠI TRUNG TÂM GIÁO DỤC THƯỜNG XUYÊN HUYỆN THỐT NỐT', 0, 0, 'C');
        $this->Ln();
        $this->Cell(0, 6, 'Từ ngày 01/04/2023 đến 31/07/2023', 0, 0, 'C');
        $this->Ln();
    }

    function addFooter() 
    {
        $this->Cell(0, 6, 'Số tiền bằng chữ: mười triệu không trăm lẻ năm ngàn', 0, 0, 'L');
        $this->Ln();
        $this->Cell(0, 6, 'Tp. Hồ Chí Minh, ngày 21 tháng 08 năm 2023', 0, 0, 'R');
        $this->Ln();
        $this->Cell(40, 6, 'P.HIỆU TRƯỞNG', 0, 0, 'L');
        $this->Cell(40, 6, 'TRƯỞNG PHÒNG TC-KT', 0, 0, 'C');
        $this->Cell(40, 6, 'NGƯỜI LẬP BẢNG', 0, 0 ,'R');
        $this->Ln(15);
        $this->Cell(40, 6, 'Lê Nguyễn Quốc Khang', 0, 0, 'L');
        $this->Cell(40, 6, 'Nguyễn Tấn Lượng', 0, 0, 'C');
        $this->Cell(40, 6, 'Nguyễn Thành Lộc', 0, 0 ,'R');
        $this->Ln();
    }

    // Load data
    function LoadData()
    {
        $data = [];
        $rows = 30;
        for ($i = 0 ; $i < $rows; $i++)
        {
            array_push($data, ['1,', '31930033TP', 'nguyen kim', 'duy', '3.600.000', '08/05/2023', 'thu hoc phi hoc ky 2', '']);
        }
        return $data;
    }

    // Simple table
    function BasicTable($data)
    {
        // Column headings
        $header = array('STT', 'MÃ SỐ SV', 'HỌ', 'TÊN', 'HỌC PHÍ ĐÃ THU', 'NGÀY ĐÓNG', 'NỘI DUNG', 'GHI CHÚ');
        // Header
        foreach($header as $col)
            $this->Cell(25,7,$col,1);
        $this->Ln();
        // Data
        foreach($data as $row)
        {
            foreach($row as $col)
                $this->Cell(25,6,$col,1);
            $this->Ln();
        }
    }
}

$pdf = new PDF('P','mm','A4');
// Data loading
$data = $pdf->LoadData();
$pdf->AddFont('DejaVu','','DejaVuSansCondensed.ttf',true);
$pdf->SetFont('DejaVu','',5);
$pdf->AddPage();

$pdf->addHeader();
$pdf->BasicTable($data);
$pdf->addFooter();
//echo ($pdf->GetPageHeight());
$pdf->Output();


?>