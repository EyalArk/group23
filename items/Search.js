
function search() {
    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const searchInput = document.getElementById("search").value.toLowerCase();
        console.log("Search input:", searchInput);

        // Use the searchInput variable for further processing

        console.log("aaa")
        fetch("products.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (products) {
                let placeholder = document.querySelector("#data-output");
                let out = "";
                for (let product of products) {

                    const productName = product.name.toLowerCase(); //new

                    if (productName.includes(searchInput)){
                        out += `
          <tr class="product">
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
              <img src="${product.image}"
                   data-hover="${product.image2}"
                   onmouseover="this.src='${product.image2}'"
                   onmouseout="this.src='${product.image}'">
            </td>
          </tr>
        `;
                    }
                }
                placeholder.innerHTML = out;
            });

    });
}

search();
