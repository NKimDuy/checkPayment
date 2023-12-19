/*
	hiện dialog xác nhận mỗi khi thực hiện 
*/
function showDialogForRegister(title, content = "") {
	let header = 	'<div class="modal-header">'
		header +=		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
		header +=		'<span aria-hidden="true">&times;</span></button>'
		header +=		'<h4 class="modal-title">' + title + '</h4>'
		header +=	'</div>'

	let body = '<div class="modal-body">' + content + '</div>' 

	let footer =  '<div class="modal-footer">'
		footer += 	"<button type='button' class='btn btn-primary' id='yesdoIt' data-dismiss='modal'>Đồng ý</button>";
		footer += '</div>'

	$("#dialog").html(header + body + footer); 
	$('#modal-dialog').modal('show'); 
	

	//return header + body + footer;
}

/*
	Tắt form
*/
function closeForm() { 
	$("#showForm").css("display", "none").html("");
	$("#groupResetUserByAdmin").css("display", "none").html("");
	$("#showtbAction").css("display", "none");
	$("#showtbDvlk").css("display", "none");
	$("#showtbPermission").css("display", "none");

}

/*
	check tất cả checkbox
*/
function checkAllForRegister(idCheckBox, table) { // chọn hoặc bỏ chọn tất cả các checkbox
	if($("#" + idCheckBox).is(':checked')) {
		$("#" + table + " input:checkbox").prop("checked","checked");
	}
	else {
		$("#" + table + " input:checkbox").prop("checked",false);
	}
}

/*
	kiểm tra tất cả các checkbox, chỉ cần 1 checkbox không được check thì checkbox checkAll sẽ không được check
*/
function unCheckAllRegister(id, idAll, table) {
	if( $("#" + id).is(":checked") ) {
		let flag = true;
		
		$("#" + table + " input:checkbox").not("#"+ idAll).each((index, element) => {
			if( $(element).prop("checked") != true ) {
				flag = false;
				return false;
			}
		});
		if(flag) {
			$("#" + idAll).prop("checked","checked");
		}
	}
	else {
		$("#" + idAll).prop("checked", false);
	}
}


/*
	tạo form cấp lại mật khẩu check
*/
function createFormResetPassword(mail) {
	
	$("#groupResetUserByAdmin").css("display", "block").html("");
	
	$("#getUserResetByAdmin").val(mail);

	let divReset = 	'<div class="box-header with-border">'+
						'<label class="box-title">Cấp lại mật khẩu cho user: ' + mail  + '</label>' +
						'<div class="box-tools pull-right">' +
							'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
						'</div></div>' +
					'</div>' +
					'<div class="box-body">';

		divReset += '<form method="post" id="formResetPasswordByAdmin">';

		divReset += '<div class="col-xs-4">' +
						'<div class="form-group">' +
							'<div class="input-group">' +
								'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
								'<input type="password" class="form-control" id="newPasswordEditByAdmin" name="newPasswordEditByAdmin" placeholder="Nhập mật khẩu mới"> <!-- 0 -->' +
								'<span id="erorrNewPasswordInAdmin" style="color:red;"></span>' +
					'</div></div></div>';
						
		divReset += '<div class="col-xs-4">' + 
						'<div class="form-group">' +
							'<div class="input-group">' +
								'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
								'<input type="password" class="form-control" id="confirmPasswordEditByAdmin" name="confirmPasswordEditByAdmin" placeholder="Nhập lại mật khẩu mới"> <!-- 1 -->' +
								'<span id="erorrConfirmPasswordInAdmin" style="color:red;"></span>' +
					'</div></div></div>';
						
		divReset += '<div class="col-xs-1">' +
						'<div class="form-group">' +
							'<input type="hidden" id="getUserResetByAdmin" name="getUserResetByAdmin" /> <!-- 2 -->' +
							'<input type="hidden" name="statusResetByAdmin" value="admin" /> <!-- 3 -->' +
							'<input type="submit" onclick="resetPasswordUser(event)" class="btn btn-block btn-primary btn" value="Reset" />' +                                                
					'</div></div></form>';
					
	$("#groupResetUserByAdmin").html(divReset);
	
	$("#getUserResetByAdmin").val(mail);
	
}

/*
	cấp lại mật khẩu cho user check
*/
function resetPasswordUser(e) {
	e = e || window.event;
	
	e.preventDefault();
	
	let passEditByAdmin = ( validateEmptyInput("erorrNewPasswordInAdmin", $("#newPasswordEditByAdmin").val()) && validateSqlInjection("erorrNewPasswordInAdmin", $("#newPasswordEditByAdmin").val()) ) ? true : false;
		
	let confirmPasswordEditByAdmin = ( validateEmptyInput("erorrConfirmPasswordInAdmin", $("#confirmPasswordEditByAdmin").val()) && validateSqlInjection("erorrConfirmPasswordInAdmin", $("#confirmPasswordEditByAdmin").val()) ) ? true : false;
	
	if(passEditByAdmin && confirmPasswordEditByAdmin) {
		
		showDialogForRegister("Cấp lại mật khẩu User?");
			
		$("#yesdoIt").click(() => {
			$.ajax({
				method: "POST",
				url: "./lib/ajax/createOrAlterUser/resetPassword.php",
				data: {
					dataForm: $("#formResetPasswordByAdmin").serializeArray()
				},
				dataType: "JSON",
				success: function(result) {
					if(result['confirm'] == true) {
						alert("Đã cập nhật thành công");
						//$( "#dialog" ).dialog( "close" );
						location.reload();
					}
				}
			});
		});
		
		
	}
}

/*
	Hiện Form Tạo User check
*/
function createUser(superUser) {

	//$("#showtbActionEdit").css("display", "none");
	//$("#showtbDvlkEdit").css("display", "none");
	//$("#showtbPermissionEdit").css("display", "none");
	
	$("#tbPermission input:checkbox").prop("checked",false);
	$("#tbDvlk input:checkbox").prop("checked",false);
	
	$("#showtbPermission").css("display", "block");
	$("#showtbDvlk").css("display", "block");
	
	$("#showForm").css("display", "block").html("");
	
	let divCreateUser =  	'<div class="box-header with-border">' +
									'<label class="box-title">Tạo mới User: </label>' +
										"<div class='box-tools pull-right'>" +
									'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
								'</div></div>' +
								'<div class="box-body">';

		divCreateUser += 	'<form method="post" id="formRegisterUser">';
		
		divCreateUser += 	'<input type="hidden" id="status" name="status" value="create"> <!-- 0 -->';

		divCreateUser += 	'<div class="col-xs-3">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
									'<input type="text" class="form-control" id="fullname" name="fullname" placeholder="Nhập họ và tên"> <!-- 1 -->' +
									'<span id="errorFullname" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateUser +=  	'<div class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-phone"></i></div>' +
									'<input type="text" class="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại"> <!-- 2 -->' +
									'<span id="errorPhone" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser +=  	'<div class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-envelope"></i></div>' +
									'<input type="text" class="form-control" id="mail" name="mail" placeholder="Nhập Mail"> <!-- 3 -->' +
									'<span id="errorMail" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser += 	'<div class="col-xs-3">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-key"></i></div>' +
									'<input type="password" class="form-control" id="password" name="password" placeholder="Nhập mật khẩu"> <!-- 4 -->' +
									'<span id="errorPassword" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateUser +=  '<div class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-key"></i></div>' +
									'<input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu"> <!-- 5 -->' +
									'<span id="errorConfirmPassword" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser +=  	'<div class="col-xs-3" id="hideGroupUser">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-users"></i></div>' +
									'<select class="form-control select2" id="groupUser" name="groupUser" aria-label="Default select example"> <!-- 6 -->' +
										'<option value="0">Select group user</option>' +
										'<option value="1">admin</option>' +
										'<option value="2">dvlk</option>' +
										'<option value="3">qlv</option>' +
										'<option value="4">leader</option>' +
										'<option value="5">account</option>' +
									'</select>' +
							'</div></div></div>';

							
		divCreateUser += '<div class="col-xs-1">' +
							'<div class="form-group">' +
								'<input type="hidden" id="selectPermission" name="selectPermission" /> <!-- 7 -->' +
								'<input type="hidden" id="selectLinkUnit" name="selectLinkUnit" /> <!-- 8 -->' +
								'<input type="submit" onclick="createNewOrUpdateUser(event)" class="btn btn-block btn-primary btn" value="Đăng kí" id="registerFormUser">' +                                                
							'</div></div></form>';
					
	$("#showForm").html(divCreateUser);
	
	if(superUser != 1)
		$("#groupUser > option[value='1']").remove();
	
}

