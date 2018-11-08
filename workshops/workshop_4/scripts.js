// take an array and function as arguments
// returns the result of applying the function to each element of the array
function forEach(array, fnction){
	for (var i = 0; i < array.length; i++){
		fnction(array[i]);
	}
}

// converts an array into a single value by applying a function to combine each
// element of the array with a base value
function reduce(combine, base, array){
	forEach(array, function(element){
		base = combine(base, element);
	});
	return base;
}

// to be used as a combine argument in the forEach function
// returns the sum of two numbers
function add(a, b){
	return a + b;
}

// to be used as a combine argument in the forEach function
// takes an array of numbers and returns the number of zeros inside it
function countZeros(base, element){
	if (element === 0){ base++; }
	return base;
}

// passes through an array, applying a function to each element whilst creating a new
// array consisting of the resulting values
function map(array, fnction){
	var result = [];

	forEach(array, function(element){
		result.push(fnction(element));
	});
	return result;
}

// to be used as an argument in the map function
// raises all numbers in array to the power of two
function square(element){
	return element * element;
}

// takes a string and encrypts it by adding a value to the ascii value of each letter
function encrypt(strng, value){
	// convert string to array of letters
	var letters = Array.from(strng);
	var encryption = [];

	// apply encryption
	forEach(letters, function(element){
		encryption.push(String.fromCharCode(add(element.charCodeAt(0), value)));
	});

	// combine array into one single string and return
	return encryption.join('');
}

// pass through array and create a new array consisting of elements that
// passed the test
function filter(array, test){
	var passed = [];

	forEach(array, function(element){
		if (test(element)){
			passed.push(element);
		}
	});
	return passed;
}

// to be used as an argument in the filter function
// removes numbers whose square root is lower than 50
function remove50(element){
	return Math.sqrt(element) >= 50;
}

// removes all space characters from a string
function strip(strng){
	// convert string into array of letters
	var letters = Array.from(strng);

	// remove space characters and return
	return filter(letters, function(element){
		return element.charCodeAt(0) != 32;
	}).join('');
}

// recursive multiplication function
function recursiveMultiply(a, b){
	if (a == 0 || b == 0){
		return 0;
	} else if (b > 0){
		return a + recursiveMultiply(a, b - 1);
	}
	return -recursiveMultiply(a, -b);
}

// iterative multiplication function
function iterativeMultiply(a, b){
	var answer = 0;

	if (a == 0 || b == 0){

	} else if (b > 0){
		for (var i = 0; i < b; i++){
			answer += a;
		}
	} else {
		for (var i = 0; i > b; i--){
			answer -= a;
		}
	}
	return answer;
}

// testing timing for multiplication functions
var start, end;
// recursive
start = Date.now();
recursiveMultiply(100000, 100000);
end = Date.now();
console.log("Recursive multiplication took: " + (end - start) + "ms");

// iterative
start = Date.now();
iterativeMultiply(100000, 100000);
end = Date.now();
console.log("Iterative multiplication took " + (end - start) + "ms");