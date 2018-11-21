'use strict';

function saveNamePlayer() {
    let name = document.getElementById('namePlayer').value;
    storageLocal.setName(name, 0);
}

