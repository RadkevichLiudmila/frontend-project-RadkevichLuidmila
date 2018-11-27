'use strict';

class ArenaForPlay {
  constructor(fieldWidth, fieldHeight) {
    this.Width = fieldWidth,
    this.Height = fieldHeight;
  }

  Update() {
    const playingField = document.getElementById('playingField');
    playingField.style.width = this.Width + 'px';
    playingField.style.height = this.Height + 'px';
  }
}

const arenaForPlay = new ArenaForPlay(750, 500);
