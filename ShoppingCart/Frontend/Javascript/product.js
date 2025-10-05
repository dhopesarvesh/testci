document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/products')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('product');

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';


                const cardImage = document.createElement('div');
                cardImage.className = 'card-image';
                const img = document.createElement('img');
                img.src = product.imageUrl || '#';
                img.alt = product.productName;
                cardImage.appendChild(img);
                card.appendChild(cardImage);


                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                const title = document.createElement('div');
                title.className = 'card-title';
                title.textContent = product.productName;
                cardContent.appendChild(title);



                card.appendChild(cardContent);


                const cardFooter = document.createElement('div');
                cardFooter.className = 'card-footer';

                const price = document.createElement('div');
                price.className = 'card-price';
                price.textContent = `$${product.price}`;
                cardFooter.appendChild(price);

                const button = document.createElement('button');
                button.className = 'add-btn';
                button.textContent = 'Add To Cart';
                button.addEventListener('click', () => {
                    fetch(`http://localhost:8080/cart/add/${product.productId}?quantity=1`, {
                        method: 'POST'
                    })
                        .then(res => res.json())
                        .then(cart => {
                            showToast(`${product.productName} Added to Cart!`);
                            console.log('Updated Cart:', cart);
                            updateCartCount();
                        });
                });
                cardFooter.appendChild(button);

                card.appendChild(cardFooter);

                productsContainer.appendChild(card);
            });
        })
        .catch(error => console.log('Error Fetching products ', error));

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

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

});

