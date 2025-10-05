const container = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

let totalPrice = 0;

function loadCart() {
  fetch('http://localhost:8080/cart')
    .then(res => res.json())
    .then(cart => {
      container.innerHTML = '';
      totalPrice = 0;


      const table = document.createElement('table');
      table.className = 'cart-table';


      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Product</th>
          <th>Details</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      `;
      table.appendChild(thead);


      const tbody = document.createElement('tbody');

      cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const row = document.createElement('tr');
        row.className = 'cart-item';


        const imgCell = document.createElement('td');
        imgCell.className = 'product-image-cell';
        imgCell.setAttribute('data-label', 'Product');
        const img = document.createElement('img');
        img.src = item.ImageUrl || '';
        img.alt = item.name;
        imgCell.appendChild(img);
        row.appendChild(imgCell);


        const detailsCell = document.createElement('td');
        detailsCell.setAttribute('data-label', 'Details');
        const details = document.createElement('div');
        details.className = 'item-details';

        const name = document.createElement('h4');
        name.textContent = item.name;
        details.appendChild(name);

        detailsCell.appendChild(details);
        row.appendChild(detailsCell);


        const priceCell = document.createElement('td');
        priceCell.className = 'price-cell';
        priceCell.setAttribute('data-label', 'Price');
        priceCell.textContent = `$${item.price}`;
        row.appendChild(priceCell);


        const quantityCell = document.createElement('td');
        quantityCell.className = 'quantity-cell';
        quantityCell.setAttribute('data-label', 'Quantity');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);


        const controlsCell = document.createElement('td');
        controlsCell.setAttribute('data-label', 'Actions');
        const controls = document.createElement('div');
        controls.className = 'item-controls';

        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => {
          fetch(`http://localhost:8080/cart/add/${item.productId}?quantity=1`, { method: 'POST' })
            .then(() => {
              loadCart();
              updateCartCount();
            });
        });

        const minusBtn = document.createElement('button');
        minusBtn.textContent = '−';
        minusBtn.addEventListener('click', () => {
          fetch(`http://localhost:8080/cart/delete/${item.productId}?quantity=1`, { method: 'DELETE' })
            .then(() => {
              loadCart();
              updateCartCount();
            });
        });

        controls.appendChild(plusBtn);
        controls.appendChild(minusBtn);
        controlsCell.appendChild(controls);
        row.appendChild(controlsCell);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      container.appendChild(table);
      const totalContainer = document.createElement('div');
      totalContainer.className = 'cart-total';
      totalContainer.textContent = 'Total: $' + totalPrice.toFixed(2);


      const oldTotal = document.querySelector('.cart-total');
      if (oldTotal) oldTotal.remove();

      container.appendChild(totalContainer);

      //totalElement.textContent = 'Total: $' + totalPrice.toFixed(2);
      updateCartCount();
    })
    .catch(err => console.error('Error loading cart:', err));
}

function proceedToCheckout() {
  localStorage.setItem('checkoutTotal', totalPrice.toFixed(2));
  window.location.href = 'checkout.html';
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', proceedToCheckout);
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


loadCart();
updateCartCount();


