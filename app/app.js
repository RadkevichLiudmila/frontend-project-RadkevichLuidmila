'use strict';
const fieldWidth = 600; // ширина игрового поля
const fieldHeight = 400; // высота игрового поля
const sizeBall = 30; // размер шарика


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

function DescriptionOfObject(Width, Height, PosX, PosY, SpeedX, SpeedY, Id) {
  this.PosX = PosX;
  this.PosY = PosY;
  this.Width = Width;
  this.Height = Height;
  this.SpeedX = SpeedX;
  this.SpeedY = SpeedY;
  this.Update = function () {
    let Obj = document.getElementById(Id);
    Obj.style.width = this.Width + 'px';
    Obj.style.height = this.Height + 'px';
    Obj.style.left = this.PosX + 'px';
    Obj.style.top = this.PosY + 'px';
  }
}
 
let ball = new DescriptionOfObject(sizeBall, sizeBall, Math.random() * (fieldWidth - sizeBall), Math.random() * (fieldHeight - sizeBall), 5, 5, 'ball'); 

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

document.getElementById('button').addEventListener('click', function () {
  let X = ball.PosX;
  let Y = ball.PosY;

  function move() {
    if (X > sizeBall / 2 && X < fieldWidth - sizeBall / 2 && Y > sizeBall / 2 && Y < fieldHeight - sizeBall / 2) {
      ball.PosX = X;
      ball.PosY = Y;
    } /*else if ((X > sizeBall / 2 || X < fieldWidth - sizeBall / 2)  && Y > sizeBall / 2 && Y < fieldHeight - sizeBall / 2) {
      ball.PosY = Y;
    } else if (X > sizeBall / 2 && X < fieldWidth - sizeBall / 2 && (Y > sizeBall / 2 || Y < fieldHeight - sizeBall / 2)){
      ball.PosX = X;
    }*/
    ball.Update();
  }
  //document.addEventListener("mousemove", function (e) {
    function dragMove(e) {
      X = e.offsetX; //clientX;
      Y = e.offsetY; //clientY;
      //console.log(X+' m '+ Y);
  //}, false);
    }
  document.getElementById('playingField').addEventListener('mouseover', function () { 
    //dragOver, false);
    document.getElementById('playingField').addEventListener('mousemove', dragMove, false);
  }, false);
  document.getElementById('playingField').addEventListener('mouseout', function () {  //dragOut, false);
    document.getElementById('playingField').removeEventListener('mousemove', dragMove, false);
}, false);

  setInterval(move, 40);

  function matrixArray(){
    var arr = new Array();
    for(var i=0; i < fieldHeight / 20; i++){
      arr[i] = new Array();
      for(var j=0; j < fieldWidth / 20; j++){
        arr[i][j] = 0;
      }
    }
    return arr;
  }
  var matrixField = matrixArray();
  
  function createBarrier() {
  
    barrier.PosX = Math.round(Math.random() * (fieldWidth / 20)) * 20;
    barrier.PosY = Math.round(Math.random() * (fieldHeight / 20)) * 20;
    console.log(barrier.PosX);
    console.log(barrier.PosY);
      matrixField[barrier.PosY / 20][barrier.PosX / 20] = 1;
    barrier.Update();
    console.log(matrixField);
  }
  setInterval(createBarrier, 3000);

});


/*
function attachedSpeed() {
  ball.SpeedX = calcSpeedX();
  ball.SpeedY = Math.random() * 30 - 15;
}*/

field.Update();
ball.Update();