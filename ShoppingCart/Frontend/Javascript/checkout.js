
const total = parseFloat(localStorage.getItem('checkoutTotal')) || 0;

const totalElement = document.getElementById('total');
if (totalElement) {
  totalElement.textContent = 'Total: $' + total.toFixed(2);
}


const form = document.getElementById('checkoutForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const address = document.getElementById('address')?.value.trim();

    if (!name || !email || !address || total <= 0) {
      alert('Please fill in all required fields and make sure the cart is not empty.');
      return;
    }

    const payload = {
      name,
      email,
      address,
      total
    };

    console.log('Sending order to backend:', payload);

    fetch('http://localhost:8080/checkout/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Request failed with status ' + res.status);
        return res.json();
      })
      .then(data => {
        console.log('Order placed successfully:', data);


        localStorage.removeItem('cart-items');
        localStorage.removeItem('checkoutTotal');






        if (totalElement) {
          totalElement.textContent = 'Total: $0';
        }

        const cartList = document.getElementById('cart-list');
        if (cartList) cartList.innerHTML = '';

        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.textContent = '0';

        const popup = document.getElementById('thankyou-popup');
        if (popup) {
          popup.style.display = 'flex';

          const closeBtn = document.getElementById('close-popup');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              popup.style.display = 'none';
              form.reset();
              fetch('http://localhost:8080/cart/clear', { method: 'DELETE' })
                .then(res => {
                  if (res.ok) throw new Error("Could not create cart on server");
                })
                .then(msg => {
                  console.log(msg);
                  updateCartCount();
                  loadSummary();
                })
                .catch(err => console.error('Error clearing cart', err));
              window.location = 'products.html';

            });
          }
        }
      })
      .catch(err => {
        console.error('Error placing order:', err);
        alert('Something went wrong. Please try again.');
      });
  });
}

function updateCartCount() {
  fetch('http://localhost:8080/cart')
    .then(res => res.json())
    .then(cart => {
      const countElement = document.getElementById('cart-count');
      if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalItems;

        countElement.classList.add('update');
        setTimeout(() => countElement.classList.remove('update'), 200);
      }
    })
    .catch(err => console.error('Error fetching cart count:', err));
}

updateCartCount();

function loadSummary() {
  fetch('http://localhost:8080/cart')
    .then(res => res.json())
    .then(cart => {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      document.getElementById('itemCount').textContent = 'Items: ' + totalItems;
      document.getElementById('totalAmount').textContent = 'Total: $' + totalAmount.toFixed(2);


      localStorage.setItem('checkoutTotal', totalAmount.toFixed(2));
    })
    .catch(err => console.error('Error loading summary:', err));
}

loadSummary();

