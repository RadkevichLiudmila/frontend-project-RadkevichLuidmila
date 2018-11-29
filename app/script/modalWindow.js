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
      title: `Вы набрали ${goal.gameGoal} очков` // переопределяем заголовок
    });
}

function safeResult() {
  //$('#modalWindow').dialog('close');
 //   validNamePlayer();
  addResultLocalStorage();
  addResultAJAXStorage();
  $('#modalWindow').dialog('close');
}

function noSafeResult() {
  $('#modalWindow').dialog('close');
}
//--------------------------------------------------------
/*
function validNamePlayer() {
function RussianNameValidation(value, elem, args) {
  // value - что введено в поле, args - что задано аргументом правила валидации, т.е. 20
  // 1. текст не должен быть слишком длинным
  console.log(value);

  console.log(args);
  if (value.length >= args)
    return false;
  // 2. должно состоять из большой русской буквы и множества маленьких
  return /^[А-ЯЁ][а-яё]+$/.test(value);
}

$.validator.addMethod('russian_name', RussianNameValidation,
  'Требуется русское имя');

$('#modalWindow').validate({
  rules:
    {
      namePlayer: {required: true, russian_name: 20},
    },
  messages:
    {
      namePlayer:
        {
          required: 'Имя придётся указать!',
          russian_name: 'Введите нормальное имя!'
        }
    }
});
}*/