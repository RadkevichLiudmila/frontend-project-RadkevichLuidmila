'use strict';

let formValid = false;

function validateNamePlayer() {
  function showError() {
    $('.namePlayer')
      .addClass('sErrorInput');
    formValid = false;
  }

  function hideError() {
    $('.namePlayer')
      .removeClass('sErrorInput');
    formValid = true;
  }

  $('#modalWindow')
    .validate({
      rules:
        {
          namePlayer: {
            required: true,
            minlength: 3,
            maxlength: 20
          },
        },
      messages:
        {
          namePlayer:
            {
              required: 'Укажите имя!',
              minlength: 'Min 3 буквы!',
              maxlength: 'Max 20 букв!'
            }
        },
      errorElement: 'div',
      errorClass: 'sErrorText',
      highlight: showError,
      unhighlight: hideError
    });

}
