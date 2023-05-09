
// Fetch the users data from users.json
fetch("users.json")
    .then(response => response.json())
    .then(data => {
        // Assign the retrieved data to the users variable
        const users = data;

        // Function to check if a user exists in the user list
        function userExists(email) {
            return users.some(user => user.email === email);
        }

        // Function to authenticate user
        function authenticateUser(email, password) {
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
                    window.location.href = "home/homePage.html";
                } else {
                    alert("Invalid password. Please try again.");
                }
            } else {
                alert("User not found. Please sign up.");
            }
        });
    })
    .catch(error => console.error("Error fetching users data:", error));
