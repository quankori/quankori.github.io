$description = $(".description");

$('path').hover(function () {
    $description.addClass('active');
    if ($(this).attr('images')) {
        $description.html($(this).attr('title') + ' ' + "<br/><img src='" + $(this).attr('images') + "' width='100px' />");
    } else {
        $description.html($(this).attr('title'));
    }
}, function () {
    $description.removeClass('active');
});

$(document).on('mousemove', function (e) {
    $description.css({
        left: e.pageX,
        top: e.pageY - 70
    });
});