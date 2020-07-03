// using for loop
var arr = ['honhattan', 1, 3, 6, false, 'blue'];
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

for(var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') continue;
    console.log(arr[i]);
} // result: 'honhattan', 'blue'

for(var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') break;
    console.log(arr[i]);
} // result: 'honhattan'

// using while loop
var i = 0;
while (i < arr.length) {
    console.log (arr[i]);
    i++;
}

// going to exercise
var nhat = {
    fullName: 'honhattan',
    grades: [100, 78, 89, 93],
    calExtra: function() {
        this.extra = []; // declare an empty array
        this.finalGrade = []; // member finalGrade will be created for this object when calExtra was called
        var percentage;
        for(var i = 0; i < this.grades.length; i++) { // method of the object cannot access directly
            //to the member variable, instead of that, we need to use this to access it.
            if (this.grades[i] < 70) {
                percentage = 0.2;
            } else if (this.grades[i] >= 70 && this.grades[i] <= 80) {
                percentage = 0.1;
            } else {
                percentage = 0;
            }
            this.extra[i] = this.grades[i] * percentage;
            this.finalGrade[i] = this.grades[i] + this.extra[i];
        }
    }
}

nhat.calExtra(); // this line help program create an array extra and finalGrade for nhat object
for (var i = 0; i < nhat.finalGrade.length; i++) {
    console.log(nhat.finalGrade[i]);
}

function calAverage (finalGrade) {
    var sum = 0;
    for(var i = 0; i < finalGrade.length; i++) {
        sum += finalGrade[i];
    }
    return sum/finalGrade.length;
}

nhat.average = calAverage(nhat.finalGrade);
console.log(nhat.average);

var test = nhat.average;
var result;
console.log('Grade is ');
if (test >= 90) {
    result = 'A';
} else if (test < 90 && test >= 80) {
    result = 'B';
} else if (test < 80 && test >= 70) {
    result = 'C';
} else if (test < 70 && test >= 60) {
    result = 'D';
} else {
    result = 'F';
}
console.log(result);