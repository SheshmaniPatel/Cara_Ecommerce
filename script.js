// Script for navigation bar
// controlling navbar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Select all elements with the class name 'product'
const products = document.querySelectorAll(".product");

// Loop through each element and add the onclick event
products.forEach((product) => {
  const imgElement = product.querySelector("img");
  imgElement.addEventListener("click", () => {
    if (imgElement) {
      const imgSrc = imgElement.src;
      // Encode the image source URL to pass as a parameter
      const encodedImgSrc = encodeURIComponent(imgSrc);
      // Redirect to sproduct.html with encodedImgSrc as parameter
      window.location.href = `sproduct.html?img=${encodedImgSrc}`;
    }
  });
});

// ***************************To add the product in cart*********************
document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".add-to-cart");

  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productElement = e.target.closest(".product");
      const productId = productElement.getAttribute("data-id");
      const productName = productElement.querySelector("h5").textContent;
      const productPrice = productElement.querySelector("h4").textContent;
      const productImage = productElement.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
      };

      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );
      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart");
    });
  });
});

// ****************To render the cart product********************
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const applyCouponButton = document.getElementById("apply-coupon");
  const couponCodeInput = document.getElementById("coupon-code");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const shippingCost = 5.0;
  let subtotal = 0;
  let discountApplied = false;

  const renderCart = () => {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      updateSummary();
      return;
    }

    cart.forEach((product, index) => {
      const productElement = document.createElement("div");
      productElement.classList.add("cart-product");
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h5>${product.name}</h5>
          <p class="price">${product.price}</p>
          <p class="quantity">Quantity: ${product.quantity}</p>
        </div>
        <button class="remove-button" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(productElement);
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    updateSummary();
  };

  const updateSummary = () => {
    subtotal = cart.reduce(
      (total, product) =>
        total + parseFloat(product.price.slice(1)) * product.quantity,
      0
    );

    // Apply discount if previously applied
    const finalSubtotal = discountApplied ? subtotal * 0.9 : subtotal;

    subtotalElement.textContent = finalSubtotal.toFixed(2);
    totalElement.textContent = (finalSubtotal + shippingCost).toFixed(2);
  };

  applyCouponButton.addEventListener("click", () => {
    const couponCode = couponCodeInput.value.trim();
    if (couponCode === "SAMPLE") {
      discountApplied = true;
      updateSummary();
      alert("Coupon applied successfully!");
    } else {
      alert("Invalid coupon code");
    }
  });

  renderCart();
});

