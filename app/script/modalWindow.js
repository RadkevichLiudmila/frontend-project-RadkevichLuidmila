'use strict';

$('#modalWindow')
  .dialog({
    autoOpen: false, // окно создаётся скрытым
    modal: true, // модальное окно
    draggable: false, // не перетаскивать
    resizable: false, // не менять размер
  });

function openMyWidget() {
  $('#modalWindow')
    .dialog('open');
  $('#modalWindow')
    .dialog({
      title: `Вы набрали ${goal.gameGoal} очков`
    });
}

function safeResult() {
  addResultLocalStorage();
  addResultAJAXStorage();
  $('#modalWindow')
    .dialog('close');
}

function noSafeResult() {
  $('#modalWindow')
    .dialog('close');
}