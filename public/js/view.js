$(document).ready(() => {
    let isFullscreen = false;

    const slider = document.getElementById("audioVolumeSlider");
    slider.oninput = function () {
        document.getElementById("testAudio").volume = this.value / 100;
    }

   

    $(".btn-play").on("click", () => {
        document.getElementById("testAudio").play();
    });
    $(".btn-pause").on("click", () => {
        document.getElementById("testAudio").pause();
    });
    $("#glow-upload > input").on("change", (event) => {
        const input = event.target;

        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            const output = document.getElementById('testAudio');
            output.crossOrigin = "anonymous";
            output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
    });
    $(".btn-fullscreen").on("click", () => {
        if (!isFullscreen) {
            $("nav").animate({
                bottom: `${$(this).height()}px`
            });
            $(".footer").animate({
                bottom: `-${$(this).height()}px`
            });
            $("#exitFullscreen").animate({
                opacity: 1.0,
                display: "block"
            });
            isFullscreen = true;
        } else {
            $("nav").animate({
                bottom: "0px"
            });
            $(".footer").animate({
                bottom: "0px"
            });
            $("#exitFullscreen").animate({
                opacity: 0.0,
                display: "none"
            });
            isFullscreen = false;
        }
    });
});