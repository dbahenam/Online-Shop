const addToCartButton = document.getElementById('addToCart');
const cartTotalItems = document.getElementById('cartTotalItems');
const quantityValue = document.getElementById('item-quantity');

async function addToCart(event) {
  const productID = addToCartButton.dataset.productid;
  const csrfToken = addToCartButton.dataset.csrf;
  const quantity = +quantityValue.value;
  console.log(quantity);
  let response;

  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productID: productID,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Error');
    return;
  }
  if (!response.ok) {
    alert('Error');
    return;
  }
  quantityValue.value = 1;
  const responseData = await response.json();
  cartTotalItems.innerHTML = responseData.totalItems;
  console.log(responseData);
}

addToCartButton.addEventListener('click', addToCart);
