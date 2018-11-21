'use strict';
window.onhashchange = SwitchToStateFromURLHash;

let SPAStateH = {}; 

function SwitchToStateFromURLHash() {
  let URLHash = window.location.hash;

  let StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== '') {
    SPAStateH = JSON.parse(StateJSON); 
  } else {                                
    SPAStateH = {pagename:'Main'}; 
  }

  let PageHTML = '';

  switch ( SPAStateH.pagename ) {

    case 'Main':
      PageHTML += "<h2>Добро пожаловать!</h2>";
      PageHTML += "<h3>Правила игры.</h3>";
      PageHTML += "<p>Нажать на кнопку 'новая игра'. " +
        "На игровом поле появится кнопка 'поехали'. " +
        "После ее нажатия на игровом поле появися шарик, " +
        "который двигается за компьютерной мышкой. " +
        "Спустя каждые 3 секунды на поле появляются препятствия и бонусы. " +
        "При столкновении со стеной или препятствием игра заканчивается. " +
        "Цель собрать как можно больше бонусов.</p>";

      document.getElementById('IPageGame').style.display = 'none';
      break;

    case 'Login':
      let namePlayer = storageLocal.getStorage().namePlayer;//getName();
      PageHTML += "<h3>Регистрация игрока</h3>";
      PageHTML += "<p>Введите имя игрока</p>";
      PageHTML += `<input id='namePlayer' value=${namePlayer}></input>`;
      PageHTML += '<br>';
      PageHTML += "<input type=button value='Сохранить' onclick='saveNamePlayer()'>";
      document.getElementById('IPageGame').style.display = 'none';
      break;

    case 'Game':
      PageHTML += "<h3>Собиратель сокровищ</h3>";
      document.getElementById('IPageGame').style.display = 'block';
      break;

    case 'Best':
      PageHTML+="<h3>TOP-10 лучших игроков</h3>";
      document.getElementById('IPageGame').style.display = 'none';
      //showResult();

      // выводим список лучших игроков
      storageAJAX.getValue();

      let people = [];
      for (let key in storageAJAX.storage) {
        people.push({name:key, result:storageAJAX.storage[key]});
      }
      
      function sortResult(personA, personB) {
        return  personB.result - personA.result;
      }
      people.sort(sortResult);
      PageHTML += `<p>`;
      people.slice(0, 10).forEach(function(item, i, people) {
        PageHTML += `${i+1}. ${item.name} -  ${item.result}. <br>`;
      });
      PageHTML += `</p>`;

      PageHTML += `<h3>Лучший результат на этом устройстве</h3>`;
      PageHTML += `<p>${storageLocal.getStorage().nameBESTPlayer} - ${storageLocal.getStorage().goalBESTPlayer}</p>`;

      break;
  }
  document.getElementById('IPage').innerHTML = PageHTML;
}

// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMainPage() {
  SwitchToState({pagename:'Main'});
}

function SwitchToLoginPage() {
  SwitchToState({pagename:'Login'});
}

function SwitchToGamePage() {
  SwitchToState({pagename:'Game'});
}

function SwitchToBestPage() {
  SwitchToState({pagename:'Best'});

}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
SwitchToStateFromURLHash();
