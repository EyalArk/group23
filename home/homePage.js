
    document.addEventListener("DOMContentLoaded", function() {
    // Check if a user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
    // Display the email of the logged in user in the navigation bar
    const loggedInUserEmail = document.getElementById("loggedInUserEmail");
    loggedInUserEmail.textContent = "Welcome, " + loggedInUser;
    console.log(loggedInUserEmail)
}

});



document.addEventListener("DOMContentLoaded", function() {
    showSlides()});

document.addEventListener('DOMContentLoaded', function() {
    hidePhoto();
});




function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let session = "AM";

    if(hh > 12){
        session = "PM";
    }
    console.log('The time is', session);

    return session;
}

function hidePhoto() {
    console.log('hidePhoto called');
    let sun = document.querySelector("#sun") ?? document.createElement('img');
    let moon = document.querySelector("#moon") ?? document.createElement('img');


    console.log('sun is', sun);
    console.log('moon is', moon);


    let time = currentTime();
    console.log('time is', time);

    if (time === 'AM') {
        sun.style.visibility = 'visible';
        moon.style.visibility = 'hidden';
    } else {
        sun.style.visibility = 'hidden';
        moon.style.visibility = 'visible';
    }
}

hidePhoto();



var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}