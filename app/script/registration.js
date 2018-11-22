'use strict';

function saveNamePlayer() {
    const name = document.getElementById('namePlayer').value;
    storageLocal.setName(name, 0);
}