/*
	Hiện Form Sửa User check
*/
function detailUser(mail) {
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/detailUser.php",
		data: {
			mail: mail
		},
		dataType: "JSON",
		success: function(result) {
						
			$("#tbPermission input:checkbox").prop("checked",false);
			$("#tbDvlk input:checkbox").prop("checked",false);
						
			$.each(result['permission'], (index, value) => {
				$("#" + value[0]).prop("checked","checked");
			});
			$.each(result['linkUnit'], (index, value) => {
				$("#" + value[0]).prop("checked","checked");
			});
			

			//$("#showtbActionEdit").css("display", "none");
			//$("#showtbDvlkEdit").css("display", "none");
			//$("#showtbPermissionEdit").css("display", "block");
			
			$("#showtbPermission").css("display", "block");
			$("#showtbDvlk").css("display", "block");
			
			$("#showForm").css("display", "block").html("");
			
			let divCreateUser =  	'<div class="box-header with-border">' +
									'<label class="box-title">Chỉnh sửa User: </label>' +
										"<div class='box-tools pull-right'>" +
									'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
								'</div></div>' +
								'<div class="box-body">';

		divCreateUser += 	'<form method="post" id="formRegisterUser">';
		
		divCreateUser += 	'<input type="hidden" id="status" name="status" value="edit"> <!-- 0 -->';

		divCreateUser += 	'<div class="col-xs-3">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
									'<input type="text" class="form-control" id="fullname" name="fullname" placeholder="Nhập họ và tên" value="' + result['user'][1] + '"> <!-- 1 -->' +
									'<span id="errorFullname" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateUser +=  	'<div class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-phone"></i></div>' +
									'<input type="text" class="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại" value="' + result['user'][2] + '"> <!-- 2 -->' +
									'<span id="errorPhone" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser +=  	'<div class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-envelope"></i></div>' +
									'<input type="text" class="form-control" id="mail" name="mail" readonly placeholder="Nhập Mail" value="' + result['user'][0] + '"> <!-- 3 -->' +
									'<span id="errorMail" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser += 	'<div style="display:none;" class="col-xs-3">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-key"></i></div>' +
									'<input type="password" class="form-control" id="password" name="password" placeholder="Nhập mật khẩu"> <!-- 4 -->' +
									'<span id="errorPassword" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateUser +=  '<div style="display:none;" class="col-xs-3">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-key"></i></div>' +
									'<input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu"> <!-- 5 -->' +
									'<span id="errorConfirmPassword" style="color:red;"></span>' +
							'</div></div></div>';

		divCreateUser +=  	'<div class="col-xs-3" id="hideGroupUser">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-users"></i></div>' +
									'<select class="form-control select2" id="groupUser" name="groupUser" aria-label="Default select example"> <!-- 6 -->' +
										'<option value="0">Select group user</option>' +
										'<option value="1">admin</option>' +
										'<option value="2">dvlk</option>' +
										'<option value="3">qlv</option>' +
										'<option value="4">leader</option>' +
										'<option value="5">account</option>' +
									'</select>' +
							'</div></div></div>';

							
		divCreateUser += '<div class="col-xs-1">' +
							'<div class="form-group">' +
								'<input type="hidden" id="selectPermission" name="selectPermission"> <!-- 7 -->' +
								'<input type="hidden" id="selectLinkUnit" name="selectLinkUnit"> <!-- 8 -->' +
								'<input type="submit" onclick="createNewOrUpdateUser(event)" class="btn btn-block btn-primary btn" value="Cập nhật" id="registerFormUser">' +                                                
							'</div></div></form>';
							
			$("#showForm").html(divCreateUser);
			
			$("#groupUser").val(result['user'][3]);
					
		}
	});
}

/*
	Xử lý thêm mới hoặc cập nhật user check
*/
function createNewOrUpdateUser(e) {
	
	e = e || window.event;
	
	e.preventDefault();
	
	let tempPermission = "";
	
	let tempLinkUnit = "";
			
	$("#tbPermission input:checked").each(function(index, item) {
		tempPermission += $(item).val() + ", ";
	});
	
	$("#tbDvlk input:checked").each(function(index, item) {
		tempLinkUnit += $(item).val() + ", ";
	});
	
	$("#selectPermission").val(tempPermission);
	
	$("#selectLinkUnit").val(tempLinkUnit);
	
	let fullname = ( validateEmptyInput("errorFullname", $("#fullname").val()) && validateSqlInjection("errorFullname", $("#fullname").val()) ) ? true : false;
	
	//let phone = ( validateEmptyInput("errorPhone", $("#phone").val()) && validatePhone("errorPhone", $("#phone").val()) ) ? true : false;
	
	let phone = ( validateEmptyInput("errorPhone", $("#phone").val()) ) ? true : false;
	
	//let username = ( validateEmptyInput("errorUsername", $("#username").val()) && validateSqlInjection("errorUsername", $("#username").val()) ) ? true : false;
	
	let mail = ( validateEmptyInput("errorMail", $("#mail").val()) && validateSqlInjection("errorMail", $("#mail").val()) && validateMail("errorMail", $("#mail").val()) ) ? true : false;
	
	let passwordUser = ( validateEmptyInput("errorPassword", $("#password").val()) && validateSqlInjection("errorPassword", $("#password").val()) ) ? true : false;
	
	let confirmPasswordUser = ( validateEmptyInput("errorConfirmPassword", $("#confirmPassword").val()) && validateSqlInjection("errorConfirmPassword", $("#confirmPassword").val()) ) ? true : false;
	
	let checkCorrectPassword = confirmPassword("errorConfirmPassword", $("#password").val(), $("#confirmPassword").val());
	
	let groupUser = validateSelectGroupUser("errorGroupUser", $("#groupUser").val());
	
	if($("#status").val() == "edit") {
		
		if(fullname && phone && mail) {
			
			showDialogForRegister("Cập nhật User?");
			
			$("#yesdoIt").click(() => {
				$.ajax({
					method: "POST",
					url: "./lib/ajax/createOrAlterUser/createOrEditUser.php",
					data: {
						dataForm: $("#formRegisterUser").serializeArray()
					},
					dataType: "JSON",
					success: function(result) {
						if(result['confirm'] == true) {
							alert("Đã sửa thành công");
							
							//$("#dialog").dialog( "close" );
							
							location.reload();
						}
						else
							alert("Có lỗi xảy ra");
					}
				});
			});
		}
	}
	else if($("#status").val() == "create") {
		if(fullname && phone && mail && passwordUser && confirmPasswordUser && groupUser && checkCorrectPassword) {
			
			showDialogForRegister("Thêm mới User?");
			
			$("#yesdoIt").click(() => {
				$.ajax({
					method: "POST",
					url: "./lib/ajax/createOrAlterUser/createOrEditUser.php",
					data: {
						dataForm: $("#formRegisterUser").serializeArray()
					},
					dataType: "JSON",
					success: function(result) {
						
						if(result['confirm'] == true) {
							alert("Đã thêm thành công");
							
							//$("#dialog").dialog( "close" );
							
							location.reload();
						}
					}
				});
			});
		}
	}
}

