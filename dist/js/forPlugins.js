/* 
	Tắt div
*/
function hideDIV(idDIV) {

	var x = "#" + idDIV;

	$(x).css("display", "none");

}

/* 
	format Number 
*/
function formatCurrency(money) {
	let formattedMoney = accounting.formatMoney(money, {
					symbol: "",
					precision: 0,
					thousand: ".",
					format: {
						pos : "%s %v",
						neg : "%s (%v)",
						zero: "%s  --"
					}
				}); 
	return formattedMoney;
}

/* 
	format Tables
*/

function formatTable(id, len) {

  var x = "#" + id;

	$(x).DataTable({
    scrollCollapse: true,
    //"scrollX": true,
    "pageLength": len,
				"language": {
					"info": "Danh sách tổng cộng _TOTAL_ dòng",
					"lengthMenu": "Hiện _MENU_ dòng mỗi trang",
					"zeroRecords": "Không tìm thấy dữ liệu",
					"infoEmpty": "Không có dòng nào được trả về",
					"infoFiltered": "(lọc từ _MAX_ dòng)",
					"search": "Tìm kiếm:",
					"paginate": {
						"first": "Đầu tiên",
						"last": "Cuối cùng",
						"next": "Tiếp theo",
						"previous": "Trước đó"
					},
				}
  });

}

function formatTableExport(id, len) {

  var x = "#" + id;

	$(x).DataTable({
    dom: 'Bfrtip',
    buttons: ['excelHtml5', 'pdfHtml5'],
    scrollCollapse: true,
    "pageLength": len,
    "language": {
      "info": "Danh sách tổng cộng _TOTAL_ dòng",
      "lengthMenu": "Hiển thị _MENU_ dòng trên mỗi trang",
      "zeroRecords": "Không tìm thấy dữ liệu",
      "infoEmpty": "Không có dòng nào được trả về",
      "infoFiltered": "(lọc từ _MAX_ dòng)",
      "search": "Tìm kiếm:",
      "paginate": {
        "first": "Đầu tiên",
        "last": "Cuối cùng",
        "next": "Tiếp theo",
        "previous": "Trước đó"
      },
    }
  });

}

$("#btnPDF").click((id) => {
  var opt = {
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak:    {avoid: ['#sign']}
      };
  
      
      html2pdf($("id"), opt)
})

$(function () {
  //Initialize Select2 Elements
  $('.select2').select2()

  //Datemask dd/mm/yyyy
  $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
  //Datemask2 mm/dd/yyyy
  $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
  //Money Euro
  $('[data-mask]').inputmask()

  //Date range picker
  $('#reservation').daterangepicker({ locale: { format: 'DD/MM/YYYY' }})
  $('#selectDateRange').daterangepicker({ locale: { format: 'DD/MM/YYYY' }})
  //Date range picker with time picker
  $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, locale: { format: 'DD/MM/YYYY hh:mm A' }})
  //Date range as a button
  $('#daterange-btn').daterangepicker(
    {
      ranges   : {
        'Today'       : [moment(), moment()],
        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate  : moment()
    },
    function (start, end) {
      $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
  )

  //Date picker
  $('#datepicker').datepicker({
    autoclose: true
  })

  //iCheck for checkbox and radio inputs
  $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass   : 'iradio_minimal-blue'
  })
  //Red color scheme for iCheck
  $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass   : 'iradio_minimal-red'
  })
  //Flat red color scheme for iCheck
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass   : 'iradio_flat-green'
  })

  //Colorpicker
  $('.my-colorpicker1').colorpicker()
  //color picker with addon
  $('.my-colorpicker2').colorpicker()

  //Timepicker
  $('.timepicker').timepicker({
    showInputs: false
  })


})
