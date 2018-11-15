'use strict';
window.onhashchange=SwitchToStateFromURLHash;

let SPAStateH = {}; // могут быть элементы pagename и photoid

function SwitchToStateFromURLHash() {
  let URLHash = window.location.hash;

  let StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== '') {
    SPAStateH = JSON.parse(StateJSON); // если JSON непустой, читаем из него
  } else {                                // состояние и отображаем
    SPAStateH = {pagename:'Main'}; // иначе показываем главную страницу
  }

  // обновляем вариабельную часть страницы под текущее состояние
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
      PageHTML += "<h3>Регистрация игрока</h3>";
      PageHTML += "<input id='namePlayer' value='Player 1'></input>";
      PageHTML += "<p>Введите имя игрока</p>";
      document.getElementById('IPageGame').style.display = 'none';
      break;

    case 'Game':
      PageHTML += "<h3>Собиратель сокровищ</h3>";
      document.getElementById('IPageGame').style.display = 'block';
      break;

    case 'Best':
      PageHTML+="<h3>Лучший игрок</h3>";
      PageHTML+= "<p>Здесь будет имя лучшего игрока</p>";
      document.getElementById('IPageGame').style.display = 'none';
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
  SwitchToState( { pagename:'Main' } );
}

function SwitchToLoginPage() {
  SwitchToState( { pagename:'Login' } );
}

function SwitchToGamePage() {
  SwitchToState( { pagename:'Game' } );
}

function SwitchToBestPage() {
  SwitchToState( { pagename:'Best' } );
}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
SwitchToStateFromURLHash();
