var user1Name = prompt('Enter the name of user1: ');
var user1Mass = prompt('Enter the mass of user1(kg): ');
var user1Height = prompt('Enter the height of user1(cm): ');
alert(user1Name + ' has the mass: ' + user1Mass + ' kg' + ' and the height: ' + user1Height + ' cm');
var BMIUser1 = user1Mass / (user1Height*user1Height);

var user2Name = prompt('Enter the name of user2: ');
var user2Mass = prompt('Enter the mass of user2(kg): ');
var user2Height = prompt('Enter the height of user2(cm): ');
alert(user2Name + ' has the mass: ' + user2Mass + ' kg' + ' and the height: ' + user2Height + ' cm');
var BMIUser2 = user2Mass / (user2Height*user2Height);

console.log('BMI of user1: ' + BMIUser1 + ', and BMI of user2: ' + BMIUser2);
var BMIHeigher = BMIUser1 > BMIUser2;
console.log("Is the user1\'s BMI is greater than user2\'s BMI? " + BMIHeigher);
console.log("Is the user1's BMI is greater than user2's BMI? " + BMIHeigher);