const onOff = document.querySelector("#start");
const gameSpace = document.querySelector("#main");
const score = document.querySelector("#score");
const limbo = document.querySelector("#limbo");

const codesAccepts = ["KeyW", "KeyS", "KeyK"];

let player = document.querySelector("#player");
let enemy = document.querySelector("#enemy");

const positionPlayerInitial = 15;
let positionPlayer = positionPlayerInitial;

let hasStarted = false,
  isEndGame = false,
  life = 2;

function main(event) {
  if (life === 0) {
    if (isEndGame === false) return endGame();
    return reset();
  }
  if (hasStarted === true) return game(event);
  else return start();
}

function start() {
  hasStarted = true;
  onOff.style.display = "none";
  createElements();
  startMovement();
  // startMovementEnemy();
}

function game(event) {
  if (event == "KeyK") return triggerPlayerFire();
  let code = event.code;
  console.log(verifyCode(code));
  if (!verifyCode(code)) return;
  if (code == "KeyW") movePlayerUp();
  if (code == "KeyS") movePlayerDown();
  if (code == "KeyK") triggerPlayerFire();

  life--;
}

function verifyCode(event) {
  if (codesAccepts.includes(event)) return true;
  return false;
}

function reset() {
  (hasStarted = false), (isEndGame = false), (scoreCount = 0);
  player.style.display = "";
  onOff.innerHTML = "START";
  score.innerHTML = "Points";
  limbo.appendChild("enemy");

  life = 2;
  return;
}

function endGame() {
  (isEndGame = true), (hasStarted = false);
  onOff.innerHTML = "RESET";
  onOff.style.display = "";
}

function movePlayerUp() {
  if (positionPlayer === 1) return;
  player.style.top = `${(positionPlayer -= 1)}rem`;
}
function movePlayerDown() {
  if (positionPlayer === 30) return;
  player.style.top = `${(positionPlayer += 1)}rem`;
}

function triggerPlayerFire() {
  console.log("Pei Pei");
}

// function startMovementEnemy() {
//   let timer = setTimeout(() => {
//     {
//       if (isEndGame == true) clearInterval(timer);
//       randomPositionXEnemy();

//       let movement = setInterval(() => {
//         eixoY += 0.5;
//         enemy1.style.right = `${eixoY}%`;

//         if (eixoY === 65) {
//           clearInterval(timer);
//           return startMovementEnemy();
//         }
//       }, 3000);
//     }
//   }, 100);
// }
// function randomPositionXEnemy() {
//   let randomPositionX = parseInt(Math.random() * 7) * 10;
//   randomPositionX < 10 ? (randomPositionX = 10) : null;
//   return randomPositionX;
// }

function createElements() {
  player.style.display = "inherit";
  gameSpace.appendChild((enemy = createChild("enemy", enemy)));
}

function createChild(name, element, _classe) {
  element = document.createElement("div");
  element.setAttribute("id", name);
  return element;
}

function startMovement() {
  countPoints();
  // moveBackground();
}

// function moveBackground() {
//   if (hasStarted) return background.classList.add("keyframe");
//   background.classList = "";
// }

function countPoints() {
  let scoreCount = 0,
    countPoints = setInterval(() => {
      if (isEndGame === true) clearInterval(countPoints);
      score.innerHTML = `${scoreCount++}`;
    }, 100);
}

onOff.addEventListener("click", main, false);
document.addEventListener("keydown", main, false);
// gameSpace.addEventListener("click", () => game("KeyK"), false);
