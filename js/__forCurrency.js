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
	format date search
*/
function getDate(element) {
	var dateFormat = "mm/dd/yy",
	from = $( "#from" )
		.datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 3
		})
		.on( "change", function() {
			to.datepicker( "option", "minDate", getDate( this ) );
		}),
	to = $( "#to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});
	
	var date;
	try {
		date = $.datepicker.parseDate( dateFormat, e.value );
	} catch( error ) {
		date = null;
	}

	return date;
}