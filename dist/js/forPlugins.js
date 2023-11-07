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

function formatTableExPDF_Sang(id, len, TenLop, DP) {

  var x = "#" + id;

	$(x).DataTable({
    dom: 'Bfrtip',
    "pageLength": len,
    buttons: [
      {
        text:'PDF',
        className: "btn btn-danger",
        extend: 'pdfHtml5',
        download: 'open',
        exportOptions: {
          columns: ':not(:last-child)'
        },
        title: function() {return "TAO LÀ SANG"},
        customize: function (doc) {

          doc['header']=(function() {
            return {
                columns: [
                    {
                      text: ['BỘ GIÁO DỤC VÀ ĐÀO TẠO'],
                      alignment: 'left'
                    },

                    {
                      text: ['CỘNG HÒA XÃ HỘI CHỦ NGHĨA'],
                      alignment: 'right'
                    }
                ],
                margin: 20,
                
            }
          });

          // Thêm nội dụng vào đầu tài liệu
          doc.content.splice(0, 0, {
            text: 'BỘ GIÁO DỤC VÀO ĐÀO TẠO  					             CỘNG HÒA XÃ HỘI CHŨ NGHĨA VIỆT NAM',
            alignment: 'left'
          });
          
          doc.content.splice(1, 0, {
            text: 'TRƯỜNG ĐẠI HỌC MỞ  			                                           Độc lập - Tự do - Hạnh phúc',
            alignment: 'left'
          });
          doc.content[1].margin = [13,0,0,0];

          doc.content.splice(2, 0, {
            text: 'THÀNH PHỐ HỒ CHÍ MINH',
            alignment: 'left'
          });

          doc.content.splice(3, 0, {
            text: 'DANH SÁCH ĐÓNG HỌC PHÍ',
            alignment: 'center'
          });

          doc.content.splice(4, 0, {
            text: "Lớp: " + TenLop,
            alignment: 'center'
          });

          doc.content.splice(5, 0, {
            text: "Tại "+ DP,
            alignment: 'center'
          });

          doc.content.splice(6, 0, {
            text: 'Từ ngày 01/04/2023 đến 31/07/2023',
            alignment: 'center'
          });

          doc.content.splice(7, 0, {
            text: ' ',
            alignment: 'center'
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            text: 'Số tiền bằng chữ: bảy mươi lăm chịu năm trăm mười mấy ngàn á',
            alignment: 'left'
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            text: 'Tp. Hồ Chí Minh, ngày 21 tháng 08 năm 2023',
            alignment: 'left',
            margin: [230, 0,0,0]
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            text: 'P.HIỆU TRƯỞNG	                        TRƯỞNG PHÒNG TC-KT		                           NGƯỜI LẬP BẢNG',
            alignment: 'left',
            margin: [10, 0,0,0]
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });
          doc.content.push({
            text: ' ',
            alignment: 'left'
          });
          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            text: 'Lê Nguyễn Quốc Khang		               Nguyễn Tấn Lượng		                              Nguyễn Thành Lộc',
            alignment: 'left'
          });
        }

      },
      {
        text:'EXCEL',
        className: "btn btn-success",
        extend: 'excelHtml5',
        download: 'open',
      }
    ]
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
