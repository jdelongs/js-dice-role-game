/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//global scope variables
var scores, roundScore, activePlayer, gamePlaying; 
init(); 


document.querySelector('.dice').style.display = 'none'; 

/* this function generates the random number of the dice and adds it to the current
score*/ 
document.querySelector('.btn-roll').addEventListener('click', () => {

    if (gamePlaying) {

        //1. random number between 1-6
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result in the image
        var diceDOM = document.querySelector('.dice')  
        diceDOM.style.display = 'block'; 
        diceDOM.src = 'dice-' + dice + '.png'; 

        //3. update the round score but only if th roll number was not a 1
        if (dice !== 1){
            //add score
            roundScore += dice; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //move on to the next player
            nextPlayer(); 

        }
    }
}); 

/*this function is the event listener for the hold button and updates the global 
score and checks to see if the player has won*/
document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying){
        //add current score to GLOBAL Score 
        scores[activePlayer] += roundScore; 

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //check if player won the game
        if(scores[activePlayer] >= 20){
            gamePlaying = false; 
            //set the name of the player to winner 
            document.querySelector('#name-' + activePlayer).textContent = 'Winner'; 
            //hid the dice 
            document.querySelector('.dice').style.display = 'none'; 
            //add the css class of winner to the player panel that won
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //remove the active class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
        } else {
            //if the button is pushed switch player
            nextPlayer(); 
        }
    }
}); 

/*function to move to the next player under certain conditions */ 
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //reset the score
    roundScore = 0; 

    //set the current score in the dom to 0
    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent ='0'; 

    //toggle which player is active
    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none'; 

}

/*event listener to reset the game*/ 
document.querySelector('.btn-new').addEventListener('click', init); 

/*function to reset the game*/ 
function init() {
    scores = [0, 0];
    roundScore = 0; 
    activePlayer = 0;
    gamePlaying = true; 

    //sets initial stat of scores and current score to 0
    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0'; 
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 


    //reset the player text
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2';
    
    //removes the winner classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove the active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //add back the active class for player 1
    document.querySelector('.player-0-panel').classList.add('active');

} 