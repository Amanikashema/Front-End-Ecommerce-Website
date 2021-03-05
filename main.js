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
      data.forEach((product) => {
        // Create a new html card for each product
        let productItem = `
          <div class="product-card">
              <div class="product-image">
              <img id=${product.ID} class="prodcts-images" src=${product.images}/>

              </div>
              <div class="product-info">
              <h4>${product.cellphone_names}</h4>
              <h4>${product.prices}</h4>
              <p><button>Add to Cart</button></p>
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
