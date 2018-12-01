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

      const colorPlayer = document.getElementById('ball').className || 'red';
      PageHTML += `<h2>Добро пожаловать на наш сайт!</h2>
      <p>Выберете цвет игрока:</p>
      <div class="block">
      <div id='red' class='ballShow class-margin red'>
      <img class='imgShow' src="img/player.png">
      </div>
      <div id='yellow' class='ballShow class-margin yellow'>
      <img class='imgShow' src='img/player.png'>
      </div>
      <div id='green' class='ballShow class-margin green'>
      <img class='imgShow' src='img/player.png'>
      </div>
      <div id='blue' class='ballShow class-margin blue'>
      <img class='imgShow' src='img/player.png'>
      </div>
      <p>Цвет игрока - ${findColor(colorPlayer)}</p>
      </div>`;

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

      PageHTML += `<h2>Собиратель сокровищ</h2>`;
      document.getElementById('iPageGame').style.display = 'block';
    
    break;

    case 'Best':

      PageHTML += `<h2>TOP-10 лучших игроков</h2>`;
      document.getElementById('iPageGame').style.display = 'none';

      // выводим список лучших игроков
      const people = [];
      const storage = storageResultAJAX.getValue();
      for (let key in storage) {
        people.push({
          name: key,
          result: storage[key]
        });
      }
      people.sort(sortResult);

      PageHTML += `<p>`;
      people.slice(0, 10)
        .forEach(function (item, i) {
          PageHTML += `${i + 1}. ${item.name} -  ${item.result}. <br>`;
        });
      PageHTML += `</p>`;

      PageHTML += `<h2>Лучший результат на этом устройстве</h2>
      <p>${storageResultLocal.getStorage().nameBESTPlayer} - ${storageResultLocal.getStorage().goalBESTPlayer}</p>`;
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
