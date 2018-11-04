'use strict';
const fieldWidth = 600; // ширина игрового поля
const fieldHeight = 400; // высота игрового поля
const sizeBall = 20; // размер шарика
const sizeBlock = 20; // размер блока
let matrixField = []; // матрица поля, для того, чтобы узнать положение объектов
let X = 0; // переменная следит за положением мыши по оси Х и передает данные шарику
let Y = 0; // переменная следит за положением мыши по оси Y и передает данные шарику
let time1, time2, time4; //таймеры


document.getElementsByTagName('body')[0].id = 'body';
let body = document.getElementById('body');
body.appendChild(createContainer());

function createContainer() {
  let container = document.createElement('div');
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
  playingField.appendChild(createBall());
  return playingField;
}

function createBall() {
  let ball = document.createElement('div');
  ball.id = 'ball';
  return ball;
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
  this.PosX = PosX;
  this.PosY = PosY;
  this.Width = Width;
  this.Height = Height;
  this.Update = function () {
    let Obj = document.getElementById(Id);
    Obj.style.width = this.Width + 'px';
    Obj.style.height = this.Height + 'px';
    Obj.style.left = this.PosX + 'px';
    Obj.style.top = this.PosY + 'px';
  }
}
 
let ball = new DescriptionOfObject(sizeBall, sizeBall, Math.random() * (fieldWidth - sizeBall), Math.random() * (fieldHeight - sizeBall), 'ball'); 

let barrier = {
  Width: 20,
  Height: 20,
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
  }
}
let bonus = {
  Width: 20,
  Height: 20,
  PosX:0,
  PosY:0,
  Update: function () {
    let playingField = document.getElementById('playingField');
    let bonus = document.createElement('div');
    bonus.id = 'bonus';
    playingField.appendChild(bonus);
    bonus.style.width = this.Width + 'px';
    bonus.style.height = this.Height + 'px';
    bonus.style.left = this.PosX + 'px';
    bonus.style.top = this.PosY + 'px';
  }
}

//--------------------- нажали на кнопку Старт! ---------------------

document.getElementById('button').addEventListener('click', function () {
  X = ball.PosX;
  Y = ball.PosY;
  matrixField = matrixArray();
  updateField();
  document.body.addEventListener('mousemove', dragMove, false);
  
  time1 = setInterval(moveBall, 40);
  time2 = setInterval(createBarrier, 3000);
  time4 = setInterval(deleteBonus, 3000);

});

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
function updateField() {
  document.body.style.cursor = 'none';

  // удаляем все элементы с поля, кроме главного игрока
  let del = document.getElementById('playingField');
  while (del.lastChild) {
    if (del.lastChild.id !== 'ball') {
      del.removeChild(del.lastChild);
    } else break;
  }
  createBonus();
  goal.player = 0;
  goal.Update();
}

// движение игрока
function moveBall() {
  // игрок не выходит за пределы игрового поля
  if (X > 0 && X < fieldWidth - sizeBall && Y > 0 && Y < fieldHeight - sizeBall) {  
    ball.PosX = X;
    ball.PosY = Y;
  } 
  // игрок споймал бонус
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 ||  
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 2 || 
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2 || 
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 2) {
      goal.player += 10;
      goal.Update();
      deleteBonus(); 
  }
  // игрок столкнулся с препятствием - игра останавливается
  if (matrixField[ Math.floor(ball.PosY / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 ||  
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor(ball.PosX / sizeBlock)] === 1 || 
    matrixField[Math.floor(ball.PosY / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1 || 
    matrixField[Math.floor((ball.PosY + sizeBall) / sizeBlock)][Math.floor((ball.PosX + sizeBall) / sizeBlock)] === 1) {

     clearInterval(time1);
     clearInterval(time2);
     clearInterval(time4);
     document.body.removeEventListener('mousemove', dragMove, false);
     document.body.style.cursor = 'auto';
  }

  ball.Update();
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
  bonus.Update();
  }
}
// удаляем бонус, который уже пойман
function deleteBonus() {
  matrixField[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 0;
  let del = document.getElementById('bonus');
  document.getElementById('playingField').removeChild(del);
  createBonus();
}

// создаем препяпятствие
function createBarrier() {
  barrier.PosX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
  barrier.PosY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
  matrixField[barrier.PosY / sizeBlock][barrier.PosX / sizeBlock] = 1;
  barrier.Update();
}

field.Update();
ball.Update();