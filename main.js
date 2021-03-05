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
              <h4 id="${product.prices}">${product.prices}</h4>
              <p><button onclick="add_to_cart(${product.ID})">Add to Cart</button></p>
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

// Function for cart

function add_to_cart(id) {
  let cartItem = productArray.filter((product) => {
    return product.ID == id;
  });
  productCount = cartList.push(cartItem[0]);
  console.log(cartList);
  console.log(productCount);
}

// cart system

let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
