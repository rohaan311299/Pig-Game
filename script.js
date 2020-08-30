/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores,roundScore,activePlayer,gamePlaying;

init();//initial variables are stored in it


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1.to generate a random number between 1-6
        var dice=Math.floor(Math.random()*6)+1;

        //2.display the result
        var diceDOM=document.querySelector('.dice')
        diceDOM.style.display='block';//to make it visible
        diceDOM.src='dice-' + dice+'.png';

        //3.update the round score IF the rolled number was not 1
        if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-'+ activePlayer).textContent=roundScore;
        }else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //add current score to players global score
        scores[activePlayer] += roundScore;//adds final score after hold is clicked

        //update UI 
        document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];//shows score after hold is clicked

        //check if player won the game
        if(scores[activePlayer]>=100){
            document.querySelector('#name-'+activePlayer).textContent="Winner!";//displays winner in name of the player
            document.querySelector('.dice').style.display='none';//removes the dice image
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');//adds styling to the winner class
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');//removes the active class
            gamePlaying=false;//prevents dice from rolling any more
        }else{
            //next Player
            nextPlayer();
        }
    }
});

function nextPlayer(){
     //next player
     activePlayer ===0 ? activePlayer=1 : activePlayer=0;//to change player when current player gets 0
     roundScore =0;//it starts from 0 for other player

     document.getElementById('current-0').textContent='0';
     document.getElementById('current-1').textContent='0';

     document.querySelector('.player-0-panel').classList.toggle('active');//adds and removes active class
     document.querySelector('.player-1-panel').classList.toggle('active');//adds and removes active class

     //document.querySelector('.player-0-panel').classList.remove('active');
     //document.querySelector('.player-1-panel').classList.add('active');

     document.querySelector('.dice').style.display='none';//removes dice image when the player changes   
}

document.querySelector('.btn-new').addEventListener('click',init);//for a new game 

function init(){
    scores=[0,0];//setting both scores to zero
    roundScore=0;//setting round score to 0
    activePlayer=0;// 0 or 1
    gamePlaying=true;

    document.querySelector('.dice').style.display="none";//using query selector to change css

    //setting initial values to zero
    document.getElementById('score-0').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-1').textContent=0;

    //renaming the players
    document.getElementById('name-0').textContent="Player 1";
    document.getElementById('name-1').textContent="Player 2";

    //removing the winner class and setting everything to normal and player 1 to default active player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}



//js will convert to current-0 or current-1
//document.querySelector('#current-'+ activePlayer).innerHTML='<em>'+dice+'</em>';
//var x=document.querySelector('#score-0').textContent;//to read value or content of id and store it in variable x
