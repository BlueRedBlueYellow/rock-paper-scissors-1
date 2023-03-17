//Refactor function into array and randomizes choice through math methods
let choices = ["rock", "paper", "scissors"];
function getComputerChoice() {
  let choiceIndex = Math.floor(Math.random() * choices.length);
  let computerSelection = choices[choiceIndex];
  return computerSelection;
}

//Declaring variables that reference RPS items via. JS
const body = document.querySelector("body");

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

const cpuRock = document.querySelector("#cpu-rock");
const cpuPaper = document.querySelector("#cpu-paper");
const cpuScissors = document.querySelector("#cpu-scissors");

const allPlayerButtons = document.querySelectorAll(".player-buttons");
const allCpuButtons = document.querySelectorAll(".computer-buttons");

const roundMessage = document.querySelector("#round-message");

let playerScoreNum = document.querySelector(".player-score-num");
let cpuScoreNum =  document.querySelector(".cpu-score-num");

const playAgain = document.getElementById("play-again");

//EventListeners
rock.addEventListener("click", playRound);
paper.addEventListener("click", playRound);
scissors.addEventListener("click", playRound);

body.addEventListener("click", endMessage);

playAgain.addEventListener("click", resetGame);

//Functions
function resetColor() {
  let playerButtonList = Array.from(allPlayerButtons);
  let cpuButtonList = Array.from(allCpuButtons);

  for (let playerButtons of playerButtonList) {
    playerButtons.style.backgroundColor = "#FF8000";
  }
  for (let cpuButtons of cpuButtonList) {
    cpuButtons.style.backgroundColor = "#FF7F27";
  }
}

function showResults(playerSelection, computerSelection, playerWin) {
  playerSelection = document.querySelector("#" + playerSelection);
  computerSelection = document.querySelector("#cpu-" + computerSelection); 
  roundMessage.style.visibility = "visible";

  if (playerWin === "tie") {
    roundMessage.textContent = "It's a TIE!";
    playerSelection.style.backgroundColor = "gray";
    computerSelection.style.backgroundColor = "gray";
  } else if (playerWin) {
    roundMessage.textContent = "You WIN this round! :)";
    playerSelection.style.backgroundColor = "yellowGreen";
    computerSelection.style.backgroundColor = "crimson"; 
  } else {
    roundMessage.textContent = "Sorry, you LOSE this round! :(";
    playerSelection.style.backgroundColor = "crimson";
    computerSelection.style.backgroundColor = "yellowGreen"; 
  }
}

function playRound(event) {
  let computerSelection = getComputerChoice();
  let playerSelection = event.currentTarget.id;
  let playerWin = false;

  const winningCombinations = (
    playerSelection === "paper" && computerSelection === "rock" || 
    playerSelection === "rock" && computerSelection === "scissors" || 
    playerSelection === "scissors" && computerSelection === "paper"
  );

  resetColor();
  if (winningCombinations) {
    playerScoreNum.textContent++;
    playerWin = true;
  } else if (playerSelection === computerSelection) {
    playerWin = "tie";
  } else {
    cpuScoreNum.textContent++;
  }

  showResults(playerSelection, computerSelection, playerWin)
}

function endMessage() {
  if (playerScoreNum.textContent >= 5) {
    roundMessage.textContent = "*You WIN the game*";
    roundMessage.style.color = "green";
    roundMessage.style.border = "4px solid green";

    rock.removeEventListener("click", playRound);
    paper.removeEventListener("click", playRound);
    scissors.removeEventListener("click", playRound);

    playAgain.style.visibility = "visible";

  } else if (cpuScoreNum.textContent >= 5) {
    roundMessage.textContent = "*CPU WINS the game*";
    roundMessage.style.color = "crimson";
    roundMessage.style.border = "4px solid crimson";

    rock.removeEventListener("click", playRound);
    paper.removeEventListener("click", playRound);
    scissors.removeEventListener("click", playRound);

    playAgain.style.visibility = "visible";
  }
}

function resetGame() {
  resetColor();
  playerScoreNum.textContent = 0;
  cpuScoreNum.textContent = 0;

  roundMessage.style.visibility = "hidden";
  playAgain.style.visibility = "hidden";

  rock.addEventListener("click", playRound);
  paper.addEventListener("click", playRound);
  scissors.addEventListener("click", playRound);

  roundMessage.style.color = "#222222";
  roundMessage.style.border = "0px";
}