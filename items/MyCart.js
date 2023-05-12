// document.addEventListener("DOMContentLoaded", function () {
//     // Get the cart items from local storage
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (storedCartItems) {
//         const cartItems = JSON.parse(storedCartItems);
//
//         // Get the cart-items table body element
//         const cartItemsTableBody = document.getElementById("cart-items");
//
//         // Loop through the cart items and dynamically create rows in the table
//         for (let i = 0; i < cartItems.length; i++) {
//             const product = cartItems[i];
//             const row = document.createElement("tr");
//             row.innerHTML = `
//         <td>${product.name}</td>
//         <td>${product.price}</td>
//         <td>
//               <img src="${product.image}"
//                    data-hover="${product.image2}"
//                    onmouseover="this.src='${product.image2}'"
//                    onmouseout="this.src='${product.image}'">
//             </td>
//       `;
//             cartItemsTableBody.appendChild(row);
//         }
//     }
// });
//





//
// document.addEventListener("DOMContentLoaded", function () {
//     // Get the cart items from local storage
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (storedCartItems) {
//         const cartItems = JSON.parse(storedCartItems);
//
//         // Get the cart-items table body element
//         const cartItemsTableBody = document.getElementById("cart-items");
//
//         // Function to remove a product from the cart
//         function removeFromCart(index) {
//             cartItems.splice(index, 1);
//             localStorage.setItem("cartItems", JSON.stringify(cartItems));
//         }
//
//         // Function to clear all products from the cart
//         function clearCart() {
//             cartItems.length = 0;
//             localStorage.removeItem("cartItems");
//             cartItemsTableBody.innerHTML = "";
//         }
//
//         // Loop through the cart items and dynamically create rows in the table
//         for (let i = 0; i < cartItems.length; i++) {
//             const product = cartItems[i];
//             const row = document.createElement("tr");
//             row.innerHTML = `
//         <td>${product.name}</td>
//         <td>${product.price}</td>
//         <td>
//           <img src="${product.image}"
//                data-hover="${product.image2}"
//                onmouseover="this.src='${product.image2}'"
//                onmouseout="this.src='${product.image}'">
//         </td>
//         <td>
//           <button class="remove-btn" data-index="${i}">Remove</button>
//         </td>
//       `;
//             cartItemsTableBody.appendChild(row);
//         }
//
//         // Add event listeners to the Remove buttons
//         const removeButtons = document.getElementsByClassName("remove-btn");
//         for (let i = 0; i < removeButtons.length; i++) {
//             removeButtons[i].addEventListener("click", function () {
//                 const index = parseInt(this.dataset.index);
//                 removeFromCart(index);
//                 this.closest("tr").remove();
//             });
//         }
//
//         // Add event listener to the Clear All button
//         const clearAllButton = document.getElementById("clear-all-btn");
//         clearAllButton.addEventListener("click", function () {
//             clearCart();
//         });
//     }
// });



document.addEventListener("DOMContentLoaded", function () {
    // Get the cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);

        // Get the cart-items table body element
        const cartItemsTableBody = document.getElementById("cart-items");
        // Get the total price element
        const totalPriceElement = document.getElementById("total-price");

        // Function to remove a product from the cart
        function removeFromCart(index) {
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        // Function to calculate and display the total price
        function calculateTotalPrice() {
            let totalPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
                const product = cartItems[i];
                totalPrice += parseFloat(product.price);
            }
            totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
        }

        // Function to clear all products from the cart
        function clearCart() {
            cartItems.length = 0;
            localStorage.removeItem("cartItems");
            cartItemsTableBody.innerHTML = "";
            calculateTotalPrice();
        }

        // Loop through the cart items and dynamically create rows in the table
        for (let i = 0; i < cartItems.length; i++) {
            const product = cartItems[i];
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <img src="${product.image}"
               data-hover="${product.image2}"
               onmouseover="this.src='${product.image2}'"
               onmouseout="this.src='${product.image}'">
        </td>
        <td>
          <button class="remove-btn" data-index="${i}">Remove</button>
        </td>
      `;
            cartItemsTableBody.appendChild(row);
        }

        // Add event listeners to the Remove buttons
        const removeButtons = document.getElementsByClassName("remove-btn");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click", function () {
                const index = parseInt(this.dataset.index);
                removeFromCart(index);
                this.closest("tr").remove();
                calculateTotalPrice();
            });
        }

        // Add event listener to the Clear All button
        const clearAllButton = document.getElementById("clear-all-btn");
        clearAllButton.addEventListener("click", function () {
            clearCart();
        });

        // Calculate and display the initial total price
        calculateTotalPrice();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Get the buy now button element
    const buyNowButton = document.getElementById("buy-now-btn");

    // Add event listener to the Buy Now button
    buyNowButton.addEventListener("click", function () {
        // Make a POST request to the server to send the email
        fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "amitf9@gmail.com", // The recipient's email address
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                alert("Email sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                alert("Error sending email");
            });
    });
});
