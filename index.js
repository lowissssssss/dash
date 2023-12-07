const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

if (!isLoggedIn) {
  window.location.href = "login.html";
}

const productNameInput = document.getElementById("productName");
const productDescriptionInput = document.getElementById("productDescription");
const productPriceInput = document.getElementById("productPrice");
const productImageLinkInput = document.getElementById("productImageLink");

const editProductNameInput = document.getElementById("editProductName");
const editProductDescriptionInput = document.getElementById(
  "editProductDescription"
);
const editProductPriceInput = document.getElementById("editProductPrice");
const editProductImageLinkInput = document.getElementById(
  "editProductImageLink"
);
const editProductForm = document.getElementById("editProductForm");

const addProductForm = document.getElementById("addProductForm");
const productsContainer = document.getElementById("productsContainer");

const cartContainer = document.getElementById("cartContainer");
const totalSale = document.getElementById("totalSale");

let productName = "";
let productDescription = "";
let productPrice = "";
let productImageLink = "";

// ADDING PRODUCT

productNameInput.addEventListener("input", () => {
  productName = productNameInput.value;
});

productDescriptionInput.addEventListener("input", () => {
  productDescription = productDescriptionInput.value;
});

productPriceInput.addEventListener("input", () => {
  productPrice = productPriceInput.value;
});

productImageLinkInput.addEventListener("input", () => {
  productImageLink = productImageLinkInput.value;
});

addProductForm.addEventListener("submit", () => {
  if (localStorage.getItem("products") === null) {
    localStorage.setItem(
      "products",
      JSON.stringify([
        { productName, productDescription, productPrice, productImageLink },
      ])
    );
    alert("Product added successfully!");
    return;
  }

  const currentProducts = JSON.parse(localStorage.getItem("products"));

  localStorage.setItem(
    "products",
    JSON.stringify([
      ...currentProducts,
      {
        productName,
        productDescription,
        productPrice,
        productImageLink,
      },
    ])
  );

  alert("Product added successfully!");
});

// DISPLAYING PRODUCTS
const productCard = (name, desc, price, link, index) => {
  return `
     <div class="col-md-4">
            <div class="card">
              <img
                src="${link}"
                alt="${link}"
                style="width: 100%"
              />
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                 ${desc}
                </p>
                <p>
                  Price: ₱${price}
                </p>
              </div>
              
              <div class="card-footer d-flex justify-content-between">
                    <div>
                        <button type="button" class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#editProduct"
                            style="margin-right: 10px"
                            onclick="setEditIndex(${index})"
                        >
                            Edit
                        </button>
                    </div>
                    <button type="button" class="btn btn-outline-success" onclick="addToCart(${index})">
                        Add to cart
                    </button>
              </div>
            </div>
          </div>
    `;
};

const showProducts = () => {
  const currentProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (!currentProducts || currentProducts.length === 0) {
    productsContainer.innerHTML = "No products available.";
    return;
  }
  const mappedProducts = currentProducts.map(
    (
      { productName, productDescription, productPrice, productImageLink },
      index
    ) =>
      productCard(
        productName,
        productDescription,
        productPrice,
        productImageLink,
        index
      )
  );

  productsContainer.innerHTML = mappedProducts.join("");
};

showProducts();

// EDITING PRODUCT
let indexOfProductToEdit; // SELECTING CURRENT PRODUCT VIA INDEX FOR EDITING

let editProductName = "";
let editProductDescription = "";
let editProductPrice = "";
let editProductImageLink = "";

function setEditIndex(index) {
  indexOfProductToEdit = index; // SET THE INDEX
  const currentProducts = JSON.parse(localStorage.getItem("products"));

  editProductName = currentProducts[indexOfProductToEdit].productName;
  editProductDescription =
    currentProducts[indexOfProductToEdit].productDescription;
  editProductPrice = currentProducts[indexOfProductToEdit].productPrice;
  editProductImageLink = currentProducts[indexOfProductToEdit].productImageLink;

  editProductNameInput.value =
    currentProducts[indexOfProductToEdit].productName;

  editProductDescriptionInput.value =
    currentProducts[indexOfProductToEdit].productDescription;

  editProductPriceInput.value =
    currentProducts[indexOfProductToEdit].productPrice;

  editProductImageLinkInput.value =
    currentProducts[indexOfProductToEdit].productImageLink;
}

