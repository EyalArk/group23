
document.addEventListener("DOMContentLoaded", function() {
    // Function to check if a user exists in the user list
    function userExists(email) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some(user => user.email === email);
    }

    //Check if the user is already sign up in the site
    function authenticateUser(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email && user.password === password);
        return user !== undefined;
    }

    // Event listener for form submission
    const loginForm = document.getElementById("login");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission for demonstration purposes

        const accountEmail = document.getElementById("accountEmail").value;
        const password = document.getElementById("psw").value;

        if (userExists(accountEmail)) {
            if (authenticateUser(accountEmail, password)) {
                // Redirect to home page on successful login
                localStorage.setItem("loggedInUser", accountEmail);

                window.location.href = "../views/homePage.html";
            } else {
                alert("Invalid password! Please try again.");
            }
        } else {
            alert("User not found! Please sign up.");
        }
    });
});
