'use strict';

const sizeBall = 25;

class Player {
  constructor(Size, PosX, PosY, Id) {
    this.Size = Size;
    this.PosX = PosX;
    this.PosY = PosY;
    this.Id = Id;
  }

  Update() {
    const objPlayer = document.getElementById(this.Id);
    objPlayer.style.width = this.Size + 'px';
    objPlayer.style.height = this.Size + 'px';
    objPlayer.style.left = this.PosX + 'px';
    objPlayer.style.top = this.PosY + 'px';
  }
}

const player = new Player(sizeBall, arenaForPlay.Width / 2, arenaForPlay.Height / 2, 'ball');
