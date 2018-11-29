'use strict';

function addResultLocalStorage() {

    const name = document.getElementById('namePlayer').value;
    const goalLocal = storageResultLocal.getStorage().goalPlayer;
    const goalLocalBest = storageResultLocal.getStorage().goalBESTPlayer;
  
    if (goalLocal < goal.gameGoal || name !== storageResultLocal.getStorage().namePlayer) {
      storageResultLocal.setName(name, goal.gameGoal);
    }
  
    if (goalLocalBest < goal.gameGoal) {
      storageResultLocal.setResultBest(goal.gameGoal);
    }
  
  }
  //---------------------------------------------
  function addResultAJAXStorage() {
  
    const namePlayerLoc = storageResultLocal.getStorage().namePlayer;
    const storage = storageResultAJAX.getValue();
    if (!storage[namePlayerLoc] || (storage[namePlayerLoc] < goal.gameGoal)) {
      storageResultAJAX.addValue(namePlayerLoc, goal.gameGoal);
    }
  }