$(document).ready(function() {
    $('.button').button();
    $('.button').addClass('new');

    $('.button').hover(
        function() {
            $( this ).addClass('hover');
        }, function() {
            $( this ).removeClass('hover');// addClass('new');
        }
    );

    $('.disable').click(
        function() {
            $('.disable').button('enable');
            $('.disable').removeClass('hover');
            $(this).button('disable');
        }
    );
 });
