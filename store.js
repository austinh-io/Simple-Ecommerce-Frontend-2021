let removeCartItemButtons = document.getElementsByClassName("btn-cart-remove");

for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

let cartQuantityInputs = document.getElementsByClassName("cart-qty-input");

for (let i = 0; i < cartQuantityInputs.length; i++) {
  let input = cartQuantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

let quantityInputs = document.getElementsByClassName("product-quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  if (quantityInputs[i].value <= 0 || isNaN(quantityInputs[i].value)) {
    quantityInputs[i].value = 1;
  }
}

let addToCartButtons = document.getElementsByClassName("btn-add-to-cart");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
  button.addEventListener("click", updateCartTotal);
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("product-name")[0].innerText;
  let price = shopItem.getElementsByClassName("product-price-number")[0]
    .innerText;
  let imageSource = shopItem.getElementsByClassName("product-image")[0].src;
  console.log(title, price, imageSource);
  let quantity = shopItem.getElementsByClassName("product-quantity")[0];

  addItemToCart(title, price, imageSource, quantity);

  console.log(parseInt(quantity.value));
}

function addItemToCart(title, price, imageSource, quantity) {
  let cartItems = document.getElementById("cart-items-table");

  let cartRow = cartItems.insertRow(cartItems.length);
  cartRow.className += "cart-row";

  let cartRowRemoveButton =
    '<button class="button btn-cart-remove" onClick="removeCartItem(event)">Remove</button>';

  let quantityValue = quantity.value;
  if (quantityValue <= 0 || isNaN(quantityValue)) {
    quantityValue = 1;
  }

  let cartRowQuantity =
    '<input type="number" class="cart-qty-input" value="' +
    quantityValue +
    '" onchange="quantityChanged(event)">';

  let cellTitle = cartRow.insertCell(0);
  let cellQty = cartRow.insertCell(1);
  let cellPrice = cartRow.insertCell(2);

  cellTitle.innerText = title;
  cellQty.innerHTML = cartRowQuantity;
  cellPrice.innerHTML = "$" + price + cartRowRemoveButton;
  cellPrice.className += "cart-price";

  cartItems.insertRow(cartRow);
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementById("cart-items-table");
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("cart-qty-input")[0];
    let price = priceElement.innerText.replace("REMOVE", "");
    price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total.toFixed(2);
}
