'use strict';
window.onhashchange = SwitchToStateFromURLHash;

let SPAStateH = {};

function SwitchToStateFromURLHash() {
  const URLHash = window.location.hash;

  const StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== '') {
    SPAStateH = JSON.parse(StateJSON);
  } else {
    SPAStateH = { pagename: 'Main' };
  }

  let PageHTML = '';

  switch (SPAStateH.pagename) {

    case 'Main':
      PageHTML += `<h2>Добро пожаловать на наш сайт!</h2>
      <p>Здесь вы можете найти увлекательную игру. Листайте дальше и вы увидите игру 'собиратель сокровищ'</p>`;

      document.getElementById('iPageGame').style.display = 'none';
      break;
    case 'Regulations':
      PageHTML += `<h2>Правила игры.</h2>
      <p>Нажать на кнопку 'новая игра'. ` +
        `На игровом поле появится кнопка 'поехали'. ` +
        `После ее нажатия на игровом поле появися шарик, ` +
        `который двигается за компьютерной мышкой. ` +
        `Спустя каждые 3 секунды на поле появляются препятствия и бонусы. ` +
        `При столкновении со стеной или препятствием игра заканчивается. ` +
        `Цель собрать как можно больше бонусов.</p>`;

      document.getElementById('iPageGame').style.display = 'none';
      break;

    case 'Game':
      PageHTML += `<h3>Собиратель сокровищ</h3>`;
      document.getElementById('iPageGame').style.display = 'block';
      break;

    case 'Best':
      PageHTML += `<h3>TOP-10 лучших игроков</h3>`;
      document.getElementById('iPageGame').style.display = 'none';

      // выводим список лучших игроков
      const people = [];
      for (let key in storageAJAX.storage) {
        people.push({
          name: key,
          result: storageAJAX.storage[key]
        });
      }
      people.sort(sortResult);

      PageHTML += `<p>`;
      people.slice(0, 10)
        .forEach(function (item, i) {
          PageHTML += `${i + 1}. ${item.name} -  ${item.result}. <br>`;
        });
      PageHTML += `</p>`;

      PageHTML += `<h3>Лучший результат на этом устройстве</h3>
      <p>${storageLocal.getStorage().nameBESTPlayer} - ${storageLocal.getStorage().goalBESTPlayer}</p>`;
      break;
  }
  document.getElementById('iPage').innerHTML = PageHTML;
}

// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMainPage() {
  SwitchToState({ pagename: 'Main' });
}

function SwitchToRegulationsPage() {
  SwitchToState({ pagename: 'Regulations' });
}

function SwitchToGamePage() {
  SwitchToState({ pagename: 'Game' });
}

function SwitchToBestPage() {
  SwitchToState({ pagename: 'Best' });
}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
SwitchToStateFromURLHash();
