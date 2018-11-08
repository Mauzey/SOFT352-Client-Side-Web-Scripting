// on page load
$(document).ready(function(){
	// fill existing values
	$('#ISAD351T1').val(localStorage.getItem('ISAD351T1'));
	$('#ISAD351C1').val(localStorage.getItem('ISAD351C1'));
	$('#ISAD351E1').val(localStorage.getItem('ISAD351E1'));
	$('#SOFT352T1').val(localStorage.getItem('SOFT352T1'));
	$('#SOFT352C1').val(localStorage.getItem('SOFT352C1'));

	// calculate overall grade on button press
	$('#calculateBtn').click(function(){ calculateGrade(); });
});

// on input field keypress, store grade
$('.gradeInput').keyup(function(){
	switch(this.id){
		case 'ISAD351T1':
			localStorage.setItem('ISAD351T1', this.value);
			break;
		case 'ISAD351C1':
			localStorage.setItem('ISAD351C1', this.value);
			break;
		case 'ISAD351E1':
			localStorage.setItem('ISAD351E1', this.value);
			break;
		case 'SOFT352T1':
			localStorage.setItem('SOFT352T1', this.value);
			break;
		case 'SOFT352C1':
			localStorage.setItem('SOFT352C1', this.value);
			break;
		default:
			break;
	}
});

function calculateGrade(){
	var overallGrade = 0;

	overallGrade += (parseInt(localStorage.getItem('ISAD351T1')) / 100) * 15;
	overallGrade += (parseInt(localStorage.getItem('ISAD351C1')) / 100) * 45;
	overallGrade += (parseInt(localStorage.getItem('ISAD351E1')) / 100) * 40;
	overallGrade += (parseInt(localStorage.getItem('SOFT352T1')) / 100) * 10;
	overallGrade += (parseInt(localStorage.getItem('SOFT352C1')) / 100) * 90;	

	// validation
	if (!isNaN(overallGrade)){
		document.getElementById('overallGrade').innerHTML = overallGrade;
	} else {
		document.getElementById('overallGrade').innerHTML = "Ensure all values are numbers";
	}
}