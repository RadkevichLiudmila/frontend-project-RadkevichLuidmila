'use strict';
// model
class Barrier extends Ball {
    constructor(Width, Height, PosX, PosY, Id) {
      super(Width, Height, PosX, PosY, Id);
    }
}
 // view
 Barrier.prototype.Update = function() {
   // Update() {
      const playingField = document.getElementById('playingField');
      const barrier = document.createElement('div');
      barrier.id = 'barrier';
      playingField.appendChild(barrier);
      barrier.style.width = this.Width + 'px';
      barrier.style.height = this.Height + 'px';
      barrier.style.left = this.PosX + 'px';
      barrier.style.top = this.PosY + 'px';
      barrier.appendChild(createImage('barrier'));
    }
    const barrier = new Barrier(sizeBlock, sizeBlock, 0, 0, 'barrier');

 