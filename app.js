const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("winner");
const possibleChoices = document.querySelectorAll(".button-container > img");
const resetScoreElement = document.querySelector(".js-resetScore-button");
resetScoreElement.addEventListener("click", () => {
  resetScore();
});

let userChoice;
let computerChoice;
let result;
let score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.alt;
    userChoiceDisplay.src = e.target.src;
    generateComputerChoice();
    getResult();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length);

  computerChoice = possibleChoices[randomNumber].alt;
  computerChoiceDisplay.src = possibleChoices[randomNumber].src;
}

function getResult() {
  if (computerChoice === userChoice) {
    result = "It's a draw";
    resultDisplay.innerHTML = result;
    resultDisplay.className = "it-s-a-draw";
  } else if (
    (computerChoice === "Rock" && userChoice === "Paper") ||
    (computerChoice === "Scissors" && userChoice === "Rock") ||
    (computerChoice === "Paper" && userChoice === "Scissors")
  ) {
    result = "You win!";
    resultDisplay.innerHTML = `<img src="./gamer.png" alt="Gamer" style="width: 10%;">`;
    resultDisplay.className = "you-win";
  } else {
    result = "You lose!";
    resultDisplay.innerHTML = `<img src="./computer.png" alt="Computer" style="width: 10%;">`;
    resultDisplay.className = "you-lose";
  }
  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "It's a draw") {
    score.ties += 1;
  }
  scoreElement();
}
function scoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}
function resetScore() {
  const message = document.querySelector(".js-confirmation-message");
  message.innerHTML =
    "Are you sure you want to reset the score?  <button class='js-yes-button message-button'>Yes</button> <button class='js-no-button message-button'>No</button>";
  document.querySelector(".js-yes-button").addEventListener("click", () => {
    (score.wins = 0), (score.losses = 0), (score.ties = 0);
    localStorage.removeItem("score");
    scoreElement();
    message.innerHTML = "";
  });
  document.querySelector(".js-no-button").addEventListener("click", () => {
    message.innerHTML = "";
  });
}