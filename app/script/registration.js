'use strict';

function saveNamePlayer() {
    let namePlayer = document.getElementById('namePlayer').value;
    localStorage.setItem('NamePlayer', JSON.stringify(namePlayer));
}

