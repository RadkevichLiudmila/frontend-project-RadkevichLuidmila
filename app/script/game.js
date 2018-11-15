'use strict';
const fieldWidth = 600; // ширина игрового поля
const fieldHeight = 400; // высота игрового поля
const sizeBall = 20; // размер шарика
const sizeBlock = 20; // размер блока
let matrixField = []; // матрица поля, для того, чтобы узнать положение объектов
let mouseX = 0; // переменная следит за положением мыши по оси Х и передает данные шарику
let mouseY = 0; // переменная следит за положением мыши по оси Y и передает данные шарику
let distanceMouseForBallX = 0; // расстояние от начала window до игрового поля по Х
let distanceMouseForBallY = 0; // расстояние от начала window до игрового поля по Y
let timerForBarrier, timerForBonus; //таймеры

const ClickAudioBonus = new Audio('audio/KoopaTroopaHide.wav');
const ClickAudioBarrier = new Audio('audio/Creature.wav');


let timerForBall =
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

createContainer();
function createContainer() {
  let container = document.getElementById('IPageGame');
  container.appendChild(createButton('button', 'новая игра'));
  container.appendChild(createGoal());
  container.appendChild(createPlayingField());
  return container;
}

function createButton(id, text) {
  let button = document.createElement('input');
  button.id = id;
  button.type = 'button';
  button.className = 'button';
  button.value = text;
  return button;
}

function createGoal() {
  let goal = document.createElement('p');
  goal.id = 'goal';
  goal.textContent = '0';
  return goal;
}

function createPlayingField() {
  let playingField = document.createElement('div');
  playingField.id = 'playingField';
  playingField.appendChild(createElement('ball'));
  playingField.appendChild(createElement('bonus'));
  return playingField;
}

function createElement(name) {
  let element = document.createElement('div');
  element.id = name;
  element.appendChild(createImage(name));
  return element;
}

function createImage(name) {
  let img = document.createElement('img');
  if (name === 'barrier') {
    img.src = 'img/block.jpg';
    img.width = sizeBall;
    img.height = sizeBall;
  } else if (name === 'ball') {
    img.src = 'img/player.png';
    img.width = sizeBall;
    img.height = sizeBall;
  } else {
    img.src = 'img/treasure.jpg';
    img.width = sizeBlock;
    img.height = sizeBlock;
  }

  return img;
}

//-----------------------------------------------------------
let field = {
  Width: fieldWidth,
  Height: fieldHeight,

  Update: function () {
    let playingField = document.getElementById('playingField');
    playingField.style.width = this.Width + 'px';
    playingField.style.height = this.Height + 'px';
  }
}

let goal = {
  player: 0,
  Update: function () {
    let goal = document.getElementById('goal');
    goal.textContent = 'Вы набрали ' + this.player + ' очков';
  }
}

function DescriptionOfObject(Width, Height, PosX, PosY, Id) {
  this.Width = Width;
  this.Height = Height;
  this.PosX = PosX;
  this.PosY = PosY;
  this.Update = function () {
    let Obj = document.getElementById(Id);
    Obj.id = Id;
    playingField.appendChild(Obj);
    Obj.style.width = this.Width + 'px';
    Obj.style.height = this.Height + 'px';
    Obj.style.left = this.PosX + 'px';
    Obj.style.top = this.PosY + 'px';
  }
}

let ball = new DescriptionOfObject(sizeBall, sizeBall, fieldWidth / 2, fieldHeight / 2, 'ball');
let coordForBonusX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
let coordForBonusY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
let bonus = new DescriptionOfObject(sizeBlock, sizeBlock, coordForBonusX, coordForBonusY, 'bonus');

