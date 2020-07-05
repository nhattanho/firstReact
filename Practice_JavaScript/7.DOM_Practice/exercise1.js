// Adding new feature that if the player rolls two six values consecutively
//in their roll, they're gonna lose their all scores
var scores, roundScore, activePlayer, lastdice;
init();
/* Handling button events */
/* 1.Roll Dice */
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(document.getElementById('name-' + activePlayer).textContent !== 'Winner!') {
        // random number
        var dice = Math.floor(Math.random()*6) + 1; 
        var dicesource = 'dice-' + dice + '.png';
        // display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.src = dicesource;
        diceDOM.style.display = 'block';
        //update the round score
        if(dice == 6 && lastdice == 6) {
            //player looses score as new requiments
            scores[activePlayer] == 0;
            document.getElementById('score-' + activePlayer).innerText = '0';
            alert('You got two six values in your roll!');
            nextPlayer();
        }
        else if(dice > 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            document.getElementById('current-' + activePlayer).textContent = 0;
            alert('You got 1 in your roll');
            nextPlayer();
        }
        lastdice = dice;
    } else alert('Game End, Please Play A New Game!');
});
/* 2.Hold Event*/
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(scores[activePlayer] < 100){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
        } else nextPlayer();
    } else alert('Game End, Please Play A New Game!'); 
});
/* 3.Making a new Event */
document.querySelector('.btn-new').addEventListener('click', function(){
    init();
});

/* Adding suppot functions */
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    lastdice = 0;//saving the last value of dice
    // Reset all value to 0 in the begining
    //document.querySelector is slower than getElementById
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
};

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
};