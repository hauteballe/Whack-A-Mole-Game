const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const game = document.querySelector(".game");
let lastHole;
let timeUp = false;
let score = 0;

function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomHole(holes) {
  const holeIndex = Math.floor(Math.random() * holes.length);
  const selectedHole = holes[holeIndex];
  if (selectedHole === lastHole) {
    return getRandomHole(holes);
  }

  lastHole = selectedHole;
  return selectedHole;
}

function peep() {
  const time = getRandomTime(600, 1000);
  const hole = getRandomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(event) {
  if (event.isTrusted && event.target.classList.contains("mole")) {
    score++;
    event.target.classList.remove("up");
    scoreBoard.textContent = score;
  }
}

game.addEventListener("click", bonk);
