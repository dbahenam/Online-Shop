const addToCartButton = document.getElementById('addToCart');
const cartTotalItems = document.getElementById('cartTotalItems');

async function addToCart(event) {
  const productID = addToCartButton.dataset.productid;
  console.log('productID: ', productID);
  const csrfToken = addToCartButton.dataset.csrf;
  let response;

  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productID: productID,
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
  const responseData = await response.json();
  cartTotalItems.innerHTML = responseData.totalItems;
  console.log(responseData);
}

addToCartButton.addEventListener('click', addToCart);