/*
	Xóa User check
*/
function deleteUser(mail) {
	
	showDialogForRegister("Xóa User?");
			
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/createOrAlterUser/deleteUser.php",
			data: {
				mail: mail
			},
			dataType: "JSON",
			success: function(result) {
				
				//alert(result['confirm']);
				
				if(result['confirm'] == true) {
					alert("Đã xóa thành công");
					//$("#dialog").dialog( "close" );
					location.reload();
				}
			}
		});
	});
}

function updateDVLK() {
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/updateDvlk.php",
		dataType: "JSON",
		success: function(result) {
			//alert(result['confirm']);
			//location.reload();
			//console.log(result['confirm']);
		}
	});
}

/*
	Hiện Form Tạo ĐVLK check
*/
function createDVLK() {

	//$("#showtbActionEdit").css("display", "none");
	//$("#showtbDvlkEdit").css("display", "none");
	//$("#showtbPermissionEdit").css("display", "none");
	
	$("#tbAction input:checkbox").prop("checked",false);
	
	$("#showtbAction").css("display", "block");
	
	$("#showForm").css("display", "block").html("");
	
	let divCreateDVLK =  	'<div class="box-header with-border">' +
									'<label class="box-title">Tạo mới Đơn vị liên kết: </label>' +
										"<div class='box-tools pull-right'>" +
									'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
								'</div></div>' +
								'<div class="box-body">';

		divCreateDVLK += 	'<form method="post" id="formRegisterDvlk">';

		divCreateDVLK += 	'<div class="col-xs-4">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
									'<input type="text" class="form-control" id="idDvlk" name="idDvlk" placeholder="Nhập ĐVLK ID"> <!-- 0 -->' +
									'<span id="errorDvlkId" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateDVLK +=  '<div class="col-xs-4">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
									'<input type="text" class="form-control" id="nameDvlk" name="nameDvlk" placeholder="Nhập ĐVLK name"> <!-- 0 -->' +
									'<span id="errorDvlkName" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateDVLK += '<div class="col-xs-1">' +
							'<div class="form-group">' +
								'<input type="hidden" id="selectedActionForDvlk" name="selectedActionForDvlk"> <!-- 3 -->' +
								'<input type="submit" onclick="createNewDvlk(event)" class="btn btn-block btn-primary btn" value="Đăng kí" id="registerDvlk">' +                                                
							'</div></div></form>';
					
	$("#showForm").html(divCreateDVLK);
	
}

/*
	Xử lý tạo mới dvlk check
*/
function createNewDvlk(e) {
	
	e = e || window.event;
	
	e.preventDefault();
	
	let temp = "";
	
	$("#tbAction input:checked").each(function(index, item) {
		temp += $(item).val() + ", ";
	});
	
	$("#selectedActionForDvlk").val(temp);
	
	let idDvlk = ( validateEmptyInput("errorDvlkId", $("#idDvlk").val()) && validateSqlInjection("errorDvlkId", $("#idDvlk").val()) ) ? true : false;
	
	let nameDvlk = ( validateEmptyInput("errorDvlkName", $("#nameDvlk").val()) && validateSqlInjection("errorDvlkName", $("#nameDvlk").val()) ) ? true : false;
	
	if(idDvlk && nameDvlk) {
		
		showDialogForRegister("Tạo mới Đơn vị liên kết?");
			
		$("#yesdoIt").click(() => {
			$.ajax({
				method: "POST",
				url: "./lib/ajax/createOrAlterUser/createDvlk.php",
				data: {
					dataForm: $("#formRegisterDvlk").serializeArray()
				},
				dataType: "JSON",
				success: function(result) {
					
					//alert(result['confirm']);
					
					if(result['confirm'] == true) {
						alert("Đã thêm thành công");
						
						//$("#dialog").dialog( "close" );
					
						location.reload();
					}
				}
			});
		});
	}
}

/*
	Hiện Form Sửa ĐVLK check
*/
function editDvlk (dvlk) {
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/detailDvlk.php",
		data: {
			dvlk: dvlk
		},
		dataType: "JSON",
		success: function(result) {
			/*
			$("#tbAction input:checkbox").prop("checked",false);
			
			$.each(result['action'], (index, value) => {
				$("#" + value[0]).prop("checked","checked");
			});
			*/
			$("#showForm").css("display", "block").html("");

			let divEditDVLK =  	'<div class="box-header with-border">' +
									 	'<label class="box-title">Chỉnh sửa ĐVLK: </label>' +
										"<div class='box-tools pull-right'>" +
											'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
				 						'</div></div>' +
				 						'<div class="box-body">';
				
				divEditDVLK +=  	'<div class="col-xs-4">' +
										'<div class="form-group">' +
											'<div class="input-group">' +
												'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
												'<input type="text" class="form-control" value=" ' + dvlk + ' " disabled>' +
										'</div></div></div>';
							
				divEditDVLK +=  	'<div class="col-xs-4">' + 
										'<div class="form-group">' +
											'<div class="input-group">' +
												'<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
												'<input type="text" class="form-control" value=" ' + dvlk + ' " disabled>' +
										'</div></div></div>';
							
				divEditDVLK += 	'<form method="post" id="formEditAction">' +
									'<div class="col-xs-2">' +
									'<div class="form-group">' +
										"<input type='hidden' id='editAction' name='editAction' />" +
										"<input type='hidden' id='nameActionEdit' name='nameActionEdit' value='" + dvlk + "'/>" +
										"<input type='submit' id='submitEditAction' name='submitEditAction' value= 'EditAction' onclick='changeActionForDvlk()'/>" +                                                
								'</div></div></form>';
							
			$("#showForm").css("display", "block").html(divEditDVLK);
			//$("#showtbActionEdit").css("display", "block");
			//$("#showtbDvlkEdit").css("display", "none");
			//$("#showtbPermissionEdit").css("display", "none");
			$("#showtbAction").css("display", "block");
		}
	});
}

/*
	Xóa ĐVLK check
*/
function deleteDvlk(dvlk) {
	$("#dialog").html("");
	
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/showUserRelativePermissionDelete.php",
		data: {
			permissionOrDvlk:dvlk
		},
		dataType: "JSON",
		success: function(result) {
			
			let users = '';
			
			if( typeof(result['confirm']) === "undefined") {
				
				let li = '';
				
				$.each(result['data'], (index, value) => {
					li += "<li>" + value + "</li>";
					
					users += value + ", ";
				});
				showDialogForRegister("Xóa Đơn vị liên kết?", "<div> User sẽ bị xóa<div> <ul>" + li + "</ul>");
				//$("#dialog").html("<div> user sẽ bị xóa<div> <ul>" + li + "</ul>");
			}
			else {
				showDialogForRegister("Xóa Đơn vị liên kết?");
				//$("#dialog").html("");
			}
			
			
			
			
			$("#yesdoIt").click(() => {
				$.ajax({
					url: "./lib/ajax/createOrAlterUser/deleteDvlk.php",
					data: {
						permissionOrDvlk:dvlk,
						users: users
					},
					dataType: "JSON",
					success: function(result) {
						
						//alert(result['confirm']);
						
						if(result['confirm'] == true) {
							alert("Đã xóa thành công");
							
							//$("#dialog").dialog( "close" );
							
							location.reload();
						}
						
					}
				});
			});
		}
	});
}

