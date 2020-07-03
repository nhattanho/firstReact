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

// Function expression will don't have a name 
var result = function(number1, number2) {
    if (number1 > number2) {
        return (number1-number2)*2;
    } else if (number1 < number2) {
        return (number2-number1)*2;
    } else {
        (number1+number2)*2;
    }
}

console.log('the result is ' + result(10,12));
//console.log('the result is ' + result); ==> wrong, because in
//this code, it will show all content of the function in console