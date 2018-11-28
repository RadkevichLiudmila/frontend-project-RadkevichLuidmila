'use strict';

class TLocalStorage {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem('ResultTreasure')) ||
      {
        namePlayer: 'Player',
        goalPlayer: 0,
        nameBESTPlayer: 'Player',
        goalBESTPlayer: 0
      };

    localStorage.setItem('ResultTreasure', JSON.stringify(this.storage));
  }

  setName(name, goal) {
    this.storage.namePlayer = name;
    this.storage.goalPlayer = goal;
    localStorage.setItem('ResultTreasure', JSON.stringify(this.storage));
  }

  setResultBest(goal) {
    this.storage.nameBESTPlayer = this.storage.namePlayer;
    this.storage.goalBESTPlayer = goal;
    localStorage.setItem('ResultTreasure', JSON.stringify(this.storage));
  }

  getStorage() {
    return this.storage;
  }
}
