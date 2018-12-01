'use strict';

class TAJAXStorage {
  constructor(ajaxHandlerScript, name) {
    this.storage = {};
    this.link = ajaxHandlerScript;
    this.name = name;
    this.timerProgress = 0;
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
      success: (data) => {
        if (data.result) {
          self.storage = JSON.parse(data.result);
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
      success: function (data) {
        self.storage = JSON.parse(data.result);
        self.storage[key] = value;

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
          complete: self.complete,
          error: self.errorHandler
        });
      },
      error: self.errorHandler,
      xhrFields: { onprogress: self.progress }
    });
  };

  errorHandler(error) {
    console.log('Ошибка: ' + error);
  };

  progress(EO) {
    if (EO.lengthComputable) {
      document.getElementById('canvas').style.display = 'block';
      this.timerProgress = setInterval(showCanvas, 1000 / 60);
    }
  }

  complete() {
    document.getElementById('canvas').style.display = 'none';
    clearInterval(this.timerProgress);
  }
}
