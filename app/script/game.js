'use strict';
let mouseX = 0; // переменная следит за положением мыши по оси Х и передает данные шарику
let mouseY = 0; // переменная следит за положением мыши по оси Y и передает данные шарику
let distanceMouseForBallX = 0; // расстояние от начала браузера до игрового поля по Х
let distanceMouseForBallY = 0; // расстояние от начала браузера до игрового поля по Y
let timerForBarrier, timerForBonus; //таймеры

const clickAudioBonus = new Audio('audio/koopaTroopaHide.wav');
const clickAudioBarrier = new Audio('audio/creature.wav');

const storageResultLocal = new TLocalStorage();
const storageResultAJAX = new TAJAXStorage('http://fe.it-academy.by/AjaxStringStorage2.php','Radkevich_project_results');

const timerForBall =
  // находим, какой requestAnimationFrame доступен
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  // ни один не доступен - будем работать просто по таймеру
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

document.getElementById('ball').style.display = 'none';
document.getElementById('bonus').style.display = 'none';

 document.getElementById('go')
  .addEventListener('click', startGame, false);

//----------- нажали на кнопку новая игра -------------------
function startGame() {
  matrixField = matrixArray();
  newGameField();

  document.getElementById('go').style.display = 'none';
  if (document.getElementById('gameEnd') !== null) {
    document.getElementById('gameEnd')
      .remove();
  }

  document.getElementById('ball').style.display = 'block';
  document.getElementById('bonus').style.display = 'block';
  document.body.style.cursor = 'none';


  document.getElementById('ball').addEventListener('touchstart', touchStart, false);

  distanceMouseForBallX = sizeBall / 2 + document.getElementById('playingField').offsetLeft;
  distanceMouseForBallY = sizeBall / 2 + document.getElementById('playingField').offsetTop;
  mouseX = event.clientX - distanceMouseForBallX;
  mouseY = event.clientY - distanceMouseForBallY;

  document.body.addEventListener('mousemove', dragMove, false);
  
  // запускаем таймеры
  PlanNextTick();
  timerForBarrier = setTimeout(createBarrier, 3000);
  timerForBonus = setTimeout(deleteBonus, 3000);
}

// отслеживаем движение курсора
function dragMove(event) {
  event = event || window.event;
  mouseX = event.clientX - distanceMouseForBallX;
  mouseY = event.clientY - distanceMouseForBallY;
}

// отслеживаем движение пальца
function touchStart() {
  document.getElementById('ball').addEventListener('touchmove', touchMove, false);
}

function touchMove(event) {
event = event || window.event;
mouseX = event.touches[0].clientX - distanceMouseForBallX;
mouseY = event.touches[0].clientY - distanceMouseForBallY;
}

function PlanNextTick() {
  timerForBall(moveBall);
}

// движение игрока
function moveBall() {
  let checkMoveGame = true;

  // проверяем не вышла ли мышка за пределы поля
  if (mouseX <= sizeBall / 2) {
    mouseX = 0;
    checkMoveGame = false;
  }
  if (mouseX >= arenaForPlay.Width - sizeBall / 2) {
    mouseX = arenaForPlay.Width - sizeBall;
    checkMoveGame = false;
  }
  if (mouseY <= sizeBall / 2) {
    mouseY = 0;
    checkMoveGame = false;
  }
  if (mouseY >= arenaForPlay.Height - sizeBall / 2) {
    mouseY = arenaForPlay.Height - sizeBall;
    checkMoveGame = false;
  }

    // проставляем координаты для игрока
    player.PosX = mouseX;
    player.PosY = mouseY;
   

  // проверяем координаты игрока
  if (player.PosX <= 0 || player.PosX >= arenaForPlay.Width - sizeBall || player.PosY <= 0 || player.PosY >= arenaForPlay.Height - sizeBall) {
    checkMoveGame = false;
  }

  if (!checkMoveGame) {
    player.Update();
    stopGame();
    return checkMoveGame;
  }

  // игрок столкнулся с препятствием - игра останавливается
  if (matrixField[Math.floor(player.PosY / sizeBlock)][Math.floor(player.PosX / sizeBlock)] === 1 ||
    matrixField[Math.floor((player.PosY + sizeBall) / sizeBlock)][Math.floor(player.PosX / sizeBlock)] === 1 ||
    matrixField[Math.floor(player.PosY / sizeBlock)][Math.floor((player.PosX + sizeBall) / sizeBlock)] === 1 ||
    matrixField[Math.floor((player.PosY + sizeBall) / sizeBlock)][Math.floor((player.PosX + sizeBall) / sizeBlock)] === 1) {
    player.Update();
    stopGame();
    return false;
  }

  // игрок споймал бонус
  if (matrixField[Math.floor(player.PosY / sizeBlock)][Math.floor(player.PosX / sizeBlock)] === 2 ||
    matrixField[Math.floor((player.PosY + sizeBall) / sizeBlock)][Math.floor(player.PosX / sizeBlock)] === 2 ||
    matrixField[Math.floor(player.PosY / sizeBlock)][Math.floor((player.PosX + sizeBall) / sizeBlock)] === 2 ||
    matrixField[Math.floor((player.PosY + sizeBall) / sizeBlock)][Math.floor((player.PosX + sizeBall) / sizeBlock)] === 2) {
    clickAudioBonus.play();
    goal.gameGoal += 10;
    goal.Update();
    clearTimeout(timerForBonus);
    deleteBonus();
  }

  PlanNextTick();
  player.Update();
}

// перемещаем бонус, который уже пойман
function deleteBonus() {
  matrixField[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 0;
  createBonus();
}

//создаем бонус
function createBonus() {
  let coordX = Math.floor(Math.random() * ((arenaForPlay.Width - sizeBlock) / sizeBlock)) * sizeBlock;
  let coordY = Math.floor(Math.random() * ((arenaForPlay.Height - sizeBlock) / sizeBlock)) * sizeBlock;
  if (matrixField[coordY / sizeBlock][coordX / sizeBlock] === 1) {
    createBonus();
  } else {
    bonus.PosX = coordX;
    bonus.PosY = coordY;
    matrixField[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 2;
    timerForBonus = setTimeout(deleteBonus, 3000);
    bonus.Update();
  }
}

// создаем препяпятствие
function createBarrier() {
  barrier.PosX = Math.floor(Math.random() * ((arenaForPlay.Width - sizeBlock) / sizeBlock)) * sizeBlock;
  barrier.PosY = Math.floor(Math.random() * ((arenaForPlay.Height - sizeBlock) / sizeBlock)) * sizeBlock;
  matrixField[barrier.PosY / sizeBlock][barrier.PosX / sizeBlock] = 1;
  timerForBarrier = setTimeout(createBarrier, 3000);
  barrier.Update();
}

function stopGame() {
  clickAudioBarrier.play();
  clearTimeout(timerForBarrier);
  clearTimeout(timerForBonus);
  document.body.removeEventListener('mousemove', dragMove, false);
 // document.getElementById('ball').removeEventListener('touchend', touchStop, false);
  document.getElementById('go').style.display = 'block';
  document.body.style.cursor = 'auto';
  theEnd();
  openMyWidget();
}

arenaForPlay.Update();
player.Update();
bonus.Update();