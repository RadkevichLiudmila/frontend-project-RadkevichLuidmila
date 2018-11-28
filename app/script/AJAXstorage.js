'use strict';

class TAJAXStorage {
  constructor(ajaxHandlerScript, name) {
    this.storage = {};
    this.link = ajaxHandlerScript;
    this.name = name;
    this.getValue();
}

getValue() {
  const self = this;
  $.ajax({
    url: self.link,
    type: 'POST',
    data: {
      f: 'READ',
      n: self.name
    },
    cache: false,
    success: (Result) => {
      if (Result.result) {
        self.storage = JSON.parse(Result.result);
      } else {
        self.storage = {};
      }
    },
    error: self.errorHandler
  });
  return self.storage;
};

addValue(key, value) { 
  const self = this;
  self.storage[key] = value;
  console.log('1--------');
  console.log( self.storage);  // 1
  self.updateStorage();
};

updateStorage() {
  const self = this;
  console.log('2--------');
  console.log( self.storage);// 2
  const updatePassword = Math.random();
  $.ajax({
    url: self.link,
    type: 'POST',
    data: {
      f: 'LOCKGET',
      p: updatePassword,
      n: self.name
    },
    cache: false,
    success: function () {
      console.log('3--------');
      console.log( self.storage); // 3
      $.ajax({
        url: self.link,
        type: 'POST',
        data: {
          f: 'UPDATE',
          n: self.name,
          p: updatePassword,
          v: JSON.stringify(self.storage)
        },
        cache: false,
        error: self.errorHandler
      });
    },
    error: self.errorHandler
  })
};

errorHandler(error) {
  console.log('Ошибка: ' + error);
};
}