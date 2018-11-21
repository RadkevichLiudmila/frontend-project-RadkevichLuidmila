'use strict';

function TAJAXStorage() {
  const self = this;
  self.storage = {};

  const AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  const myName = 'Radkevich_project_results';

  // забрали данные с сервера
  $.ajax(
    {
      url: AjaxHandlerScript,
      type: 'POST',
      data: {f: 'READ', n: myName},
      cache: false,
      success: (Result) => {
        self.storage = JSON.parse(Result.result);
        console.log(self.storage);
      },
      error: ErrorHandler
    }
  );

  self.addValue = function(key, value) {
    self.storage[key] = value;
    console.log(self.storage);
    // подготавливаем сервер к изменениям
    let updatePassword = Math.random();
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET', n: myName,
        p: updatePassword
      },
      cache: false,
      success: updateServer,
      error: ErrorHandler
    });

    // посылаем измененный массив на сервер
    function updateServer() {
      $.ajax({
        url : AjaxHandlerScript,
        type : 'POST',
        data: {f: 'UPDATE', n: myName,
            v : JSON.stringify(self.storage), p: updatePassword},
        cache: false,
        success: function () {
          console.log('success');
        },//(Result) => {console.log(Result.result)},*/
        error: ErrorHandler
      });
    }
  }

  self.getValue = function() {
    $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: {f: 'READ', n: myName},
        cache: false,
        success: (Result) => self.storage = JSON.parse(Result.result),
        error: ErrorHandler
      }
    );
  }

 function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }
}
