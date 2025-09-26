// cart.js
document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountEl = document.getElementById('cart-count');

  window.updateCartCount = function() {
    if (cartCountEl) cartCountEl.textContent = cart.length > 0 ? cart.length : '';
  };

  function updateCartPage() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    if (cartItemsList && cartTotalSpan) {
      cartItemsList.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name} - $${item.price.toFixed(2)}</strong>`;

        // Build config as bullet list
        if (item.config) {
          const ul = document.createElement('ul');
          for (const [key, value] of Object.entries(item.config)) {
            if (key === 'Other Mods' && (!value || value.trim() === '')) continue;
            const liOption = document.createElement('li');
            liOption.textContent = `${key}: ${value}`;
            ul.appendChild(liOption);
          }
          li.appendChild(ul);
        }

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginTop = '5px';
        removeBtn.addEventListener('click', () => {
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartPage();
          updateCartCount();
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);

        total += item.price;
      });

      cartTotalSpan.textContent = total.toFixed(2);
    }
  }

  function addToCart(item) {
    if (!item || !item.name || typeof item.price !== 'number') return;
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productDiv = button.closest('.product');
      if (!productDiv) return;
      const name = productDiv.getAttribute('data-name');
      const price = parseFloat(productDiv.getAttribute('data-price'));
      addToCart({ name, price });
    });
  });

  window.addProductToCart = addToCart;

  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      alert('Checkout not implemented yet. Cart total: $' + total.toFixed(2));
    });
  }

  updateCartCount();
  updateCartPage();
});
