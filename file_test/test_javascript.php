<html>
<head>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
	<input type="checkbox" id="checkAll" onclick="duy()"/>
	
	<table id="example">
		<thead>
			<tr>
				<th>Mssv</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="checkbox" id="1651010030" value="1651010030" onclick="sang(1651010030)"/>1651010030</td>
			</tr>
			<tr>
				<td><input type="checkbox" id="1651010061" value="1651010061" onclick="sang(1651010061)"/>1651010061</td>
			</tr>
			<tr>
				<td><input type="checkbox" id="1651012046" value="1651012046" onclick="sang(1651012046)"/>1651012046</td>
			</tr>
		</tbody>
	</table>
</body>
<script>
	
	function duy() {
		if($("#checkAll").is(':checked')) {
			$("#example input:checkbox").prop("checked","checked");
		}
		else {
			$("#example input:checkbox").prop("checked",false);
		}
	}
	
	
	function sang(mssv) {
		if( $("#" + mssv).is(":checked") ) {
			let flag = true;
			$("#example input:checkbox").each((index, element) => {
				if( $(element).prop("checked") != true ) {
					flag = false;
					return false;
				}
			});
			if(flag) {
				$("#checkAll").prop("checked","checked");
			}
		}
		else {
			$("#checkAll").prop("checked", false);
		}
	}
	
</script>
</html>