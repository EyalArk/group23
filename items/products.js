
fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        console.log(products);
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let product of products) {
            out += `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <img src="${product.image}"
                 data-hover="${product.image2}"
                 onmouseover="this.src='${product.image2}'"
                 onmouseout="this.src='${product.image}'">
          </td>
          <td>
            <button onclick="viewDetails('${product.ID}')">View Details</button>
          </td>
          <td>
            <button onclick="addToCart(${product.ID})">Add To Cart</button>
          </td>
        </tr>
      `;
        }
        placeholder.innerHTML = out;
    });

function viewDetails(productID) {
    window.location.href = `../items/Details.html?productID=${productID}`;
}

fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        const productID = getProductIDFromQueryParam();
        const product = products.find(product => product.ID === productID);
        if (product) {
            displayProductData(product);
        }
    });

function getProductIDFromQueryParam() {
    const params = new URLSearchParams(window.location.search);
    const productID = params.get("productID");
    return productID;
}

function displayProductData(product) {
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productID").textContent = product.ID; // Updated ID here
    document.getElementById("brand").textContent = product.brand;
    document.getElementById("fit").textContent = product.fit;
    document.getElementById("color1").textContent = product.color1;
    document.getElementById("color2").textContent = product.color2;
    document.getElementById("price").textContent = product.price;
    document.getElementById("image1").src = product.image;
    document.getElementById("image2").src = product.image2;
}


// Define an empty array to store the cart items
let cartItems = [];

// Function to add a product to the cart

// Function to add a product to the cart
function addToCart(productID) {

    fetch("products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            console.log("Products array:", products); // Check if the products array is correct
            productID = productID.toString();

            // Find the product in the products array
            let product = products.find(item => item.ID === productID);
            //const product = products.find(product => product.ID === productID);
            console.log("Selected product:", product); // Check if the product is found correctly

            if (product) {
                // Get the existing cart items from local storage
                let cartItems = localStorage.getItem("cartItems");
                console.log("Existing cart items:", cartItems); // Check the value of cartItems from local storage

                if (cartItems) {
                    cartItems = JSON.parse(cartItems);
                } else {
                    console.log("Cart items not found");
                    cartItems = [];
                }

                cartItems.push(product); // Add the product to the cartItems array
                localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store the cartItems array in local storage
                alert("Product added to cart!"); // Display a success message (you can modify this as per your requirement)
            } else {
                console.log("Product not found");
            }
        });
}





search();