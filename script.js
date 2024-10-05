let ladderSound = new Audio("ladder.mp3");
let winningSound = new Audio("winning.mp3");
let biteSound = new Audio("bite.mp3");
let turnSound = new Audio("turn.mp3");
let dicerollSound = new Audio("diceroll.mp3");

// Define game elements
const arr = [1, 2, 3, 4, 5, 6]; // Possible dice rolls
const dice = document.querySelector("#dice");
const house1 = document.querySelector(".house1");
const house2 = document.querySelector(".house2");

let flag = 0; // Player turn tracker (0 for player 1, 1 for player 2)
let player1Position = 0; // Initial position for player 1
let player2Position = 0; // Initial position for player 2
const player1Goti = "red-goti"; // Class for player 1's token
const player2Goti = "blue-goti"; // Class for player 2's token

// Define snakes and ladders
const snakes = {
  35: 6,
  48: 11,
  77: 58,
  98: 84,
  89: 51,
};
const ladders = {
  19: 23,
  40: 60,
  76: 86,
  54: 66,
};

// Function to play sound with reset
function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

// Function to update player position on the board
function updatePlayerPosition(position, goti, player) {
  const cell = document.querySelector(`.cell${position}`);
  if (cell) {
    cell.innerHTML = `<div id="${goti}" class="animate-goti"></div>`;
    if (player === 1) player1Position = position;
    else player2Position = position;
  }
}

// Function to clear the previous goti (player token)
function clearPreviousGoti(player) {
  const previousPosition = player === 1 ? player1Position : player2Position;
  const previousCell = document.querySelector(`.cell${previousPosition}`);
  if (previousCell) previousCell.innerHTML = "";
}

// Function to check if a player lands on a snake or ladder
function checkSnakesAndLadders(position) {
  if (snakes[position]) {
    console.log("Snake bite!");
    playSound(biteSound);
    return snakes[position];
  } else if (ladders[position]) {
    console.log("Climb the ladder!");
    playSound(ladderSound);
    return ladders[position];
  }
  return position;
}

// Function to toggle player turn animations
function togglePlayerTurn() {
  if (flag === 0) {
    house1.style.animation = "none";
    house2.style.animation = "flikker ease-in-out 1.5s infinite";
  } else {
    house2.style.animation = "none";
    house1.style.animation = "flikker ease-in-out 1.5s infinite";
  }
}

// Dice roll event listener
dice.addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1; // Generate random dice roll
  dice.innerHTML = randomNumber;

  togglePlayerTurn();

  if (flag === 0) { // Player 1's turn
    clearPreviousGoti(1);
    if (player1Position + randomNumber <= 100) {
      player1Position = checkSnakesAndLadders(player1Position + randomNumber);
      updatePlayerPosition(player1Position, player1Goti, 1);
      if (player1Position >= 100) {
        alert("Player 1 wins!");
        playSound(winningSound);
        return; // End the game after win
      }
    } else {
      console.log("Player 1 cannot move, needs exact roll.");
    }
  } else { // Player 2's turn
    clearPreviousGoti(2);
    if (player2Position + randomNumber <= 100) {
      player2Position = checkSnakesAndLadders(player2Position + randomNumber);
      updatePlayerPosition(player2Position, player2Goti, 2);
      if (player2Position >= 100) {
        alert("Player 2 wins!");
        playSound(winningSound);
        return; // End the game after win
      }
    } else {
      console.log("Player 2 cannot move, needs exact roll.");
    }
  }

  // Change turn
  flag = 1 - flag;

  // Play dice roll sound
  playSound(dicerollSound);
});
