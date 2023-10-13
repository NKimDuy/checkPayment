function validateSqlInjection(error, input) {
	let rexg = /SELECT|select|FROM|from|WHERE|where|JOIN|join|DROP|drop|DELETE|delete|INSERT|insert|UPDATE|update|SET|set|ORDER|order|ROOT|root/g;
	
	if(!rexg.test(input)) {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text("Nhập thông tin không hợp lệ !!!");
		return false;
	}
}

function validateMail(error, input) {
	let rexg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	if(rexg.test(input)) {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text("Mail không hợp lệ !!!");
		return false;
	}
}

function validateSelectGroupUser(error, input) {
	if(input != "0") {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text("Chưa chọn group User!!!");
		return false;
	}
}

function confirmPassword(error, pass, confirmPass) {
	if(pass == confirmPass) {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text("Mật khẩu nhập lại không chính xác !!!");
		return false;
	}
}

function validateEmptyInput(error, input) {
	if(input != "") {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text("Nội dung không được trống!!!");
		return false;
	}
}

function validatePhone(error, input){
	let rexg = /^\d{3}\d{3}\d{4}$/;
	
	if(rexg.test(input)) {
		$("#" + error).text("");
		return true;
	}
	else {
		$("#" + error).text(" số điện thoại không hợp lệ !!!");
		return false;
	}
}