

// Function to handle the Add To Cartzz button click
function handleAddToCart(productId) {
    // Save the product ID in a cookie
    document.cookie = "productId" + "=" + productId;

    // Optionally, you can show a confirmation message to the user
    alert("Product added to cart!");
}
