'use strict';
// Elements
const dice = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');
// 4- specify a variable to hold the current score
let currentScore = 0;
// 11- specify two variables to hold the final sum of each player's current score
let sumScore0 = 0;
let sumScore1 = 0;
// 1- Write what if the the roll button is clicked
rollButton.addEventListener('click', () => {
  // 2- get a random number in order to use to show the random dice image
  const diceNumber = Math.floor(Math.random() * 6) + 1;
  // 3- show the dice image related to the random number
  dice.style.display = 'block';
  dice.setAttribute('src', `dice-${diceNumber}.png`);
  // 8- get the player who has the class 'player--active' once again in order the current active player gets recognized when later changes
  const activePlayer = document.querySelector('.player--active');

  // 9- check the active player and then determine what will happen if the active player is player0 and vice versa
  if (activePlayer.classList.contains('player--0')) {
    // what if the dice number is equal to 1 as the active player is player0
    if (diceNumber === 1) {
      rollEqualToOne(player0);
      togglePlayerActiveClass(player0, player1);
    } else {
      playerLeft(player0, diceNumber);
    }
  } else {
    // what if the dice number is equal to 1 as the active player is player1
    if (diceNumber === 1) {
      rollEqualToOne(player1);
      togglePlayerActiveClass(player1, player0);
    } else {
      playerRight(player1, diceNumber);
    }
  }

  // 5- sum the numbers of dice numbers together and show it in current score element, then show it in an argument's current score element that when the dice roolling happens, keeps the current player
  function currentScoreSum(player, randomNumber) {
    currentScore = currentScore + randomNumber;
    player.querySelector('.current-score').textContent = currentScore;
  }

  // 6- specify two functions in order to use as each player
  function playerLeft(player, randomNumber) {
    // 7- calling the current score sum function
    currentScoreSum(player, randomNumber);
  }

  // 6- specify two functions in order to use as each player
  function playerRight(player, randomNumber) {
    // 7- calling the current score sum function
    currentScoreSum(player, randomNumber);
  }

  // 10- specify a function in which, when the roll is equaled to 1, the number '0' gets assigned to the current score and it gets shown
  function rollEqualToOne(player) {
    currentScore = 0;
    player.querySelector('.current-score').textContent = currentScore;
  }
});

// 11- specify a function that takes two arguments that are going to get assigned to players 0 and 1 in order to add the class 'player--active' to one (the active one) and remove the class from the other
function togglePlayerActiveClass(pl0, pl1) {
  pl0.classList.remove('player--active');
  pl1.classList.add('player--active');
}

// 13- Write what if the the hold button is clicked
holdButton.addEventListener('click', () => {
  // 14- get the player who has the class 'player--active' once again in order the current active player gets recognized. if it's not defined, the active player would change and stay as the second player
  const activePlayer = document.querySelector('.player--active');
  // 15- check if the active player containes the "player--0" class, call the numbersHolder function withe the arguments of the player0 and assign its sumScore to the sumScore0. Else do the same for the player1. Then change the "player--active" class from that player to the another one
  if (activePlayer.classList.contains('player--0')) {
    sumScore0 = numbersHolder(player0, sumScore0);
    // the winner score
    if (sumScore0 >= 100) {
      gameFinished(player0);
    } else {
      togglePlayerActiveClass(player0, player1);
    }
  } else {
    sumScore1 = numbersHolder(player1, sumScore1);
    // the winner score
    if (sumScore1 >= 100) {
      gameFinished(player1);
    } else {
      togglePlayerActiveClass(player1, player0);
    }
  }

  // 12- hold the sum of the scores of the relevant player's sum score variable and show it in its score element. Then make the current score to 0 in order to reset it. This function should contains to arguments: one for getting the player who is going to these changes get assigned to, and the another for getting the sum score related to that player and it's all because we have two players and two sum scores related to each player
  function numbersHolder(player, sumScore) {
    sumScore = sumScore + currentScore;
    player.querySelector('.score').textContent = sumScore;
    currentScore = 0;
    player.querySelector('.current-score').textContent = currentScore;
    // returning the value is essential because sumScore is an argument not a global variable, and it is a number that is known as a primitive data type. Remember all primitive data types need to be returned to be assigned to an external variable (number, NaN, string, undefined, bullean, null, symbol). The opposite, is the reference data types that don't need to be returned (array, object, function, date)
    return sumScore;
  }

  // 16- specify a function that add the class 'player--winner' to the winner player
  function gameFinished(player) {
    player.classList.add('player--winner');
    rollButton.setAttribute('disabled', '');
    holdButton.setAttribute('disabled', '');
  }
});

// 17- What happens when the reset button is clicked
newButton.addEventListener('click', () => {
  const activePlayer = document.querySelector('.player--active');
  resetGame(activePlayer);

  // 18- specify a function to take the necessary steps in order to reset the game
  function resetGame(player) {
    currentScore = 0;
    player.querySelector('.current-score').textContent = currentScore;
    sumScore0 = 0;
    sumScore1 = 0;
    const scoreElement = document.querySelectorAll('.score');
    for (const value of scoreElement) {
      value.textContent = 0;
    }
    player.classList.remove('player--winner');
    rollButton.removeAttribute('disabled');
    holdButton.removeAttribute('disabled');
    togglePlayerActiveClass(player, player0);
  }
});
