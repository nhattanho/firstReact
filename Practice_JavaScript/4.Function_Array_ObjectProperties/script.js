/***********************************Talk about the functions************************************************/

// Function with return a value
function addition(number1, number2) {
    return number1 + number2;
}

// Function without returning any value
function printOut(number1, number2, number3) {
    console.log('the number1: ' + number1 + ', the number2: ' + number2 + ', and the number3: ' + number3);
}

var number1 = 10;
var number2 = 12;
var number3 = addition(10, 12); // call function
console.log('number3 is ' + number3);

// Function expression will not have a name 
var result = function(number1, number2) {
    if (number1 > number2) {
        return (number1-number2)*2;
    } else if (number1 < number2) {
        return (number2-number1)*2;
    } else {
        return (number1+number2)*2;
    }
}

console.log('the result is ' + result(10,12));
//console.log('the result is ' + result); ==> wrong, because in
//this code, it will show all content of the function in console

/***********************************Talk about the array************************************************/
//==> going to array
var arr = [1, 2, 3]; // the first way
var arr1 = new Array(1, 2, 3);// the second way
console.log(arr[0]);
console.log('the length of array arr is: ' + arr.length);

// mutate array 
arr[arr.length] = 4;
console.log('the last element in array arr is ' + arr[arr.length-1]);

// using different data type in an array
var mulType = [1, 2, 'nhattan', false];
mulType.push('last'); // add the element in the last position ==> 1, 2, 'nhattan', false, 'last'
mulType.unshift('first'); // add the element in the first position ==> 'first', 1, 2, 'nhattan', false, 'last'
mulType.pop(); // delete the last element ==> 'first', 1, 2, 'nhattan', false
mulType.shift(); // delete the first element ==> should be: 1, 2, 'nhattan', false
console.log(mulType); 

console.log(mulType.indexOf('nhattan'));// find the position of the element
var pos = mulType.indexOf('honhattan') === -1 ? 'This element is not in the array'
: 'the element is in the array';
console.log(pos);

// Need to learn about forEach and Map method of Array ==> talk into section 8.Advanced_Object and Function

/***********************************Talk about the Object************************************************/
//==> going objects and properties
var nhattan = { // the first way to create the object
    firstName: 'Nhat',
    lastName: 'Ho',
    job: 'student',
    isMarried: false
}

console.log(nhattan);
console.log(nhattan.firstName);
console.log(nhattan['lastName']);
var job = 'job';
console.log(nhattan[job]);

nhattan.firstName = 'nhattan';
nhattan['lastName'] = 'honhat';
console.log(nhattan.firstName);
console.log(nhattan['lastName']);

// The second way to create the object
var tan = new Object();
tan.firstName = 'nhattan';
tan.lastName = 'ho';
tan.job = 'student';
console.log(tan);

//==> go to the method of object
var honhattan = { // the first way to create the object
    firstName: 'Nhat',
    lastName: 'Ho',
    job: 'student',
    isMarried: false,
    birthYear: 1992,
    printInfo: function(firstName, lastName, job, isMarried) {
        console.log('his name is ' + firstName + ' ' + lastName);
        console.log('his job is: ' + job + ', and his status of married is: ' + isMarried);
    },
    calAge: function(birthYear) {
        return 2020 - birthYear;
    }
}
honhattan.printInfo('Nhat', 'Ho', 'student', false);
console.log(honhattan.calAge(1992));

// ==> going to use keyword this 
var honhattan = { // the first way to create the object
    firstName: 'Nhat',
    lastName: 'Ho',
    job: 'student',
    isMarried: false,
    birthYear: 1992,
    printInfo: function() {
        console.log('his name is ' + this.firstName + ' ' + this.lastName);
        console.log('his job is: ' + this.job + ', and his status of married is: ' + this.isMarried);
    },
    calAge: function() {
        return 2020 - this.birthYear;
        // or we can: this.age = 2020 - this.birthYear instead of line 116
    }
}
honhattan.printInfo();
console.log(honhattan.calAge());
honhattan.age = honhattan.calAge();
console.log(honhattan);