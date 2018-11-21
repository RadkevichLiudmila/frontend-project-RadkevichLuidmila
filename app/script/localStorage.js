'use strict';

function TLocalStorage() {
  const self = this;
  self.storage = JSON.parse(localStorage.getItem('ResultTreasure')) || 
  {namePlayer: 'Player', goalPlayer: 0, nameBESTPlayer: 'Player', goalBESTPlayer: 0};
  
  localStorage.setItem('ResultTreasure', JSON.stringify(self.storage));
 
  self.setName = function(name, goal) {
    self.storage.namePlayer = name;
    self.storage.goalPlayer = goal;
    localStorage.setItem('ResultTreasure', JSON.stringify(self.storage));
  }

  self.setResultBest =  function(goal) {
    self.storage.nameBESTPlayer = self.storage.namePlayer;
    self.storage.goalBESTPlayer = goal;
    localStorage.setItem('ResultTreasure', JSON.stringify(self.storage));
  }

  self.getStorage =  function() {
    return self.storage;
  }
}
