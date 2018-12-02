'use strict';

createContainer();

function createContainer() {
  const container = document.getElementById('iPageGame');
  container.appendChild(createGoal());
  container.appendChild(createPlayingField());
  return container;
}

function createGoal() {
  const goal = document.createElement('p');
  goal.id = 'goal';
  goal.textContent = '0';
  return goal;
}

function createPlayingField() {
  const playingField = document.createElement('div');
  playingField.id = 'playingField';
  playingField.appendChild(createElement('ball'));
  playingField.appendChild(createElement('bonus'));
  playingField.appendChild(createButton('go', 'новая игра'));
  playingField.appendChild(createModalWindow());
  playingField.appendChild(createProgressShow());
  return playingField;
}

function createElement(name) {
  const element = document.createElement('div');
  element.id = name;
  element.appendChild(createImage(name));
  return element;
}

function createImage(name) {
  const img = document.createElement('img');
  if (name === 'barrier') {
    img.src = 'img/block.jpg';
    img.width = sizeBlock;
    img.height = sizeBlock;
  } else if (name === 'ball') {
    img.src = 'img/player.png';
    img.width = sizeBall;
    img.height = sizeBall;
  } else {
    img.src = 'img/treasure.jpg';
    img.width = sizeBlock;
    img.height = sizeBlock;
  }

  return img;
}

function createButton(id, text) {
  const button = document.createElement('input');
  button.id = id;
  button.type = 'button';
  button.className = 'button';
  button.value = text;
  return button;
}

function createModalWindow() {
  const modal = document.createElement('form');
  modal.id = 'modalWindow';
  modal.title = 'Сохранить результат?';
  modal.appendChild(createInput('namePlayer', 'Player'));
  modal.appendChild(createButtonModal('Сохранить', 'safeResult()'));
  modal.appendChild(createButtonModal('Отмена', 'noSafeResult()'));
  return modal;
}

function createProgressShow() {
  const progress = document.createElement('canvas');
  progress.id = 'canvas';
  progress.style.display = 'none';
  progress.style.width = '210';
  progress.style.height = '210';
  return progress;
}

function createInput(id, name) {
  const input = document.createElement('input');
  input.id = id;
  input.className = id;
  input.name = 'namePlayer';
  input.value = name;
  input.setAttribute('autocomplete', 'off');
  return input;
}

function createButtonModal(text, funcName) {
  const button = document.createElement('input');
  button.type = 'button';
  button.className = 'button';
  button.value = text;
  button.setAttribute('onclick', funcName);
  return button;
}

// обновляет поле при запуске игры
function newGameField() {

  // удаляем все элементы с поля, кроме главного игрока
  const playingField = document.getElementById('playingField');
  for (let i = 0; i < playingField.childNodes.length; i++) {
    if (playingField.childNodes[i].id === 'barrier') {
      playingField.removeChild(playingField.childNodes[i]);
      i--;
    }
  }

  // обнуляем счет
  goal.gameGoal = 0;
  goal.Update();
}

function theEnd() {
  document.getElementById('playingField')
    .appendChild(createResult());

  function createResult() {
    const gameEnd = document.createElement('p');
    gameEnd.id = 'gameEnd';
    gameEnd.textContent = 'Вы проиграли!';
    return gameEnd;
  }
}