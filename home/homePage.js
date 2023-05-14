function  navUserName (){
    document.addEventListener("DOMContentLoaded", function() {

        const loggedInUser = localStorage.getItem("loggedInName");

        if (loggedInUser) {
            const loggedInUserName = document.getElementById("loggedInUserName");
            loggedInUserName.textContent = "Welcome, " + loggedInUser;
            console.log(loggedInUserName)
        }

    });
}

navUserName();

    document.addEventListener("DOMContentLoaded", function() {
        showSlides1();
        showSlides2();
        hidePhoto();
    });

    var slideIndex = 0;

    function showSlides1() {
        var slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) {
            return;
        }
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides1, 3000);
    }


    function hidePhoto() {
        let date = new Date();
        let hour = date.getHours();
        let sun = document.querySelector("#sun") ?? document.createElement('img');
        let moon = document.querySelector("#moon") ?? document.createElement('img');

        if (hour > 19 && hour < 6) {
            clockImg.src = "../pics/clockPics/moon.png"
        }
        else {
            clockImg.src = "../pics/clockPics/sun.png"
        }
    }

    hidePhoto();
