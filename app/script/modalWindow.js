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
  $('.ui-dialog-titlebar')
    .removeClass('ui-widget-header');
  $('.ui-dialog-titlebar')
    .addClass('modal-window');
  $('.ui-button')
    .addClass('button-size');
}

function safeResult() {
  if (formValid) {
    addResultLocalStorage();
    addResultAJAXStorage();
    $('#modalWindow')
      .dialog('close');
  }
}

function noSafeResult() {
  $('#modalWindow')
    .dialog('close');
}
