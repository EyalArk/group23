// search2();
// function search2() {
//     console.log("check1")
//     document.getElementById("searchForm").addEventListener("submit", function(event) {
//         console.log("check2")
//
//         event.preventDefault(); // Prevent form submission
//
//         const searchInput = document.getElementById("search2").value.toLowerCase();
//         console.log("Search input:", searchInput);
//         console.log("check3")
//
//
//         // Use the searchInput variable for further processing
//
//         fetch("products.json")
//             .then(function (response) {
//                 console.log("check4")
//
//                 return response.json();
//             })
//             .then(function (products) {
//                 console.log("check5")
//                 let placeholder = document.querySelector("#data-output");
//                 let out = "";
//                 for (let product of products) {
//
//                     const productName = product.name.toLowerCase(); //new
//                     console.log("check6")
//
//                     if (productName.includes(searchInput)){
//                         out += `
//           <tr class="product">
//             <td>${product.name}</td>
//             <td>${product.price}</td>
//             <td>
//               <img src="${product.image}"
//                    data-hover="${product.image2}"
//                    onmouseover="this.src='${product.image2}'"
//                    onmouseout="this.src='${product.image}'">
//             </td>
//           </tr>
//         `;
//                     }
//                 }
//                 placeholder.innerHTML = out;
//             });
//
//     });
// }
