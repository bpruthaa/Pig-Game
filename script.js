'use restrict';

//Selecting Elements
const player0El = document.querySelector('.player--0'); //Player No. 1
const player1El = document.querySelector('.player--1'); //Player No. 2
const score0El = document.querySelector('#score--0'); //DOM Element of Score of Player 0
const score1El = document.getElementById('score--1'); //DOM Element of Score of Player 1
const current0El = document.getElementById('current--0'); //Current score of Player 0
const current1El = document.getElementById('current--1'); //Current Score of Player 1

const diceEl = document.querySelector('.dice'); //Dice Image Module
const btnNew = document.querySelector('.btn--new'); //New Button
const btnRoll = document.querySelector('.btn--roll'); //Roll Button
const btnHold = document.querySelector('.btn--hold'); //Hold Button
let currentScore, activePlayer, playing, scores;
const init = function () {
  currentScore = 0; //Current Score of the Current Round
  activePlayer = 0; //Current Active Player.
  playing = true; //Hold the state of game where True-Playing
  diceEl.classList.add('hidden');
  scores = [0, 0]; //Final Scores of the Players where score[0]-stores the value of Player 0 and score[1]-score of Player 1
  score0El.textContent = 0; //Setting/Resetting the value of the Score of Player 0
  score1El.textContent = 0; //Setting/Resetting the value of the Score of Player 1
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner'); //Removing Player1 as Winner
  player1El.classList.remove('player--winner'); //Removing Player2 as Winner
  player0El.classList.add('player--active'); //Making Player 1 as Active Player
  player1El.classList.remove('player--active'); //Removing Player 2 as Active Player
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Make the Score of the current Active player to 0
  activePlayer = activePlayer === 0 ? 1 : 0; //Change ActivePlayer
  currentScore = 0; //Make Current Score as 0
  player0El.classList.toggle('player--active'); //Removes/Adds class to the Player
  player1El.classList.toggle('player--active'); //Removes/Adds class to the Player
};
//Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //If the Game is active
    //1.Generate a Random Dice
    const dice = Math.trunc(Math.random() * 6) + 1; //Defining a new number for the dice everytime the Button Presses
    //2.Display Dice
    diceEl.classList.remove('hidden'); //Remove the Hidden property of image and make the Dice Visible.
    diceEl.src = `dice-${dice}.png`; //Generate the image by manipulating image according the random generated dice number.
    //3.Check for Rolled 1: if true switch to next Player
    if (dice !== 1) {
      //If the DIce is not equals to 1
      //Add Dice to Current Score
      currentScore += dice; //Adding current Score to Dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Set the current Player's Score to 0
    } else {
      //Switch to Next Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add Current Score to Active Player
    scores[activePlayer] += currentScore; //Add score to Active Player's Final Score.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //Display the Final Score of the Element in the UI
    //2.Check if Player 's Score >= 100
    if (scores[activePlayer] >= 20) {
      //If the Score exceed 20, consider them winner
      playing = false; //Stop Gaming
      diceEl.classList.add('hidden'); //Hide the Image of the Dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //Assigning the winner class to the active player's score if its above 100
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Remove the player as active Player
    } else {
      //Finish the Game
      //Switch to Next Player
      switchPlayer(); //Switch Player
    }
  }
});
btnNew.addEventListener('click', init); //As soon as the player CLicks the Resume, call the Init() method.
