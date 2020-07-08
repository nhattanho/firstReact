(function(){
    function Question(question, answer, correct){
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for(var i = 0; i < this.answer.length; i++) {
            console.log(i + ':' + this.answer[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        var sc = 0;
        if (ans === this.correct) {
            console.log('Correct answer!');
            sc = callback(true);
        } else {
            console.log('Wrong answer!');
            sc = callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your current score is: ' + score);
        console.log('***********************************');
    }

    var q1 = new Question('Is JS is the collest programming language?', ['Yes', 'No'], 0);
    var q2 = new Question('What is the name of course\'s teacher',['tan', 'nhat', 'ho'],2);
    var q3 = new Question('What does the best describle coding', ['Boring', 'Hard', 'Fun', 'Tedious'], 2);

    // Recal: Funtion into a function <=> Closure in JS
    /* the inner function can access the variable of parent function. 
    Besides, the variable of parent function will be kept track and accessed
    any time by child function. On the other word, this variable just similar to
    static varible in C/C++. Example: sc is the static variable of function(correct) */
    function score() {
        var sc = 0;
        return function(correct) { // correct: true or false
            if (correct) sc++;
            return sc;
        }
    }
    var keepScore = score();

    var questions = [q1, q2, q3];
    nextQuestion();
    function nextQuestion(){
        var n = Math.floor(Math.random()*questions.length);
        questions[n].displayQuestion();
        var answer = prompt('Please select the correct answer.');
        if(answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        } 
    }
})();