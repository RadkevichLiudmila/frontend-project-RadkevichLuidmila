'use strict';

// model
class Ball {
    constructor(Width, Height, PosX, PosY, Id) {
      this.Width = Width;
      this.Height = Height;
      this.PosX = PosX;
      this.PosY = PosY;
      this.Id = Id;
    }

    /*Метод Shift должен вызываться контроллером, чтобы сдвинуть человечка.
          Заметьте, сам этот метод проверяет признак бега, сам изменяет
          обе координаты соответственно, и сам же вызывает свой метод UpdateView,
          чтобы изменения отразились на веб-странице.*/
        /*  Shift: function (X, Y) {
            this.PosX += (this.IsRun ? 30 : 5) * X;
            this.PosY += (this.IsRun ? 30 : 5) * Y;
            this.UpdateView(); // модель при любых изменениях
            // вызывает обновление представления
          },

          /*Метод SetRun должен вызываться контроллером, чтобы изменить
          признак бега В МОДЕЛИ. Контроллер вызовет этот метод, когда словит
          событие click на чекбоксе "Бег". Ведь представление должно соответствовать
          модели, и если пользователь имеет возможность повлиять на
          представление — мы должны соответственно изменить модель.*/
        /*  SetRun: function (R) {
            this.IsRun = R;
            this.UpdateView(); // модель при любых изменениях
            // вызывает обновление представления
          }*/
  }
 
  const ball = new Ball(sizeBall, sizeBall, fieldWidth / 2, fieldHeight / 2, 'ball');
 
  Ball.prototype.Update = function() {
    WebPageViewH.Update();
  }

  // view
  const WebPageViewH = {
    Update: function () {
      const Obj = document.getElementById(ball.Id);
      Obj.style.width = ball.Width + 'px';
      Obj.style.height = ball.Height + 'px';
      Obj.style.left = ball.PosX + 'px';
      Obj.style.top = ball.PosY + 'px';
    }
  }
  /*Контроллер.*/
  //--------------------- нажали на кнопку новая игра ---------------------

document.getElementById('button').addEventListener('click', function () {
  document.getElementById('playingField').appendChild(createButton('go', 'поехали'));
  document.getElementById('go').addEventListener('click', startGame, false);
  matrixField = matrixArray();
  newGameField();
  updateGame();
});

//----------- поехали -------------------
function startGame() {
  document.getElementById('go').remove();
  if (document.getElementById('gameEnd') !== null) {
    document.getElementById('gameEnd').remove();
  }

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
  const arr = new Array();
  for (let i=0; i < fieldHeight / 20; i++) {
    arr[i] = new Array();
    for (let j=0; j < fieldWidth / 20; j++) {
      arr[i][j] = 0;
    }
  }
  arr[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 2;
  return arr;
}
  /*
  Ball.prototype.Update = function() {
      const Obj = document.getElementById(this.Id);
      Obj.style.width = this.Width + 'px';
      Obj.style.height = this.Height + 'px';
      Obj.style.left = this.PosX + 'px';
      Obj.style.top = this.PosY + 'px';
    }*/

    
    ball.Update();
  