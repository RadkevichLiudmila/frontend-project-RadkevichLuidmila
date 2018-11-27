'use strict';

const sizeBlock = sizeBall; // размер блока

class Bonus {
  constructor(Size, PosX, PosY, Id) {
    this.Size = Size;
    this.PosX = PosX;
    this.PosY = PosY;
    this.Id = Id;
  }

  Update() {
    const bonus = document.getElementById(this.Id);
    bonus.style.width = this.Size + 'px';
    bonus.style.height = this.Size + 'px';
    bonus.style.left = this.PosX + 'px';
    bonus.style.top = this.PosY + 'px';
  }
}

const coordForBonusX = Math.floor(Math.random() * ((arenaForPlay.Width - sizeBlock) / sizeBlock)) * sizeBlock;
const coordForBonusY = Math.floor(Math.random() * ((arenaForPlay.Height - sizeBlock) / sizeBlock)) * sizeBlock;
const bonus = new Bonus(sizeBlock, coordForBonusX, coordForBonusY, 'bonus');
