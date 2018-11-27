'use strict';
let matrixField = []; // матрица поля, для того, чтобы узнать положение объектов

// создаем пустую матрицу, которая следит за положением элементов на поле
function matrixArray() {
  const arr = new Array();
  for (let i = 0; i < arenaForPlay.Height / 20; i++) {
    arr[i] = new Array();
    for (let j = 0; j < arenaForPlay.Width / 20; j++) {
      arr[i][j] = 0;
    }
  }
  arr[bonus.PosY / sizeBlock][bonus.PosX / sizeBlock] = 2;
  return arr;
}

function sortResult(personA, personB) {
  return personB.result - personA.result;
}
