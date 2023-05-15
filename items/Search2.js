search2();
function search2() {
    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const searchInput = document.getElementById("search").value.toLowerCase();
        console.log("Search input:", searchInput);

        // Use the searchInput variable

        fetch("products.json") /* connect to the products json page*/
            .then(function (response) {
                console.log("check4")

                return response.json();
            })
            .then(function (products) {
                let placeholder = document.querySelector("#data-output");
                let out = "";
                for (let product of products) {  /* check if there is a product with a name like the search input*/
                    const productName = product.name.toLowerCase(); //new
                    if (productName.includes(searchInput)){
                        out += `
          <tr class="product">   /* Disaplay the product*/
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
                }
                placeholder.innerHTML = out;
            });

    });
}
