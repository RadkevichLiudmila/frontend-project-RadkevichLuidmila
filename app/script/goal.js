'use strict';

class Goal {
  constructor(goals) {
    this.gameGoal = goals;
  }

  Update() {
    const goal = document.getElementById('goal');
    goal.textContent = `Вы набрали ${this.gameGoal} очков`;
  }
}

const goal = new Goal(0);
