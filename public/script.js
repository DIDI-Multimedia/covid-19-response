// DEFINE JQUERY ELEMENTS
console.log('load JQUERY')

$("concept").click(function(){
  $("p").hide();
});


var fullscreen = document.getElementById('play-fullscreen'),
player = document.getElementById('player');

fullscreen.addEventListener('click', function (e) {
    if (~player.src.indexOf('?')) player.src += '&autoplay=1';
    else player.src += '?autoplay=1';

    var req = player.requestFullscreen
        || player.webkitRequestFullscreen
        || player.mozRequestFullScreen
        || player.msRequestFullscreen;

    req.call(player);
    e.preventDefault();
});