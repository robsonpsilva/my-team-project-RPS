import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty 🛒😢</li>";
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  setupRemoveButtons();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-btn" data-index="${index}">❌ Remove</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function setupRemoveButtons() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      let cart = getLocalStorage("so-cart") || [];

      cart.splice(index, 1); // remove the item at the clicked index
      setLocalStorage("so-cart", cart);
      renderCartContents(); // re-render the cart
    });
  });
}
