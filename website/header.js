document.addEventListener('DOMContentLoaded', () => {
  // Absolute file path to your website folder
  const root = 'file:///C:/Users/watog/Desktop/website';

  const headerHTML = `
    <!-- Floating cart icon -->
    <a href="${root}/cart.html" class="cart-icon" title="View Cart">
      🛒 <span class="cart-count" id="cart-count">0</span>
    </a>

    <header>
      🚗 Kdub's Motorworks 🚗
    </header>

    <nav>
      <a href="${root}/index.html">Home</a>
      <a href="${root}/reviews.html">Reviews</a>
      <a href="${root}/shop/shop.html">Shop</a>
      <a href="${root}/contact.html">Contact</a>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
