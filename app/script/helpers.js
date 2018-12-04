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

// список лучших игроков
function listBestPlayers() {
  const people = [];
  const storage = storageResultAJAX.getValue();
  let list = '';
  for (let key in storage) {
    people.push({
      name: key,
      result: storage[key]
    });
  }
  people.sort(sortResult);

  list += `<p>`;
  people.slice(0, 10)
    .forEach(function (item, i) {
      list += `${i + 1}. ${item.name} -  ${item.result}. <br>`;
    });
  list += `</p>`;

  return list;
}


function findColor(color) {
  const obj = {'red':'красный', 'yellow':'желтый', 'green':'зеленый', 'blue':'синий'};
  return obj[color];
}
