document.addEventListener("DOMContentLoaded", function () {
    showSlides1();
    hidePhoto();
});

let slideIndex = 0;

    function showSlides1() {
    let slides = document.getElementsByClassName("Slide");
    if (slides.length === 0) {
        return;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides1, 3000);
}
function hidePhoto() {      /* display picture by the time of the day (sun/moon) */
    let date = new Date();
    let hour = date.getHours();
    let sun = document.querySelector("#sun") ?? document.createElement('img');
    let moon = document.querySelector("#moon") ?? document.createElement('img');

    if (hour > 19 && hour < 6) {
        clockImg.src = "pics/clockPics/moon.png"
    } else {
        clockImg.src = "pics/clockPics/sun.png"
    }
}
hidePhoto();
