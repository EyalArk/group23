document.addEventListener("DOMContentLoaded", function () {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        const cartItemsTableBody = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");

        function removeFromCart(index) {
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        function calculateTotalPrice() {
            let totalPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
                const product = cartItems[i];
                totalPrice += parseFloat(product.price);
            }
            totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
        }

        function clearCart() {
            cartItems.length = 0;
            localStorage.removeItem("cartItems");
            cartItemsTableBody.innerHTML = "";
            calculateTotalPrice();
        }

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

        const removeButtons = document.getElementsByClassName("remove-btn");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click", function () {
                const index = parseInt(this.dataset.index);
                removeFromCart(index);
                this.closest("tr").remove();
                calculateTotalPrice();
            });
        }

        const clearAllButton = document.getElementById("clear-all-btn");
        clearAllButton.addEventListener("click", function () {
            clearCart();
        });

        calculateTotalPrice();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const buyNowButton = document.getElementById("buy-now-btn");

    buyNowButton.addEventListener("click", function () {
        fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "amitf9@gmail.com",
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
