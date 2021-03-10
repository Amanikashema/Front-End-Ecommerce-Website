let productArray = [];
let cartList = [];
// function to fetch products from database
function fetchData() {
  fetch((url = "https://arcane-spire-99175.herokuapp.com/show-products/"))
    .then((response) => {
      if (response.ok) {
        console.log("Successs");
      } else {
        console.log("NOT SUCCESSFUL");
      }
      return response.json();
    })
    .then((data) => {
      //   Get products section from HTML
      let productList = document.querySelector("#products");
      // loop over the data
      productArray = data;
      data.forEach((product) => {
        // Create a new html card for each product
        let productItem = `
          <div class="product-card">
              <div class="product-image">
              <img id=${product.ID} class="prodcts-images" src=${product.images}/>

              </div>
              <div class="product-info">
              <h4 id="${product.cellphone_names}">${product.cellphone_names}</h4>
              <h4 id="${product.prices}">R${product.prices}</h4>
              <p><button class="add_cart" onclick="add_to_cart(${product.ID})">Add to Cart</button></p>
              </div>    
          </div>
      `;
        // add new card to the products section
        productList.innerHTML += productItem;
      });
    })
    .catch((error) => console.log(error));
}

fetchData();

// function to register user

function registerUser() {
  const inputs = document.getElementsByTagName("input");

  fetch((url = "http://127.0.0.1:5000/register_user/"), {
    method: "POST",
    body: JSON.stringify({
      name: inputs[0].value,
      surname: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      alert("Successfully Registered");
      window.location.href = "./login.html";
      document.getElementById(main.js).reset();
      // document.getElementsByID("form").reset();
    })
    .catch((err) => console.log(err));
}

// function to login

function login() {
  let users = [];

  fetch("http://127.0.0.1:5000/show-records/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      users = data;
    });
  let inputs = document.getElementsByTagName("input");

  let email = inputs[0].value;
  let password = inputs[1].value;

  let log = users.filter((user) => {
    return user.email == email && user.password == password ? true : false;
  });

  console.log(log);

  if (log.length > 0) {
    alert("You have successfully logged in");
    window.location.href = "./index.html";
  } else {
    alert("Please enter a valid username and password");
  }
}

// cart count

function cartCount() {
  let x = productCount;
  document.getElementById("lblCartCount").innerHTML = x;
}

// Function for cart

function add_to_cart(id) {
  let modal = document.getElementById("contents");
  let cartItem = productArray.filter((product) => {
    return product.ID == id;
  });
  productCount = cartList.push(cartItem[0]);
  let selectedItems = cartItem[0];

  let cart_stuff = `
  <div class="opened-modal-content">
  <div id="items${id}"  product-prices=${selectedItems.prices}>${selectedItems.cellphone_names} :R${selectedItems.prices}<div> 
  <button class="removebutton" onclick="removeItems(${id})">Remove Item</button>
  </div>
  `;

  modal.innerHTML += cart_stuff;

  console.log(cartList);
  console.log(productCount);
  console.log(cartItem);

  // total price calculation

  function calculateTotalPrice() {
    let totalValue = document.getElementsByClassName("price")[0];
    let num1 = parseInt(totalValue.innerHTML);
    let num2 = document
      .getElementById("items" + id)
      .getAttribute("product-prices");

    let totalAmount = parseInt(num1) + parseInt(num2);
    totalValue.innerHTML = totalAmount;
    console.log(totalValue);
  }
  calculateTotalPrice();

  cartCount();
}

// checkout section
function checkout() {
  let totals = document.getElementsByClassName("price")[0].innerHTML;
  alert(`Thankyou for purchasing Your total is R${totals}`);
  let clear = "";
  let x = document.getElementById("contents");
  x.innerHTML = clear;

  let f = productCount - productCount;

  document.getElementById("lblCartCount").innerHTML = f;
  window.location.href = "./index.html";
}

// remove items on checkoutlist

function removeItems(id) {
  let recietTotal = document.getElementsByClassName("price")[0];
  let y = parseInt(recietTotal.innerHTML);
  console.log(y);
  let x = document.getElementById("items" + id).getAttribute("product-prices");
  let total = parseInt(y) - parseInt(x);

  if (total <= -1) {
    alert("something went wrong");
    window.location.reload();
  }

  recietTotal.innerHTML = total;
  console.log(total);
  document.getElementById("items" + id).remove();

  if (total == 0) {
    window.location.href = "./index.html";
  }
}

// Modal system for the cart

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Hamburger section for the navbar

function hamBurger() {
  const navs = document.querySelectorAll(".Navbar__Items");

  navs.forEach((nav) => nav.classList.toggle("Navbar__ToggleShow"));
}

document
  .querySelector(".Navbar__Link-toggle")
  .addEventListener("click", classToggle);
