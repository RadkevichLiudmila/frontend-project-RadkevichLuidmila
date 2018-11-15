'use strict';

function saveNamePlayer() {
    let namePlayer = document.getElementById('namePlayer').value;
    //localStor[namePlayer] = 0;
    //localStorage.setItem('BESTResult', JSON.stringify(localStor));
    localStorage.setItem('NamePlayer', JSON.stringify(namePlayer));
}

