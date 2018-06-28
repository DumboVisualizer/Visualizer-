$(document).ready(function(){
    $(".btn-play").on("click", function(){
        document.getElementById("testAudio").play();
    });
    $(".btn-pause").on("click", function(){
        document.getElementById("testAudio").pause();
    });
});