/*
	Hiện Form Tạo ACTION check
*/
function createAction() {

	//$("#showtbActionEdit").css("display", "none");
	//$("#showtbDvlkEdit").css("display", "none");
	//$("#showtbPermissionEdit").css("display", "none");
	
	$("#tbPermission input:checkbox").prop("checked",false);
	
	//$("#tbDvlk input:checkbox").prop("checked",false);
	
	$("#showtbPermission").css("display", "block");
	//$("#showtbDvlk").css("display", "block");
	
	$("#showForm").css("display", "block").html("");
	
	let divCreateAction =  	'<div class="box-header with-border">' +
									'<label class="box-title">Tạo mới Action: </label>' +
										"<div class='box-tools pull-right'>" +
									'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
								'</div></div>' +
								'<div class="box-body">';

		divCreateAction += 	'<form method="post" id="formRegisterAction">';

		divCreateAction += 	'<div class="col-xs-4">' +
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
									'<input type="text" class="form-control" id="idAction" name="idAction" placeholder="Nhập action ID"> <!-- 0 -->' +
									'<span id="errorActionId" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateAction +=  '<div class="col-xs-4">' + 
							'<div class="form-group">' +
								'<div class="input-group">' +
									'<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
									'<input type="text" class="form-control" id="nameAction" name="nameAction" placeholder="Nhập action name"> <!-- 1 -->' +
									'<span id="errorActionName" style="color:red;"></span>' +
							'</div></div></div>';
						
		divCreateAction += '<div class="col-xs-1">' +
							'<div class="form-group">' +
								'<input type="hidden" id="selectAction" name="selectedActionForDvlk"> <!-- 2 -->' +
								'<input type="submit" onclick="createNewAction(event)" class="btn btn-block btn-primary btn" value="Đăng kí" id="registerAction">' +                                                
							'</div></div></form>';
					
	$("#showForm").html(divCreateAction);
	
}

/*
	Xử lý tạo mới action check
*/
function createNewAction(e) {
	
	e = e || window.event;
	
	e.preventDefault();
	
	let temp = "";
	
	$("#tbPermission input:checked").each(function(index, item) {
		temp += $(item).val() + ", ";
	});
	/*
	$("#tbDvlk input:checked").each(function(index, item) {
		temp += $(item).val() + ", ";
	});
	*/

	$("#selectAction").val(temp);
	
	let idAction = ( validateEmptyInput("errorActionId", $("#idAction").val()) && validateSqlInjection("errorActionId", $("#idAction").val()) ) ? true : false;
	
	let idName = ( validateEmptyInput("errorActionName", $("#nameAction").val()) && validateSqlInjection("errorActionName", $("#nameAction").val()) ) ? true : false;
	
	if(idAction && idName) {
		
		showDialogForRegister("Thêm mới Action?");
			
		$("#yesdoIt").click(() => {
			$.ajax({
				method: "POST",
				url: "./lib/ajax/createOrAlterUser/createAction.php",
				data: {
					dataForm: $("#formRegisterAction").serializeArray()
				},
				dataType: "JSON",
				success: function(result) {
					
					//alert(result['confirm']);
					
					if(result['confirm'] == true) {
						alert("Đã thêm thành công");
						
						//$("#dialog").dialog( "close" );
						
						location.reload();
					}
					
				}
			});
		});
	}
}

/*
	Xóa ACTION check
*/
function deleteAction(action) {
	
	showDialogForRegister("Xóa Action?");
			
	$("#yesdoIt").click(() => {
		$.ajax({
			url: "./lib/ajax/createOrAlterUser/deleteAction.php",
			data: {
				action: action
			},
			dataType: "JSON",
			success: function(result) {
				
				//alert(result['confirm']);
				
				if(result['confirm'] == true) {
					alert("Đã xóa thành công");
					
					//$("#dialog").dialog( "close" );
					
					location.reload();
				}
				
			}
		});
	});
}

/*
	Hiện Form Tạo PERMISSION check
*/
function createPermission() {

	//$("#showtbActionEdit").css("display", "none");
	//$("#showtbDvlkEdit").css("display", "none");
	//$("#showtbPermissionEdit").css("display", "none");
	
	$("#tbAction input:checkbox").prop("checked",false);
	
	//$("#tbDvlk input:checkbox").prop("checked",false);
	
	//$("#showtbDvlk").css("display", "block");
	
	$("#showtbAction").css("display", "block");
	
	$("#showForm").css("display", "block").html("");
	
	let divCreatePermission =  	'<div class="box-header with-border">' +
									'<label class="box-title">Tạo permission: </label>' +
										"<div class='box-tools pull-right'>" +
									'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
								'</div></div>' +
								'<div class="box-body">';

		divCreatePermission += 	'<form method="post" id="formRegisterPermission" >';

		divCreatePermission += 	'<div class="col-xs-4">' +
								'<div class="form-group">' +
									'<div class="input-group">' +
										'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
										'<input type="text" class="form-control" id="idPermission" name="idPermission" placeholder="Nhập Permission ID"> <!-- 0 -->' +
										'<span id="errorPermissionId" style="color:red;"></span>' +
								'</div></div></div>';
						
		divCreatePermission +=  '<div class="col-xs-4">' + 
								'<div class="form-group">' +
									'<div class="input-group">' +
										'<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
										'<input type="text" class="form-control" id="namePermission" name="namePermission" placeholder="Nhập permission name"> <!-- 0 -->' +
										'<span id="errorPermissionName" style="color:red;"></span>' +
								'</div></div></div>';
						
		divCreatePermission += '<div class="col-xs-1">' +
								'<div class="form-group">' +
									'<input type="hidden" id="selectedActionForPermission" name="selectedAction"> <!-- 3 -->' +
									'<input type="submit" onclick="createNewPermission(event)" class="btn btn-block btn-primary btn" value="Đăng kí" id="registerPermission">' +                                                
								'</div></div></form>';
					
	$("#showForm").html(divCreatePermission);
	
	
}

/*
	Xử lý tạo mới permission check
*/
function createNewPermission(e) {
	
	e = e || window.event;
	
	e.preventDefault();
	
	let temp = "";
	
	$("#tbAction input:checked").each(function(index, item) {
		temp += $(item).val() + ", ";
	});
	/*
	$("#tbDvlk input:checked").each(function(index, item) {
		temp += $(item).val() + ", ";
	});
	*/
	$("#selectedActionForPermission").val(temp);
	
	let idPermission = ( validateEmptyInput("errorPermissionId", $("#idPermission").val()) && validateSqlInjection("errorPermissionId", $("#idPermission").val()) ) ? true : false;
	
	let namePermission = ( validateEmptyInput("errorPermissionName", $("#namePermission").val()) && validateSqlInjection("errorPermissionName", $("#namePermission").val()) ) ? true : false;
	
	if(idPermission && namePermission) {	
	
		showDialogForRegister("Tạo mới Permission?");
		
		$("#yesdoIt").click(() => {
			$.ajax({
				method: "POST",
				url: "./lib/ajax/createOrAlterUser/createPermission.php",
				data: {
					dataForm: $("#formRegisterPermission").serializeArray()
				},
				dataType: "JSON",
				success: function(result) {
					
					//alert(result['confirm']);
					
					if(result['confirm'] == true) {
						alert("Đã thêm thành công");
					
						location.reload();
					}
					
				}
			});
		});
	}
}

