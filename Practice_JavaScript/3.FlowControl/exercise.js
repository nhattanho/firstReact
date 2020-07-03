var grade1 = (90 + 86 + 99) / 3;
var grade2 = (99 + 69 + 89) / 3;
var grade3 = (99 + 89 + 49) / 3;

alert("The grade1 is " + grade1 + ', and the grade2 is ' + grade2);

if (grade1 > grade2) {
    console.log('grade1 is greater than grade2');
} else if (grade1 < grade2) {
    console.log('grade1 is less than grade2');
} else {
    console.log('There is a tie');
}

if (grade1 > grade2 && grade1 > grade3) {
    console.log('the grade1 is the greatest');
} else if (grade2 > grade1 && grade2 > grade3) {
    console.log('the grade2 is the greatest');
} else if (grade3 > grade1 && grade3 > grade2){
    console.log('the grade3 is the greatest');
} else {
    console.log('There is a draw');
}