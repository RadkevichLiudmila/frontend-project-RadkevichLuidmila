'use strict';
const fieldWidth = 600; // ширина игрового поля
const fieldHeight = 400; // высота игрового поля
const sizeBall = 20; // размер шарика
const sizeBlock = 20; // размер блока
let matrixField = []; // матрица поля, для того, чтобы узнать положение объектов
let X = 0; // переменная следит за положением мыши по оси Х и передает данные шарику
let Y = 0; // переменная следит за положением мыши по оси Y и передает данные шарику
let timerForBarrier, timerForBonus; //таймеры
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


document.getElementsByTagName('body')[0].id = 'body';
let body = document.getElementById('body');
body.appendChild(createContainer());

function createContainer() {
  let container = document.createElement('div');
  //container.id = 'container';
  container.appendChild(createButton());
  container.appendChild(createGoal());
  container.appendChild(createPlayingField());
  return container;
}

function createButton() {
  let button = document.createElement('input');
  button.id = 'button';
  button.type = 'button';
  button.value = 'Старт!';
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
  //playingField.appendChild(createElement('barrier'));
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
  } else  {
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
 
let ball = new DescriptionOfObject(sizeBall, sizeBall, Math.random() * (fieldWidth - sizeBall), Math.random() * (fieldHeight - sizeBall), 'ball');
let coordFoBonusX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
let coordFoBonusY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
let bonus = new DescriptionOfObject(sizeBlock, sizeBlock, coordFoBonusX, coordFoBonusY, 'bonus'); 

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


//--------------------- нажали на кнопку Старт! ---------------------

document.getElementById('button').addEventListener('click', function () {
  X = ball.PosX;
  Y = ball.PosY;
  matrixField = matrixArray();
  newGameField();
  document.body.addEventListener('mousemove', dragMove, false);
  
  PlanNextTick();
  //timerForBall = setInterval(moveBall, 40);
  timerForBarrier = setTimeout(createBarrier, 3000);
  timerForBonus = setTimeout(deleteBonus, 3000);
  //window.setTimeout(callback, 1000 / 60);

});


  function PlanNextTick() {
    timerForBall(moveBall);
  }

// создаем пустую матрицу, которая следит за положением элементов на поле
function matrixArray(){
  let arr = new Array();
  for(let i=0; i < fieldHeight / 20; i++){
    arr[i] = new Array();
    for(let j=0; j < fieldWidth / 20; j++){
      arr[i][j] = 0;
    }
  }
  arr[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 2;
  return arr;
}
// обновляет поле при запуске игры
function newGameField() {
  document.body.style.cursor = 'none';

  // удаляем все элементы с поля, кроме главного игрока
  let playingField = document.getElementById('playingField');
  for (var i = 0; i < playingField.childNodes.length; i++) { 
    if (playingField.childNodes[i].id === 'barrier') {
      playingField.removeChild(playingField.childNodes[i]);
      i--;
    }
  }
  
 // обнуляем счет
  goal.player = 0;
  goal.Update();
}

// движение игрока
function moveBall() {
  
    // игрок не выходит за пределы игрового поля
    if (X > 0 && X < fieldWidth - sizeBall && Y > 0 && Y < fieldHeight - sizeBall) {  
      ball.PosX = X;
      ball.PosY = Y;
      //stopGame();
    } 
  
  // игрок споймал бонус
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 ||  
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 || 
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2 || 
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2) {
      goal.player += 10;
      goal.Update();
      clearTimeout(timerForBonus);
      deleteBonus(); 
  }

  // игрок столкнулся с препятствием - игра останавливается
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 ||  
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 || 
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1 || 
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1) {
      stopGame();
  }

  PlanNextTick();
  ball.Update();
}
function stopGame() {
  clearTimeout(timerForBall);
  clearTimeout(timerForBarrier);
  clearTimeout(timerForBonus);
  document.body.removeEventListener('mousemove', dragMove, false);
  document.body.style.cursor = 'auto';
}
// отслеживаем движение курсора
function dragMove(e) {
  X = e.clientX; 
  Y = e.clientY; 
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
// удаляем бонус, который уже пойман
function deleteBonus() {
  matrixField[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 0;
 /* let del = document.getElementById('bonus');
  document.getElementById('playingField').removeChild(del);*/
  createBonus();
}

// создаем препяпятствие
function createBarrier() {
  //createBar();
 //let barrier = new DescriptionOfObject(sizeBlock, sizeBlock, 0, 0, 'barrier');
  barrier.PosX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
  barrier.PosY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
  matrixField[barrier.PosY / sizeBlock][barrier.PosX / sizeBlock] = 1;
  timerForBarrier = setTimeout(createBarrier, 3000);
  barrier.Update();
}

field.Update();
ball.Update();
bonus.Update();