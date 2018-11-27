'use strict';

class Barrier {
  constructor(Size, PosX, PosY, Id) {
    this.Size = Size;
    this.PosX = PosX;
    this.PosY = PosY;
    this.Id = Id;
  }

  Update() {
    const playingField = document.getElementById('playingField');
    const barrier = document.createElement('div');
    barrier.id = 'barrier';
    playingField.appendChild(barrier);
    barrier.style.width = this.Size + 'px';
    barrier.style.height = this.Size + 'px';
    barrier.style.left = this.PosX + 'px';
    barrier.style.top = this.PosY + 'px';
    barrier.appendChild(createImage('barrier'));
  }
}

const barrier = new Barrier(sizeBlock, 0, 0, 'barrier');
