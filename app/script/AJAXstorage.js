'use strict';
const AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
const myName = 'Radkevich_project_results';

function TAJAXStorage() {
  this.storage = {};
  this.getValue();
}

TAJAXStorage.prototype.getValue = function() {
  const self = this;
  $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ', 
        n: myName
      },
      cache: false,
      success: (Result) => self.storage = JSON.parse(Result.result),
      error: self.errorHandler
  });
}

TAJAXStorage.prototype.addValue = function(key, value) {
  const self = this;  
  self.storage[key] = value;
  const updatePassword = Math.random();
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    data: {
      f: 'LOCKGET',
      n: myName,
      p: updatePassword
    },
    cache: false,
    success: function () {
      $.ajax({
        url : AjaxHandlerScript,
        type : 'POST',
        data: {
          f: 'UPDATE',
          n: myName,
          v : JSON.stringify(self.storage),
          p: updatePassword
        },
        error: self.errorHandler
      })
    },
    error: self.errorHandler
  });
}

TAJAXStorage.prototype.errorHandler = function () {
  console.log('Ошибка сети!');
}
