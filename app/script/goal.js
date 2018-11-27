'use strict';

class Goal {
  constructor(goals) {
    this.gameGoal = goals;
  }

  Update() {
    const goal = document.getElementById('goal');
    const namePlayer = storageLocal.getStorage().namePlayer;
    goal.textContent = `Вы набрали ${this.gameGoal} очков`;
  }
}

const goal = new Goal(0);
