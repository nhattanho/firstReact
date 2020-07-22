//Destructuring
//ES5
var nhat = ['nhatho', 26];
var name = nhat[0];
var age = nhat[1];

var ages = [12, 67, 11, 8, 56];
var full = ages.map(function(cur){
    return cur >= 18;
});
console.log(full);// false true false false true
console.log(full.indexOf(true));

//ES6 for an array
var [name, age] = ['nhat', 26];
console.log(name + ' ' + age);

console.log(ages.findIndex((cur, index) => {
    console.log(index);
    return cur >= 18; // just show the first element in a array that satisfies the requirement
}))

console.log(ages.findIndex(cur => {
    return cur >= 18; // just show the first element in a array that satisfies the requirement
}));

console.log(ages.find(cur => cur >= 18)); // just show the first element in a array that satisfies the requirement

// For an array + function
function calGrade(grade) {
    let newGrade = 100 - grade;
    return [grade, newGrade]; // return directly an array
}
let [grade, newGrade] = calGrade(89);
console.log(`The result: grade: ${grade}, and newGrade: ${newGrade}`);

// For object
console.log('test for object');
let obj = {
    name1: 'tan',
    age1: 29,
    job1: 'tutor'
};

// Note: the {name1 and age1} has to be same as the name1 and age1 of obj
let {name1, age1} = obj;// name = obj.name and age = obj.age
console.log(name1 + ' ' + age1);

//we can let as below:
let {job1, age1, name1 } = obj; // doesn't matter the order of object's method(job1, name1, age1)
// The only thing we need to focus is the name of left object has to be same name as the right object
// and the JS will assign approriate value 
console.log(job1); // tutor
console.log(age1); // 29
console.log(name1); // tan

// or we can change the name of variable for an object
let {name1: a, age1: b} = obj;// ==> a = obj.name and b = obj.age
console.log(a + ' ' + b);


// ES5
const boxes = document.querySelectorAll('.box');// return a Nodelists
//console.log('boxes 0 is ' + boxes[0]);
let getArr = Array.prototype.slice.call(boxes); // return an array by using prototype slice of array to cut a list into each element
getArr.forEach(element => {
    element.style.backgroundColor = 'yellow';
});

for(let i = 0; i < boxes.length; i++) {
    if (boxes[i].className === 'box blue') {
        boxes[i].textContent = 'I\'m Red now';
        boxes[i].style.backgroundColor = 'red';
        //console.log(boxes[i].style.backgroundColor);
        //console.log(getArr[i].style.backgroundColor);
        //getArr[i].style.backgroundColor = 'green'; // do the same line 46
        console.log('testing for nodelist');
    }
}


// Destructuring in ES6
let getArr6 = Array.from(boxes); // return an array by using prototype slice of array to cut a list into each element
getArr6.forEach(element => {
    element.style.backgroundColor = 'dodgerblue';
});

for(let cur of boxes) { // can do the same as getArr6
    if (cur.className === 'box green') {
        cur.style.backgroundColor = 'green';
    } else if (cur.className === 'box blue') {
        cur.style.backgroundColor = 'red';
    } else {
        cur.style.backgroundColor = 'orange';
    }
}