let barrier = {
  Width: sizeBlock,
  Height: sizeBlock,
  PosX: 0,
  PosY: 0,
  Update: function () {
    let playingField = document.getElementById('playingField');
    let barrier = document.createElement('div');
    barrier.id = 'barrier';
    playingField.appendChild(barrier);
    barrier.style.width = this.Width + 'px';
    barrier.style.height = this.Height + 'px';
    barrier.style.left = this.PosX + 'px';
    barrier.style.top = this.PosY + 'px';
    barrier.appendChild(createImage('barrier'));
  }
}

//--------------------- нажали на кнопку новая игра ---------------------

document.getElementById('button').addEventListener('click', function () {
  document.getElementById('playingField').appendChild(createButton('go', 'поехали'));
  document.getElementById('go').addEventListener('click', startGame, false);
  matrixField = matrixArray();
  newGameField();
  stopGame();
});

//----------- поехали -------------------
function startGame() {
  document.getElementById('go').remove();
  document.body.style.cursor = 'none';
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

// создаем пустую матрицу, которая следит за положением элементов на поле
function matrixArray() {
  let arr = new Array();
  for (let i=0; i < fieldHeight / 20; i++) {
    arr[i] = new Array();
    for (let j=0; j < fieldWidth / 20; j++) {
      arr[i][j] = 0;
    }
  }
  arr[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 2;
  return arr;
}
// обновляет поле при запуске игры
function newGameField() {

  // удаляем все элементы с поля, кроме главного игрока
  let playingField = document.getElementById('playingField');
  for (let i = 0; i < playingField.childNodes.length; i++) {
    if (playingField.childNodes[i].id === 'barrier') {
      playingField.removeChild(playingField.childNodes[i]);
      i--;
    }
  }

 // обнуляем счет
  goal.player = 0;
  goal.Update();
}

function stopGame() {
  clearTimeout(timerForBarrier);
  clearTimeout(timerForBonus);
  document.body.removeEventListener('mousemove', dragMove, false);
  document.body.style.cursor = 'auto';
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
  if (mouseX >= fieldWidth - sizeBall / 2) {
    mouseX = fieldWidth - sizeBall;
    checkMoveGame = false;
  }
  if (mouseY <= sizeBall / 2) {
    mouseY = 0;
    checkMoveGame = false;
  }
  if (mouseY >= fieldHeight - sizeBall / 2) {
    mouseY = fieldHeight - sizeBall;
    checkMoveGame = false;
  }

  // проставляем координаты для игрока
  ball.PosX = mouseX;
  ball.PosY = mouseY;

  // проверяем координаты игрока
  if (ball.PosX <= 0 || ball.PosX >= fieldWidth - sizeBall || ball.PosY <= 0 || ball.PosY >= fieldHeight - sizeBall) {
    checkMoveGame = false;
  }

  if (!checkMoveGame) {
    ball.Update();
    stopGame();
    ClickAudioBarrier.play();
    return checkMoveGame;
  }

  // игрок столкнулся с препятствием - игра останавливается
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 ||
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 ||
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1 ||
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1) {
      ball.Update();
      stopGame();
      ClickAudioBarrier.play();
      return false;
}

  // игрок споймал бонус
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 ||
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 ||
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2 ||
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2) {
      ClickAudioBonus.play();
      goal.player += 10;
      goal.Update();
      clearTimeout(timerForBonus);
      deleteBonus();
  }

  PlanNextTick();
  ball.Update();
}

// отслеживаем движение курсора
function dragMove(event) {
  event = event || window.event;
  mouseX = event.clientX - distanceMouseForBallX;
  mouseY = event.clientY - distanceMouseForBallY;
}

// перемещаем бонус, который уже пойман
function deleteBonus() {
  matrixField[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 0;
  createBonus();
}

//создаем бонус
function createBonus() {
  let coordX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
  let coordY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
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
  barrier.PosX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
  barrier.PosY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
  matrixField[barrier.PosY / sizeBlock][barrier.PosX / sizeBlock] = 1;
  timerForBarrier = setTimeout(createBarrier, 3000);
  barrier.Update();
}

field.Update();
ball.Update();
bonus.Update();