editProductNameInput.addEventListener("input", () => {
  editProductName = editProductNameInput.value;
});
editProductDescriptionInput.addEventListener("input", () => {
  editProductDescription = editProductDescriptionInput.value;
});

editProductPriceInput.addEventListener("input", () => {
  editProductPrice = editProductPriceInput.value;
});

editProductImageLinkInput.addEventListener("input", () => {
  editProductImageLink = editProductImageLinkInput.value;
});

editProductForm.addEventListener("submit", (e) => {
  // e.preventDefault();
  const currentProducts = JSON.parse(localStorage.getItem("products"));

  // Check if the index is valid
  if (
    indexOfProductToEdit >= 0 &&
    indexOfProductToEdit < currentProducts.length
  ) {
    // Update the product details
    currentProducts[indexOfProductToEdit].productName = editProductName;
    currentProducts[indexOfProductToEdit].productDescription =
      editProductDescription;
    currentProducts[indexOfProductToEdit].productPrice = editProductPrice;
    currentProducts[indexOfProductToEdit].productImageLink =
      editProductImageLink;

    // Save the updated products back to localStorage
    localStorage.setItem("products", JSON.stringify(currentProducts));

    // Inform the user about the successful update
    alert("Product updated successfully!");
    // showProducts();
  } else {
    console.log("Invalid index for updating product.");
  }
});

// DELETING PRODUCT

const deleteProduct = (index) => {
  if (confirm("Are you sure?") === false) {
    return;
  } else {
    const currentProducts = JSON.parse(localStorage.getItem("products"));

    if (index >= 0 && index < currentProducts.length) {
      // Remove the product at the specified index using splice()
      currentProducts.splice(index, 1);

      // Save the updated products back to localStorage
      localStorage.setItem("products", JSON.stringify(currentProducts));

      // Inform the user about the successful deletion

      alert("Product deleted successfully!");
      showProducts();
    } else {
      console.log("Invalid index for deleting product.");
    }
  }
};

// ADD TO CART
const addToCart = (index) => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productToAdd = products[index];

  if (!productToAdd) {
    return;
  }

  const existingProductIndex = cart.findIndex(
    (product) => product.index === index
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  } else {
    const newProduct = {
      ...productToAdd,
      index,
      quantity: 1,
    };

    localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
    alert("Added to cart!");
  }
  showCurrentCart();
};

// VIEW CART

const productCardCart = (name, desc, price, link, quantity, index) => {
  return `
    <tr>
      <td class="w-25">
        <img
          src="${link}"
          class="img-fluid img-thumbnail"
          alt="${link}"
        />
      </td>
      <td>${name}</td>
      <td>₱${price}</td>
      <td class="qty">
        <input
          type="number"
          class="form-control"
          id="inputQuantity"
          value=${quantity}
          onchange="updateQuantity(${index}, this.value)"
        />
      </td>
      <td>₱${quantity * Number(price)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeProductFromCart(${index})">
         Remove
        </button>
      </td>
    </tr>
  `;
};

const calculateTotalPrice = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = 0;

  cart.forEach((cartItem) => {
    totalPrice += Number(cartItem.productPrice) * cartItem.quantity;
  });

  return totalPrice;
};

const showCurrentCart = () => {
  const currentCart = JSON.parse(localStorage.getItem("cart"));

  if (!currentCart || currentCart.length === 0) {
    cartContainer.innerHTML = "Cart empty.";
    return;
  }
  const mappedProducts = currentCart.map(
    (
      {
        productName,
        productDescription,
        productPrice,
        productImageLink,
        quantity,
      },
      index
    ) =>
      productCardCart(
        productName,
        productDescription,
        productPrice,
        productImageLink,
        quantity,
        index
      )
  );

  cartContainer.innerHTML = mappedProducts.join("");
  totalSale.textContent = `₱${calculateTotalPrice()}`;
};

showCurrentCart();

const removeProductFromCart = (index) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product deleted from cart successfully!");
    showCurrentCart();
  } else {
    console.log("Invalid index for deleting product from cart.");
  }
};

const updateQuantity = (index, newQuantity) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (index >= 0 && index < cart.length) {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    totalSale.textContent = `₱${calculateTotalPrice()}`;
    showCurrentCart();
    // Update the display or perform other actions as needed
  } else {
    console.log("Invalid index for updating quantity in cart.");
  }
};
