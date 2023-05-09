
fetch("products.json").then(function (response) {
    return response.json();
}).then(function (products) {
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
      </tr>
    `;
    }
    placeholder.innerHTML = out;
})