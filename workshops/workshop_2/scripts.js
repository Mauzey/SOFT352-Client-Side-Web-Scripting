// on page load
$(document).ready(function(){
	// process button presses
	$('#redBtn').click(function(){
		$.get('http://localhost:9000/red', function(data){
			$('#redDiv').html(data);
		});
	});
	$('#greenBtn').click(function(){
		$.get('http://localhost:9000/green', function(data){
			$('#greenDiv').html(data);
		});
	});
	$('#blueBtn').click(function(){
		$.get('http://localhost:9000/blue', function(data){
			$('#blueDiv').html(data);
		});
	});
});

function updateTime(){
	$.get('http://localhost:9000/time', function(data){
		$('#time').html(data);
	});
}