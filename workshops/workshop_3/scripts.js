var studentArr = [];
var lecturerArr = [];
var moduleArr = [];

// create a new student, lecturer, or module
factory = {
	createStudent: function(fn, sn, stge){
		var product;

		product = {
			ID		: Math.floor((Math.random() * 99999999) + 1),
			forename: fn,
			surname	: sn,
			stage	: stge,

			progress: function(){
				this.stage++;
			}
		};
		return product;
	},

	createLecturer: function(fn, sn){
		var product;

		product = {
			ID			 : Math.floor((Math.random() * 99999999) + 1),
			forename	 : fn,
			surname		 : sn,
			modulesTaught: []
		};
		return product;
	},

	createModule: function(ttl, mxStu, stge){
		var product;

		product = {
			ID			   : Math.floor((Math.random() * 99999999) + 1),
			title		   : ttl,
			maxStudents	   : mxStu,
			enroledStudents: [],
			stage		   : stge,

			enrol: function(stdt){
				if (stdt.stage == this.stage && this.enroledStudents.length < this.maxStudents){
					this.enroledStudents.push(stdt);
				}
			}
		};
		return product;
	}
}

// example of factory usage
var student1 = factory.createStudent('Alex', 'Mounsey', 3);

// load the appropriate html for adding a new student, lecturer, or module
function loadAddElement(){
	var dropdownValue = document.getElementById('addDropdown').value;

	if (dropdownValue === 'student'){
		document.getElementById('addElement').innerHTML = `
			<table>
				<tr>
					<th>Add Student</th>
					<th><button onclick="addStudent()" type="button">Save</button></th>
				</tr>
				<tr>
					<th><input id="fn" type="text" value="Forename"/></th>
					<th><input id="sn" type="text" value="Surname"/></th>
				</tr>
				<tr><th colspan="2"><input id="stge" type="text" value="Stage"/></th></tr>
			</table>
			`;
	} else if (dropdownValue === 'lecturer'){
		document.getElementById('addElement').innerHTML = `
			<table>
				<tr>
					<th>Add lecturer</th>
					<th><button onclick="addLecturer()" type="button">Save</button></th>
				</tr>
				<tr>
					<th><input id="fn" type="text" value="Forename"/></th>
					<th><input id="sn" type="text" value="Surname"/></th>
				</tr>
			</table>
		`;
	} else if (dropdownValue === 'module'){
		document.getElementById('addElement').innerHTML = `
			<table>
				<tr>
					<th>Add Module</th>
					<th><button onclick="addModule()" type="button">Save</button></th>
				</tr>
				<tr>
					<th><input id="ttl" type="text" value="Title"/></th>
					<th><input id="mxStu" type="text" value="Max Student Capacity"/></th>
				</tr>
				<tr>
					<th colspan="2"><input id="stge" type="text" value="Stage"/></th>
				</tr>
			</table>
		`;
	}
}

// add new student object
function addStudent(){
	var newStudent = factory.createStudent(document.getElementById('fn').value,
		document.getElementById('sn').value, document.getElementById('stge').value);

	studentArr.push(newStudent);
}

// add new lecturer object
function addLecturer(){
	var newLecturer = factory.createStudent(document.getElementById('fn').value,
		document.getElementById('sn').value);

	lecturerArr.push(newLecturer);
}

// add new module object
function addModule(){
	var newModule = factory.createStudent(document.getElementById('ttl').value,
		document.getElementById('mxStu').value, document.getElementById('stge').value);

	moduleArr.push(newModule);
}