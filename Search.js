const searchForm = document.getElementById("search");
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var searchQuery = document.getElementById("search").value;
    localStorage.setItem("searchQuery", searchQuery);

    // Redirect to the filtered shoes page
   // window.location.href = "Search.html";
});
fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let product of products) {
            if (product.name.toLowerCase() === JSON.parse(localStorage.getItem("products"))) {
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