/*
	Hiện Form Sửa PERMISSION check
*/
function editPermission(permission) {
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/detailPermission.php",
		data: {
			permission: permission
		},
		dataType: "JSON",
		success: function(result) {
			
			$("#tbAction input:checkbox").prop("checked",false);
			/*
			$("#tbDvlk input:checkbox").prop("checked",false);
			*/
			$.each(result['action'], (index, value) => {
				$("#" + value[0]).prop("checked","checked");
			});
			/*
			$.each(result['dvlk'], (index, value) => {
				$("#" + value[0]).prop("checked","checked");
			});
			*/
			let divEditPermission =  	'<div class="box-header with-border">' +
									 	'<label class="box-title">Chỉnh sửa Permission: </label>' +
										"<div class='box-tools pull-right'>" +
											'<button onclick="closeForm()" class="btn btn-block btn-info"><i class="fa fa-times"></i></button>' +
				 						'</div></div>' +
				 						'<div class="box-body">';
				
				divEditPermission +=  	'<div class="col-xs-4">' +
										'<div class="form-group">' +
											'<div class="input-group">' +
												'<div class="input-group-addon"><i class="fa fa-font"></i></div>' +
												'<input type="text" class="form-control" value=" ' + permission + ' " disabled>' +
										'</div></div></div>';
							
				divEditPermission +=  	'<div class="col-xs-4">' + 
										'<div class="form-group">' +
											'<div class="input-group">' +
												'<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
												'<input type="text" class="form-control" value=" ' + permission + ' " disabled>' +
										'</div></div></div>';
							
				divEditPermission += 	'<form method="post" id="formEditPermission">' +
										'<div class="col-xs-2">' +
										'<div class="form-group">' +
											"<input type='hidden' id='editPermission' name='editPermission' />" +
											"<input type='hidden' id='namePermissionEdit' name='namePermissionEdit' value='" + permission + "'/>" +
											"<input type='submit' id='submitEditPermission' name='submitEditPermission' value= 'EditPermission' onclick='changeActionForPermission()'/>" +                                                
										'</div></div></form>';
							
			$("#showForm").css("display", "block").html(divEditPermission);
			$("#showtbAction").css("display", "block");
			//$("#showtbDvlk").css("display", "block");
			//$("#showtbPermissionEdit").css("display", "none");
			
		}
	});
}

/*
	Xóa PERMISSION check
*/
function deletePermission(permission) {
	$("#dialog").html("");
	
	$.ajax({
		url: "./lib/ajax/createOrAlterUser/showUserRelativePermissionDelete.php",
		data: {
			permissionOrDvlk:permission
		},
		dataType: "JSON",
		success: function(result) {
			
			if( typeof(result['confirm']) === "undefined") {
				
				let li = '';
				
				$.each(result['data'], (index, value) => {
					li += "<li>" + value + "</li>";
				});
				
				showDialogForRegister("Xóa permission", "<div>những user bị ảnh hưởng<div> <ul>" + li + "</ul>");
				
				//$("#dialog").html("<div>những user bị ảnh hưởng<div> <ul>" + li + "</ul>");
			}
			else {
				//$("#dialog").html("");
				
				showDialogForRegister("Xóa Permission?");
			}
			
			$("#yesdoIt").click(() => {
				$.ajax({
					url: "./lib/ajax/createOrAlterUser/deletePermission.php",
					data: {
						permissionOrDvlk:permission
					},
					dataType: "JSON",
					success: function(result) {
						
						//alert(result['confirm']);
						
						if(result['confirm'] == true) {
							alert("Đã xóa thành công");
							//$("#dialog").dialog( "close" );
							location.reload();
						}
					}
				});
			});
		}
	});
}

