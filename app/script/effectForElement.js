$(document)
  .ready(function () {
    $('.button')
      .button();
    $('.button')
      .addClass('new');
    $('#ball')
      .addClass('red');

    $('.button')
      .hover(
        function () {
          $(this)
            .addClass('hover');
        }, function () {
          $(this)
            .removeClass('hover');
        }
      );

    $('.disable')
      .click(
        function () {
          $('.disable')
            .button('enable');
          $('.disable')
            .removeClass('hover');
          $(this)
            .button('disable');
        }
      );

    $('.ballShow')
      .click(
        function () {
          $('.block p')
            .last()
            .remove();
          $('#ball')
            .removeClass();
          $('.block')
            .append($(`<p>Цвет игрока -  ${findColor(this.id)}</p>`));
          $('#ball')
            .addClass(this.id);
        }
      );
  });

window.onbeforeunload = function () {
  return 'Bye now!';
};

