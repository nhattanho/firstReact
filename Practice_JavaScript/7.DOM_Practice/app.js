/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer;
/* scores = [0,0];
roundScore = 0;
activePlayer = 0;*/
init();

dice1 = Math.floor(Math.random()*6 + 1); // test for random number from 1 to 6
//console.log(dice1);
//document.querySelector('#current-' + activePlayer).textContent = dice;
//if we want to change the type of text, we can do as below
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice1 + '</em>';
//<em></em> <=> means the font is italic text

//var x = document.querySelector('#score-0').textContent; // # means we are pointing to the id

//document.querySelector('.dice').style.display = 'none'; // . means we are pointing to the class

/*
//handling the event
function btn() {
    // random number
    var dice = Math.floor(Math.random()*6) + 1; 
    //console.log(dice);
    var dicesource = 'dice-' + dice + '.png';
    //console.log(dicesource);
    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = dicesource;
    diceDOM.style.display = 'block';

}
btn();
*/
//document.querySelector('.btn-roll').addEventListener('click', btn);
/* or we can use anonymous function like below:
document.querySelector('.btn-roll').addEventListener('click', function(){

}); */

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(document.getElementById('name-' + activePlayer).textContent !== 'Winner!') {
    // random number
    var dice = Math.floor(Math.random()*6) + 1; 
    //console.log(dice);
    var dicesource = 'dice-' + dice + '.png';
    //console.log(dicesource);
    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = dicesource;
    diceDOM.style.display = 'block';
    
    //update the round score
    if(dice > 1) {
        roundScore += dice;
        //document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        document.getElementById('current-' + activePlayer).textContent = roundScore; //same line above
    } else {

        document.getElementById('current-' + activePlayer).textContent = 0;

        //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        /* activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-' + activePlayer).textContent = 0;

        //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

        // line 79 and 80 can be replaced by two lines: 69 and 76
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none'; */
        nextPlayer();
    }
    } else alert('Game End, Please Play A New Game!');
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(scores[activePlayer] < 20){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
        } else nextPlayer();
    } else alert('Game End, Please Play A New Game!'); 
    /*
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    */
});

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
});

//document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

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