'use strict';
const sizeBall = 20; // размер шарика
const sizeBlock = 20; // размер блока

createContainer();
function createContainer() {
  const container = document.getElementById('IPageGame');
  container.appendChild(createButton('button', 'новая игра'));
  container.appendChild(createGoal());
  container.appendChild(createPlayingField());
  return container;
}

function createButton(id, text) {
  const button = document.createElement('input');
  button.id = id;
  button.type = 'button';
  button.className = 'button';
  button.value = text;
  return button;
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
    img.width = sizeBall;
    img.height = sizeBall;
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