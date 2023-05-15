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

