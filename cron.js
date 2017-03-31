$( document ).ready(function() {

	$("#create_cron_expr").on("click",function(e){
		cron.buildExpr();
	});
	
});

var cron_ui=(function(){
	hourAutoComplete=function(){
		
	} // hourAutoComplete
	
	return {
		
	}//end return
	
})();

var cron= (function(){
	showMessage=function( message){
		console.log(message);
		alert(message);
	},
	
	buildExpr=function(){
		var exp ={};
		var expstr='';
		var selectedOption=$("input[name='seloptions']:checked").attr('id');
		switch(selectedOption){
			case 'weeklyrecurring':
				exp=buildWeeklyRecurringExpr();
				break;
			case 'monthlyonce':
				exp=buildMonthlyOnceExpr();
				break;
			case 'monthlyrecurring':
				exp=buildMonthlyRecurringExpr();
				break;
			default:
				exp=buildDailyRecurringExpr();
		};
		
		var subExp= [];
		subExp.push(exp.second);   		//second
		subExp.push(exp.minute); 		//minute
		subExp.push(exp.hour); 			//hour
		subExp.push(exp.dayofmonth);	//dayofmonth
		subExp.push(exp.month); 		//month
		subExp.push(exp.weekday); 		//dayofweek
		subExp.push(exp.year); 			//year
		
		expstr= subExp.join(" ");
		
		$('#result').html(expstr);
	},
		
	buildWeeklyRecurringExpr=function(){
		var exp ={
			second: '0',
			minute: $('#minute').val(),
			hour : $('#hour').val(),
		    dayofmonth: '?',
		    month :'*',
		    weekday: [],
		    year:'*'
		};
		
		var weekday =[];
		$("input[name='weekday']:checked").each( function () {
			weekday.push($(this).val().toUpperCase());
		});
		//alert (weekday.join(","));
		exp.weekday=weekday;
		
		return exp;
	}, // end buildWeeklyRecurringExpr
	
	buildMonthlyOnceExpr=function(){
		var exp ={
			second: '0',
			minute: $('#minute').val(),
			hour : $('#hour').val(),
		    dayofmonth: $('#dayofmonth').val(),
		    month :'1/1',
		    weekday: '?',
		    year:'*'
		};
		
		return exp;
	}, //end buildMonthlyOnceExpr
	
	buildMonthlyRecurringExpr=function(){
		var exp ={
			second: '0',
			minute: $('#minute').val(),
			hour : $('#hour').val(),
		    dayofmonth: '?',
		    month :'1/1',
		    year:'*'
		};
		
		var monthlyOccurance= $('#once-month').val();
		var monthlyWeekday=$('#once-weekday').val();
		exp.weekday=monthlyWeekday + '#' + monthlyOccurance;
		
		return exp;
	}, //end buildMonthlyRecurringExpr
	
	buildDailyRecurringExpr=function(){
		var exp ={
			second: '0',
			minute: '0/'+$('#minuterecurring').val(),
			hour : '*',
		    dayofmonth: '1/1',
		    month :'*',
		    weekday: '?',
		    year:'*'
		};
		
		return exp;
	}, //end buildDailyRecurringExpr
	
	friendlyExpr=function(cronString){
		var expr='building...';
		var subexp= cronString.split(' ');
		var exp ={
			second: subexp[0],
			minute:subexp[1],
			hour : subexp[2],
		    dayofmonth:subexp[3],
		    month :subexp[4],
		    weekday:subexp[5],
		    year:subexp[6]
		};
		
		return expr;
	}//end translateExpr
	
	
	return{
		showMessage:showMessage,
		buildExpr:buildExpr,
		friendlyExpr:friendlyExpr
	}//end return
})()