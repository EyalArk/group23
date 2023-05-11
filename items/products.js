
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