
// Fetch the users data from - users.json
fetch("../users.json")
    .then(response => response.json())
    .then(data => {
        // assign the retrieved data to the users variable
        const users = data;

        // function to check if a user exists in the users list
        function userExists(email) {
            return users.some(user => user.email === email);
        }

        //Check if the user is already sign up in the site with this email
        function authenticateUser(email, password) {
            const user = users.find(user => user.email === email && user.password === password);
            return user !== undefined;
        }

        // Event listener for form submission
        const signupForm = document.getElementById("details");
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission for demonstration purposes

            const accountEmail = document.getElementById("accountEmail").value;
            const password = document.getElementById("psw").value;
            const confirmPassword = document.getElementById("confirmPsw").value; // Get the value of the confirm password field
            const name = document.getElementById("name").value;
            localStorage.setItem("loggedInName", name);

            if (userExists(accountEmail)) {
                alert("This User already exists! Please Sign In or Try Again!");
            } else if (password !== confirmPassword) { // Check if the passwords match
                alert("Passwords do not match! Please try again.");
            }
            else {
                // Create a new user object
                const newUser = {
                    email: accountEmail,
                    password: password,
                    name: name
                };

                // Add the new user to the users array
                users.push(newUser);

                // Save the updated users array to local storage
                localStorage.setItem("users", JSON.stringify(users));

                // Move to sign in page after registeration
                window.location.href = "/SignIn";
            }
        });
    })
    .catch(error => console.error("Error fetching users data:", error));