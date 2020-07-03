function extraCreditCal(grade) {
    if (grade >= 80) {
        percentage = 0.3;
    } else if (grade >= 90) {
        percentage = 0.2;
    } else {
        percentage = 0.4;
    }
    return grade*percentage;
}

function finalGrade (grade) {
    return grade+extraCreditCal(grade);
}

var grades = [79, 90, 78];
var extras = [extraCreditCal(grades[0]), extraCreditCal(grades[1]), extraCreditCal(grades[2])];
console.log(extras);
var finals = [finalGrade(grades[0]), finalGrade(grades[1]), finalGrade(grades[2])];
console.log(finals);

// going to the next exercise
var user1 = {
    name: prompt('Enter the user1\'s name'),
    mass: prompt('Enter the user1\'s mass'),
    height: prompt('Enter the user1\'s height'),
    calBMI: function() {
        this.bmi = this.mass / (this.height*this.height);
        return this.bmi;
    }
}

var user2 = {
    name: prompt('Enter the user2\'s name'),
    mass: prompt('Enter the user2\'s mass'),
    height: prompt('Enter the user2\'s height'),
    calBMI: function() {
        this.bmi = this.mass / (this.height*this.height);
        return this.bmi;
    }
}

/* Two lines 46 and 47 help program calculate the bmi from the method of the object 
because bmi is only created when function calBMI was called. If these lines donnot exist,
the line 50th will be fail because bmi has not declared yet */
user1.calBMI();
user2.calBMI();

console.log(user1, user2);
console.log('User1\'s BMI: ' + user1.bmi + ', and user2\'s BMI: ' + user2.bmi);
// if two lines 46 and 47 donot exist, we can use the line 52 below to replace for line 50th
//console.log('User1\'s BMI: ' + user1.calBMI() + ', and user2\'s BMI: ' + user2.calBMI());

if (user1.bmi > user2.bmi) {
    console.log(user1.name + ' has a higher BMI.');
} else if (user1.bmi < user2.bmi) {
    console.log(user1 + ' has lower BMI.');
} else {
    console.log('They have the same BMI.');
}