document.addEventListener("DOMContentLoaded", function () {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        const cartItemsTableBody = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");


        function removeFromCart(index) {  /* remove from cart option*/
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        function calculateTotalPrice() {  /* summarize the total price of the cart*/
            let totalPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
                const product = cartItems[i];
                totalPrice += parseFloat(product.price);
            }
            totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
        }

        function clearCart() { /* remove all the products in the cart*/
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


document.addEventListener("DOMContentLoaded", function() { /*message after press buy now*/
    const buyNowBtn = document.getElementById("buy-now-btn");
    buyNowBtn.addEventListener("click", function() {
        alert("Thank you for your purchase!");   //  alert message

    });
});

