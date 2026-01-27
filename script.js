// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.length;

// Update cart count on page load
document.getElementById("cart-count").innerText = cartCount;

// Display cart on page load
displayCart();

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });

  // Save to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  cartCount = cart.length;
  document.getElementById("cart-count").innerText = cartCount;

  displayCart();
}

function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let totalPrice = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    totalPrice += item.price;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItems.appendChild(li);
  });

  document.getElementById("total-price").innerText = totalPrice;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Checkout successful! Thank you for your order.");

  // Clear cart
  cart = [];
  localStorage.removeItem("cart");

  document.getElementById("cart-count").innerText = 0;
  displayCart();
}


function removeFromCart(index) {
  cart.splice(index, 1);

  // Update local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  cartCount = cart.length;
  document.getElementById("cart-count").innerText = cartCount;

  displayCart();
}

function orderOnWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello, I want to place an order:%0A%0A";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ₹${item.price}%0A`;
    total += item.price;
  });

  message += `%0A*Total Amount:* ₹${total}`;

  // 🔴 REPLACE with your WhatsApp number (country code required)
  let phoneNumber = "919555971812";

  let whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
}


