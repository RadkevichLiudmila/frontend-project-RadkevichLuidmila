'use strict';
// model
class Bonus extends Ball {
    constructor(Width, Height, PosX, PosY, Id) {
      super(Width, Height, PosX, PosY, Id);
    }
}
 // view
 Bonus.prototype.Update = function() {
  //  Update() {
   //   super.Update();
   const Obj = document.getElementById(this.Id);
   Obj.style.width = this.Width + 'px';
   Obj.style.height = this.Height + 'px';
   Obj.style.left = this.PosX + 'px';
   Obj.style.top = this.PosY + 'px';
}
  
const coordForBonusX = Math.floor(Math.random() * ((fieldWidth - sizeBlock) / sizeBlock)) * sizeBlock;
const coordForBonusY = Math.floor(Math.random() * ((fieldHeight - sizeBlock) / sizeBlock)) * sizeBlock;
const bonus = new Bonus(sizeBlock, sizeBlock, coordForBonusX, coordForBonusY, 'bonus');

bonus.Update();