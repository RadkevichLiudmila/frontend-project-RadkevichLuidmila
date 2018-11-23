'use strict';
// model
class Goal {
    constructor(goals) {
      this.player = goals;
    }
}

  // view
  Goal.prototype.Update = function() {
    //Update() {
      const goal = document.getElementById('goal');
      const namePlayer = storageLocal.getStorage().namePlayer;
      goal.textContent = namePlayer + '! Вы набрали ' + this.player + ' очков';
    }
    const goal = new Goal(0);
