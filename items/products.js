
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
        
      <td> <button id="myBtn">Open Modal</button>   
            <div id="myModal" class="modal">
        <div class="modal-content">
    < span class="close">&times;</span>
    <p>Some text in the Modal..</p>
    </td> 
  </div>
</div>
        
        
        
        
<!--        -->
<!--        <td><button Details="button1Clicked(this)">View Details</button></td>-->
<!--        <td><button AddToCart="button2Clicked(this)">Add To Cart</button></td> -->
      </tr>
    `;
    }
    placeholder.innerHTML = out;
})



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}