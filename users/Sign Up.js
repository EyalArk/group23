
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

        // Event listener for form submission!
        const signupForm = document.getElementById("details");
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission for demonstration purposes

            const accountEmail = document.getElementById("accountEmail").value;
            const password = document.getElementById("psw").value;
            const name = document.getElementById("name").value;
            localStorage.setItem("loggedInName", name);

            if (userExists(accountEmail)) {
                alert("This User already exists! Please sign in!");
            } else {
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

                // Redirect to home page or perform other actions as needed
                window.location.href = "../users/Sign%20In.html";
            }
        });
    })
    .catch(error => console.error("Error fetching users data:", error));