/*
	tiến hành thay đổi action cho PERMISSION check
*/
function changeActionForPermission() {
	$("#formEditPermission").submit((e) => {
		e.preventDefault();
		
		let temp = '';
		
		$("#tbAction input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		/*
		$("#tbDvlk input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		*/
		$("#editPermission").val(temp);
		
		$.ajax({
			method: "POST",
			url: "./lib/ajax/createOrAlterUser/editPermission.php",
			data: {
				dataForm: $("#formEditPermission").serializeArray()
			},
			dataType: "JSON",
			success: function(result) {
				
				//alert(result['confirm']);
				
				if(result['confirm'] == true) {
					alert("Đã sửa thành công");
					
					//$("#dialog").dialog( "close" );
					
					location.reload();
				}
				
			}
		});
		
	});
}

/*
	tiến hành thay đổi action cho dvlk check
*/
function changeActionForDvlk() {
	$("#formEditAction").submit((e) => {
		e.preventDefault();
		
		let temp = '';
		
		$("#tbAction input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#editAction").val(temp);
		
		$.ajax({
			method: "POST",
			url: "./lib/ajax/createOrAlterUser/editDvlk.php",
			data: {
				dataForm: $("#formEditAction").serializeArray()
			},
			dataType: "JSON",
			success: function(result) {
				
				//alert(result['confirm']);
				
				
				
				if(result['confirm'] == true) {
					alert("Đã sửa thành công");
					
					location.reload();
				}
				//$("#dialog").dialog( "close" );
			}
		});
		
	});
}


(function() {
	
	/*
		reset password ở phía người dùng
	*/
	$("#formResetPassword").submit((e) => {
		
		e.preventDefault();
		
		let oldPasswordByUser = ( validateEmptyInput("erorrOldPassword", $("#oldPassword").val()) && validateSqlInjection("erorrOldPassword", $("#oldPassword").val()) ) ? true : false;
		
		let passwordEditByUser = ( validateEmptyInput("erorrNewPasswordbyUser", $("#newPasswordByUser").val()) && validateSqlInjection("erorrNewPasswordbyUser", $("#newPasswordByUser").val()) ) ? true : false;
		
		let confirmPasswordEditByUser = ( validateEmptyInput("erorrConfirmPasswordByUser", $("#confirmPasswordByUser").val()) && validateSqlInjection("erorrConfirmPasswordByUser", $("#confirmPasswordByUser").val()) ) ? true : false;
		
		let checkCorrectPassword = confirmPassword("erorrConfirmPasswordByUser", $("#newPasswordByUser").val(), $("#confirmPasswordByUser").val());
		
		$.ajax({
			method: "POST",
			url: "./lib/ajax/createOrAlterUser/checkOldPassword.php",
			data: {
				oldPassword: $("#oldPassword").val()
			},
			dataType: "JSON",
			success: function(result) {
				
				if(result['confirm'] == "incorrect") {
					$("#erorrOldPassword").text("Mật Khẩu cũ không chính xác !!!");
				}
				else {
					$("#erorrOldPassword").text("");
					
					if(oldPasswordByUser && passwordEditByUser && confirmPasswordEditByUser && checkCorrectPassword ) {
		
						$.ajax({
							method: "POST",
							url: "./lib/ajax/createOrAlterUser/resetPassword.php",
							data: {
								dataForm: $("#formResetPassword").serializeArray()
							},
							dataType: "JSON",
							success: function(result) {
								//alert(result['confirm']);
								
								if(result['confirm'] == true) {
									alert("Đã tạo mới mật khẩu");
									location.reload();
								}
								else {
									alert("Tạo mới mật khẩu thất bại");
								}
								
								
							}
						});
					}
				}
				
			}
		});
	});
	
	/*
		reset password ở phía admin
	*/
	
	$("#formResetPasswordByAdmin").submit((e) => {
		
		e.preventDefault();
		
		let passEditByAdmin = ( validateEmptyInput("erorrNewPasswordInAdmin", $("#newPasswordEditByAdmin").val()) && validateSqlInjection("erorrNewPasswordInAdmin", $("#newPasswordEditByAdmin").val()) ) ? true : false;
		
		let confirmPasswordEditByAdmin = ( validateEmptyInput("erorrConfirmPasswordInAdmin", $("#confirmPasswordEditByAdmin").val()) && validateSqlInjection("erorrConfirmPasswordInAdmin", $("#confirmPasswordEditByAdmin").val()) ) ? true : false;
		
		if(passEditByAdmin && confirmPasswordEditByAdmin) {
			$("#dialog").dialog({
				height: 300,
				width: 300,
				modal:true,
				fluid: true,
				my: "center",
				at: "center",
				buttons: {
					"Sửa": function() {
						$.ajax({
							method: "POST",
							url: "./lib/ajax/createOrAlterUser/resetPassword.php",
							data: {
								dataForm: $("#formResetPasswordByAdmin").serializeArray()
							},
							dataType: "JSON",
							success: function(result) {
								if(result['confirm'] == "success") {
									alert("Đã cập nhật thành công");
									$( "#dialog" ).dialog( "close" );
								}
							}
						});
					},
					"Hủy": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
					$( this ).dialog( "destroy" );
				}
			});
		}
		
	});
	
	
	/*
		load các table 
	*/
	$(window).load(() => {
		/*
			load permission, action, dvlk
		*/
		$.ajax({
			url: "./lib/ajax/createOrAlterUser/loadPermissionActionDvlk.php",
			dataType: "JSON",
			success: function(result) {
				
			/*------------------------------- PERMISSION -------------------------------------- */

					///////////// tbPermission ////////////////
				let	tbPermission = "<table id='tbPermission' class='table table-hover'>";
					tbPermission += "<thead>";
					tbPermission += "<tr>";
					tbPermission += "<th></th>";
					tbPermission += "<th>ID permission</th>";
					tbPermission += "<th>Permission name</th>";
					tbPermission += "</tr>";
					tbPermission += "</thead>";

					tbPermission += "<tbody>";
					tbPermission += "<tr>";
					tbPermission += '<td><input type="checkbox" value="checkAll" id="checkAllPermission" class="flat-red" onclick="checkAllForRegister(' + "'" + "checkAllPermission" + "', '" + "tbPermission" + "'" + ')" /></td>';
					tbPermission += "<td></td>";
					tbPermission += "<td></td>";
					tbPermission += "</tr>";
					///////////////////////////////

				let tbPermissionEdit = 	'<div class="box-header with-border">' +
										'<label class="box-title">Bảng danh sách Permisstion</label>' +
										"<div class='box-tools pull-right'>" +
											'<button onclick="createPermission()" id="confirm" class="btn btn-block btn-info">Thêm Permission</button>' +
									"</div></div>" + 	
									'<div class="box-body">';

					tbPermissionEdit += "<table id='tbPermissionEdit' class='table table-hover'>";

					tbPermissionEdit += "<thead>";
					tbPermissionEdit += "<tr>";
					tbPermissionEdit += "<th>ID permission</th>";
					tbPermissionEdit += "<th>Permission name</th>";
					tbPermissionEdit += "<th>Chỉnh sửa Permission</th>";
					tbPermissionEdit += "<th>Xóa Permission</th>";
					tbPermissionEdit += "</tr>";
					tbPermissionEdit += "</thead>";
					
					tbPermissionEdit += "<tbody>";
					
					$.each(result['permission'], (index, value) => {

						/*___________________________________________________________*/
						
						///////////// tbPermission ////////////////
						tbPermission += "<tr>";
						
						tbPermission += "<td>" + "<input type='checkbox' id='" + value[0] + "' onclick='unCheckAllRegister(" + '"' + value[0] + '", "' + 'checkAllPermission' + '", "' + 'tbPermission' + '"' + ")' value='" + value[0] + "' class='flat-red' />" + "</td>";
						
						tbPermission += "<td>" + value[0] + "</td>";
						
						tbPermission += "<td>" + value[1] + "</td>";
						
						tbPermission += "</tr>";
						///////////////////////////////////////////////
						/*.......................................................*/

						/*___________________________________________________________*/
						tbPermissionEdit += "<tr>";
												
						tbPermissionEdit += "<td>" + value[0] + "</td>";
						
						tbPermissionEdit += "<td>" + value[1] + "</td>";

						tbPermissionEdit += '<td><a href="javascript:editPermission(' + "'" + value[0] + "'" + ')">'+
										'<button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-default">'+
											'<i class="fa fa-cog"></i> Edit'+
										'</button>'+
										'</a></td>';	

						tbPermissionEdit += '<td><a href="javascript:deletePermission(' + "'" + value[0] + "'" + ')">'+
										'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default">'+
											'<i class="fa fa-trash"></i> Delete'+
										'</button>'+
										'</a></td>';	

						tbPermissionEdit += "</tr>";
						/*.......................................................*/
					});
					///////////// tbPermission ////////////////
					tbPermission += "</tbody></table>";
					/////////////////////////////////////////

					tbPermissionEdit += "</tbody></table></div>";
								
				$("#showtbPermission").html(tbPermission); // show các permission để check
				
				$("#tbPermission").DataTable({
					"scrollY": "200px",
					"scrollCollapse": true,
					"paging": false
				});

				$("#showtbPermissionEdit").html(tbPermissionEdit); // show các permission để chỉnh sửa
				
				//$("#tbPermissionEdit").DataTable();

			/*------------------------------- /. PERMISSION -------------------------------------- */
				
			/*------------------------------- Đơn vị liên kết ------------------------------------ */

				// tbDvlk //////////////////
				let	tbDvlk = "<table id='tbDvlk' class='table table-hover' >";
					tbDvlk += "<thead>";
					tbDvlk += "<tr>";
					tbDvlk += "<th> </th>";
					tbDvlk += "<th>ID dvlk</th>";
					tbDvlk += "<th>Dvlk name</th>";
					tbDvlk += "</tr>";
					tbDvlk += "</thead>";

					tbDvlk += "<tbody>";
					tbDvlk += "<tr>";
					tbDvlk += '<td><input type="checkbox" value="checkAll" id="checkAllDvlk" class="flat-red" onclick="checkAllForRegister(' + "'" + "checkAllDvlk" + "', '" + "tbDvlk" + "'" + ')" /></td>';
					tbDvlk += "<td></td>";
					tbDvlk += "<td></td>";
					tbDvlk += "</tr>";
				//////////////////////////////////////////////
					//createDVLK
					let tbDvlkEdit = 	'<div class="box-header with-border">' +
									'<label class="box-title">Bảng danh sách Đơn vị liên kết</label>' +
									'<div class="box-tools pull-right">' +
										'<button onclick="updateDVLK()" id="confirm" class="btn btn-block btn-info">Cập nhật đơn vị liên kết</button>' +
								"</div></div>" + 	
								'<div class="box-body">';

					tbDvlkEdit += "<table id='tbDvlkEdit' class='table table-hover'>";
					
					tbDvlkEdit += "<thead>";
					tbDvlkEdit += "<tr>";
					tbDvlkEdit += "<th>ID</th>";
					tbDvlkEdit += "<th>Tên ĐVLK</th>";
					//tbDvlkEdit += "<th>Chỉnh sửa ĐVLK</th>";
					tbDvlkEdit += "<th>Xóa ĐVLK</th>";
					tbDvlkEdit += "</tr>";
					tbDvlkEdit += "</thead>";
									
					tbDvlkEdit += "<tbody>";
					
					$.each(result['dvlk'], (index, value) => {

						/*___________________________________________________________*/
						
						// tbDvlk //////////////////
						tbDvlk += "<tr>";
						
						tbDvlk += "<td>" + "<input type='checkbox' id='" + value[0] + "' onclick='unCheckAllRegister(" + '"' + value[0] + '", "' + 'checkAllDvlk' + '", "' + 'tbDvlk' + '"' + ")' value='" + value[0] + "' class='flat-red' />" + "</td>";
						
						tbDvlk += "<td>" + value[0] + "</td>";
						
						tbDvlk += "<td>" + value[1] + "</td>";
						
						tbDvlk += "</tr>";
						///////////////////////////////////////////
						/*.......................................................*/

						/*___________________________________________________________*/
						tbDvlkEdit += "<tr>";
						
						tbDvlkEdit += "<td>" + value[0] + "</td>";
						
						tbDvlkEdit += "<td>" + value[1] + "</td>";
						/*
						tbDvlkEdit += '<td><a href="javascript:editDvlk(' + "'" + value[0] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-default">'+
										'<i class="fa fa-cog"></i> Edit'+
									'</button>'+
									'</a></td>';	
						*/
						tbDvlkEdit += '<td><a href="javascript:deleteDvlk(' + "'" + value[0] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default">'+
										'<i class="fa fa-trash"></i> Delete'+
									'</button>'+
									'</a></td>';	

						tbDvlkEdit += "</tr>";
						/*.......................................................*/
					});

					// tbDvlk //////////////////
					tbDvlk += "</tbody></table>";
					///////////////////////////

					tbDvlkEdit += "</tbody></table></div>";
								
				$("#showtbDvlk").html(tbDvlk);
				
				$("#tbDvlk").DataTable({
					"scrollY": "200px",
					"scrollCollapse": true,
					"paging": false
				});
				
				$("#tbDvlkEdit").DataTable({
					"scrollY": "200px",
					"scrollCollapse": true,
					"paging": false
				});

				$("#showtbDvlkEdit").html(tbDvlkEdit);

								
			/*------------------------------- /. Đơn vị liên kết ------------------------------------ */
				
			/*-------------------------------------- Action ----------------------------------------- */

				/////// tbAction ///////////////////
				let	tbAction = "<table id='tbAction' class='table table-hover'>";
					tbAction += "<thead>";
					tbAction += "<tr>";
					tbAction += "<th></th>";
					tbAction += "<th>ID action</th>";
					tbAction += "<th>Action name</th>";
					tbAction += "</tr>";
					tbAction += "</thead>";
							
					tbAction += "<tbody>";
					tbAction += "<tr>";
					tbAction += '<td><input type="checkbox" value="checkAll" id="checkAllAction" class="flat-red" onclick="checkAllForRegister(' + "'" + "checkAllAction" + "', '" + "tbAction" + "'" + ')" /></td>';
					tbAction += "<td></td>";
					tbAction += "<td></td>";
					tbAction += "</tr>";
				/////////////////////////////////////
				
					let tbActionEdit = 	'<div class="box-header with-border">' +
									'<label class="box-title">Bảng danh sách Action</label>' +
									"<div class='box-tools pull-right'>" +
										'<button onclick="createAction()" id="confirm" class="btn btn-block btn-info">Thêm Action</button>' +
								"</div></div>" + 	
								'<div class="box-body">';
				
					tbActionEdit +=  "<table id='tbActionEdit' class='table table-hover'>";
					
					tbActionEdit += "<thead>";
					tbActionEdit += "<tr>";
					tbActionEdit += "<th>ID action</th>";
					tbActionEdit += "<th>Action name</th>";
					tbActionEdit += "<th>Xóa Action</th>";
					tbActionEdit += "</tr>";
					tbActionEdit += "</thead>";
								
					tbActionEdit += "<tbody>";
					
					$.each(result['action'], (index, value) => {

						/*___________________________________________________________*/
						/////// tbAction ///////////////////
						tbAction += "<tr>";
						
						tbAction += "<td>" + "<input type='checkbox' id='" + value[0] + "' onclick='unCheckAllRegister(" + '"' + value[0] + '", "' + 'checkAllAction' + '", "' + 'tbAction' + '"' + ")' value='" + value[0] + "' class='flat-red' />" + "</td>";

						tbAction += "<td>" + value[0] + "</td>";
						
						tbAction += "<td>" + value[1] + "</td>";
						
						tbAction += "</tr>";
						///////////////////////////////////////
						/*------------------------------------------------------*/

						/*___________________________________________________________*/
						tbActionEdit += "<tr>";
						
						tbActionEdit += "<td>" + value[0] + "</td>";
						
						tbActionEdit += "<td>" + value[1] + "</td>";

						tbActionEdit += '<td><a href="javascript:deleteAction(' + "'" + value[0] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default">'+
										'<i class="fa fa-trash"></i> Delete'+
									'</button>'+
									'</a></td>';	
						
						tbActionEdit += "</tr>";
						/*------------------------------------------------------*/
					});
					/////// tbAction ///////////////////
					tbAction += "</tbody></table>";
					///////////////////////////////////
					
					tbActionEdit += "</tbody></table></div>";
								
				$("#showtbAction").html(tbAction);
				
				$("#tbAction").DataTable({
					"scrollY": "200px",
					"scrollCollapse": true,
					"paging": false
				});

				$("#showtbActionEdit").html(tbActionEdit);

			/*-------------------------------------- /. Action ----------------------------------------- */
				
			}
		});
		
		/*
			load User
		*/
		$.ajax({
			url: "./lib/ajax/createOrAlterUser/loadUser.php",
			dataType: "JSON",
			success: function(result) {
				//result['superUser']
				//'<button onclick="createUser()" id="confirm" class="btn btn-block btn-info">Thêm User</button>'
				let tbUser = 	'<div class="box-header with-border">' +
									'<label class="box-title">Bảng danh sách User</label>' +
									"<div class='box-tools pull-right'>" +
										'<button onclick="createUser(' + result['superUser'] + ')" id="confirm" class="btn btn-block btn-info">Thêm User</button>' +
								"</div></div>" + 	
								'<div class="box-body">';
								
					tbUser += "<table id='tbUser' class='table table-hover'>";
				
					tbUser += "<thead>";
					tbUser += "<tr>";
					tbUser += "<th>nhóm người dùng</th>";
					tbUser += "<th>Mail</th>";
					tbUser += "<th>Full name</th>";
					tbUser += "<th>Phone</th>";
					tbUser += "<th>Chỉnh sửa</th>";
					tbUser += "<th>Xóa</th>";
					tbUser += "<th>Reset mật khẩu</th>";
					tbUser += "</tr>";
					tbUser += "</thead>";
				
				tbUser += "<tbody>";
				$.each(result['data'], (index, value) => {
					
					if(value['super_user'] != 1) {
						
						tbUser += "<tr>";
						
						if(value["group_user"] == "1") 
							tbUser += "<td>" + "Administrator" + "</td>";
						else if(value["group_user"] == "2") 
							tbUser += "<td>" + "Đơn vị liên kết" + "</td>";
						else if(value["group_user"] == "3") 
							tbUser += "<td>" + "Quản lý vùng" + "</td>";
						else if(value["group_user"] == "4") 
							tbUser += "<td>" + "Lãnh đạo" + "</td>";
						else 
							tbUser += "<td>" + "Kế toán" + "</td>";
						
						
						tbUser += "<td>" + value["mail"] + "</td>";
						
						tbUser += "<td>" + value["full_name"] + "</td>";
						
						tbUser += "<td>" + value["phone"] + "</td>";

						if(value["group_user"] == "1" && result['superUser'] != 1) { 

							tbUser += '<td><a href="javascript:detailUser(' + "'" +  value["mail"] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-default" disabled>'+
										'<i class="fa fa-cog"></i> Sửa'+
									'</button>'+
									'</a></td>';	
									
							tbUser += '<td><a href="javascript:deleteUser(' + "'" +  value["mail"] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default" disabled>'+
										'<i class="fa fa-trash"></i> Xóa'+
									'</button>'+
									'</a></td>';		

							tbUser += '<td><a href="javascript:createFormResetPassword(' + "'" +  value["mail"] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default"disabled>'+
										'<i class="fa fa-refresh"></i> Reset '+
									'</button>'+
									'</a></td>';		
						}
						else {
							tbUser += '<td><a href="javascript:detailUser(' + "'" +  value["mail"] + "'" + ')">'+
										'<button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-default" >'+
											'<i class="fa fa-cog"></i> Sửa'+
										'</button>'+
										'</a></td>';	
										
							tbUser += '<td><a href="javascript:deleteUser(' + "'" +  value["mail"] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-danger" data-toggle="modal" data-target="#modal-default" >'+
										'<i class="fa fa-trash"></i> Xóa'+
									'</button>'+
									'</a></td>';		

							tbUser += '<td><a href="javascript:createFormResetPassword(' + "'" +  value["mail"] + "'" + ')">'+
									'<button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#modal-default">'+
										'<i class="fa fa-refresh"></i> Reset '+
									'</button>'+
									'</a></td>';	
						}
						tbUser += "</tr>";
					}
					
					
				});
				tbUser += "</tbody></table>";
				
				$("#showtbUser").html(tbUser);
				
				$("#tbUser").DataTable();
				/*---------------------------------------------------------------------------*/
			}
		});
		
	});
	
	/*
		Đăng kí mới User hoặc cập nhật user
	*/
	/*
	$("#formRegisterUser").submit((e) => {
		e.preventDefault();
		let temp = "";
				
		$("#tbPermission input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#tbDvlk input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#selectPermission").val(temp);
		
		let fullname = ( validateEmptyInput("errorFullname", $("#fullname").val()) && validateSqlInjection("errorFullname", $("#fullname").val()) ) ? true : false;
		
		let phone = ( validateEmptyInput("errorPhone", $("#phone").val()) && validatePhone("errorPhone", $("#phone").val()) ) ? true : false;
		
		let username = ( validateEmptyInput("errorUsername", $("#username").val()) && validateSqlInjection("errorUsername", $("#username").val()) ) ? true : false;
		
		let mail = ( validateEmptyInput("errorMail", $("#mail").val()) && validateSqlInjection("errorMail", $("#mail").val()) && validateMail("errorMail", $("#mail").val()) ) ? true : false;
		
		let passwordUser = ( validateEmptyInput("errorPassword", $("#password").val()) && validateSqlInjection("errorPassword", $("#password").val()) ) ? true : false;
		
		let confirmPasswordUser = ( validateEmptyInput("errorConfirmPassword", $("#confirmPassword").val()) && validateSqlInjection("errorConfirmPassword", $("#confirmPassword").val()) ) ? true : false;
		
		let checkCorrectPassword = confirmPassword("errorConfirmPassword", $("#password").val(), $("#confirmPassword").val());
		
		let groupUser = validateSelectGroupUser("errorGroupUser", $("#groupUser").val());
		
		if($("#status").val() == "edit") {
			if(fullname && phone && mail) {
				$("#dialog").dialog({
					height: 300,
					width: 300,
					modal:true,
					fluid: true,
					my: "center",
					at: "center",
					buttons: {
						"Sửa": function() {
							$.ajax({
								method: "POST",
								url: "./lib/ajax/createOrAlterUser/createOrEditUser.php",
								data: {
									dataForm: $("#formRegisterUser").serializeArray()
								},
								dataType: "JSON",
								success: function(result) {
									
									alert(result['confirm']);
									
									//if(result['confirm'] == true)
									//	alert("Đã thêm thành công");
									
									$("#dialog").dialog( "close" );
								}
							});
						},
						"Hủy": function() {
							$( this ).dialog( "close" );
						}
					},
					close: function() {
						$( this ).dialog( "destroy" );
					}
				});
			}
		}
		else if($("#status").val() == "create") {
			if(fullname && phone && username && mail && passwordUser && confirmPasswordUser && groupUser && checkCorrectPassword) {
				$("#dialog").dialog({
					height: 300,
					width: 300,
					modal:true,
					fluid: true,
					my: "center",
					at: "center",
					buttons: {
						"Thêm": function() {
							$.ajax({
								method: "POST",
								url: "./lib/ajax/createOrAlterUser/createOrEditUser.php",
								data: {
									dataForm: $("#formRegisterUser").serializeArray()
								},
								dataType: "JSON",
								success: function(result) {
									
									alert(result['confirm']);
									
									if(result['confirm'] == true)
										alert("Đã thêm thành công");
									
									$("#dialog").dialog( "close" );
								}
							});
						},
						"Hủy": function() {
							$( this ).dialog( "close" );
						}
					},
					close: function() {
						$( this ).dialog( "destroy" );
					}
				});
			}
		}
	});
	*/
	
	/*
		Đăng kí mới Permission
	*/
	/*
	$("#formRegisterPermission").submit((e) => {
		e.preventDefault();
		let temp = "";
		
		$("#tbAction input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#tbDvlk input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#selectedActionForPermission").val(temp);
		
		let idPermission = ( validateEmptyInput("errorPermissionId", $("#idPermission").val()) && validateSqlInjection("errorPermissionId", $("#idPermission").val()) ) ? true : false;
		
		let namePermission = ( validateEmptyInput("errorPermissionName", $("#namePermission").val()) && validateSqlInjection("errorPermissionName", $("#namePermission").val()) ) ? true : false;
		
		if(idPermission && namePermission) {
			$("#dialog").dialog({
				height: 200,
				width: 300,
				modal:true,
				fluid: true,
				my: "center",
				at: "center",
				buttons: {
					"Thêm": function() {
						$.ajax({
							method: "POST",
							url: "./lib/ajax/createOrAlterUser/createPermission.php",
							data: {
								dataForm: $("#formRegisterPermission").serializeArray()
							},
							dataType: "JSON",
							success: function(result) {
								
								alert(result['confirm']);
								
								if(result['confirm'] == true)
									alert("Đã thêm thành công");
								
								$("#dialog").dialog( "close" );
							}
						});
					},
					"Hủy": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
					$( this ).dialog( "destroy" );
				}
			});
		}
	});
	*/
	
	/*
		Đăng kí mới Dvlk
	*/
	/*
	$("#formRegisterDvlk").submit((e) => {
		e.preventDefault();
		let temp = "";
		
		$("#tbAction input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});
		
		$("#selectedActionForDvlk").val(temp);
		
		let idDvlk = ( validateEmptyInput("errorDvlkId", $("#idDvlk").val()) && validateSqlInjection("errorDvlkId", $("#idDvlk").val()) ) ? true : false;
		
		let nameDvlk = ( validateEmptyInput("errorDvlkId", $("#idDvlk").val()) && validateSqlInjection("errorDvlkName", $("#nameDvlk").val()) ) ? true : false;
		
		if(idDvlk && nameDvlk) {
			$("#dialog").dialog({
				height: 200,
				width: 300,
				modal:true,
				fluid: true,
				my: "center",
				at: "center",
				buttons: {
					"Thêm": function() {
						$.ajax({
							method: "POST",
							url: "./lib/ajax/createOrAlterUser/createDvlk.php",
							data: {
								dataForm: $("#formRegisterDvlk").serializeArray()
							},
							dataType: "JSON",
							success: function(result) {
								
								alert(result['confirm']);
								
								if(result['confirm'] == true)
									alert("Đã thêm thành công");
								
								$("#dialog").dialog( "close" );
							}
						});
					},
					"Hủy": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
					$( this ).dialog( "destroy" );
				}
			});
		}
	});
	*/
	
	/*
		Đăng kí mới Action
	*/
	/*
	$("#formRegisterAction").submit((e) => {
		e.preventDefault();
		let temp = "";
		
		$("#tbPermission input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});

		$("#tbDvlk input:checked").each(function(index, item) {
			temp += $(item).val() + ", ";
		});

		$("#selectAction").val(temp);
		
		let idAction = ( validateEmptyInput("errorActionId", $("#idAction").val()) && validateSqlInjection("errorActionId", $("#idAction").val()) ) ? true : false;
		
		let idName = ( validateEmptyInput("errorActionName", $("#nameAction").val()) && validateSqlInjection("errorActionName", $("#nameAction").val()) ) ? true : false;
		
		if(idAction && idName) {
			$("#dialog").dialog({
				height: 200,
				width: 300,
				modal:true,
				fluid: true,
				my: "center",
				at: "center",
				buttons: {
					"Thêm": function() {
						$.ajax({
							method: "POST",
							url: "./lib/ajax/createOrAlterUser/createAction.php",
							data: {
								dataForm: $("#formRegisterAction").serializeArray()
							},
							dataType: "JSON",
							success: function(result) {
								
								alert(result['confirm']);
								
								if(result['confirm'] == true)
									alert("Đã thêm thành công");
								
								$("#dialog").dialog( "close" );
							}
						});
					},
					"Hủy": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
					$( this ).dialog( "destroy" );
				}
			});
		}
	});
	*/
	
})();