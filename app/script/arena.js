'use strict';

const fieldWidth = 600; // ширина игрового поля
const fieldHeight = 400; // высота игрового поля
// model
class ArenaForPlay {
    constructor() {
      this.Width = fieldWidth,
      this.Height = fieldHeight
    }
}

  // view
ArenaForPlay.prototype.Update = function() {
   // Update() {
      const playingField = document.getElementById('playingField');
      playingField.style.width = this.Width + 'px';
      playingField.style.height = this.Height + 'px';
    }

    const arenaForPlay = new ArenaForPlay(fieldWidth, fieldHeight);
    arenaForPlay.Update();
  