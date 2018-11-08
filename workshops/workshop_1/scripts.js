$(document).ready(function(){
	// Changes background colour of the 'light' div when the burn button is clicked
	$('#burn').click(function(){
		// If it's currently cyan, change to yellow
		if ($('.light').css('background-color') == 'rgb(0, 255, 255)'){
			$('.light').css('background-color', '#FFFF00');
		// If it's currently yellow, change to magenta
		} else if ($('.light').css('background-color') == 'rgb(255, 255, 0)'){
			$('.light').css('background-color', '#FF00FF');
		// If it's currently magenta, change to cyan
		} else if ($('.light').css('background-color') == 'rgb(255, 0, 255)'){
			$('.light').css('background-color', '#00FFFF');
		}
	});

	// Following a certain keypress, the background colour of the 'light' div changes
	$('body').keypress(function(evt){
		// If the 'c' key is pressed, change to cyan
		if (evt.keyCode === 99){
			$('.light').css('background-color', '#00FFFF');
		// If the 'y' key is pressed, change to yellow
		} else if (evt.keyCode === 121){
			$('.light').css('background-color', '#FFFF00');
		// If the 'm' key is pressed, change to magenta
		} else if (evt.keyCode === 109){
			$('.light').css('background-color', '#FF00FF');
		}
	});
});