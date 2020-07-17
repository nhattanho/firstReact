/*******************************Spread Operator****************************/
function addNum(a, b, c, d) {
    return a+b+c+d;
}

var arr = [4, 5, 7, 9, 10];

var sum1 = addNum.apply(null,arr);
console.log(sum1);

var sum2 = addNum(...arr); // just get 4 elements and ignoring the last one
console.log(sum2);

var arr1 = [1, 2, 3, 4];
var arr2 = [6, 7, 8, 9];
var arr3 = [...arr1, 5, ...arr2]; // 1, 2, 3, 4, ...., 9
console.log(arr3);
/*******************************Rest Operator****************************/
//ES5
function addNum1() {
    console.log(arguments);//arguments will be a list of objects
    var getNodeArr = Array.prototype.slice.call(arguments);// getNodeArr = [arr, arr1]
    getNodeArr.forEach(element => {
        console.log(element);
        element.forEach(cur => {
            console.log(cur); // arr: 4, 5, 7, 9, 10, arr1 = 1, 2, 3, 4
        });
    });
}
addNum1(arr, arr1);

function addNum2() {
    console.log(arguments);//arguments will be a list of objects
    var getNodeArr = Array.from(arguments);// getNodeArr = [arr, arr1]
    getNodeArr.forEach(element => {
        console.log(element);
        element.forEach(cur => {
            console.log(cur); // arr: 4, 5, 7, 9, 10, arr1 = 1, 2, 3, 4
        });
    });
}
addNum2(arr, arr1);

//ES6 
function addNum3(...arr4) { // arr4 = [arr, arr1]
    console.log('I am in addNum3');
    arr4.forEach(element => {
        console.log(element);
        if (element !== null) {
            element.forEach(cur => {
                console.log(cur); // arr: 4, 5, 7, 9, 10, arr1 = 1, 2, 3, 4
            });
        }
    });
}
addNum3(null, arr1);// we can use addNum3(arr, arr1);


function addNum3(...arr4) { // arr4 = [null, arr1]
    console.log('I am in addNum4');
    arr4.forEach((...arr5) => { //arr5 = [current, index, arr4]
        console.log(arr5[0]);// current
        console.log(arr5[1]);// index
        console.log(arr5[2]);// itself
        if (arr5[0] !== null) {
            arr5[0].forEach(cur => {
                console.log(cur); // arr: 4, 5, 7, 9, 10, arr1 = 1, 2, 3, 4
            });
        }
    });
}
addNum3(null, arr1);// we can use addNum3(arr, arr1);

let newvar = [1, 2, 3, 4, 6];
let getarr = newvar.map( (...arguments) => {
    return arguments[1]; // only get the index
});
console.log(`testing for rest parameters ${getarr}`);

// ==> next testing for function
const test = (...args) => {
    return args.filter(el => el === 1);
};
console.log(test(1, 2, 3)); // 1

const newArr = [34, 67, 89, 40];
const get = newArr.filter(el => el < 67); // return an array which have the numbers less than 67
console.log(get); // 34, 40

//Apply Rest Operator for Objects
console.log('**********************Apply for Objects****************************');
const person1 = {
    name: 'Nhat'
};

const person2 = {
    ...person1,
    age: 29
};
console.log(person2);
console.log('********************************************************************');

/*******************************Default Operator****************************/
//ES5
function Student(first, last, age, country) {
    age === undefined ? age = 29 : age = age;
    country === undefined ? country = 'American' : country = country;
    this.first = first;
    this.last = last;
    this.age = age;
    this.country = country;
}

//ES6
function Student1(first, last, age = 29, country = 'American') {
    this.first = first;
    this.last = last;
    this.age = age;
    this.country = country;
}

var nhat = new Student1('nhat', 'ho', 31, 'canada');
console.log(nhat);
var tan = new Student1('tan', 'ho');
console.log(tan);
var ho = new Student1('davis');
console.log(ho);