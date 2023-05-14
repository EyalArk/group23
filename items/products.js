

let dataProducts;

fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        console.log(products);
        dataProducts = products;
        fetchProductToDisplay();
        addingProductsToTable(products);
    });

function fetchProductToDisplay(products) {
    const productID = getProductIDFromQueryParam();
    const product = dataProducts.find(product => product.ID === productID);
    if (product) {
        displayProductData(product);
    }
}

function addingProductsToTable(prods) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let product of prods) {
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
            <button class="btnDetails" onclick="viewDetails('${product.ID}')">View Details</button>
          </td>
          <td>
            <button class="btnDetails" onclick="addToCart(${product.ID})">Add To Cart</button>
          </td>
        </tr>
      `;
    }
    placeholder.innerHTML = out;
}

function viewDetails(productID) {
    window.location.href = `../items/details.html?productID=${productID}`;
}

// fetch("products.json")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (products) {
//         const productID = getProductIDFromQueryParam();
//         const product = products.find(product => product.ID === productID);
//         if (product) {
//             displayProductData(product);
//         }
//     });

function getProductIDFromQueryParam() {
    const params = new URLSearchParams(window.location.search);
    const productID = params.get("productID");
    return productID;
}

function filterByBrand(brand) {
    let placeholder = document.querySelector("#data-output");
    placeholder.innerHTML = '';
    if (brand === 'all') {
        console.log(`check2`);
        addingProductsToTable(dataProducts);
    } else {
        console.log(`check1`);
        let productToDisplay = dataProducts.filter(product => product.brand === brand);
        console.log(productToDisplay);
        addingProductsToTable(productToDisplay);
    }
}

function displayProductData(product) {
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productID").textContent = product.ID;
    document.getElementById("brand").textContent = product.brand;
    document.getElementById("fit").textContent = product.fit;
    document.getElementById("colors").textContent = `${product.color1}, ${product.color2}`;
    document.getElementById("price").textContent = product.price;
    document.getElementById("image1").src = product.image;
    document.getElementById("image2").src = product.image2;
}

function addToCart(productID) {
    productID = productID.toString();
    let product = dataProducts.find(item => item.ID === productID);

    if (product) {
        let cartItems = localStorage.getItem("cartItems");
        console.log("Existing cart items:", cartItems);

        if (cartItems) {
            cartItems = JSON.parse(cartItems);
        } else {
            console.log("Cart items not found");
            cartItems = [];
        }

        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("Product added to cart!");
    } else {
        console.log("Product not found");
    }
}


