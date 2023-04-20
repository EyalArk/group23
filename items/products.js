// const products = [
//     // {
//     //     ID: 1
//     //     name: 'Air Jordan 1 Hyper Royal',
//     //     description: 'This is the description of product 1',
//     //     price: 99.99,
//     // },
//
//     {
//         ID: 2
//         name: 'Yeezy Boost 350',
//         description: 'This is the description of product 2',
//         price: 149.99,
//     },
//     // Add more products as needed
// ];
//
//         function displayProducts() {
//         const container = document.querySelector('.product-container');
//
//         let html = '';
//         products.forEach(product => {
//         html += `
//       <div class="product">
//         <img src="${product.image}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <p>${product.description}</p>
//         <span>${product.price}</span>
//         <button>Add to cart</button>
//       </div>
//     `;
//     });
//
//         container.innerHTML = html;
//
//         displayProducts();

fetch("products.json").then(function (response){
        return response.json();
}).then(function (products){
    console.log(products);
    let placeholder = document.querySelector("#data-output");
    let out="";
    for(let product of products){
        out +=`
        <tr>
<!--            <td> <img src='${product.image}'> </td>-->
            <td> <img src='${product.image}'> </td>
            <td> ${product.name} </td>
            <td> ${product.price} </td>
    
        `;
    }
placeholder.innerHTML = out;
})