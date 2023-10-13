/* 
	lấy dữ liệu để tạo bảng excel cho quyết toán
*/
function getDataForExcelStatistical(dataStudent, dataDeduct) {
	var wb = XLSX.utils.book_new();
	wb.Props = {
		Title: "SheetJS Tutorial",
		Subject: "Test",
		Author: "Red Stapler",
		CreatedDate: new Date(2017,12,19)
	};

	wb.SheetNames.push("Sheet1");
	var ws_data = dataStudent;
	var ws = XLSX.utils.aoa_to_sheet(ws_data);
	wb.Sheets["Sheet1"] = ws;

	wb.SheetNames.push("Sheet2");
	var ws_data = dataDeduct;
	var ws = XLSX.utils.aoa_to_sheet(ws_data);
	wb.Sheets["Sheet2"] = ws;

	var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

	return wbout;

}

/*
	lấy dữ liệu để thống kê cho học liệu
*/
function getDataForExcelCourseWare(data) {
	var wb = XLSX.utils.book_new();
	wb.Props = {
		Title: "SheetJS Tutorial",
		Subject: "Test",
		Author: "Red Stapler",
		CreatedDate: new Date(2017,12,19)
	};

	wb.SheetNames.push("Sheet1");
	var ws_data = data;
	var ws = XLSX.utils.aoa_to_sheet(ws_data);
	wb.Sheets["Sheet1"] = ws;

	var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

	return wbout;

}

/* 
	cấu hình để tạo file excel 
*/
function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

/* 
	gửi mail 
*/
function sendEmail(subject, body, receiver) {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "theodoihocphi@oude.edu.vn", // mail mà anh đem đi gửi
		Password: "1TtDttx!", //mk của anh bảo mật thông
		//To: 'duy.nguyen2@oude.edu.vn', //mail nhận
		To: receiver,
		From: "theodoihocphi@oude.edu.vn",
		Subject: subject,
		Body: body,
	})
	.then(function (message) {
		$('#loading').modal('hide'); 
		alert("Đã xác nhận và gửi mail");
		location.reload();
	});
}