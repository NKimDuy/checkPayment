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

function formatTableExPDF_DSSV(id, len, TenLop, DR, DP) {

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
        footer: true,
        exportOptions: {
          columns: ':not(:last-child)'
        },
        title: function() {return ""},
        customize: function (doc) {

          // Thêm nội dụng vào đầu tài liệu
          doc.content.splice(0, 0, {
            columns: [
              {
                text: ['BỘ GIÁO DỤC VÀ ĐÀO TẠO'],
                alignment: 'center'
              },

              {
                text: ['CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'],
                alignment: 'center'
              },

            ],
            alignment: 'center'
          });

          doc.content.splice(1, 0, {
            columns: [
              {
                text: ['TRƯỜNG ĐẠI HỌC MỞ TP. HỒ CHÍ MINH'],
                alignment: 'center'
              },

              {
                text: ['Độc lập - Tự do - Hạnh phúc'],
                alignment: 'center'
              },

            ],
            margin: [0,0,0,15],
            alignment: 'center'
          });

          doc.content.splice(2, 0, {
            text: 'DANH SÁCH ĐÓNG HỌC PHÍ',
            alignment: 'center'
          });

          doc.content.splice(3, 0, {
            text: "Lớp: " + TenLop,
            alignment: 'center'
          });

          doc.content.splice(4, 0, {
            text: "Tại "+ DP,
            alignment: 'center'
          });

          doc.content.splice(5, 0, {
            text: "(" + DR + ")",
            alignment: 'center',
            margin: [0,0,0,20]
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            columns: [
              {
                text: ['\n P. HIỆU TRƯỞNG'],
                alignment: 'center'
              },

              {
                text: ['\n TRƯỞNG PHÒNG TC-KT'],
                alignment: 'center'
              },

              {
                text: [' TP. HCM, ngày      tháng       năm     \n NGƯỜI LẬP BẢNG'],
                alignment: 'center'
              },

            ],
            alignment: 'center',
            margin: [0,0,0,50]
          });

          doc.content.push({
            columns: [
              {
                text: ['Lê Nguyễn Quốc Khang'],
                alignment: 'center'
              },

              {
                text: ['Nguyễn Tấn Lượng'],
                alignment: 'center'
              },

              {
                text: ['Nguyễn Thành Lộc'],
                alignment: 'center'
              },

            ],
            alignment: 'center'
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

function formatTableExPDF_DSL(id, len, DR, DP, He) {

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
        footer: true,
        exportOptions: {
          columns: ':not(:last-child)'
        },
        title: function() {return ""},
        customize: function (doc) {

          // Thêm nội dụng vào đầu tài liệu
          doc.content.splice(0, 0, {
            columns: [
              {
                text: ['BỘ GIÁO DỤC VÀ ĐÀO TẠO'],
                alignment: 'center'
              },

              {
                text: ['CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'],
                alignment: 'center'
              },

            ],
            alignment: 'center'
          });

          doc.content.splice(1, 0, {
            columns: [
              {
                text: ['TRƯỜNG ĐẠI HỌC MỞ TP. HỒ CHÍ MINH'],
                alignment: 'center'
              },

              {
                text: ['Độc lập - Tự do - Hạnh phúc'],
                alignment: 'center'
              },

            ],
            margin: [0,0,0,15],
            alignment: 'center'
          });

          doc.content.splice(2, 0, {
            text: 'BẢNG QUYẾT TOÁN HỌC PHÍ',
            alignment: 'center'
          });

          doc.content.splice(3, 0, {
            text: "Hệ "+ He,
            alignment: 'center',
          });

          doc.content.splice(4, 0, {
            text: "(" + DR + ")",
            alignment: 'center',
          });

          doc.content.splice(5, 0, {
            text: "Tại "+ DP,
            alignment: 'center',
            margin: [0,0,0,20]
          });

          doc.content.push({
            text: ' ',
            alignment: 'left'
          });

          doc.content.push({
            columns: [
              {
                text: ['ĐẠI DIỆN \n TRƯỜNG ĐẠI HỌC MỞ TP.HCM'],
                alignment: 'center'
              },

              {
                text: ['ĐẠI DIỆN \n' + DP],
                alignment: 'center'
              },

            ],
            alignment: 'center',
          });

          doc.content.push({
            columns: [
              {
                columns: [
                  
                  {
                    text: ['Hiệu trưởng'],
                    alignment: 'center'
                  },

                  {
                    text: ['Kế toán trưởng'],
                    alignment: 'center'
                  }

                ],
                alignment: 'center'
              },

              {
                columns: [
                  
                  {
                    text: ['Hiệu trưởng'],
                    alignment: 'center'
                  },

                  {
                    text: ['Kế toán trưởng'],
                    alignment: 'center'
                  }

                ],
                alignment: 'center'
              },

            ],
            alignment: 'center',
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
