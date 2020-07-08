(function(){
    function Question(question, answers, correct) {
        this.question =question;
        this.answers = answers;
        this.correct = correct;
    }
    Question.prototype.displayQuestion = function() {
        var message = this.question + '\n';
         for(var i = 0; i < this.answers.length; i++) {
             message += i + ':' + this.answers[i] + '\n';
         }
         console.log(message);
    }
    
    Question.prototype.checkAnswer = function(ans) {
        if (ans === this.correct) {
            alert('You got true answer');
        } else {
            alert('You got wrong answer, try again?');
        }
    }
    
    var q1 = new Question('what\'s your instructor\'s name?', ['tan', 'nhat', 'ho'], 0);
    var q2 = new Question('Why do you want to take this course?', ['learn', 'nothing', 'explore'], 0);
    var q3 = new Question('How do you think about this course?', ['excited', 'boring', 'tedious'], 1);
    
    var questions = [q1, q2, q3];
    
    //questions[pos].displayQuestion();
    var score = 0;
    do {
        var pos = Math.floor(Math.random()*questions.length); // from 0-2
        console.log('pos is ' + pos);
        questions[pos].displayQuestion();
        var ans = prompt('Your answer is: ');
        if (ans === 'exit') break;
        else {
            ans = parseInt(ans);
            if(ans === questions[pos].correct) {
                console.log('You got true answer');
                score++;
            } else {
                console.log('You got wrong answer')
            }
        }
        alert('Your score is ' + score);
    }while(true);
    alert('Finally, you have ' + score);
})();

